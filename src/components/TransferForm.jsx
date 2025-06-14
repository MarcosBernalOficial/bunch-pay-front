import { useState } from 'react';
import DashboardFooter from './DashboardFooter'; // Importá tu footer

export default function TransferForm() {
    const [formData, setFormData] = useState({
        toAliasOrCvu: '',
        amount: '',
        description: ''
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Cambia '/transfer' por la ruta que corresponda si hace falta
            await api.post('/transfer', formData);
            setSuccess(true);
            setFormData({ toAliasOrCvu: '', amount: '', description: '' });
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('No se pudo realizar la transferencia.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-dark justify-between">
            <div className="flex-grow flex items-center justify-center p-4">
                <form 
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-blue-mid rounded-2xl p-8 shadow-xl border border-blue-accent space-y-6"
                >
                    <h2 className="text-2xl font-bold text-center text-blue-accent mb-4">Transferir dinero</h2>
                    
                    <div>
                        <label className="text-sm text-blue-accent font-semibold">Alias o CVU del destinatario</label>
                        <input
                            type="text"
                            name="toAliasOrCvu"
                            value={formData.toAliasOrCvu}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-lg border border-blue-accent bg-blue-dark text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                            placeholder="Ej: marcos.bunchpay.001 o 00011223344556677889900"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm text-blue-accent font-semibold">Monto</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-lg border border-blue-accent bg-blue-dark text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                            placeholder="Ej: 1500"
                            required
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-blue-accent font-semibold">Descripción (opcional)</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-lg border border-blue-accent bg-blue-dark text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                            placeholder="Ej: Regalo cumpleaños"
                        />
                    </div>

                    {error && <p className="text-red-400 text-center text-sm">{error}</p>}
                    {success && <p className="text-green-400 text-center text-sm">Transferencia realizada ✅</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-accent text-blue-dark py-2 mt-2 rounded-lg font-semibold hover:bg-blue-light transition"
                    >
                        Enviar
                    </button>
                </form>
            </div>
            
            {/* Footer */}
            <div className="w-full px-4 py-4 border-t border-blue-accent bg-blue-mid">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
