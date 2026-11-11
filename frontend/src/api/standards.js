import { api } from './client';

export const getStandards = () => api.get('/standards');
