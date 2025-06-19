import { useState } from 'react';

const serviceLabels = {
    SUBE: { label: 'SUBE', placeholder: 'Número de SUBE' },
    CELULAR: { label: 'Celular', placeholder: 'Número de celular' },
    STEAM: { label: 'Steam', placeholder: 'Email de Steam' },
};

export default function ServiceRechargeModal({
    open,
    onClose,
    serviceType,
    onSubmit,
    loading,
    error
}) {
    const [amount, setAmount] = useState('');
    const [destination, setDestination] = useState('');

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !destination) {
            setError('Completa todos los campos');
            return;
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            setError('Monto inválido');
            return;
        }
        await onSubmit({
            type: serviceType,
            amount: Number(amount),
            destination: destination,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-blue-mid border border-blue-accent p-6 rounded-xl max-w-sm w-full shadow-lg relative">
                <button className="absolute top-3 right-4 text-blue-accent text-2xl" onClick={onClose}>&times;</button>
                <h4 className="text-blue-accent text-lg font-semibold mb-4 text-center">
                    Cargar {serviceLabels[serviceType]?.label}
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-blue-accent text-sm mb-1">
                            {serviceLabels[serviceType]?.placeholder}
                        </label>
                        <input
                            className="w-full rounded-md p-2 border border-blue-accent bg-blue-dark text-white outline-none"
                            type="text"
                            value={destination}
                            onChange={e => setDestination(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-blue-accent text-sm mb-1">
                            Monto
                        </label>
                        <input
                            className="w-full rounded-md p-2 border border-blue-accent bg-blue-dark text-white outline-none"
                            type="number"
                            step="1"
                            min="1"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-red-400 text-sm">{error}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-profit text-white rounded-md py-2 font-semibold hover:bg-green-600 transition"
                    >
                        {loading ? 'Cargando...' : 'Confirmar recarga'}
                    </button>
                </form>
            </div>
        </div>
    );
}

