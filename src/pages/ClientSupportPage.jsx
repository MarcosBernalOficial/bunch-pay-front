import { useEffect, useState } from "react";
import SupportChat from "../components/SupportChat";

export default function ClientSupportPage() {
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);

    // Crear o recuperar el chat + obtener mensajes iniciales
    const initChat = async () => {
        try {
            const resChat = await fetch("/client/chats/start", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            const chat = await resChat.json();
            setChatId(chat.id);

            const resMsgs = await fetch(`/client/chats/${chat.id}/messages`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            const msgs = await resMsgs.json();
            setMessages(msgs);
        } catch (err) {
            console.error("Error al cargar chat:", err);
        }
    };

    const loadMessages = async () => {
        if (!chatId) return;
        try {
            const res = await fetch(`/client/chats/${chatId}/messages`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            setMessages(data);
        } catch (err) {
            console.error("Error al actualizar mensajes:", err);
        }
    };

    const handleSendMessage = async (text) => {
        try {
            await fetch(`/client/chats/${chatId}/send`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "text/plain",
                },
                body: text,
            });
            await loadMessages(); // refrescar mensajes
        } catch (err) {
            console.error("Error al enviar mensaje:", err);
        }
    };

    useEffect(() => {
        initChat();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            loadMessages();
        }, 3000);
        return () => clearInterval(interval);
    }, [chatId]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-dark mb-6 text-center">Soporte al Cliente</h1>
            <SupportChat
                messages={messages}
                onSendMessage={handleSendMessage}
                isSupport={false}
                disabled={false}
            />
        </div>
    );
}
