import { useState, useEffect } from 'react';
import DashboardFooter from './DashboardFooter';
import api from '../utils/api';

export default function CardForm() {
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        api.get('/cards/my-card')
            .then(res => {
                setCard(res.data || null);
                setLoading(false);
            })
            .catch(() => {
                setError('No se pudo cargar la tarjeta');
                setLoading(false);
            });
    }, []);
    const formatExpiry = (expirationDate) => {
        if (!expirationDate) return '';
        const [year, month] = expirationDate.split('-');
        return `${month}/${year.slice(-2)}`;
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-dark">
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="bg-blue-mid border border-blue-accent rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-blue-accent text-center mb-6">
                        Mis datos de Tarjeta
                    </h2>
                    {loading ? (
                        <p className="text-blue-200 text-center">Cargando datos de la tarjeta...</p>
                    ) : error ? (
                        <p className="text-red-400 text-center">{error}</p>
                    ) : !card ? (
                        <p className="text-blue-200 text-center">No tenés ninguna tarjeta cargada.</p>
                    ) : (
                        <div className="space-y-5">
                            <div>
                                <span className="text-sm text-blue-accent font-semibold">Titular:</span>
                                <div className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1 select-all">
                                    {card.cardHolderName}
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-blue-accent font-semibold">Número de tarjeta:</span>
                                <div className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1 select-all tracking-widest">
                                    {card.cardNumber}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <span className="text-sm text-blue-accent font-semibold">Vencimiento:</span>
                                    <div className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1">
                                        {formatExpiry(card.expirationDate)}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <span className="text-sm text-blue-accent font-semibold">CVC:</span>
                                    <div className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1">
                                        {card.cvv}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
