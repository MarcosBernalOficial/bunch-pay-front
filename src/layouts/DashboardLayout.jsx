import DashboardHeader from '../components/DashboardHeader';
import DashboardFooter from '../components/DashboardFooter';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-blue-dark text-white flex flex-col justify-between">
        {/* Header */}
        <div className="w-full px-4 py-6 border-b border-blue-accent">
            <div className="max-w-screen-xl mx-auto">
            <DashboardHeader />
            </div>
        </div>

        {/* Contenido principal (puede tener grillas internas) */}
        <main className="w-full flex-grow px-4 lg:px-6">
            <div className="max-w-screen-xl mx-auto">{children}</div>
        </main>

        {/* Footer (siempre visible y centrado horizontalmente) */}
        <div className="w-full px-4 py-4 border-t border-blue-accent">
            <div className="max-w-screen-xl mx-auto">
            <DashboardFooter />
            </div>
        </div>
        </div>
    );
}
