import type { ContactFormData } from '@/lib/types';
import { apiRequest } from './client';
export const sendContactMessage = (data: ContactFormData) =>
  apiRequest<{ success: boolean; message: string }>('/contact', { method: 'POST', body: JSON.stringify(data) });
