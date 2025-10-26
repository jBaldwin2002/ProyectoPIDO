// ===== Variables globales =====
let usuarios = [];
let operaciones = [];
let currentUser = null;

// ===== Función para cambiar de pantalla =====
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  document.getElementById('menu').style.display =
    (screenId === 'login' || screenId === 'register') ? 'none' : 'flex';
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
  goTo('home');
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
