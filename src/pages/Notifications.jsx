import { useEffect, useState } from 'react';
import { fetchNotifications, markAsRead } from '../services/notificationsApi';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import DashboardFooter from '../components/DashboardFooter';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications().then((data) => {
            setNotifications(Array.isArray(data) ? data : []);
        });
    }, []);

    const handleMarkAsRead = async (id) => {
        await markAsRead(id);
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    return (
        <div className="min-h-screen bg-blue-dark text-white flex flex-col">
            <div className="max-w-2xl mx-auto w-full flex-grow pb-8">
                <div className="sticky top-0 bg-blue-dark z-10 pb-4">
                    <div className="flex items-center gap-3 justify-center py-8">
                        <FontAwesomeIcon icon={faBell} className="text-3xl text-yellow-400 animate-bounce" />
                        <h2 className="text-3xl font-bold text-blue-accent text-center select-none">
                            Notificaciones
                        </h2>
                    </div>
                </div>
                <ul className="space-y-5 mx-3">
                    {notifications.map(n => (
                        <li
                            key={n.id}
                            className={`relative group p-4 border-l-8 rounded-xl shadow-md transition-all duration-300
                                ${n.read
                                    ? 'bg-blue-mid text-blue-soft border-blue-accent'
                                    : 'bg-blue-mid text-blue-soft border-yellow-400'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center pt-1">
                                    {n.read ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-green-400" title="Leída"/>
                                    ) : (
                                        <FontAwesomeIcon icon={faBell} className="text-xl text-yellow-400 animate-pulse" title="Nueva"/>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-1">
                                        {n.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed mb-1">
                                        {n.message}
                                    </p>
                                    <p className="text-xs opacity-70 mt-1">
                                        {n.createdAt && format(new Date(n.createdAt), "PPPp", { locale: es })}
                                    </p>
                                </div>
                                {!n.read && (
                                    <button
                                        onClick={() => handleMarkAsRead(n.id)}
                                        className="text-sm text-blue-mid font-semibold hover:text-blue-soft  px-2 py-1 rounded transition 
                                                    bg-blue-soft hover:bg-blue-mid ml-2 border border:blue-mid hover:border-blue-soft whitespace-nowrap"
                                    >
                                        Marcar como leído
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                    {notifications.length === 0 && (
                        <div className="flex flex-col items-center mt-14">
                            <FontAwesomeIcon icon={faBell} className="text-6xl text-blue-accent opacity-30 mb-4" />
                            <p className="text-blue-200 text-lg">No tenés notificaciones por el momento.</p>
                        </div>
                    )}
                </ul>
            </div>
            <div className="w-full px-4 py-4 border-t border-blue-accent bg-blue-mid">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
