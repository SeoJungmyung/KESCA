import { api } from './client';

export const getCertifications = () => api.get('/certifications');
