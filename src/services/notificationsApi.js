import api from '../utils/api';

export const fetchNotifications = () => api.get('/notifications').then(res => res.data);

export const markAsRead = (id) => api.put(`/notifications/${id}/read`);
