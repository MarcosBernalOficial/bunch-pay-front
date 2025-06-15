import api from "../utils/api";

// Trae todos los chats del cliente
export const getMyChats = async () => {
    const res = await api.get("/client/chats");
    return res.data;
};

// ⚠️ CAMBIO: unificamos el nombre con el componente
export const startChat = async () => {
    const res = await api.post("/client/chats/start");
    return res.data;
};

// Trae los mensajes de un chat específico
export const getMessages = async (chatId) => {
    const res = await api.get(`/client/chats/${chatId}/messages`);
    return res.data;
};

// Envía un mensaje de texto en formato plano
export const sendMessage = async (chatId, content) => {
    const res = await api.post(`/client/chats/${chatId}/send`, content, {
        headers: { "Content-Type": "text/plain" },
    });
    return res.data;
};
