import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function DashboardHeader({ unreadCount = 0 }) {
    return (
        <div className="flex justify-between items-center max-w-4xl mx-auto relative">
            <Link to="/account" className="text-blue-soft p-2 rounded-full">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
            </Link>

            <h1 className="text-2xl font-bold bg-blue-soft text-blue-dark px-4 py-1 rounded-md">
                Bunch Pay
            </h1>

            <Link to="/notifications" className="relative text-blue-soft p-2">
                <FontAwesomeIcon icon={faBell} className="text-lg" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
                )}
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
            </Link>
        </div>
    );
}
