import { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardFooter from '../components/DashboardFooter';
import { fetchNotifications } from '../services/notificationsApi';

export default function DashboardLayout({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications()
            .then((data) => {
                const count = data.filter(n => !n.read).length;
                setUnreadCount(count);
            })
            .catch(err => console.error('Error al cargar notificaciones:', err));
    }, []);

    return (
        <div className="min-h-screen bg-blue-dark text-white flex flex-col justify-between">
            {/* Header */}
            <div className="w-full px-4 py-6 border-b border-blue-accent">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardHeader unreadCount={unreadCount} />
                </div>
            </div>

            {/* Contenido principal */}
            <main className="w-full flex-grow px-4 lg:px-6">
                <div className="max-w-screen-xl mx-auto">{children}</div>
            </main>

            {/* Footer */}
            <div className="w-full px-4 py-4 border-t border-blue-accent">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
