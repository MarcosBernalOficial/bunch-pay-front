import { useEffect, useState } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import AccountForm from '../components/AccountForm';
import PasswordForm from '../components/PasswordForm';
import SupportChat from '../components/SupportChat';
import DashboardFooter from '../components/DashboardFooter';
import {
    startChat,
    getMessages,
    sendMessage,
} from '../services/chatApi';

export default function MyAccount() {
    const [activeTab, setActiveTab] = useState('datos');
    const [clientData, setClientData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);

    useEffect(() => {
        if (activeTab === 'datos') {
            api.get('/client/profile')
                .then((res) => setClientData(res.data))
                .catch((err) =>
                    console.error('Error al obtener los datos del cliente:', err)
                );
        }
    }, [activeTab]);

    useEffect(() => {
        let polling;
        async function fetchChatAndMessages() {
            try {
                let id = chatId;
                if (!id) {
                    const res = await startChat();
                    id = res.id;
                    setChatId(id);
                }
                const msgs = await getMessages(id);
                setMessages(msgs);
                polling = setInterval(async () => {
                    try {
                        const polledMsgs = await getMessages(id);
                        setMessages(polledMsgs);
                    } catch (err) {
                        console.error('Error al refrescar mensajes del chat:', err);
                    }
                }, 2000);
            } catch (err) {
                console.error("Error al iniciar chat con soporte:", err);
                setMessages([]);
            }
        }

        if (activeTab === 'soporte') {
            fetchChatAndMessages();
        }
        return () => polling && clearInterval(polling);
    }, [activeTab]);


    const handleSendMessage = async (text) => {
        try {
            let id = chatId;

            if (!id) {
                const res = await startChat();
                id = res.id;
                setChatId(id);
            }

            await sendMessage(id, text);
            const msgs = await getMessages(id);
            setMessages(msgs);
        } catch (err) {
            console.error('Error al enviar mensaje al soporte:', err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-dark text-white mb-16">
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
                    </div>

                    {activeTab === 'datos' && clientData && (
                        <AccountForm data={clientData} setClientData={setClientData} />
                    )}
                    {activeTab === 'pass' && <PasswordForm />}
                    {activeTab === 'soporte' && (
                        <SupportChat
                            messages={messages}
                            onSendMessage={handleSendMessage}
                            isSupport={false}
                        />
                    )}
                </motion.div>
            </div>

            <div className="w-full border-t border-blue-accent">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
