import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

function Dashboard() {

    const [wallet, setWallet] = useState({});
    const [historial, setHistorial] = useState([]);

    useEffect(() => {

        let dataWallet = JSON.parse(localStorage.getItem("wallet"));
        let dataHistorial = JSON.parse(localStorage.getItem("historial")) || [];

        // tnicializador del wallet si no existe
        if (!dataWallet) {
            dataWallet = {
                COP: 500000,
                USD: 0,
                EUR: 0,
                GBP: 0
            };
            localStorage.setItem("wallet", JSON.stringify(dataWallet));
        }

        setWallet(dataWallet);
        setHistorial(dataHistorial);

    }, []);

    // total en COP
    const total =
        (wallet.COP || 0) +
        (wallet.USD || 0) * 4000 +
        (wallet.EUR || 0) * 4300 +
        (wallet.GBP || 0) * 5100;

    return (
        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 space-y-6">

                {/* encabezadito */}
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-slate-500">Resumen general de tu cuenta</p>
                </div>

                {/* tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* el saldo en total */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">Saldo Total (COP)</p>
                        <h2 className="text-3xl font-bold">
                            ${total.toLocaleString()}
                        </h2>
                    </div>

                    {/* transacciones */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">Transacciones</p>
                        <h2 className="text-3xl font-bold">
                            {historial.length}
                        </h2>
                    </div>

                    {/* moneda pricipal de la cuenta q es cOP */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">Moneda Principal</p>
                        <h2 className="text-3xl font-bold">
                            COP 🇨🇴
                        </h2>
                    </div>

                </div>

                {/* el pequeño resumen */}
                <div className="bg-white p-6 rounded-xl shadow border">
                    <h3 className="text-lg font-bold mb-4">Resumen de Wallet</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        <div>
                            <p className="text-sm text-slate-500">COP</p>
                            <p className="font-bold">${wallet.COP?.toLocaleString() || 0}</p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">USD</p>
                            <p className="font-bold">${wallet.USD || 0}</p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">EUR</p>
                            <p className="font-bold">${wallet.EUR || 0}</p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">GBP</p>
                            <p className="font-bold">${wallet.GBP || 0}</p>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;
