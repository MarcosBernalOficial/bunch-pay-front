import { useEffect, useState } from 'react';
import api from '../utils/api';
import DashboardFooter from './DashboardFooter';

const typeLabels = {
    DEPOSITO: "Depósito",
    RETIRO: "Retiro",
    PAGO: "Pago",
    TRANSFERENCIA: "Transferencia",
};

export default function Movimientos() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/transactions/viewAll')
            .then(res => {
                setTransactions(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('No se pudieron cargar los movimientos.');
                setLoading(false);
                console.error(err);
            });
    }, []);

    function isExpense(tx) {
        if (tx.type === "RETIRO" || tx.type === "PAGO") return true;
        if (tx.type === "DEPOSITO") return false;
        if (tx.type === "TRANSFERENCIA" && tx.description === "Envio") return true;
        if (tx.type === "TRANSFERENCIA" && tx.description === "Recibido") return false;
        return true;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-blue-dark justify-between">
                <div className="flex-grow p-4 max-w-2xl mx-auto w-full flex items-center justify-center">
                    <p className="text-blue-200 text-center text-lg animate-pulse">Cargando movimientos...</p>
                </div>
                <DashboardFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-blue-dark justify-between">
            <div className="flex-grow p-4 max-w-2xl mx-auto w-full mb-16">
                <h2 className="text-2xl font-bold text-blue-accent text-center mb-6">Movimientos</h2>

                {loading && <p className="text-blue-200 text-center">Cargando movimientos...</p>}
                {error && <p className="text-red-400 text-center">{error}</p>}
                {!loading && !error && transactions.length === 0 && (
                    <p className="text-blue-200 text-center">No hay movimientos registrados.</p>
                )}
                <div className="space-y-4">
                    {transactions
                    .slice()
                    .reverse()
                    .map(tx => (
                        <div
                            key={tx.id || `${tx.type}-${tx.date}-${tx.amount}`}
                            className="bg-blue-mid border border-blue-accent rounded-xl p-4 shadow transition hover:scale-[1.01]"
                        >
                            <div className="flex justify-between text-sm text-blue-200 mb-1">
                                <span>{new Date(tx.date).toLocaleDateString('es-AR')}</span>
                                <span>{typeLabels[tx.type] || tx.type}</span>
                            </div>
                            <div className={`text-lg font-semibold ${isExpense(tx) ? 'text-red-400' : 'text-green-profit'}`}>
                                {isExpense(tx) ? '-' : '+'}
                                {tx.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                            </div>
                            <div className="text-blue-100 text-sm mt-1">
                                {tx.description || 'Sin descripción'}
                            </div>
                            <div className="text-blue-300 text-sm mt-1">
                                {tx.targetAliasOrCvu && `A: ${tx.targetAliasOrCvu}`}
                                {tx.originAliasOrCvu && `De: ${tx.originAliasOrCvu}`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full px-4 py-4 border-t border-blue-accent bg-blue-mid">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
