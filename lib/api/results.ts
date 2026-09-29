import type { Result } from '@/lib/types';
import { apiRequest } from './client';
export const getResults = () => apiRequest<Result[]>('/results');
export const getLatestResults = (limit = 5) => apiRequest<Result[]>(`/results/latest?limit=${limit}`);
