import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

function Intercambio() {

    const [fromCurrency, setFromCurrency] = useState('COP');
    const [toCurrency, setToCurrency] = useState('USD');
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);

    const [mensaje, setMensaje] = useState("");
    const [wallet, setWallet] = useState({});

    // 🔥 Tasas con COP
    const rates = {
        USD: { EUR: 0.92, GBP: 0.78, COP: 4000 },
        EUR: { USD: 1.08, GBP: 0.85, COP: 4300 },
        GBP: { USD: 1.28, EUR: 1.17, COP: 5100 },
        COP: { USD: 0.00025, EUR: 0.00023, GBP: 0.00020 }
    };

    // 🔥 Inicializar wallet
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("wallet"));

        if (!data) {
            data = {
                COP: 500000,
                USD: 0,
                EUR: 0,
                GBP: 0
            };
            localStorage.setItem("wallet", JSON.stringify(data));
        }

        setWallet(data);
    }, []);

    // ✅ Validación monto
    const handleChangeAmount = (value) => {

        if (!value || value <= 0) {
            setFromAmount(0);
            setToAmount(0);
            return;
        }

        setFromAmount(value);

        if (rates[fromCurrency][toCurrency]) {
            const result = value * rates[fromCurrency][toCurrency];
            setToAmount(Number(result.toFixed(2)));
        }
    };

    // 🔁 Swap
    const handleSwap = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    // 💱 Intercambio
    const handleExchange = () => {

        if (fromCurrency === toCurrency) {
            setMensaje("⚠️ Selecciona monedas diferentes");
            setTimeout(() => setMensaje(""), 3000);
            return;
        }

        const currentWallet = JSON.parse(localStorage.getItem("wallet"));

        if (currentWallet[fromCurrency] < fromAmount) {
            setMensaje("❌ Saldo insuficiente");
            setTimeout(() => setMensaje(""), 3000);
            return;
        }

        currentWallet[fromCurrency] -= fromAmount;
        currentWallet[toCurrency] += parseFloat(toAmount);

        localStorage.setItem("wallet", JSON.stringify(currentWallet));
        setWallet(currentWallet);

        // Guardar historial
        const nuevaTransaccion = {
            tipo: "Intercambio",
            from: fromCurrency,
            to: toCurrency,
            amount: fromAmount,
            result: toAmount,
            fecha: new Date().toLocaleString()
        };

        const historial = JSON.parse(localStorage.getItem("historial")) || [];
        historial.push(nuevaTransaccion);
        localStorage.setItem("historial", JSON.stringify(historial));

        setMensaje(`✅ Convertiste ${fromAmount} ${fromCurrency} a ${toAmount} ${toCurrency}`);
        setTimeout(() => setMensaje(""), 3000);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <main className="flex-1 p-6 md:p-10 flex justify-center">

                <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow border">

                    <h1 className="text-2xl font-bold mb-6">Intercambio de Divisas</h1>

                    {/* FROM */}
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Desde</label>

                        <p className="text-xs text-slate-500 mb-1">
                            Saldo disponible: {wallet[fromCurrency]?.toLocaleString() || 0}
                        </p>

                        <div className="flex gap-2">
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="COP">🇨🇴 COP</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>

                            <input
                                type="number"
                                placeholder="Ingresa monto"
                                value={fromAmount}
                                onChange={(e) => handleChangeAmount(parseFloat(e.target.value))}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                    </div>

                    {/* SWAP */}
                    <div className="text-center mb-4">
                        <button
                            onClick={handleSwap}
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            Cambiar ⇅
                        </button>
                    </div>

                    {/* TO */}
                    <div className="mb-6">
                        <label className="block text-sm mb-1">A</label>
                        <div className="flex gap-2">
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="COP">🇨🇴 COP</option>
                            </select>

                            <input
                                type="number"
                                value={toAmount}
                                readOnly
                                className="border p-2 rounded w-full bg-gray-100"
                            />
                        </div>
                    </div>

                    {/* BOTÓN */}
                    <button
                        onClick={handleExchange}
                        disabled={fromAmount <= 0}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
                    >
                        Intercambiar
                    </button>

                    {/* MENSAJE */}
                    {mensaje && (
                        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                            {mensaje}
                        </div>
                    )}

                </div>

            </main>
        </div>
    );
}

export default Intercambio;
