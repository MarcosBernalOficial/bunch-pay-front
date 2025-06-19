import { useEffect, useState } from 'react';
import api from '../utils/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DiscountCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        api.get('/discount-coupons/my-active')
            .then(res => {
                setCoupons(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('No se pudieron cargar los cupones activos');
                setLoading(false);
            });
    }, []);

    const handlePrev = () => setCurrent(c => Math.max(0, c - 1));
    const handleNext = () => setCurrent(c => Math.min(coupons.length - 1, c + 1));

    return (
        <div>
            <h3 className="text-blue-accent text-center text-lg font-semibold mb-4">Cupones Activos</h3>
            {loading ? (
                <p className="text-blue-200 text-center">Cargando cupones...</p>
            ) : error ? (
                <p className="text-red-400 text-center">{error}</p>
            ) : coupons.length === 0 ? (
                <p className="text-blue-200 text-center">No tenés cupones activos.</p>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-xs">
                        <div className="relative flex items-center justify-center">
                            <div
                                className="
                                    bg-gradient-to-tr from-blue-accent via-blue-discount to-blue-mid
                                    shadow-lg border border-blue-accent rounded-2xl
                                    flex flex-col items-center justify-center
                                    w-full overflow-hidden
                                    transition-all duration-300 p-3
                                "
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-3xl font-extrabold text-white drop-shadow-sm">{coupons[current].discountPercent}%</span>
                                    <span className="uppercase text-white font-semibold">OFF</span>
                                </div>
                                <span className="text-lg font-bold mb-1 text-center break-all line-clamp-2">{coupons[current].company}</span>
                                <span className="text-xs text-blue-soft font-semibold bg-blue-mid border px-3 py-1 rounded-full shadow-inner tracking-wide mb-1 truncate">
                                    {coupons[current].code}
                                </span>
                                <span className="text-xs text-white mt-1">Vence: {new Date(coupons[current].expirationDate).toLocaleDateString()}</span>
                            </div>
                            {/* Botones de navegación */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-soft rounded-full p-1 shadow border border-blue-mid hover:bg-blue-accent transition disabled:opacity-40 mx-2"
                                disabled={current === 0}
                                title="Anterior"
                            >
                                <ChevronLeft className="w-5 h-5 text-blue-dark" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-soft rounded-full p-1 shadow border border-blue-mid hover:bg-blue-accent transition disabled:opacity-40 mx-2"
                                disabled={current === coupons.length - 1}
                                title="Siguiente"
                            >
                                <ChevronRight className="w-5 h-5 text-blue-dark" />
                            </button>
                        </div>
                        {/* Indicadores tipo "• • o" */}
                        <div className="flex justify-center gap-1 my-3">
                            {coupons.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`h-2 w-2 rounded-full ${idx === current ? 'bg-blue-accent' : 'bg-blue-soft'}`}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
