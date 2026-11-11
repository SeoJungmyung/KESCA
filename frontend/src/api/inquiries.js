import { api } from './client';

export const submitInquiry = (data) => api.post('/inquiries', data);
