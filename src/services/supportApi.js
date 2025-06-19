import api from "../utils/api";

export const getAssignedChats = () =>
    api.get("/support/chats").then(res => res.data);

export const getUnassignedChats = () =>
    api.get("/support/chats/unassigned").then(res => res.data);

export const assignChat = (id) =>
    api.put(`/support/chats/${id}/assign`);

export const getMessages = (chatId) =>
    api.get(`/support/chats/${chatId}/messages`).then(res => res.data);

export const closeChat = (chatId) =>
    api.put(`/support/chats/${chatId}/close`);

export const sendMessage = (chatId, text) =>
    api.post(`/support/chats/${chatId}/send`, text, {
        headers: { "Content-Type": "text/plain" }
    }).then(res => res.data);
