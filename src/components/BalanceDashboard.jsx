import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import DashboardFooter from '../components/DashboardFooter';
import {
    faRightLeft, faTag, faCreditCard, faEye, faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

export default function BalanceDashboard() {
    const [balance, setBalance] = useState(null);
    const [showBalance, setShowBalance] = useState(true);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        api.get('/accountClient/balance')
            .then(res => setBalance(res.data))
            .catch(err => console.error(err));
        api.get('/transactions/viewAll')
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#141826] text-white">
            <div className="max-w-3xl w-full mx-auto flex flex-col gap-6 p-3 pt-7">
                {/* Card Balance */}
                <div className="bg-blue-mid border border-blue-accent rounded-2xl shadow-xl p-7 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="text-blue-accent text-md hover:text-blue-300 transition flex items-center gap-2"
                        >
                            {showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
                            <FontAwesomeIcon icon={showBalance ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div className="text-4xl font-bold mt-2 mb-4 select-none text-center">
                        {balance && typeof balance.balance === 'number'
                            ? showBalance
                                ? `$ ${balance.balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                                : '$ •••••••'
                            : 'Cargando...'}
                    </div>
                    {/* Botones */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <Link to="/transfer" className="bg-blue-dark hover:bg-blue-accent border border-blue-accent p-5 rounded-xl transition flex flex-col items-center justify-center">
                            <FontAwesomeIcon icon={faRightLeft} className="text-2xl mb-2" />
                            <span className="text-base">Transferir</span>
                        </Link>
                        <Link to="/alias-cvu" className="bg-blue-dark hover:bg-blue-accent border border-blue-accent p-5 rounded-xl transition flex flex-col items-center justify-center">
                            <FontAwesomeIcon icon={faTag} className="text-2xl mb-2" />
                            <span className="text-base">Alias/CVU</span>
                        </Link>
                        <Link to="/card" className="bg-blue-dark hover:bg-blue-accent border border-blue-accent p-5 rounded-xl transition flex flex-col items-center justify-center">
                            <FontAwesomeIcon icon={faCreditCard} className="text-2xl mb-2" />
                            <span className="text-base">Tarjeta</span>
                        </Link>
                    </div>
                </div>

                {/* Movimientos */}
                <div className="bg-blue-mid border border-blue-accent rounded-2xl shadow-xl p-6 flex flex-col gap-3 mt-2 overflow-auto mb-10">
                    <h2 className="text-2xl font-bold text-blue-accent text-center mb-3">Movimientos</h2>
                    <div className="flex flex-col gap-1">
                        {transactions.length === 0 ? (
                            <p className="text-blue-200 text-center">Sin movimientos</p>
                        ) : (
                            transactions.map(tx => {
                                let isExpense;
                                if (tx.type === "TRANSFERENCIA") {
                                    isExpense = tx.description === "Envio";
                                } else {
                                    isExpense = ["RETIRO", "PAGO"].includes(tx.type);
                                }
                                return (
                                    <div key={tx.id} className="flex justify-between px-1 py-1 text-base md:text-lg">
                                        <span>{tx.description || 'Sin descripción'}</span>
                                        <span className={isExpense ? "text-red-400" : "text-green-400"}>
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
                </div>
            </div>
            <div className="w-full px-4 py-4 ">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
        
    );
}
