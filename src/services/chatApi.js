import api from "../utils/api";

export const getMyChats = async () => {
    const res = await api.get("/client/chats");
    return res.data;
};

export const startChat = async () => {
    const res = await api.post("/client/chats/start");
    return res.data;
};

export const getMessages = async (chatId) => {
    const res = await api.get(`/client/chats/${chatId}/messages`);
    return res.data;
};

export const sendMessage = async (chatId, content) => {
    const res = await api.post(`/client/chats/${chatId}/send`, content, {
        headers: { "Content-Type": "text/plain" },
    });
    return res.data;
};
