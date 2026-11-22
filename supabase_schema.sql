-- ============================================================================
-- NotariadoQuest — Esquema de Base de Datos y Seguridad (RLS) para Supabase
-- ============================================================================
-- INSTRUCCIONES:
-- 1. Ve a tu proyecto en Supabase -> SQL Editor -> New Query.
-- 2. Pega todo este script y ejecútalo (Run).
-- 3. Al final, reemplaza 'tu-correo@ejemplo.com' con TU correo real para ser
--    el primer Administrador autorizado.
-- ============================================================================

-- 1. Tabla de usuarios autorizados (Lista Blanca / Allowlist)
CREATE TABLE IF NOT EXISTS public.authorized_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT DEFAULT '',
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Normalizar siempre el correo a minúsculas y sin espacios
CREATE OR REPLACE FUNCTION public.normalize_authorized_email()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email := lower(trim(NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_normalize_authorized_email ON public.authorized_users;
CREATE TRIGGER trg_normalize_authorized_email
    BEFORE INSERT OR UPDATE ON public.authorized_users
    FOR EACH ROW
    EXECUTE FUNCTION public.normalize_authorized_email();

-- 2. Tabla de progreso sincronizado por usuario
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    streak INTEGER NOT NULL DEFAULT 1 CHECK (streak >= 1),
    hearts INTEGER NOT NULL DEFAULT 5 CHECK (hearts >= 0 AND hearts <= 5),
    mastered_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_modules JSONB NOT NULL DEFAULT '[]'::jsonb,
    last_study_date DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Funciones auxiliares SECURITY DEFINER (evitan recursión en políticas RLS)
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS TEXT AS $$
    SELECT lower(trim(COALESCE(auth.jwt() ->> 'email', '')));
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_user_authorized()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.authorized_users
        WHERE email = public.current_user_email()
          AND is_active = true
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_user_admin()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.authorized_users
        WHERE email = public.current_user_email()
          AND role = 'admin'
          AND is_active = true
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.authorized_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Políticas para authorized_users:
-- Un usuario autenticado puede ver únicamente su propio registro (para validar acceso y rol)
DROP POLICY IF EXISTS "Users can view own authorization" ON public.authorized_users;
CREATE POLICY "Users can view own authorization"
    ON public.authorized_users
    FOR SELECT
    TO authenticated
    USING (email = public.current_user_email() OR public.is_user_admin());

-- Solo administradores activos pueden agregar, editar o eliminar autorizaciones
DROP POLICY IF EXISTS "Admins can insert authorized users" ON public.authorized_users;
CREATE POLICY "Admins can insert authorized users"
    ON public.authorized_users
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_user_admin());

DROP POLICY IF EXISTS "Admins can update authorized users" ON public.authorized_users;
CREATE POLICY "Admins can update authorized users"
    ON public.authorized_users
    FOR UPDATE
    TO authenticated
    USING (public.is_user_admin())
    WITH CHECK (public.is_user_admin());

DROP POLICY IF EXISTS "Admins can delete authorized users" ON public.authorized_users;
CREATE POLICY "Admins can delete authorized users"
    ON public.authorized_users
    FOR DELETE
    TO authenticated
    USING (public.is_user_admin());

-- Políticas para user_progress:
-- Solo usuarios autorizados y activos pueden ver su propio progreso; admins pueden ver todos
DROP POLICY IF EXISTS "Authorized users can view own progress" ON public.user_progress;
CREATE POLICY "Authorized users can view own progress"
    ON public.user_progress
    FOR SELECT
    TO authenticated
    USING (
        (user_id = auth.uid() AND public.is_user_authorized())
        OR public.is_user_admin()
    );

-- Solo usuarios autorizados y activos pueden insertar su propio progreso
DROP POLICY IF EXISTS "Authorized users can insert own progress" ON public.user_progress;
CREATE POLICY "Authorized users can insert own progress"
    ON public.user_progress
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = auth.uid()
        AND public.is_user_authorized()
    );

-- Solo usuarios autorizados y activos pueden actualizar su propio progreso
DROP POLICY IF EXISTS "Authorized users can update own progress" ON public.user_progress;
CREATE POLICY "Authorized users can update own progress"
    ON public.user_progress
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid() AND public.is_user_authorized())
    WITH CHECK (user_id = auth.uid() AND public.is_user_authorized());

-- ============================================================================
-- 5. PRIMER ADMINISTRADOR (IMPORTANTE: CAMBIA ESTE CORREO POR EL TUYO)
-- ============================================================================
INSERT INTO public.authorized_users (email, full_name, role, is_active, notes)
VALUES ('tu-correo@ejemplo.com', 'Administrador Principal', 'admin', true, 'Propietario de NotariadoQuest')
ON CONFLICT (email) DO UPDATE
SET role = 'admin', is_active = true;
