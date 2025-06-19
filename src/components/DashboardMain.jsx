import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ServiceRechargeModal from './ServiceRechargeModal';
import DiscountCoupons from './DiscountCoupons';
import {
    faRightLeft,
    faTag,
    faCreditCard,
    faTrainSubway,
    faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faSteam } from '@fortawesome/free-brands-svg-icons';

export default function DashboardMain() {
    const [balance, setBalance] = useState(null);
    const [showBalance, setShowBalance] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [rendimientos, setRendimientos] = useState({ hoy: null, total: null });
    const [loadingRendimientos, setLoadingRendimientos] = useState(true);

    const [showRecharge, setShowRecharge] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [rechargeLoading, setRechargeLoading] = useState(false);
    const [errorRecharge, setErrorRecharge] = useState('');
    const [modalKey, setModalKey] = useState(0);

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setShowRecharge(true);
        setErrorRecharge('');
    };

    const handleSubmitRecharge = async (form) => {
        setRechargeLoading(true);
        setErrorRecharge('');
        try {
            await api.post('/api/recharge/service', {
                ...form,
                serviceType: selectedService,
            });
            setShowRecharge(false);
            setRechargeLoading(false);
            setErrorRecharge('');
            setModalKey(prev => prev + 1);
            api.get('/accountClient/balance').then(res => setBalance(res.data));
        } catch (err) {
            setRechargeLoading(false);
            setErrorRecharge(
                err?.response?.data?.message ||
                'Error al procesar la recarga. Verificá tu saldo o los datos ingresados.'
            );
        }
    };

    const handleCloseModal = () => {
        setShowRecharge(false);
        setErrorRecharge('');
        setModalKey(prev => prev + 1);
    };

    useEffect(() => {
        setLoadingTransactions(true);
        api.get('/transactions/viewAll')
            .then(res => {
                setTransactions(res.data);
                setLoadingTransactions(false);
            })
            .catch(err => {
                console.error('Error al cargar movimientos:', err);
                setLoadingTransactions(false);
            });
    }, []);

    useEffect(() => {
        api.get('/accountClient/balance')
            .then(res => {
                setBalance(res.data);

                if (res.data) {
                    setLoadingRendimientos(true);
                    api.get(`/profits/summary`)
                        .then(r => {
                            setRendimientos({
                                hoy: r.data.todayProfit,
                                total: r.data.totalProfit
                            });
                        })
                        .catch(err => {
                            console.error("Error al cargar rendimientos:", err);
                            setRendimientos({ hoy: null, total: null });
                        })
                        .finally(() => setLoadingRendimientos(false));
                }
            })
            .catch(err => {
                if (err.response) {
                    console.error(err.response.status, err.response.data);
                } else {
                    console.error('Error:', err.message);
                }
            });
    }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-8 py-6 pb-24 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 flex-grow">
                <div className="space-y-10">
                    <div className="bg-blue-mid rounded-xl p-6 border border-blue-accent">
                        <div className="flex justify-between items-center mb-2">
                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className="text-sm text-blue-accent flex items-center gap-2"
                            >
                                {showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
                                <FontAwesomeIcon icon={showBalance ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <h2 className="text-4xl font-bold my-4">
                            {balance && typeof balance.balance === 'number'
                                ? showBalance
                                    ? `$ ${balance.balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                                    : '$ •••••••'
                                : 'Cargando...'}
                        </h2>
                        <div className="grid grid-cols-3 gap-3 text-sm text-center mt-4">
                            <Link to="/transfer" className="bg-blue-dark p-2 rounded-md border border-blue-accent hover:bg-blue-accent hover:text-blue-dark transition">
                                <FontAwesomeIcon icon={faRightLeft} className="text-xl" /><br />Transferir
                            </Link>
                            <Link to="/alias-cvu" className="bg-blue-dark p-2 rounded-md border border-blue-accent hover:bg-blue-accent hover:text-blue-dark transition">
                                <FontAwesomeIcon icon={faTag} className="text-xl" /><br />Alias/CVU
                            </Link>
                            <Link to="/card" className="bg-blue-dark p-2 rounded-md border border-blue-accent hover:bg-blue-accent hover:text-blue-dark transition">
                                <FontAwesomeIcon icon={faCreditCard} className="text-xl" /><br />Tarjeta
                            </Link>
                        </div>
                        <Link
                            to="/movimientos"
                            className="w-full mt-6 py-2 bg-blue-dark border border-blue-accent rounded-md block lg:hidden text-center hover:bg-blue-accent hover:text-blue-dark transition"
                        >
                            Movimientos
                        </Link>
                    </div>

                    <div className="bg-blue-mid rounded-xl p-6 border border-blue-accent">
                        <h3 className="text-blue-accent text-center text-lg font-semibold mb-4">Servicios</h3>
                        <div className="grid grid-cols-3 gap-5 text-sm text-center">
                            <button
                                className="bg-blue-dark p-2 rounded-md border border-blue-accent hover:bg-blue-accent hover:text-blue-dark transition"
                                onClick={() => handleServiceClick('SUBE')}
                                title="Cargar SUBE"
                            >
                                <FontAwesomeIcon icon={faTrainSubway} className="text-xl" />
                            </button>
                            <button
                                className="bg-blue-dark p-2 rounded-md border border-blue-accent hover:bg-blue-accent hover:text-blue-dark transition"
                                onClick={() => handleServiceClick('CELULAR')}
                                title="Cargar Celular"
                            >
                                <FontAwesomeIcon icon={faMobileScreen} className="text-xl" />
                            </button>
                            <button
                                className="bg-blue-dark p-2 rounded-md border border-blue-accent hover:bg-blue-accent hover:text-blue-dark transition"
                                onClick={() => handleServiceClick('STEAM')}
                                title="Cargar Steam"
                            >
                                <FontAwesomeIcon icon={faSteam} className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-blue-mid p-6 rounded-xl border border-blue-accent flex flex-col justify-center min-h-[220px] max-h-[220px] overflow-hidden">
                            <DiscountCoupons />
                        </div>
                        <div className="bg-blue-mid p-6 rounded-xl text-lg border border-blue-accent flex flex-col justify-center min-h-[220px] max-h-[220px]">
                            <div className="flex items-center justify-center mb-4 gap-2">
                                <h3 className="text-blue-accent text-center font-semibold mb-0">
                                    Rendimientos
                                </h3>
                                <span className="text-green-profit text-base font-semibold bg-green-950 bg-opacity-40 px-2 py-0.5 rounded-lg ml-2">
                                    39% anual
                                </span>
                            </div>
                            <div className="flex justify-evenly items-center gap-6 mt-2">
                                <div className="flex flex-col items-center flex-1">
                                    <span className="text-blue-200 text-base mb-1">Hoy</span>
                                    <span className="text-green-profit bg-green-950 bg-opacity-40 px-3 py-1 rounded-xl text-xl font-bold">
                                        {(loadingRendimientos && rendimientos.hoy == null)
                                            ? '$0,00'
                                            : (rendimientos.hoy != null
                                                ? `$${Number(rendimientos.hoy).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                                                : '$0,00')}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <span className="text-blue-200 text-base mb-1">Total</span>
                                    <span className="text-green-profit bg-green-950 bg-opacity-40 px-3 py-1 rounded-xl text-xl font-bold">
                                        {(loadingRendimientos && rendimientos.total == null)
                                            ? '$0,00'
                                            : (rendimientos.total != null
                                                ? `$${Number(rendimientos.total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                                                : '$0,00')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <aside className="hidden lg:flex bg-blue-mid rounded-xl border border-blue-accent h-full overflow-hidden flex-col lg:max-h-[76dvh]">
                    <h3 className="text-blue-accent text-center text-2xl font-semibold p-6 pb-3">
                        Movimientos
                    </h3>
                    <div
                        className="overflow-y-auto no-scrollbar px-6 pb-6 space-y-4 text-sm flex-grow"
                        style={{ maxHeight: '505px' }}
                    >
                        {loadingTransactions ? (
                            <p className="text-blue-200 text-center animate-pulse">Cargando movimientos...</p>
                        ) : transactions.length === 0 ? (
                            <p className="text-blue-200 text-center">Sin movimientos</p>
                        ) : (
                            transactions
                                .slice()
                                .reverse()
                                .map((tx) => {
                                    let isExpense;
                                    if (tx.type === "TRANSFERENCIA") {
                                        isExpense = tx.description === "Envio";
                                    } else {
                                        isExpense = ["RETIRO", "PAGO"].includes(tx.type);
                                    }
                                    return (
                                        <div key={tx.id} className="flex justify-between items-center">
                                            <span>
                                                {tx.description || 'Sin descripción'}
                                            </span>
                                            <span className={isExpense ? 'text-red-400' : 'text-green-profit'}>
                                                {isExpense ? '-' : '+'} ${parseFloat(tx.amount).toLocaleString('es-AR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </span>
                                        </div>
                                    );
                                })
                        )}
                    </div>
                </aside>
            </div>

            <ServiceRechargeModal
                key={modalKey}
                open={showRecharge}
                onClose={handleCloseModal}
                serviceType={selectedService}
                onSubmit={handleSubmitRecharge}
                loading={rechargeLoading}
                error={errorRecharge}
            />
        </div>
    );
}
