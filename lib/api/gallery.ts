import type { GalleryImage } from '@/lib/types';
import { apiRequest } from './client';
export const getGalleryImages = () => apiRequest<GalleryImage[]>('/gallery');
