import { apiRequest } from './client';

const tokenKey = 'colorido_admin_token';

export function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(tokenKey);
}
export function setAdminToken(token: string) {
  localStorage.setItem(tokenKey, token);
}
export function clearAdminToken() {
  localStorage.removeItem(tokenKey);
}

async function adminRequest<T>(path: string, options: RequestInit = {}) {
  const token = getAdminToken();
  return apiRequest<T>(path, {
    ...options,
    headers: { ...(options.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
}
export async function adminLogin(email: string, password: string) {
  const data = await apiRequest<{token:string;admin:{id:string;email:string;name:string}}>('/auth/login', {
    method:'POST', body: JSON.stringify({email,password})
  });
  setAdminToken(data.token);
  return data;
}
export const getAdminDashboard = () => adminRequest<{events:number;registrations:number;announcements:number;results:number;unreadMessages:number}>('/admin/dashboard');
export const getAdminRegistrations = () => adminRequest<any[]>('/admin/registrations');
export const updateAdminRegistrationStatus = (id:string,status:string) =>
  adminRequest<any>(`/admin/registrations/${id}/status`,{method:'PUT',body:JSON.stringify({status})});
export const getAdminExportUrl = () => `${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/,'')}/admin/registrations/export`;

export async function downloadAdminRegistrations() {
  const token=getAdminToken();
  const base=(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/,'');
  const response=await fetch(`${base}/admin/registrations/export`,{headers:token?{Authorization:`Bearer ${token}`}:{},cache:'no-store'});
  if(!response.ok) throw new Error('Export failed');
  return response.blob();
}
