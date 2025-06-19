import { useEffect, useState } from "react";
import api from "../utils/api";
import DashboardFooter from "./DashboardFooter";

export default function CryptoPrices() {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/api/crypto/prices")
            .then(res => {
                setPrices(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("No se pudieron cargar los precios.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-blue-dark flex flex-col justify-between">
            <div className="flex-grow flex flex-col items-center py-8">
                <h2 className="text-2xl font-bold text-blue-accent mb-6">Precios Cripto</h2>
                {loading && <p className="text-blue-200">Cargando precios...</p>}
                {error && <p className="text-red-400">{error}</p>}
                <ul className="w-full max-w-md space-y-2">
                    {prices.map((coin, idx) => (
                        <li key={idx} className="bg-blue-mid rounded-lg px-4 py-3 flex justify-between items-center shadow border border-blue-accent">
                            <span className="font-bold text-blue-accent">{coin.symbol}</span>
                            <span className="text-blue-100">{coin.name}</span>
                            <span className="font-mono text-green-400">${parseFloat(coin.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <DashboardFooter />
        </div>
    );
}
