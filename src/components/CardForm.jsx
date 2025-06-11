// src/components/CardForm.jsx
import { useState } from 'react';
import DashboardFooter from './DashboardFooter';

export default function CardForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Acá iría la lógica para enviar al backend
        setSuccess(true);
        setCardNumber('');
        setExpiry('');
        setCvc('');
        setTimeout(() => setSuccess(false), 2500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-dark">
            {/* Contenido principal centrado */}
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="bg-blue-mid border border-blue-accent rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-blue-accent text-center mb-6">
                        Agregar Tarjeta
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-blue-accent font-semibold">Número de tarjeta</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1 placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                                placeholder="XXXX XXXX XXXX XXXX"
                                required
                                maxLength={19}
                                pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}"
                                inputMode="numeric"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="text-sm text-blue-accent font-semibold">Vencimiento</label>
                                <input
                                    type="text"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1 placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                                    placeholder="MM/AA"
                                    required
                                    maxLength={5}
                                    pattern="\d{2}/\d{2}"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="text-sm text-blue-accent font-semibold">CVC</label>
                                <input
                                    type="text"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1 placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                                    placeholder="123"
                                    required
                                    maxLength={4}
                                    pattern="\d{3,4}"
                                />
                            </div>
                        </div>
                        {success && (
                            <p className="text-green-400 text-center text-sm">¡Tarjeta guardada correctamente!</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-accent text-blue-dark py-2 rounded-lg font-semibold hover:bg-blue-light transition"
                        >
                            Guardar Tarjeta
                        </button>
                    </form>
                </div>
            </div>
            {/* Footer SIEMPRE abajo */}
            <div className="w-full px-4 py-4 border-t border-blue-accent bg-blue-mid">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
