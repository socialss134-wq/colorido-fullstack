import type { ScheduleItem } from '@/lib/types';
import { apiRequest } from './client';
export const getSchedule = () => apiRequest<ScheduleItem[]>('/schedule');
