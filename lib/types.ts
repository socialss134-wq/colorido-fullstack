export type EventCategory = 'Cultural' | 'Sports';
export type RegistrationStatus = 'open' | 'closed' | 'filling-fast';

export type CulturalSubCategory =
  | 'Fine Arts'
  | 'Music & Band'
  | 'Dance'
  | 'Choreoday'
  | 'Dramatics'
  | 'Fashion Show'
  | 'Tekraft Events'
  | 'Literary';

export type SportsEvent =
  | 'Basketball'
  | 'Volleyball'
  | 'Table Tennis'
  | 'Throwball'
  | 'TenniKoit';

export type GenderCategory = 'Boys' | 'Girls' | 'Open';

export type EventType = 'Solo' | 'Group' | 'Team' | 'Individual';

export interface FestEvent {
  id: string;
  name: string;
  category: EventCategory;
  subCategory: string;
  type: EventType;
  gender?: GenderCategory;
  description: string;
  date: string;
  time: string;
  venue: string;
  eligibility: string;
  teamSize: number;
  registrationFee: number;
  registrationDeadline: string;
  rules: string[];
  importantInstructions: string[];
  contactPerson: string;
  contactNumber: string;
  status: RegistrationStatus;
  featured?: boolean;
  image?: string;
}

export interface ScheduleItem {
  id: string;
  day: number;
  date: string;
  time: string;
  eventName: string;
  category: EventCategory;
  venue: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'General' | 'Cultural' | 'Sports' | 'Registration' | 'Important';
  priority: 'high' | 'medium' | 'low';
  published: boolean;
}

export interface Result {
  id: string;
  eventName: string;
  category: EventCategory;
  subCategory: string;
  position: '1st' | '2nd' | '3rd';
  participant: string;
  college: string;
  prize: string;
  status: 'published' | 'pending';
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Title' | 'Platinum' | 'Gold' | 'Silver' | 'Partner';
  logo: string;
  website?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'Cultural' | 'Sports' | 'Behind the Scenes' | 'Previous Events';
  width: number;
  height: number;
}

export interface RegistrationData {
  participantName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  department: string;
  gender: string;
  eventCategory: EventCategory;
  eventId: string;
  eventName: string;
  eventType: EventType;
  teamName?: string;
  teamMembers?: TeamMember[];
  address: string;
  emergencyContact: string;
  termsAccepted: boolean;
}

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

export interface RegistrationResponse {
  registrationId: string;
  participantName: string;
  eventName: string;
  status: 'confirmed' | 'pending';
  instructions: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
