// ============================================================================
// NotariadoQuest — Motor de Autenticación, Sincronización Cloud y Cuestionario
// ============================================================================

const THEME_KEY = 'notariado_quest_theme';
const LOCAL_CACHE_PREFIX = 'notariado_quest_cloud_cache_';

let supabaseClient = null;
let authMode = 'login'; // 'login' | 'register'
let syncDebounceTimer = null;
let pendingCloudSync = false;

let currentAuth = {
    user: null,
    email: null,
    role: 'student',
    fullName: '',
    isAuthorized: false
};

let userState = {
    xp: 0,
    streak: 1,
    hearts: 5,
    masteredIds: [],
    completedModules: [],
    lastStudyDate: null
};

let expandedUnits = new Set(['notarial']);

let currentQuiz = {
    questions: [],
    currentIndex: 0,
    selectedOption: null,
    selectedOptions: [],
    answered: false,
    sessionXp: 0,
    correctCount: 0,
    moduleKey: null
};

// ==========================================
// INICIALIZACIÓN Y TEMA
// ==========================================
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', isDark);
    updateThemeIcon(isDark);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    icon.className = isDark ? 'fa-solid fa-sun text-amber-300 text-sm' : 'fa-solid fa-moon text-slate-300 text-sm';
}

function isSupabaseConfigured() {
    const cfg = window.NOTARIADO_CONFIG || {};
    return Boolean(
        cfg.SUPABASE_URL &&
        cfg.SUPABASE_ANON_KEY &&
        !cfg.SUPABASE_URL.includes('TU-PROYECTO') &&
        !cfg.SUPABASE_ANON_KEY.includes('TU-ANON-KEY')
    );
}

async function initApp() {
    initTheme();
    registerServiceWorker();

    if (!isSupabaseConfigured()) {
        document.getElementById('config-warning').classList.remove('hidden');
        showAuthScreen();
        return;
    }

    supabaseClient = window.supabase.createClient(
        window.NOTARIADO_CONFIG.SUPABASE_URL,
        window.NOTARIADO_CONFIG.SUPABASE_ANON_KEY
    );

    window.addEventListener('online', () => {
        if (currentAuth.isAuthorized && pendingCloudSync) {
            syncProgressToCloud();
        } else {
            updateSyncBadge(navigator.onLine ? 'synced' : 'offline');
        }
    });
    window.addEventListener('offline', () => updateSyncBadge('offline'));

    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session && session.user) {
            await handleAuthenticatedSession(session.user);
        } else {
            showAuthScreen();
        }
    } catch (err) {
        console.error('Error inicializando sesión:', err);
        showAuthScreen('No se pudo conectar con el servidor de autenticación.');
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
}

// ==========================================
// AUTENTICACIÓN Y LISTA BLANCA
// ==========================================
function showAuthScreen(errorMsg = '') {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('app-shell').classList.add('hidden');
    document.getElementById('auth-view').classList.remove('hidden');

    if (errorMsg) {
        showAuthError(errorMsg);
    } else {
        hideAuthError();
    }
}

function showAuthError(msg) {
    const box = document.getElementById('auth-error-box');
    document.getElementById('auth-error-text').textContent = msg;
    box.classList.remove('hidden');
}

function hideAuthError() {
    document.getElementById('auth-error-box').classList.add('hidden');
}

function switchAuthTab(mode) {
    authMode = mode;
    hideAuthError();
    const loginTab = document.getElementById('tab-login');
    const regTab = document.getElementById('tab-register');
    const submitLabel = document.getElementById('auth-submit-label');
    const passInput = document.getElementById('auth-password');

    if (mode === 'login') {
        loginTab.className = 'flex-1 py-2.5 text-xs font-extrabold rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm transition-all';
        regTab.className = 'flex-1 py-2.5 text-xs font-extrabold rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all';
        submitLabel.textContent = 'Ingresar al Simulador';
        passInput.autocomplete = 'current-password';
    } else {
        regTab.className = 'flex-1 py-2.5 text-xs font-extrabold rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm transition-all';
        loginTab.className = 'flex-1 py-2.5 text-xs font-extrabold rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all';
        submitLabel.textContent = 'Crear Contraseña y Activar';
        passInput.autocomplete = 'new-password';
    }
}

async function handleAuthSubmit(event) {
    event.preventDefault();
    hideAuthError();

    if (!supabaseClient) {
        showAuthError('Debes configurar Supabase en js/config.js antes de iniciar sesión.');
        return;
    }

    const email = document.getElementById('auth-email').value.trim().toLowerCase();
    const password = document.getElementById('auth-password').value;
    const btn = document.getElementById('auth-submit-btn');
    btn.disabled = true;

    try {
        if (authMode === 'login') {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) throw error;
            if (data.user) {
                await handleAuthenticatedSession(data.user);
            }
        } else {
            const { data, error } = await supabaseClient.auth.signUp({ email, password });
            if (error) throw error;
            if (data.session && data.user) {
                await handleAuthenticatedSession(data.user);
            } else {
                showToast('Revisa tu correo electrónico para confirmar tu cuenta y luego inicia sesión.', 'info');
                switchAuthTab('login');
            }
        }
    } catch (err) {
        const msg = translateAuthError(err.message || '');
        showAuthError(msg);
    } finally {
        btn.disabled = false;
    }
}

function translateAuthError(msg) {
    const m = msg.toLowerCase();
    if (m.includes('invalid login credentials')) return 'Correo o contraseña incorrectos.';
    if (m.includes('user already registered')) return 'Este correo ya tiene una cuenta activa. Usa la pestaña "Iniciar Sesión".';
    if (m.includes('email not confirmed')) return 'Debes confirmar tu correo electrónico antes de ingresar.';
    if (m.includes('password should be at least')) return 'La contraseña debe tener al menos 6 caracteres.';
    return msg || 'Error de autenticación. Intenta nuevamente.';
}

async function handleAuthenticatedSession(user) {
    const email = (user.email || '').trim().toLowerCase();

    const { data: authRecord, error } = await supabaseClient
        .from('authorized_users')
        .select('email, full_name, role, is_active')
        .eq('email', email)
        .maybeSingle();

    if (error) {
        console.error('Error verificando autorización:', error);
        await supabaseClient.auth.signOut();
        showAuthScreen('Error verificando permisos de acceso. Verifica que ejecutaste supabase_schema.sql.');
        return;
    }

    if (!authRecord || !authRecord.is_active) {
        await supabaseClient.auth.signOut();
        showAuthScreen('Acceso denegado: tu correo no está autorizado o fue desactivado por el administrador.');
        return;
    }

    currentAuth = {
        user,
        email,
        role: authRecord.role || 'student',
        fullName: authRecord.full_name || '',
        isAuthorized: true
    };

    document.getElementById('header-user-email').textContent = currentAuth.fullName || email;
    const adminBtn = document.getElementById('admin-nav-btn');
    if (currentAuth.role === 'admin') {
        adminBtn.classList.remove('hidden');
    } else {
        adminBtn.classList.add('hidden');
    }

    await loadAndMergeProgress();

    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('app-shell').classList.remove('hidden');

    showHome();
}

async function handleLogout() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }
    currentAuth = { user: null, email: null, role: 'student', fullName: '', isAuthorized: false };
    showAuthScreen();
    showToast('Sesión cerrada correctamente.', 'info');
}

// ==========================================
// SINCRONIZACIÓN DE PROGRESO EN LA NUBE
// ==========================================
function getLocalCacheKey() {
    return `${LOCAL_CACHE_PREFIX}${currentAuth.user ? currentAuth.user.id : 'anon'}`;
}

function getTodayISO() {
    return new Date().toISOString().slice(0, 10);
}

function updateStreakForToday(lastDateStr, currentStreak) {
    const today = getTodayISO();
    if (!lastDateStr) return { streak: Math.max(1, currentStreak || 1), lastStudyDate: today };
    if (lastDateStr === today) return { streak: Math.max(1, currentStreak || 1), lastStudyDate: today };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (lastDateStr === yesterdayStr) {
        return { streak: (currentStreak || 1) + 1, lastStudyDate: today };
    }
    return { streak: 1, lastStudyDate: today };
}

async function loadAndMergeProgress() {
    updateSyncBadge('syncing');

    let localData = null;
    try {
        const raw = localStorage.getItem(getLocalCacheKey());
        if (raw) localData = JSON.parse(raw);
    } catch (e) {
        localData = null;
    }

    let cloudData = null;
    try {
        const { data, error } = await supabaseClient
            .from('user_progress')
            .select('xp, streak, hearts, mastered_ids, completed_modules, last_study_date')
            .eq('user_id', currentAuth.user.id)
            .maybeSingle();

        if (!error && data) {
            cloudData = data;
        }
    } catch (e) {
        console.warn('Sin conexión para cargar progreso cloud, usando caché local.');
    }

    const cloudMastered = Array.isArray(cloudData?.mastered_ids) ? cloudData.mastered_ids : [];
    const localMastered = Array.isArray(localData?.masteredIds) ? localData.masteredIds : [];
    const mergedMastered = Array.from(new Set([...cloudMastered, ...localMastered]));

    const cloudMods = Array.isArray(cloudData?.completed_modules) ? cloudData.completed_modules : [];
    const localMods = Array.isArray(localData?.completedModules) ? localData.completedModules : [];
    const mergedMods = Array.from(new Set([...cloudMods, ...localMods]));

    const cloudXp = Number(cloudData?.xp) || 0;
    const localXp = Number(localData?.xp) || 0;
    const mergedXp = Math.max(cloudXp, localXp);

    const baseStreak = Math.max(Number(cloudData?.streak) || 1, Number(localData?.streak) || 1);
    const latestDate = cloudData?.last_study_date || localData?.lastStudyDate || null;
    const streakCalc = updateStreakForToday(latestDate, baseStreak);

    userState = {
        xp: mergedXp,
        streak: streakCalc.streak,
        hearts: cloudData?.hearts !== undefined ? Number(cloudData.hearts) : (localData?.hearts !== undefined ? Number(localData.hearts) : 5),
        masteredIds: mergedMastered,
        completedModules: mergedMods,
        lastStudyDate: streakCalc.lastStudyDate
    };

    saveLocalCache();
    await syncProgressToCloud();
}

function saveLocalCache() {
    try {
        localStorage.setItem(getLocalCacheKey(), JSON.stringify(userState));
    } catch (e) {
        console.error('Error guardando caché local:', e);
    }
}

function saveState(immediateCloud = false) {
    userState.lastStudyDate = getTodayISO();
    saveLocalCache();
    updateHeaderStats();

    if (!currentAuth.isAuthorized || !supabaseClient) return;

    if (immediateCloud) {
        clearTimeout(syncDebounceTimer);
        syncProgressToCloud();
    } else {
        clearTimeout(syncDebounceTimer);
        syncDebounceTimer = setTimeout(() => {
            syncProgressToCloud();
        }, 650);
    }
}

async function syncProgressToCloud() {
    if (!currentAuth.isAuthorized || !supabaseClient) return;
    if (!navigator.onLine) {
        pendingCloudSync = true;
        updateSyncBadge('offline');
        return;
    }

    updateSyncBadge('syncing');
    try {
        const payload = {
            user_id: currentAuth.user.id,
            email: currentAuth.email,
            xp: userState.xp,
            streak: userState.streak,
            hearts: userState.hearts,
            mastered_ids: userState.masteredIds,
            completed_modules: userState.completedModules,
            last_study_date: userState.lastStudyDate || getTodayISO(),
            updated_at: new Date().toISOString()
        };

        const { error } = await supabaseClient
            .from('user_progress')
            .upsert(payload, { onConflict: 'user_id' });

        if (error) throw error;
        pendingCloudSync = false;
        updateSyncBadge('synced');
    } catch (err) {
        console.error('Error sincronizando con Supabase:', err);
        pendingCloudSync = true;
        updateSyncBadge('error');
    }
}

async function forceCloudSync() {
    await syncProgressToCloud();
    if (!pendingCloudSync) {
        showToast('Progreso sincronizado con la nube.', 'success');
    } else {
        showToast('No se pudo conectar. Se sincronizará automáticamente al recuperar conexión.', 'info');
    }
}

function updateSyncBadge(status) {
    const badge = document.getElementById('sync-badge');
    if (!badge) return;
    if (status === 'syncing') {
        badge.className = 'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30';
        badge.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Guardando...';
    } else if (status === 'offline') {
        badge.className = 'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30';
        badge.innerHTML = '<i class="fa-solid fa-wifi"></i> Offline (local)';
    } else if (status === 'error') {
        badge.className = 'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30';
        badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Pendiente';
    } else {
        badge.className = 'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30';
        badge.innerHTML = '<i class="fa-solid fa-cloud-check"></i> Sincronizado';
    }
}

// ==========================================
// PANEL DE ADMINISTRADOR (GESTIÓN DE ACCESOS)
// ==========================================
function showAdminPanel() {
    if (currentAuth.role !== 'admin') return;
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('quiz-view').classList.add('hidden');
    document.getElementById('result-view').classList.add('hidden');
    document.getElementById('admin-view').classList.remove('hidden');
    loadAdminUsers();
}

async function loadAdminUsers() {
    if (currentAuth.role !== 'admin' || !supabaseClient) return;
    const listEl = document.getElementById('admin-users-list');
    listEl.innerHTML = '<div class="p-8 text-center text-sm text-slate-500">Cargando usuarios autorizados...</div>';

    try {
        const [{ data: users, error: uErr }, { data: progressRows }] = await Promise.all([
            supabaseClient.from('authorized_users').select('*').order('created_at', { ascending: false }),
            supabaseClient.from('user_progress').select('email, xp, mastered_ids, updated_at')
        ]);

        if (uErr) throw uErr;

        const progressByEmail = {};
        (progressRows || []).forEach(p => {
            progressByEmail[(p.email || '').toLowerCase()] = p;
        });

        document.getElementById('admin-user-count').textContent = `${(users || []).length} usuarios`;

        if (!users || users.length === 0) {
            listEl.innerHTML = '<div class="p-8 text-center text-sm text-slate-500">No hay usuarios registrados.</div>';
            return;
        }

        listEl.innerHTML = users.map(u => {
            const prog = progressByEmail[u.email.toLowerCase()];
            const xp = prog ? prog.xp : 0;
            const masteredCount = prog && Array.isArray(prog.mastered_ids) ? prog.mastered_ids.length : 0;
            const isSelf = u.email.toLowerCase() === currentAuth.email;

            return `
                <div class="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors">
                    <div class="space-y-1 min-w-0">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="font-bold text-sm text-slate-900 dark:text-white truncate">${escapeHtml(u.full_name || u.email)}</span>
                            <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">${u.role === 'admin' ? 'Admin' : 'Estudiante'}</span>
                            <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${u.is_active ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'}">${u.is_active ? 'Activo' : 'Suspendido'}</span>
                        </div>
                        <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${escapeHtml(u.email)}</p>
                        <p class="text-[11px] text-slate-400">Progreso: <strong class="text-amber-600 dark:text-amber-400">${xp} XP</strong> · ${masteredCount} preguntas dominadas</p>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        ${!isSelf ? `
                            <button onclick="toggleAuthorizedUserStatus('${u.id}', ${!u.is_active})" class="btn-press px-3 py-1.5 rounded-xl text-xs font-bold border ${u.is_active ? 'border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40' : 'border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'}">
                                ${u.is_active ? 'Suspender' : 'Reactivar'}
                            </button>
                            <button onclick="deleteAuthorizedUser('${u.id}', '${escapeHtml(u.email)}')" class="btn-press px-3 py-1.5 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40" title="Eliminar autorización">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        ` : `<span class="text-[11px] font-bold text-slate-400 italic">Tu cuenta</span>`}
                    </div>
                </div>
            `;
        }).join('');
    } catch (err) {
        console.error('Error cargando lista de usuarios:', err);
        listEl.innerHTML = '<div class="p-8 text-center text-sm text-rose-500">Error cargando usuarios autorizados.</div>';
    }
}

async function handleAddAuthorizedUser(event) {
    event.preventDefault();
    if (currentAuth.role !== 'admin' || !supabaseClient) return;

    const email = document.getElementById('admin-new-email').value.trim().toLowerCase();
    const fullName = document.getElementById('admin-new-name').value.trim();
    const role = document.getElementById('admin-new-role').value;

    try {
        const { error } = await supabaseClient
            .from('authorized_users')
            .insert({ email, full_name: fullName, role, is_active: true });

        if (error) throw error;
        document.getElementById('admin-new-email').value = '';
        document.getElementById('admin-new-name').value = '';
        showToast(`Acceso autorizado para ${email}.`, 'success');
        loadAdminUsers();
    } catch (err) {
        showToast(err.message.includes('duplicate') ? 'Ese correo ya está en la lista.' : 'No se pudo agregar el usuario.', 'error');
    }
}

async function toggleAuthorizedUserStatus(id, newStatus) {
    if (currentAuth.role !== 'admin' || !supabaseClient) return;
    try {
        const { error } = await supabaseClient
            .from('authorized_users')
            .update({ is_active: newStatus })
            .eq('id', id);
        if (error) throw error;
        showToast(newStatus ? 'Acceso reactivado.' : 'Acceso suspendido.', 'info');
        loadAdminUsers();
    } catch (err) {
        showToast('Error actualizando estado del usuario.', 'error');
    }
}

async function deleteAuthorizedUser(id, email) {
    if (currentAuth.role !== 'admin' || !supabaseClient) return;
    if (!confirm(`¿Eliminar la autorización de ${email}?`)) return;
    try {
        const { error } = await supabaseClient
            .from('authorized_users')
            .delete()
            .eq('id', id);
        if (error) throw error;
        showToast(`Autorización eliminada para ${email}.`, 'info');
        loadAdminUsers();
    } catch (err) {
        showToast('Error eliminando usuario.', 'error');
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ==========================================
// ESTADÍSTICAS Y RESPALDO .JSON
// ==========================================
function getAllQuestions() {
    const list = [];
    unitsData.forEach(u => {
        u.questions.forEach(q => {
            list.push({ ...q, unitTitle: u.title });
        });
    });
    return list;
}

function updateHeaderStats() {
    document.getElementById('stat-streak').textContent = userState.streak;
    document.getElementById('stat-xp').textContent = `${userState.xp} XP`;
    document.getElementById('stat-hearts').textContent = userState.hearts;

    const all = getAllQuestions();
    const total = all.length;
    const masteredSet = new Set(userState.masteredIds);
    const masteredCount = all.filter(q => masteredSet.has(q.uid)).length;
    const pct = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

    document.getElementById('total-questions-badge').textContent = `${total} Preguntas disponibles`;
    document.getElementById('global-progress-bar').style.width = `${pct}%`;
    document.getElementById('global-progress-text').textContent = `${masteredCount} / ${total}`;

    const ringPath = document.getElementById('progress-ring-path');
    const ringText = document.getElementById('progress-ring-text');
    if (ringPath) ringPath.setAttribute('stroke-dasharray', `${pct}, 100`);
    if (ringText) ringText.textContent = `${pct}%`;
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const styles = {
        success: 'bg-slate-900 text-white border-emerald-500/50',
        error: 'bg-rose-950 text-rose-100 border-rose-500/60',
        info: 'bg-slate-900 text-amber-100 border-amber-500/50'
    };
    const icons = {
        success: 'fa-circle-check text-emerald-400',
        error: 'fa-triangle-exclamation text-rose-400',
        info: 'fa-circle-info text-amber-400'
    };
    toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-xl text-xs sm:text-sm font-semibold animate-reveal ${styles[type] || styles.info}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info} text-base"></i><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}

function exportProgressJSON() {
    try {
        const payload = {
            app: 'NotariadoQuest',
            version: '2.0',
            exportedAt: new Date().toISOString(),
            progress: {
                xp: userState.xp,
                streak: userState.streak,
                hearts: userState.hearts,
                masteredIds: userState.masteredIds,
                completedModules: userState.completedModules
            }
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const dateStr = new Date().toISOString().slice(0, 10);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NotariadoQuest_Progreso_${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Progreso exportado correctamente en formato .json', 'success');
    } catch (err) {
        showToast('No se pudo exportar el archivo .json', 'error');
    }
}

function importProgressJSON(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data || data.app !== 'NotariadoQuest' || !data.progress || typeof data.progress !== 'object') {
                throw new Error('Estructura inválida');
            }
            const p = data.progress;
            if (typeof p.xp !== 'number' || !Array.isArray(p.masteredIds) || !Array.isArray(p.completedModules)) {
                throw new Error('Datos corruptos');
            }

            const validIds = new Set(getAllQuestions().map(q => q.uid));
            userState.xp = Math.max(userState.xp, Math.max(0, Math.floor(p.xp)));
            userState.streak = Math.max(userState.streak, Math.max(1, Math.floor(Number(p.streak) || 1)));
            userState.hearts = Math.min(5, Math.max(1, Math.floor(Number(p.hearts) || 5)));
            userState.masteredIds = Array.from(new Set([...userState.masteredIds, ...p.masteredIds.filter(id => typeof id === 'string' && validIds.has(id))]));
            userState.completedModules = Array.from(new Set([...userState.completedModules, ...p.completedModules.filter(m => typeof m === 'string')]));

            saveState(true);
            renderUnits();
            showToast(`Progreso fusionado y sincronizado: ${userState.xp} XP.`, 'success');
        } catch (err) {
            showToast('Archivo .json inválido o incompatible con NotariadoQuest.', 'error');
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}

// ==========================================
// RENDERIZADO DE UNIDADES Y BUSCADOR
// ==========================================
function toggleUnitAccordion(unitId) {
    if (expandedUnits.has(unitId)) {
        expandedUnits.delete(unitId);
    } else {
        expandedUnits.add(unitId);
    }
    renderUnits();
}

function toggleAllUnits(expand) {
    if (expand) {
        unitsData.forEach(u => expandedUnits.add(u.id));
    } else {
        expandedUnits.clear();
    }
    renderUnits();
}

function renderUnits() {
    const container = document.getElementById('units-container');
    container.innerHTML = '';

    const accentStyles = {
        amber: { badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30', iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', bar: 'bg-amber-500' },
        sky: { badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30', iconBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', bar: 'bg-sky-500' },
        teal: { badge: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30', iconBg: 'bg-teal-500/15 text-teal-600 dark:text-teal-400', bar: 'bg-teal-500' },
        indigo: { badge: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30', iconBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400', bar: 'bg-indigo-500' },
        rose: { badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30', iconBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400', bar: 'bg-rose-500' },
        emerald: { badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30', iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-500' }
    };

    const masteredSet = new Set(userState.masteredIds);

    unitsData.forEach(unit => {
        const theme = accentStyles[unit.accent] || accentStyles.amber;
        const unitMastered = unit.questions.filter(q => masteredSet.has(q.uid)).length;
        const unitPct = Math.round((unitMastered / unit.questions.length) * 100);
        const isOpen = expandedUnits.has(unit.id);

        const chunkSize = 10;
        const modulesHtml = [];
        for (let i = 0; i < unit.questions.length; i += chunkSize) {
            const chunk = unit.questions.slice(i, i + chunkSize);
            const modIndex = Math.floor(i / chunkSize) + 1;
            const modKey = `${unit.id}_mod_${modIndex}`;
            const chunkMastered = chunk.filter(q => masteredSet.has(q.uid)).length;
            const isDone = chunkMastered === chunk.length || userState.completedModules.includes(modKey);

            modulesHtml.push(`
                <button onclick="startUnitModule('${unit.id}', ${i}, ${chunkSize}, '${modKey}')" class="card-hover btn-press text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${isDone ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300/80 dark:border-emerald-800/70' : 'bg-slate-50/80 dark:bg-slate-950/60 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800'}">
                    <div class="min-w-0">
                        <p class="text-xs font-extrabold ${isDone ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-100'} truncate">Lección ${modIndex}</p>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">${chunkMastered}/${chunk.length} dominadas</p>
                    </div>
                    <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isDone ? 'bg-emerald-500 text-white shadow-sm' : `${theme.iconBg}`}">
                        <i class="fa-solid ${isDone ? 'fa-check' : 'fa-play'} text-xs"></i>
                    </div>
                </button>
            `);
        }

        const unitCard = document.createElement('article');
        unitCard.className = 'bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-all';
        unitCard.innerHTML = `
            <div onclick="toggleUnitAccordion('${unit.id}')" class="p-5 sm:p-6 cursor-pointer select-none hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors space-y-3.5">
                <div class="flex items-start sm:items-center justify-between gap-4">
                    <div class="flex items-start sm:items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center shrink-0 text-xl">
                            <i class="fa-solid ${unit.icon}"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">${unit.title}</h3>
                            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">${unit.subtitle}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 shrink-0">
                        <span class="hidden sm:inline-block text-xs font-bold px-3 py-1 rounded-full border ${theme.badge}">
                            ${unitMastered}/${unit.questions.length} (${unitPct}%)
                        </span>
                        <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <i class="fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs"></i>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div class="h-full ${theme.bar} transition-all duration-500" style="width: ${unitPct}%"></div>
                    </div>
                    <span class="sm:hidden text-[11px] font-bold text-slate-500">${unitPct}%</span>
                </div>
            </div>
            ${isOpen ? `
            <div class="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 animate-reveal">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-3">
                    ${modulesHtml.join('')}
                </div>
            </div>` : ''}
        `;
        container.appendChild(unitCard);
    });
}

function filterQuestionsSearch(query) {
    const box = document.getElementById('search-results');
    const term = (query || '').trim().toLowerCase();
    if (term.length < 2) {
        box.classList.add('hidden');
        box.innerHTML = '';
        return;
    }

    const matches = getAllQuestions().filter(q =>
        q.q.toLowerCase().includes(term) ||
        q.article.toLowerCase().includes(term) ||
        q.rationale.toLowerCase().includes(term)
    ).slice(0, 12);

    box.classList.remove('hidden');
    if (matches.length === 0) {
        box.innerHTML = `<p class="text-xs text-slate-500 py-2.5">No se encontraron resultados para "${escapeHtml(query)}".</p>`;
        return;
    }

    box.innerHTML = matches.map(m => `
        <div class="py-2.5 flex items-start justify-between gap-3">
            <div class="space-y-0.5 min-w-0">
                <span class="text-[11px] font-bold text-amber-600 dark:text-amber-400 block truncate">${escapeHtml(m.article)}</span>
                <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">${escapeHtml(m.q)}</p>
            </div>
            <button onclick="startSingleQuestionPractice('${m.uid}')" class="shrink-0 text-[11px] font-bold bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 px-2.5 py-1.5 rounded-lg hover:opacity-90">
                Practicar
            </button>
        </div>
    `).join('');
}

// ==========================================
// MOTOR DE CUESTIONARIO
// ==========================================
function showHome() {
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('quiz-view').classList.add('hidden');
    document.getElementById('result-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    updateHeaderStats();
    renderUnits();
}

function startUnitModule(unitId, startIdx, count, modKey) {
    const unit = unitsData.find(u => u.id === unitId);
    if (!unit) return;
    const qs = unit.questions.slice(startIdx, startIdx + count).map(q => ({ ...q, unitTitle: unit.title }));
    launchQuizUI(qs, modKey);
}

function startSingleQuestionPractice(uid) {
    const found = getAllQuestions().find(q => q.uid === uid);
    if (!found) return;
    launchQuizUI([found], null);
}

function startRandomPractice() {
    const all = getAllQuestions();
    const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, 10);
    launchQuizUI(shuffled, null);
}

function launchQuizUI(questions, moduleKey) {
    if (userState.hearts <= 0) {
        userState.hearts = 5;
        saveState();
        showToast('Vidas restauradas al máximo (5/5) para continuar estudiando.', 'info');
    }

    currentQuiz = {
        questions,
        currentIndex: 0,
        selectedOption: null,
        selectedOptions: [],
        answered: false,
        sessionXp: 0,
        correctCount: 0,
        moduleKey
    };

    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('result-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('quiz-view').classList.remove('hidden');
    renderQuestion();
}

function renderQuestion() {
    const qObj = currentQuiz.questions[currentQuiz.currentIndex];
    const total = currentQuiz.questions.length;
    const qType = qObj.type || 'single';
    const isMulti = qType === 'multi';
    const isTF = qType === 'tf';
    const isCloze = qType === 'cloze';

    currentQuiz.selectedOption = null;
    currentQuiz.selectedOptions = [];
    currentQuiz.answered = false;

    const pct = Math.round((currentQuiz.currentIndex / total) * 100);
    document.getElementById('quiz-progress-bar').style.width = `${pct}%`;
    document.getElementById('quiz-counter').textContent = `${currentQuiz.currentIndex + 1} / ${total}`;
    document.getElementById('quiz-unit-badge').textContent = qObj.unitTitle || 'Cuestionario Notarial';

    const typeBadge = document.getElementById('quiz-type-badge');
    const multiHint = document.getElementById('quiz-multi-hint');
    const clozeBox = document.getElementById('quiz-cloze-box');

    multiHint.classList.add('hidden');
    clozeBox.classList.add('hidden');

    if (isMulti) {
        typeBadge.textContent = 'Selección Múltiple (+20 XP)';
        typeBadge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800';
        multiHint.classList.remove('hidden');
    } else if (isTF) {
        typeBadge.textContent = 'Verdadero o Falso (+15 XP)';
        typeBadge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800';
    } else if (isCloze) {
        typeBadge.textContent = 'Completar Cláusula / Norma (+20 XP)';
        typeBadge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
        clozeBox.textContent = qObj.clozeText || '';
        clozeBox.classList.remove('hidden');
    } else {
        typeBadge.textContent = 'Selección Única (+10 XP)';
        typeBadge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }

    document.getElementById('quiz-question-text').textContent = qObj.q;

    const indexedOptions = qObj.options.map((text, idx) => ({ text, originalIdx: idx }));
    if (!isTF) {
        indexedOptions.sort(() => Math.random() - 0.5);
    }

    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';
    optionsContainer.className = isTF ? 'grid grid-cols-1 sm:grid-cols-2 gap-3.5' : 'space-y-3';

    indexedOptions.forEach((opt, displayIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.originalIdx = opt.originalIdx;
        btn.className = isTF
            ? 'option-btn card-hover w-full text-center p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-sky-400/80 bg-white dark:bg-slate-950/60 transition-all flex flex-col items-center justify-center gap-2 text-base font-extrabold text-slate-800 dark:text-slate-100'
            : 'option-btn card-hover w-full text-left p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-400/70 bg-white dark:bg-slate-950/60 transition-all flex items-start gap-3.5 text-sm font-medium text-slate-800 dark:text-slate-100';
        btn.onclick = () => selectOption(opt.originalIdx, btn, isMulti);

        if (isTF) {
            const tfIcon = opt.originalIdx === 0 ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-rose-500';
            btn.innerHTML = `<i class="fa-solid ${tfIcon} text-2xl"></i><span>${escapeHtml(opt.text)}</span>`;
        } else {
            const marker = isMulti
                ? `<span class="opt-marker w-6 h-6 rounded-lg border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-transparent"><i class="fa-solid fa-check"></i></span>`
                : `<span class="opt-marker w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold text-slate-500 dark:text-slate-400">${String.fromCharCode(65 + displayIdx)}</span>`;
            btn.innerHTML = `${marker}<span class="leading-relaxed">${escapeHtml(opt.text)}</span>`;
        }
        optionsContainer.appendChild(btn);
    });

    const footer = document.getElementById('quiz-footer');
    footer.className = 'px-6 py-5 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4';
    document.getElementById('feedback-box').classList.add('hidden');
    const checkBtn = document.getElementById('check-btn');
    checkBtn.classList.remove('hidden');
    checkBtn.disabled = true;
    document.getElementById('next-btn').classList.add('hidden');
}

function selectOption(originalIdx, btnElement, isMulti) {
    if (currentQuiz.answered) return;

    if (isMulti) {
        const pos = currentQuiz.selectedOptions.indexOf(originalIdx);
        const marker = btnElement.querySelector('.opt-marker');
        if (pos > -1) {
            currentQuiz.selectedOptions.splice(pos, 1);
            btnElement.classList.remove('border-indigo-500', 'bg-indigo-50/70', 'dark:bg-indigo-950/40');
            btnElement.classList.add('border-slate-200', 'dark:border-slate-800', 'bg-white', 'dark:bg-slate-950/60');
            marker.classList.remove('bg-indigo-600', 'border-indigo-600', 'text-white');
            marker.classList.add('border-slate-300', 'dark:border-slate-700', 'text-transparent');
        } else {
            currentQuiz.selectedOptions.push(originalIdx);
            btnElement.classList.remove('border-slate-200', 'dark:border-slate-800', 'bg-white', 'dark:bg-slate-950/60');
            btnElement.classList.add('border-indigo-500', 'bg-indigo-50/70', 'dark:bg-indigo-950/40');
            marker.classList.remove('border-slate-300', 'dark:border-slate-700', 'text-transparent');
            marker.classList.add('bg-indigo-600', 'border-indigo-600', 'text-white');
        }
        document.getElementById('check-btn').disabled = currentQuiz.selectedOptions.length === 0;
    } else {
        currentQuiz.selectedOption = originalIdx;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.classList.remove('border-amber-500', 'bg-amber-50/70', 'dark:bg-amber-950/30');
            b.classList.add('border-slate-200', 'dark:border-slate-800', 'bg-white', 'dark:bg-slate-950/60');
        });
        btnElement.classList.remove('border-slate-200', 'dark:border-slate-800', 'bg-white', 'dark:bg-slate-950/60');
        btnElement.classList.add('border-amber-500', 'bg-amber-50/70', 'dark:bg-amber-950/30');
        document.getElementById('check-btn').disabled = false;
    }
}

function checkAnswer() {
    if (currentQuiz.answered) return;
    currentQuiz.answered = true;

    const qObj = currentQuiz.questions[currentQuiz.currentIndex];
    const qType = qObj.type || 'single';
    const isMulti = qType === 'multi';
    let isCorrect = false;

    if (isMulti) {
        const expected = [...qObj.answer].sort((a, b) => a - b);
        const chosen = [...currentQuiz.selectedOptions].sort((a, b) => a - b);
        isCorrect = expected.length === chosen.length && expected.every((val, idx) => val === chosen[idx]);
    } else {
        isCorrect = currentQuiz.selectedOption === qObj.answer;
    }

    const correctSet = new Set(isMulti ? qObj.answer : [qObj.answer]);
    const chosenSet = new Set(isMulti ? currentQuiz.selectedOptions : [currentQuiz.selectedOption]);

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        const idx = Number(btn.dataset.originalIdx);
        btn.classList.remove('border-amber-500', 'bg-amber-50/70', 'dark:bg-amber-950/30', 'border-indigo-500', 'bg-indigo-50/70', 'dark:bg-indigo-950/40');

        if (correctSet.has(idx)) {
            btn.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/50', 'text-emerald-950', 'dark:text-emerald-100');
        } else if (chosenSet.has(idx)) {
            btn.classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950/50', 'text-rose-950', 'dark:text-rose-100');
        }
    });

    const footer = document.getElementById('quiz-footer');
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackArticle = document.getElementById('feedback-article');
    const feedbackRationale = document.getElementById('feedback-rationale');

    feedbackBox.classList.remove('hidden');
    feedbackArticle.textContent = qObj.article;
    feedbackRationale.textContent = qObj.rationale;

    if (isCorrect) {
        const earned = (qType === 'multi' || qType === 'cloze') ? 20 : (qType === 'tf' ? 15 : 10);
        userState.xp += earned;
        currentQuiz.sessionXp += earned;
        currentQuiz.correctCount++;
        if (!userState.masteredIds.includes(qObj.uid)) {
            userState.masteredIds.push(qObj.uid);
        }

        footer.className = 'px-6 py-5 bg-emerald-50 dark:bg-emerald-950/40 border-t border-emerald-200 dark:border-emerald-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4';
        feedbackTitle.innerHTML = `<i class="fa-solid fa-circle-check mr-1.5"></i> ¡Correcto! (+${earned} XP)`;
        feedbackTitle.className = 'font-extrabold text-base text-emerald-800 dark:text-emerald-300';
        feedbackArticle.className = 'text-xs font-bold px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-sm';
        feedbackRationale.className = 'text-xs sm:text-sm leading-relaxed text-emerald-900 dark:text-emerald-200';
    } else {
        userState.hearts = Math.max(0, userState.hearts - 1);
        footer.className = 'px-6 py-5 bg-rose-50 dark:bg-rose-950/40 border-t border-rose-200 dark:border-rose-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4';
        feedbackTitle.innerHTML = `<i class="fa-solid fa-circle-xmark mr-1.5"></i> Respuesta Incorrecta`;
        feedbackTitle.className = 'font-extrabold text-base text-rose-800 dark:text-rose-300';
        feedbackArticle.className = 'text-xs font-bold px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700 shadow-sm';
        feedbackRationale.className = 'text-xs sm:text-sm leading-relaxed text-rose-900 dark:text-rose-200';
    }

    saveState(false);
    document.getElementById('check-btn').classList.add('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    if (userState.hearts <= 0) {
        userState.hearts = 5;
        saveState(false);
        showToast('Te quedaste sin vidas; las hemos recargado a 5 para que sigas repasando.', 'info');
    }

    currentQuiz.currentIndex++;
    if (currentQuiz.currentIndex < currentQuiz.questions.length) {
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const total = currentQuiz.questions.length;
    const accuracy = total > 0 ? Math.round((currentQuiz.correctCount / total) * 100) : 0;

    if (currentQuiz.moduleKey && accuracy >= 70 && !userState.completedModules.includes(currentQuiz.moduleKey)) {
        userState.completedModules.push(currentQuiz.moduleKey);
    }
    saveState(true);

    document.getElementById('quiz-view').classList.add('hidden');
    document.getElementById('result-view').classList.remove('hidden');
    document.getElementById('result-xp').textContent = `+${currentQuiz.sessionXp} XP`;
    document.getElementById('result-accuracy').textContent = `${accuracy}%`;
}

initApp();
