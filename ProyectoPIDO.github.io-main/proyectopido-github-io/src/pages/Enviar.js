import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function Enviar() {
    const [formData, setFormData] = useState({
        recipient: 'Sarah Jenkins',
        amount: '150.00',
        currency: 'USD',
        concept: '',
        wallet: 'principal'
    });

    const [selectedContact, setSelectedContact] = useState('Sarah Jenkins');

    const contacts = [
        { name: 'Sarah J.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBia20UNdwXAg5WG8eBr2U7qLETajbcsAMTgsDQZxn6ZVQPmNHM-JEc3qgfJozKF2OSipQKhyFdy8k_YTdsUjGMlkUlGTayqnH8sW8FWyWgRP6UnwL26l6HrixlXocUiIoEU2MAaXP25ZFTDPTPXuby9Z20k9AacDvpUMxxDr6rL6qJ5DodMcCOBK55N5KNf8QO3GHtccm_OQeDq1CAtV9FJowDtpkrOQvelJRKj9-s6BX6akB-ePPTiik5Oys9d1JKhBSaTa8HHEI9' },
        { name: 'Michael R.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmLM6P7ZAzceq3TxzS2QU1558P9YZ5P0Ri8QWDmsG_jbovlbFXh4omOAKSSGHMEkgmdvHJejSe3ld26-E2aFZLSiRWL8bX2WhIzmb4NATjnmHRy5x9CtP_H8w2chwM-WboVD4cAyIbNyerzTDsvwX07g_ysbfXPu_N13w4AdPyzGSCanOieWeR1v-BrKAIJvXYE6vIlV_Ixy5bmD0Apvkf6uRi2uX0pexK-GVmPxK12GEL4Cqv3FCXNiHr6Rat1Pmal0i91jZqoJHV' },
        { name: 'Alex K.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfmpz-CFXVHQqejoko2FcXYtXl6HuwmjFUwwNAfgLJN2ehTDCWsvwwOB9g25fSZIxMhqAfVZ7dxx1DYyhe5RmGp_D_94RGIJopLUkkF8OBiq6hBbjZ0opHfmMNCc2qKEScTCISVWUYwkCU7Thz3_vZzCDFBwIYWHhWXSi4GN6kCcE7RZvZuRhj5OlpwrVua503046sujc3U3okL_7TdZtsxeFwC9K-wJ_WERZnWt9w38STmoJ0snhdQ4k7xXjwtoX5A8e3PD5aLuVD' },
        { name: 'David W.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAbwk55Ibpcwcsj3H2Ns54s_rNAlP7Ag6eSXi2YOeDvx1aDYhsoMi89yCX8m-5XErPm_gGG52vtj80g7JegR4IWVAi30GHHFbyh55dbUEa-325Rpfd9mkDgl2rig5nP-n-6TJsUrGjQYzYxm1DYJdat1UWPN8yO5dIRBzmG1PHvPztgK28z4S5URj1XCJqzHdkBSb18NXeL3o-wL1yb4a01vjCJ9c-r2RDIBosl7EGFerwy-wF72YEsejTVJ_4XCnRkZRdE256nzyn' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContactSelect = (contactName) => {
        setSelectedContact(contactName);
        setFormData(prev => ({ ...prev, recipient: contactName }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Transferencia enviada exitosamente');
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />

            <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-10">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <header className="mb-10">
                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Enviar Dinero</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Transfiere fondos al instante a cualquier usuario de PIDO en todo el mundo.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left Column: Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* 1. Contact Selection */}
                            <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="flex items-center justify-center size-8 rounded-full bg-purple-600/10 text-purple-600 text-sm font-bold">1</span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Elegir Contacto</h3>
                                </div>
                                <div className="relative mb-8">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                    <input
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                                        placeholder="Buscar por nombre, correo o teléfono"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-5">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Contactos Recientes</p>
                                    <div className="flex flex-wrap gap-8">
                                        {contacts.map((contact, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleContactSelect(contact.name.split(' ')[0])}
                                                className="flex flex-col items-center gap-3 group"
                                            >
                                                <div className={selectedContact === contact.name.split(' ')[0] ? "size-16 rounded-full ring-4 ring-purple-600 ring-offset-4 dark:ring-offset-slate-900 transition-all" : "size-16 rounded-full ring-0 ring-purple-600/20 ring-offset-0 transition-all hover:ring-4 hover:ring-offset-4 dark:hover:ring-offset-slate-900"}>
                                                    <img
                                                        className="w-full h-full rounded-full object-cover"
                                                        src={contact.image}
                                                        alt={contact.name}
                                                    />
                                                </div>
                                                <span className={selectedContact === contact.name.split(' ')[0] ? "text-xs font-bold text-purple-600" : "text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-purple-600"}>
                                                    {contact.name}
                                                </span>
                                            </button>
                                        ))}
                                        <button className="flex flex-col items-center justify-center gap-3 group">
                                            <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-600/10 transition-all border-2 border-dashed border-slate-200 dark:border-slate-700">
                                                <span className="material-symbols-outlined">add</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Ver más</span>
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Transfer Details */}
                            <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="flex items-center justify-center size-8 rounded-full bg-purple-600/10 text-purple-600 text-sm font-bold">2</span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Detalles de la Transferencia</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Amount Input */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Monto a Enviar</label>
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex-1">
                                                <input
                                                    className="w-full pl-6 pr-16 py-5 text-3xl font-bold rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                                                    type="number"
                                                    name="amount"
                                                    value={formData.amount}
                                                    onChange={handleChange}
                                                    step="0.01"
                                                />
                                                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-slate-400">{formData.currency}</span>
                                            </div>
                                            <div className="w-36">
                                                <div className="relative">
                                                    <select
                                                        className="w-full py-5 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none appearance-none cursor-pointer font-bold"
                                                        name="currency"
                                                        value={formData.currency}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="USD">USD</option>
                                                        <option value="EUR">EUR</option>
                                                        <option value="GBP">GBP</option>
                                                        <option value="BTC">BTC</option>
                                                    </select>
                                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Wallet Selection */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Seleccionar Billetera</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className="relative flex items-center p-5 border-2 border-purple-600 bg-purple-600/5 rounded-2xl cursor-pointer group transition-all">
                                                <input
                                                    checked={formData.wallet === 'principal'}
                                                    onChange={() => setFormData(prev => ({ ...prev, wallet: 'principal' }))}
                                                    className="sr-only"
                                                    name="wallet"
                                                    type="radio"
                                                />
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-purple-600/20 p-3 rounded-xl text-purple-600">
                                                        <span className="material-symbols-outlined">payments</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Billetera Principal</p>
                                                        <p className="text-xs text-slate-500 font-medium">$12,450.00 disponible</p>
                                                    </div>
                                                </div>
                                                <div className="ml-auto text-purple-600">
                                                    <span className="material-symbols-outlined">check_circle</span>
                                                </div>
                                            </label>
                                            <label className="relative flex items-center p-5 border border-slate-200 dark:border-slate-700 hover:border-purple-600/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-2xl cursor-pointer transition-all">
                                                <input
                                                    checked={formData.wallet === 'ahorros'}
                                                    onChange={() => setFormData(prev => ({ ...prev, wallet: 'ahorros' }))}
                                                    className="sr-only"
                                                    name="wallet"
                                                    type="radio"
                                                />
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-500">
                                                        <span className="material-symbols-outlined">savings</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Cuenta de Ahorros</p>
                                                        <p className="text-xs text-slate-500 font-medium">$8,110.50 disponible</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Concept Input */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Concepto (Opcional)</label>
                                        <textarea
                                            className="w-full p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none resize-none transition-all"
                                            placeholder="¿Cuál es el motivo de este envío?"
                                            rows="2"
                                            name="concept"
                                            value={formData.concept}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                            </section>
                        </div>

                        {/* Right Column: Summary */}
                        <div className="space-y-8">
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 sticky top-10">
                                <h3 className="text-xl font-bold mb-8 text-slate-900 dark:text-white">Resumen del Envío</h3>
                                <div className="space-y-5 mb-10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Destinatario</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.recipient}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Monto</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">${formData.amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Comisión</span>
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Gratis</span>
                                    </div>
                                    <div className="pt-5 mt-2 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">Total a Debitar</span>
                                            <span className="text-3xl font-black text-purple-600">${formData.amount}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-purple-600/25 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
                                    >
                                        <span className="text-base">Continuar</span>
                                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                    </button>
                                    <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 leading-relaxed px-2">
                                        Al continuar, aceptas los Términos y Condiciones de Transferencia de PIDO. Los envíos suelen ser instantáneos.
                                    </p>
                                </div>

                                {/* Info Alert */}
                                <div className="mt-10 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20 flex gap-4">
                                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 text-sm mt-0.5">warning</span>
                                    <p className="text-[11px] text-amber-800 dark:text-amber-400 font-medium leading-normal">
                                        Verifica siempre los datos. Los envíos entre usuarios de PIDO son irreversibles una vez confirmados.
                                    </p>
                                </div>
                            </div>

                            {/* Security Message */}
                            <div className="flex items-center justify-center gap-2.5 text-slate-400/70 dark:text-slate-600">
                                <span className="material-symbols-outlined text-lg">verified_user</span>
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Cifrado de extremo a extremo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Enviar;
