// ===== Variables globales =====
let usuarios = [];
let operaciones = [];
let currentUser = null;
const STORAGE_KEYS = {
  usuarios: 'pido_usuarios',
  operaciones: 'pido_operaciones',
  currentUserCel: 'pido_current_user_cel'
};

// ===== Notificaciones (reemplaza alert) =====
function showToast(message, type = 'info', duration = 3500) {
  try {
    let container = document.getElementById('toast');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      container.className = 'toast';
      document.body.appendChild(container);
    }
    container.hidden = false;
    container.textContent = message;
    container.classList.remove('toast--success', 'toast--error', 'toast--show');
    if (type === 'success') container.classList.add('toast--success');
    if (type === 'error') container.classList.add('toast--error');
    container.classList.add('toast--show');
    if (container._hideTimeout) clearTimeout(container._hideTimeout);
    container._hideTimeout = setTimeout(() => {
      container.classList.remove('toast--show');
      container.hidden = true;
    }, duration);
  } catch (e) {
    console.error('showToast error', e);
  }
}

// ===== Función para cambiar de pantalla =====
function goTo(screenId) {
  // pantallas que requieren autenticación
  const protectedScreens = ['home', 'converter', 'transfer'];

  if (protectedScreens.includes(screenId) && !currentUser) {
    showToast('Debes iniciar sesión para acceder a esa sección.', 'error');
    screenId = 'login';
  }

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(screenId);
  if (el) el.classList.add('active');

  // Mostrar/ocultar menú inferior y navegación superior según sesión
  const menu = document.getElementById('menu');
  const topNav = document.getElementById('topNav');
  if (menu) menu.style.display = (currentUser && screenId !== 'login' && screenId !== 'register') ? 'flex' : 'none';
  if (topNav) topNav.style.display = currentUser ? 'flex' : 'none';
  // actualizar elementos específicos de la UI según autenticación
  updateUIForAuth();
}

// ===== Registro de usuario =====
function registerUser() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const celular = document.getElementById('celular').value.trim();
  const cedula = document.getElementById('cedula').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!nombre || !apellido || !celular || !cedula || !password) {
    showToast("Por favor completa todos los campos.", 'error');
    return;
  }

  const nuevo = { nombre, apellido, celular, cedula, password, saldo: { COP: 1000000, USD: 500, EUR: 400 } };
  usuarios.push(nuevo);
  saveState();
  // mostrar éxito inline y luego redirigir al login
  showFormSuccess('registerFormSuccess', 'Registro exitoso. Puedes iniciar sesión.');
  setTimeout(() => { goTo('login'); }, 700);
}

// ===== Login de usuario =====
function login() {
  const cel = document.getElementById('loginCel').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  const user = usuarios.find(u => u.celular === cel && u.password === pass);
  if (!user) {
    showToast("Usuario o contraseña incorrectos.", 'error');
    return;
  }

  currentUser = user;
  document.getElementById('userName').textContent = `${user.nombre} ${user.apellido}`;
  document.getElementById('userId').textContent = `C.C ${user.cedula}`;
  // mostrar navegación y menú
  const topNav = document.getElementById('topNav');
  if (topNav) topNav.style.display = 'flex';
  updateUIForAuth();
  saveState();
  showFormSuccess('loginFormSuccess', `Bienvenido ${user.nombre}`);
  setTimeout(() => { goTo('home'); }, 500);
}

// ===== Cerrar sesión =====
function logout() {
  currentUser = null;
  // limpiar info visible
  const userName = document.getElementById('userName');
  const userId = document.getElementById('userId');
  if (userName) userName.textContent = 'Usuario';
  if (userId) userId.textContent = 'C.C XXXXXXXX';

  // ocultar nav/menu
  const topNav = document.getElementById('topNav');
  const menu = document.getElementById('menu');
  if (topNav) topNav.style.display = 'none';
  if (menu) menu.style.display = 'none';

  updateUIForAuth();
  saveState();
  goTo('login');
}

// ===== Actualizar UI según estado de autenticación =====
function updateUIForAuth() {
  const comenzar = document.getElementById('btnComenzar');
  const crear = document.getElementById('btnCrearCuenta');
  const topNav = document.getElementById('topNav');

  if (currentUser) {
    if (comenzar) comenzar.style.display = 'none';
    if (crear) crear.style.display = 'none';
    if (topNav) topNav.style.display = 'flex';
  } else {
    if (comenzar) comenzar.style.display = '';
    if (crear) crear.style.display = '';
    if (topNav) topNav.style.display = 'none';
  }
  // actualizar saldos si aplica
  mostrarSaldos();
}

// ===== Tasas fijas =====
const tasas = {
  COP: { USD: 0.00025, EUR: 0.00023 },
  USD: { COP: 4000, EUR: 0.92 },
  EUR: { COP: 4400, USD: 1.08 }
};

// ===== Conversión =====
function convertCurrency() {
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (!amount || amount <= 0) {
    showToast("Ingrese una cantidad válida.", 'error');
    return;
  }

  const rate = tasas[from] && tasas[from][to];
  if (!rate) {
    showToast('Tasa no disponible para esa conversión.', 'error');
    return;
  }

  const result = amount * rate;
  document.getElementById('result').textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;

  operaciones.push({
    usuario: currentUser ? currentUser.nombre : "Invitado",
    tipo: "Cambio",
    detalle: `${amount} ${from} a ${to} (${result.toFixed(2)})`
  });
  saveState();
  showFormSuccess('converterFormSuccess', `${amount} ${from} = ${result.toFixed(2)} ${to}`);
}

// ===== Transferencia simulada =====
function simularTransferencia() {
  const destino = document.getElementById('destino').value.trim();
  const moneda = document.getElementById('moneda').value;
  const monto = parseFloat(document.getElementById('monto').value);

  if (!destino || !monto) {
    showToast("Completa todos los campos.", 'error');
    return;
  }

  operaciones.push({
    usuario: currentUser ? currentUser.nombre : "Invitado",
    tipo: "Transferencia",
    detalle: `${monto} ${moneda} a ${destino}`
  });

  saveState();
  showFormSuccess('transferFormSuccess', `Transferencia simulada de ${monto} ${moneda} a ${destino}`);
  showToast(`Transferencia simulada de ${monto} ${moneda} a ${destino}`, 'success');
}

// ===== Guardar en archivo TXT =====
function descargarDatos() {
  let contenido = "=== Usuarios Registrados ===\n";
  usuarios.forEach(u => {
    contenido += `${u.nombre} ${u.apellido} - C.C ${u.cedula} - Cel: ${u.celular}\n`;
  });

  contenido += "\n=== Operaciones ===\n";
  operaciones.forEach(o => {
    contenido += `${o.usuario} - ${o.tipo}: ${o.detalle}\n`;
  });

  const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "registro_pido.txt";
  enlace.click();
}

// ===== Atajo para guardar (Ctrl + S) =====
window.addEventListener('keydown', e => {
  if (e.key === 's' && e.ctrlKey) {
    e.preventDefault();
    descargarDatos();
    showToast("Datos guardados en archivo TXT", 'success');
  }
});


// ===== Ver/Ocultar Saldos =====
let saldosVisibles = false;

function mostrarSaldos() {
  if (!currentUser) return;

  const copElement = document.querySelector('#home .grid > div:nth-child(1) p');
  const usdElement = document.querySelector('#home .grid > div:nth-child(2) p');
  const eurElement = document.querySelector('#home .grid > div:nth-child(3) p');

  if (!copElement || !usdElement || !eurElement) return;

  if (saldosVisibles) {
    copElement.innerHTML = `<span class="flag"></span> $${formatNumber(currentUser.saldo.COP)} COP`;
    usdElement.innerHTML = `<span class="flag"></span> $${formatNumber(currentUser.saldo.USD)} USD`;
    eurElement.innerHTML = `<span class="flag"></span> €${formatNumber(currentUser.saldo.EUR)} EUR`;
  } else {
    copElement.innerHTML = `<span class="flag"></span> $*******`;
    usdElement.innerHTML = `<span class="flag"></span> $******`;
    eurElement.innerHTML = `<span class="flag"></span> €*******`;
  }
}

function toggleSaldos() {
  if (!currentUser) {
    showToast('Debes iniciar sesión primero', 'error');
    return;
  }

  saldosVisibles = !saldosVisibles;
  mostrarSaldos();

  const btn = document.getElementById('toggleSaldosBtn');
  if (btn) {
    btn.textContent = saldosVisibles ? 'Ocultar saldos' : 'Ver saldos';
  }
}

function formatNumber(num) {
  try {
    return new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
  } catch (e) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

// ===== Persistencia local =====
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.usuarios, JSON.stringify(usuarios));
    localStorage.setItem(STORAGE_KEYS.operaciones, JSON.stringify(operaciones));
    if (currentUser && currentUser.celular) {
      localStorage.setItem(STORAGE_KEYS.currentUserCel, currentUser.celular);
    } else {
      localStorage.removeItem(STORAGE_KEYS.currentUserCel);
    }
  } catch (e) {
    console.error('Error saving state to localStorage', e);
  }
}

function loadState() {
  try {
    const u = localStorage.getItem(STORAGE_KEYS.usuarios);
    const ops = localStorage.getItem(STORAGE_KEYS.operaciones);
    const curCel = localStorage.getItem(STORAGE_KEYS.currentUserCel);

    if (u) {
      usuarios = JSON.parse(u) || [];
    }
    if (ops) {
      operaciones = JSON.parse(ops) || [];
    }
    if (curCel && usuarios.length) {
      const found = usuarios.find(x => x.celular === curCel);
      if (found) {
        currentUser = found;
        document.getElementById('userName').textContent = `${found.nombre} ${found.apellido}`;
        document.getElementById('userId').textContent = `C.C ${found.cedula}`;
      }
    }
  } catch (e) {
    console.error('Error loading state from localStorage', e);
  }
}

// Cargar estado al inicio
loadState();
if (currentUser) {
  updateUIForAuth();
  goTo('home');
}

// ===== Validación y mensajes inline para formularios =====
function showFormError(containerId, message) {
  try {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
  } catch (e) {
    console.error('showFormError', e);
  }
}

function clearFormError(containerId) {
  try {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.textContent = '';
    el.hidden = true;
  } catch (e) {
    console.error('clearFormError', e);
  }
}

function validateForm(form, containerId) {
  if (!form) return false;
  // clear previous
  clearFormError(containerId);
  // also clear any previous success for this form
  try { const successId = containerId.replace('Error', 'Success'); clearFormSuccess(successId); } catch (e) { }
  const firstInvalid = form.querySelector(':invalid');
  if (!firstInvalid) return true;
  // Prefer custom messages for known fields
  let message = firstInvalid.validationMessage || 'Por favor completa este campo.';
  // Better messages for common cases
  const name = firstInvalid.name || firstInvalid.id || '';
  if (firstInvalid.validity.valueMissing) {
    message = 'Este campo es obligatorio.';
  } else if (firstInvalid.validity.typeMismatch) {
    message = 'Formato inválido.';
  } else if (firstInvalid.validity.tooShort) {
    message = `Valor demasiado corto (mínimo ${firstInvalid.minLength}).`;
  } else if (firstInvalid.validity.rangeUnderflow) {
    message = `Valor mínimo ${firstInvalid.min}.`;
  }

  showFormError(containerId, message);
  // focus elemento inválido
  try { firstInvalid.focus(); } catch (e) { }
  return false;
}

// ===== Mensajes de éxito inline =====
function showFormSuccess(containerId, message, duration = 3000) {
  try {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    if (el._hideTimeout) clearTimeout(el._hideTimeout);
    el._hideTimeout = setTimeout(() => { el.hidden = true; el.textContent = ''; }, duration);
  } catch (e) { console.error('showFormSuccess', e); }
}

function clearFormSuccess(containerId) {
  try {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (el._hideTimeout) clearTimeout(el._hideTimeout);
    el.textContent = '';
    el.hidden = true;
  } catch (e) { console.error('clearFormSuccess', e); }
}

// ===== Inicializar manejadores de eventos (refactor de onclick inline) =====
function initEventHandlers() {
  // Navegación superior
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = btn.dataset.target;
      if (target) goTo(target);
    });
  });

  // Hero buttons
  const btnComenzar = document.getElementById('btnComenzar');
  if (btnComenzar) btnComenzar.addEventListener('click', () => goTo('login'));
  const btnCrearCuenta = document.getElementById('btnCrearCuenta');
  if (btnCrearCuenta) btnCrearCuenta.addEventListener('click', () => goTo('register'));

  // Login / registro
  // Login / registro (usar submit de formularios)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', (e) => { e.preventDefault(); if (validateForm(loginForm, 'loginFormError')) login(); });
  const toRegisterBtn = document.getElementById('toRegisterBtn');
  if (toRegisterBtn) toRegisterBtn.addEventListener('click', () => goTo('register'));

  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.addEventListener('submit', (e) => { e.preventDefault(); if (validateForm(registerForm, 'registerFormError')) registerUser(); });
  const toLoginBtn = document.getElementById('toLoginBtn');
  if (toLoginBtn) toLoginBtn.addEventListener('click', () => goTo('login'));

  // Home quick actions
  const toConverterBtn = document.getElementById('toConverterBtn');
  if (toConverterBtn) toConverterBtn.addEventListener('click', () => goTo('converter'));
  const toTransferBtn = document.getElementById('toTransferBtn');
  if (toTransferBtn) toTransferBtn.addEventListener('click', () => goTo('transfer'));

  // Toggle saldos (botón en Home)
  const toggleSaldosBtn = document.getElementById('toggleSaldosBtn');
  if (toggleSaldosBtn) toggleSaldosBtn.addEventListener('click', toggleSaldos);

  // Converter / Transfer actions
  const converterForm = document.getElementById('converterForm');
  if (converterForm) converterForm.addEventListener('submit', (e) => { e.preventDefault(); if (validateForm(converterForm, 'converterFormError')) convertCurrency(); });
  const transferForm = document.getElementById('transferForm');
  if (transferForm) transferForm.addEventListener('submit', (e) => { e.preventDefault(); if (validateForm(transferForm, 'transferFormError')) simularTransferencia(); });

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
}

document.addEventListener('DOMContentLoaded', initEventHandlers);
// In case script loaded after DOM ready
initEventHandlers();
