import Sidebar from '../components/Sidebar';

function Dashboard() {
    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Contenido principal */}
            <main className="flex-1 p-6 md:p-10">

                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-slate-500 mt-2">
                        Bienvenido a PIDO - Plataforma de Intercambio de Divisas
                    </p>
                </header>

                {/* Tarjetas principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Saldo */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">Saldo Total</p>
                        <h2 className="text-2xl font-bold mt-2">$12,450.00</h2>
                    </div>

                    {/* Intercambios */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">Intercambios Hoy</p>
                        <h2 className="text-2xl font-bold mt-2">5</h2>
                    </div>

                    {/* Actividad */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">Actividad Reciente</p>
                        <h2 className="text-2xl font-bold mt-2">Activa</h2>
                    </div>

                </div>

                {/* Sección adicional */}
                <div className="mt-10 bg-white p-6 rounded-xl shadow border">
                    <h3 className="text-lg font-bold mb-4">Resumen</h3>
                    <p className="text-slate-500">
                        Desde aquí puedes gestionar tus divisas, realizar intercambios y revisar tu historial de transacciones en tiempo real.
                    </p>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;