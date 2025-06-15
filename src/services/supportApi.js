import api from "../utils/api";

// Obtiene los chats asignados al soporte
export const getAssignedChats = () =>
    api.get("/support/chats").then(res => res.data);

// Obtiene los chats sin asignar
export const getUnassignedChats = () =>
    api.get("/support/chats/unassigned").then(res => res.data);

// Asigna un chat al soporte actual
export const assignChat = (id) =>
    api.put(`/support/chats/${id}/assign`);

// Obtiene los mensajes de un chat
export const getMessages = (chatId) =>
    api.get(`/support/chats/${chatId}/messages`).then(res => res.data);

// Cierra un chat
export const closeChat = (chatId) =>
    api.put(`/support/chats/${chatId}/close`);

// Envía un mensaje de texto plano
export const sendMessage = (chatId, text) =>
    api.post(`/support/chats/${chatId}/send`, text, {
        headers: { "Content-Type": "text/plain" }
    }).then(res => res.data);
