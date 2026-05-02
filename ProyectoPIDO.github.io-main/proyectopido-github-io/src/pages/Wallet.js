import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

function Wallet() {

    const [wallet, setWallet] = useState({
        USD: 0,
        EUR: 0,
        GBP: 0
    });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("wallet"));

        if (data) {
            setWallet(data);
        } else {
            // calores iniciales si no existe nada
            const initial = {
                USD: 1000,
                EUR: 1000,
                GBP: 1000
            };
            localStorage.setItem("wallet", JSON.stringify(initial));
            setWallet(initial);
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <main className="flex-1 p-6 md:p-10">

                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Billetera</h1>
                    <p className="text-slate-500 mt-2">
                        Gestiona tus saldos en diferentes divisas
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* cop */}
                    <div className="bg-white p-4 rounded-lg shadow border">
                        <p className="text-sm text-slate-500">COP</p>
                        <h2 className="text-2xl font-bold">
                            ${wallet.COP?.toLocaleString() || 0}
                        </h2>
                    </div>
                    
                    {/* dolares */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">USD</p>
                        <h2 className="text-2xl font-bold mt-2">${wallet.USD.toFixed(2)}</h2>
                    </div>

                    {/* eurios */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">EUR</p>
                        <h2 className="text-2xl font-bold mt-2">€{wallet.EUR.toFixed(2)}</h2>
                    </div>

                    {/* libras esterlinas */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <p className="text-sm text-slate-500">GBP</p>
                        <h2 className="text-2xl font-bold mt-2">£{wallet.GBP.toFixed(2)}</h2>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default Wallet;
