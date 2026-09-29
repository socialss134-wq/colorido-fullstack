import type { Announcement } from '@/lib/types';
import { apiRequest } from './client';
export const getAnnouncements = () => apiRequest<Announcement[]>('/announcements');
export const getLatestAnnouncements = (limit = 3) => apiRequest<Announcement[]>(`/announcements/latest?limit=${limit}`);
