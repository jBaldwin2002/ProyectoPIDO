import { Link, useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        alert("Sesión cerrada");
        navigate("/");
    };

    return (
        <aside className="w-64 border-r border-slate-200 bg-white hidden lg:flex flex-col sticky top-0 h-screen">
            
            {/* LOGO */}
            <div className="p-6 flex items-center gap-2">
                <img src="/LOGO-PIDO.png" alt="PIDO" className="w-10 h-10 rounded-lg" />
                <h1 className="text-xl font-bold text-purple-600">PIDO</h1>
            </div>

            {/* MENU */}
            <nav className="flex-1 px-4 py-4 space-y-1">

                {/* DASHBOARD */}
                <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
                        isActive('/dashboard')
                            ? 'bg-purple-600/10 text-purple-600'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <span className="material-symbols-outlined">home</span>
                    <span>Inicio</span>
                </Link>

                {/* WALLET */}
                <Link
                    to="/wallet"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
                        isActive('/wallet')
                            ? 'bg-purple-600/10 text-purple-600'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                    <span>Billetera</span>
                </Link>

                {/* INTERCAMBIO 💱 */}
                <Link
                    to="/intercambio"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
                        isActive('/intercambio')
                            ? 'bg-purple-600/10 text-purple-600'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <span className="material-symbols-outlined">currency_exchange</span>
                    <span>Intercambio</span>
                </Link>

                {/* HISTORIAL */}
                <Link
                    to="/historial"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
                        isActive('/historial')
                            ? 'bg-purple-600/10 text-purple-600'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <span className="material-symbols-outlined">history</span>
                    <span>Historial</span>
                </Link>

                {/* ENVIAR */}
                <Link
                    to="/enviar"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
                        isActive('/enviar')
                            ? 'bg-purple-600/10 text-purple-600'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <span className="material-symbols-outlined">send</span>
                    <span>Enviar</span>
                </Link>

            </nav>

            {/* BOTONES ABAJO */}
            <div className="p-4 border-t border-slate-200 space-y-2">

                <button
                    className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                    Nueva Transacción
                </button>

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                    Cerrar sesión
                </button>

            </div>
        </aside>
    );
}

export default Sidebar;
