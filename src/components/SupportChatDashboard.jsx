import { useEffect, useState } from "react";
import {
    getAssignedChats,
    getUnassignedChats,
    assignChat,
    getMessages,
    closeChat,
    sendMessage,
} from "../services/supportApi";
import ChatWindow from "./SupportChat";
import { useNavigate } from "react-router-dom";

export default function SupportChatDashboard() {
    const [assigned, setAssigned] = useState([]);
    const [unassigned, setUnassigned] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const loadChats = async () => {
        const [a, u] = await Promise.all([getAssignedChats(), getUnassignedChats()]);
        setAssigned(a);
        setUnassigned(u);

        if (selectedChat) {
            const updated = a.find(c => c.id === selectedChat.id);
            if (updated) setSelectedChat(updated);
        }
    };

    const loadMessages = async () => {
        if (selectedChat) {
            const msgs = await getMessages(selectedChat.id);
            setMessages(msgs);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            loadChats();
            loadMessages();
        }, 3000);

        return () => clearInterval(interval);
    }, [selectedChat]);

    const handleSelectChat = async (chat) => {
        setSelectedChat(chat);
        const msgs = await getMessages(chat.id);
        setMessages(msgs);
    };

    const handleTakeChat = async (chatId) => {
        await assignChat(chatId);
        await loadChats();
    };

    const handleSendMessage = async (text) => {
        try {
            await sendMessage(selectedChat.id, text);
            await loadMessages();
        } catch (err) {
            console.error("Error al enviar mensaje:", err);
        }
    };

    const handleCloseChat = async () => {
        try {
            await closeChat(selectedChat.id);
            await loadChats();
            const updated = assigned.find(c => c.id === selectedChat.id);
            if (updated) {
                setSelectedChat(updated);
            } else {
                setSelectedChat(null);
            }
        } catch (err) {
            console.error("Error al cerrar el chat:", err);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-blue-dark p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-accent text-center w-full">
                    Panel de Soporte
                </h2>
                <button
                    onClick={handleLogout}
                    className="absolute top-6 right-6 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition"
                >
                    Cerrar sesión
                </button>
            </div>

            <div className="flex gap-6 flex-wrap">
                <div className="w-full md:w-1/4 bg-blue-mid p-4 rounded-xl border border-blue-accent shadow-lg">
                    <h3 className="font-semibold text-blue-accent mb-3 text-center">Mis Chats</h3>
                    <div className="">
                        {assigned.length === 0 ? (
                            <p className="text-sm text-gray-300">No tenés chats asignados.</p>
                        ) : (
                            assigned.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => handleSelectChat(chat)}
                                    className={`py-2 px-2 my-2 border border-blue-accent cursor-pointer rounded-md transition ${
                                        chat.closed
                                            ? "bg-gray-700 text-gray-400 cursor-default"
                                            : "hover:bg-blue-light"
                                    }`}
                                >
                                    <strong>#{chat.id}</strong> — {chat.clientName}{" "}
                                    {chat.closed && <span className="text-sm">[CERRADO]</span>}
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/4 bg-blue-mid p-4 rounded-xl border border-blue-accent shadow-lg">
                    <h3 className="font-semibold text-blue-accent mb-3 text-center">Chats por tomar</h3>
                    <div className="divide-y divide-blue-accent">
                        {unassigned.length === 0 ? (
                            <p className="text-sm text-gray-300">No hay chats disponibles.</p>
                        ) : (
                            unassigned.map((chat) => (
                                <div key={chat.id} className="py-2 px-2 text-sm">
                                    <div className="mb-1">
                                        <strong>#{chat.id}</strong> — {chat.clientName}
                                    </div>
                                    <button
                                        onClick={() => handleTakeChat(chat.id)}
                                        className="text-xs bg-blue-accent text-blue-dark px-3 py-1 rounded hover:brightness-110"
                                    >
                                        Tomar
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="flex-1 bg-blue-mid p-4 rounded-xl border border-blue-accent shadow-lg flex flex-col">
                    {selectedChat ? (
                        <>
                            <ChatWindow
                                messages={messages}
                                onSendMessage={handleSendMessage}
                                isSupport
                                disabled={selectedChat.closed}
                            />
                            {!selectedChat.closed && (
                                <button
                                    onClick={handleCloseChat}
                                    className="mt-4 self-end bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                                >
                                    Cerrar Chat
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="text-center text-blue-accent mt-12 text-lg">
                            Seleccioná un chat para comenzar
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
