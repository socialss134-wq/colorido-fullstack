import type { Sponsor } from '@/lib/types';
import { apiRequest } from './client';
export const getSponsors = () => apiRequest<Sponsor[]>('/sponsors');
