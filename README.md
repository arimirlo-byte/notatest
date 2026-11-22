# NotariadoQuest — Plataforma Multiplataforma con Sincronización y Acceso Restringido

Aplicación web progresiva (**PWA**) estilo Duolingo para estudiar el **Examen de Exequátur de Notario en Honduras** (6 unidades temáticas, 500 preguntas y 4 dinámicas: selección única, selección múltiple, verdadero/falso y completar cláusula).

## Características implementadas
1. **Multiplataforma (Web + PWA)**: Funciona en computadora, tablet y celular. Se puede instalar como aplicación en Android, iOS ("Agregar a pantalla de inicio"), Windows y macOS.
2. **Sincronización en la nube (Supabase PostgreSQL)**: El XP, racha diaria, vidas, preguntas dominadas y lecciones completadas se sincronizan automáticamente entre dispositivos. Si estudias sin internet, se guarda en caché local y se sincroniza al volver a tener conexión.
3. **Acceso Restringido (Lista Blanca + Seguridad RLS)**:
   - Solo los correos registrados en la tabla `authorized_users` con `is_active = true` pueden ingresar y leer/guardar su progreso.
   - Incluye un **Panel de Control de Accesos** dentro de la misma web (visible únicamente para administradores) para autorizar correos nuevos, suspender accesos o revisar el avance de cada estudiante.

---

## Guía de Configuración (5 minutos)

### Paso 1: Crear el proyecto en Supabase (Gratis)
1. Entra a [supabase.com](https://supabase.com) y crea una cuenta o inicia sesión.
2. Crea un nuevo proyecto (por ejemplo, `NotariadoQuest`).
3. En el menú lateral izquierdo, ve a **SQL Editor** -> **New query**.
4. Abre el archivo `supabase_schema.sql` de esta carpeta, copia todo su contenido y pégalo en el editor SQL.
5. **Importante**: En la última sección del script, cambia `'tu-correo@ejemplo.com'` por **tu correo real** (con el que vas a entrar como administrador).
6. Haz clic en **Run**.

### Paso 2: Configurar la autenticación por correo
1. En Supabase, ve a **Authentication** -> **Providers** -> **Email**.
2. Asegúrate de que **Enable Email provider** esté activado.
3. *(Opcional recomendado para pruebas rápidas)*: Si no quieres que tus usuarios tengan que abrir su correo para confirmar un enlace antes de entrar por primera vez, desactiva temporalmente **Confirm email** en esa misma pantalla.

### Paso 3: Conectar tu web con Supabase
1. En Supabase, ve a **Project Settings** (ícono de engranaje) -> **API**.
2. Copia:
   - **Project URL**
   - **anon / public key**
3. Abre el archivo `js/config.js` y pega ambos valores:
   ```js
   window.NOTARIADO_CONFIG = {
       SUPABASE_URL: 'https://tu-proyecto-real.supabase.co',
       SUPABASE_ANON_KEY: 'tu-anon-key-real'
   };
   ```

### Paso 4: Subir la web a internet (Gratis)
Puedes subir esta carpeta completa (sin necesidad de compilación) a cualquiera de estas plataformas gratuitas:
- **Vercel**: Arrastra la carpeta en `vercel.com` o conecta tu repositorio de GitHub.
- **Netlify**: Arrastra la carpeta en `app.netlify.com/drop`.
- **GitHub Pages**: Sube los archivos a un repositorio y activa GitHub Pages en *Settings -> Pages*.

### Paso 5: Activar tu cuenta de Administrador y autorizar personas
1. Abre tu página web publicada.
2. Ve a la pestaña **Activar Cuenta**, escribe tu correo (el que pusiste en `supabase_schema.sql`) y crea tu contraseña.
3. Una vez dentro, verás el botón **Accesos** en la barra superior.
4. Desde ahí podrás agregar los correos de las personas a las que les des autorización. Cuando ellas entren a la web por primera vez, solo deben usar **Activar Cuenta** con su correo autorizado para crear su contraseña.
