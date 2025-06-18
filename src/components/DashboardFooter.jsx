import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWallet,
    faDollarSign,
    faHouse,
    faChartLine,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function DashboardFooter() {
    return (
        <div className="bg-blue-mid fixed bottom-0 left-0 right-0 w-full border-t border-blue-accent z-50 py-3">
            <div className="mx-auto max-w-4xl px-4 py-3 flex justify-around items-center text-blue-accent">
                <Link title="Tu dinero" to="/Balance" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faWallet} size="lg" />
                </Link>
                <Link title="Crypto" to="/crypto" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faDollarSign} size="lg" />
                </Link>
                <Link title="Inicio" to="/" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faHouse} size="lg" />
                </Link>
                <Link title="Rendimientos" to="/" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faChartLine} size="lg" />
                </Link>
                <Link title="Configuración" to="/account" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faGear} size="lg" />
                </Link>
            </div>
        </div>
    );
}
