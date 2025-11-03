// ===== Variables globales =====
let usuarios = [];
let operaciones = [];
let currentUser = null;

// ===== Función para cambiar de pantalla =====
function goTo(screenId) {
  // pantallas que requieren autenticación
  const protectedScreens = ['home', 'converter', 'transfer'];

  if (protectedScreens.includes(screenId) && !currentUser) {
    alert('Debes iniciar sesión para acceder a esa sección.');
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
    alert("Por favor completa todos los campos.");
    return;
  }

  const nuevo = { nombre, apellido, celular, cedula, password, saldo: { COP: 1000000, USD: 500, EUR: 400 } };
  usuarios.push(nuevo);
  alert("Usuario registrado con éxito.");
  goTo('login');
}

// ===== Login de usuario =====
function login() {
  const cel = document.getElementById('loginCel').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  const user = usuarios.find(u => u.celular === cel && u.password === pass);
  if (!user) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  currentUser = user;
  document.getElementById('userName').textContent = `${user.nombre} ${user.apellido}`;
  document.getElementById('userId').textContent = `C.C ${user.cedula}`;
  // mostrar navegación y menú
  const topNav = document.getElementById('topNav');
  if (topNav) topNav.style.display = 'flex';
  updateUIForAuth();
  goTo('home');
}

// ===== Cerrar sesión =====
function logout(){
  currentUser = null;
  // limpiar info visible
  const userName = document.getElementById('userName');
  const userId = document.getElementById('userId');
  if(userName) userName.textContent = 'Usuario';
  if(userId) userId.textContent = 'C.C XXXXXXXX';

  // ocultar nav/menu
  const topNav = document.getElementById('topNav');
  const menu = document.getElementById('menu');
  if (topNav) topNav.style.display = 'none';
  if (menu) menu.style.display = 'none';

  updateUIForAuth();
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
    alert("Ingrese una cantidad válida.");
    return;
  }

  const rate = tasas[from][to];
  const result = amount * rate;
  document.getElementById('result').textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;

  operaciones.push({
    usuario: currentUser ? currentUser.nombre : "Invitado",
    tipo: "Cambio",
    detalle: `${amount} ${from} a ${to} (${result.toFixed(2)})`
  });
}

// ===== Transferencia simulada =====
function simularTransferencia() {
  const destino = document.getElementById('destino').value.trim();
  const moneda = document.getElementById('moneda').value;
  const monto = parseFloat(document.getElementById('monto').value);

  if (!destino || !monto) {
    alert("Completa todos los campos.");
    return;
  }

  operaciones.push({
    usuario: currentUser ? currentUser.nombre : "Invitado",
    tipo: "Transferencia",
    detalle: `${monto} ${moneda} a ${destino}`
  });

  alert(`Transferencia simulada de ${monto} ${moneda} a ${destino}`);
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
    alert("Datos guardados en archivo TXT");
  }
});
