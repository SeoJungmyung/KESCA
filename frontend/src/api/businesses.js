import { api } from './client';

export const getBusinesses = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/businesses${qs ? `?${qs}` : ''}`);
};
export const getBusiness = (id) => api.get(`/businesses/${id}`);
export const getMapPins = () => api.get('/businesses/map');
