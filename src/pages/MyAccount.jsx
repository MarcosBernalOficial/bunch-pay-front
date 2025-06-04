import { useEffect, useState } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import AccountForm from '../components/AccountForm';
import PasswordForm from '../components/PasswordForm';
import SupportChat from '../components/SupportChat';
import DashboardFooter from '../components/DashboardFooter';

export default function MyAccount() {
    const [activeTab, setActiveTab] = useState('datos');
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            if (activeTab !== 'datos') return;
            try {
                const res = await api.get('/client/profile', {withCredentials: true});
                setClientData(res.data);
                console.log("Respuesta de la API /client/profile:", res.data);
            } catch (err) {
                console.error('Error al obtener los datos del cliente:', err);
            }
        };
        fetchClient();
    }, [activeTab]);

    return (
        <div className="min-h-screen flex flex-col bg-blue-dark text-white">
            {/* Contenido principal */}
            <div className="flex-grow p-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto bg-blue-mid p-6 rounded-xl border border-blue-accent"
                >
                    <div className="flex justify-around mb-6 text-blue-accent font-semibold">
                        <button
                            onClick={() => setActiveTab('datos')}
                            className={`px-2 py-1 rounded ${activeTab === 'datos' ? 'underline' : ''}`}
                        >
                            Datos personales
                        </button>
                        <button
                            onClick={() => setActiveTab('pass')}
                            className={`px-2 py-1 rounded ${activeTab === 'pass' ? 'underline' : ''}`}
                        >
                            Cambiar contraseña
                        </button>
                        <button
                            onClick={() => setActiveTab('soporte')}
                            className={`px-2 py-1 rounded ${activeTab === 'soporte' ? 'underline' : ''}`}
                        >
                            Chat Soporte
                        </button>
                    </div>

                    {/* Render condicional */}
                    {activeTab === 'datos' && clientData && (
                        <AccountForm data={clientData} setClientData={setClientData} />
                    )}
                    {activeTab === 'pass' && <PasswordForm />}
                    {activeTab === 'soporte' && <SupportChat />}
                </motion.div>
            </div>

            {/* Footer */}
            <div className="w-full border-t border-blue-accent">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
