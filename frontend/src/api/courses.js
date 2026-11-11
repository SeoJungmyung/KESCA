import { api } from './client';

export const getCourses = () => api.get('/courses');
export const enrollCourse = (courseId) => api.post(`/courses/${courseId}/enroll`);
