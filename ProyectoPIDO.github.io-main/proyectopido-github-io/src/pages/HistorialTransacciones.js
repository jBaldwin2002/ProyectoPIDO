import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

function HistorialTransacciones() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("historial")) || [];

        const formatted = data.map((t, index) => ({
            id: index,
            type: 'Intercambio',
            amount: `${t.amount} ${t.from} → ${t.result} ${t.to}`,
            date: t.fecha,
            status: 'Completada',
            icon: 'swap_horiz',
            color: 'text-purple-600'
        }));

        setTransactions(formatted.reverse()); // últimas primero
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0">

                {/* encabezado */}
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Historial de Transacciones</h2>
                </header>

                {/* contenido */}
                <div className="p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto">

                    {/* si no hay datos que salga */}
                    {transactions.length === 0 ? (
                        <div className="text-center text-slate-500">
                            No hay transacciones aún 🚫
                        </div>
                    ) : (

                        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-sm font-semibold">Tipo</th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold">Monto</th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold">Fecha</th>
                                        <th className="text-left px-6 py-3 text-sm font-semibold">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg bg-slate-100 ${tx.color}`}>
                                                        <span className="material-symbols-outlined text-lg">{tx.icon}</span>
                                                    </div>
                                                    <span className="font-medium">{tx.type}</span>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 text-sm font-bold ${tx.color}`}>
                                                {tx.amount}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {tx.date}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    {tx.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )}
                </div>
            </main>
        </div>
    );
}

export default HistorialTransacciones;
