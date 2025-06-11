import { useEffect, useState } from 'react';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import AccountForm from '../components/AccountForm';
import PasswordForm from '../components/PasswordForm';
import SupportChat from '../components/SupportChat';
import DashboardFooter from '../components/DashboardFooter';

export default function MyAccount() {
    const [activeTab, setActiveTab] = useState('datos');
    const [clientData, setClientData] = useState(null);
    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        const fetchClient = async () => {
            if (activeTab !== 'datos') return;
            try {
                const res = await api.get('/client/profile');
                setClientData(res.data);
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
                    <div className="flex justify-around items-center mb-6 text-blue-accent font-semibold gap-2">
                        <div className="flex flex-1 justify-around">
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
                        <button
                            onClick={() => setShowLogout(true)}
                            className="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-700 transition font-bold"
                            title="Cerrar sesión"
                        >
                            Logout
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

            {/* Modal de logout */}
            <AnimatePresence>
                {showLogout && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-blue-dark rounded-xl p-8 border border-blue-accent shadow-lg text-center max-w-sm w-full"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                        >
                            <h4 className="text-xl font-bold mb-4 text-blue-accent">¿Seguro que querés cerrar sesión?</h4>
                            <p className="mb-6 text-gray-200">Tu sesión se cerrará y volverás a la pantalla de inicio de sesión.</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => {
                                        sessionStorage.clear();
                                        localStorage.clear();
                                        window.location.href = '/login'; // Ajustá según tu ruta
                                    }}
                                    className="px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-bold transition"
                                >
                                    Sí, cerrar sesión
                                </button>
                                <button
                                    onClick={() => setShowLogout(false)}
                                    className="px-5 py-2 rounded bg-blue-accent text-blue-dark font-bold hover:bg-blue-light transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="w-full border-t border-blue-accent">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
