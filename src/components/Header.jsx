import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <header className="w-full flex justify-between items-center my-6 px-2">
            <Link to="/account">
                <div className="w-10 h-10 rounded-full bg-surface text-primary flex items-center justify-center font-titulo text-sm shadow-md  hover:bg-primaryLight hover:text-surface transition-colors duration-300">
                    M
                </div>
            </Link>
            <h1 className="bg-primary text-background px-4 py-2 rounded-xl font-titulo text-2xl border border-primary/50 cursor-default">
                Bunch Pay
            </h1>
            <div className="group w-10 h-10 rounded-full bg-surface flex items-center justify-center shadow-md hover:bg-primaryLight transition cursor-pointer">
                <FontAwesomeIcon
                    icon={faBell}
                    className="text-primary group-hover:text-surface transition-colors duration-300"
                />
            </div>
        </header>
    );
}

export default Header;
