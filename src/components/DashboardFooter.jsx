import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWallet,
    faCoins, 
    faHouse,
    faGift,       
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function DashboardFooter() {
    return (
        <div className="bg-blue-mid fixed bottom-0 left-0 right-0 w-full border-t border-blue-accent z-50 py-3">
            <div className="mx-auto max-w-4xl px-4 py-3 flex justify-around items-center text-blue-accent">
                <Link title="Tu dinero" to="/balance" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faWallet} size="lg" />
                </Link>
                <Link title="Monedas" to="/crypto" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faCoins} size="lg" />
                </Link>
                <Link title="Inicio" to="/" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faHouse} size="lg" />
                </Link>
                <Link title="Beneficios" to="/benefits" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faGift} size="lg" />
                </Link>
                <Link title="Configuración" to="/account" className="hover:text-white transition">
                    <FontAwesomeIcon icon={faGear} size="lg" />
                </Link>
            </div>
        </div>
    );
}
