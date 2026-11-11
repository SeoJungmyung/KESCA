import { api } from './client';

export const getEvents = () => api.get('/events');
