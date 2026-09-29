import type { RegistrationData, RegistrationResponse } from '@/lib/types';
import { apiRequest } from './client';
export const registerParticipant = (data: RegistrationData) =>
  apiRequest<RegistrationResponse>('/registrations', { method: 'POST', body: JSON.stringify(data) });
