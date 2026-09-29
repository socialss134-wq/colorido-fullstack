import type { FestEvent } from '@/lib/types';
import { apiRequest } from './client';
export const getEvents = () => apiRequest<FestEvent[]>('/events');
export const getEventById = async (id: string) => { try { return await apiRequest<FestEvent>(`/events/${encodeURIComponent(id)}`); } catch { return null; } };
export const getFeaturedEvents = () => apiRequest<FestEvent[]>('/events/featured');
export const getCulturalEvents = () => apiRequest<FestEvent[]>('/events/cultural');
export const getSportsEvents = () => apiRequest<FestEvent[]>('/events/sports');
