import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import {
    faRightLeft,
    faTag,
    faCreditCard,
    faTrainSubway,
    faFaucetDrip,
    faFireFlameSimple,
    faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function DashboardMain() {
    const [balance, setBalance] = useState(null);
    const [showBalance, setShowBalance] = useState(true);

    useEffect(() => {
        api.get('/accountClient/balance')
            .then(res => {
                console.log('Respuesta recibida:', res.data);
                setBalance(res.data);
            })
            .catch(err => {
                if (err.response) {
                    console.error('Error en backend:', err.response.status, err.response.data);
                } else {
                    console.error('Error:', err.message);
                }
            });
    }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-8 py-6 min-h-screen flex flex-col justify-between">
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
                        <button className="w-full mt-6 py-2 bg-blue-dark border border-blue-accent rounded-md block lg:hidden">
                            Movimientos
                        </button>
                    </div>

                    <div className="bg-blue-mid rounded-xl p-6 border border-blue-accent">
                        <h3 className="text-blue-accent text-center text-lg font-semibold mb-4">Servicios</h3>
                        <div className="grid grid-cols-4 gap-5 text-sm text-center">
                            <button className="bg-blue-dark p-2 rounded-md border border-blue-accent">
                                <FontAwesomeIcon icon={faTrainSubway} className="text-xl" />
                            </button>
                            <button className="bg-blue-dark p-3 rounded-md border border-blue-accent">
                                <FontAwesomeIcon icon={faFaucetDrip} className="text-xl" />
                            </button>
                            <button className="bg-blue-dark p-2 rounded-md border border-blue-accent">
                                <FontAwesomeIcon icon={faFireFlameSimple} className="text-xl" />
                            </button>
                            <button className="bg-blue-dark p-2 rounded-md border border-blue-accent">
                                <FontAwesomeIcon icon={faMobileScreen} className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-blue-mid p-6 rounded-xl border border-blue-accent">
                            <h3 className="text-blue-accent text-center text-lg font-semibold mb-4">Beneficios</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="bg-green-discount text-black px-3 py-1 rounded">40% OFF Starbucks</li>
                            </ul>
                        </div>
                        <div className="bg-blue-mid p-6 rounded-xl text-lg border border-blue-accent">
                            <h3 className="text-blue-accent text-center font-semibold mb-4">Rendimientos</h3>
                            <p>Hoy: <span className="text-green-profit">$12,3</span></p>
                            <p>Total: <span className="text-green-profit">$2.123,4</span></p>
                        </div>
                    </div>
                </div>

                <aside className="hidden lg:flex bg-blue-mid rounded-xl border border-blue-accent h-full overflow-hidden flex-col lg:max-h-[76dvh]">
                    <h3 className="text-blue-accent text-center text-2xl font-semibold p-6 pb-3">
                        Movimientos
                    </h3>
                    <div className="overflow-y-auto px-6 pb-6 space-y-4 text-sm flex-grow">
                        <div className="flex justify-between">
                            <span>🛍️ Compra en Starbucks</span>
                            <span className="text-red-400">- $1.200,00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>💸 Ingreso de dinero</span>
                            <span className="text-green-profit">+ $2.000,00</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
