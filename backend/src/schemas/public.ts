import { z } from 'zod';

export const registrationSchema = z.object({
  participantName: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(10).max(30),
  college: z.string().min(2).max(200),
  year: z.string().min(1).max(20),
  department: z.string().min(2).max(150),
  gender: z.string().min(1).max(30),
  eventCategory: z.enum(['Cultural','Sports']),
  eventId: z.string().min(1),
  eventName: z.string().optional(),
  eventType: z.enum(['Solo','Group','Team','Individual']).optional(),
  teamName: z.string().max(150).optional(),
  teamMembers: z.array(z.object({
    name: z.string().min(1).max(120),
    email: z.string().email(),
    phone: z.string().min(10).max(30),
  })).optional(),
  address: z.string().min(5).max(500),
  emergencyContact: z.string().min(10).max(30),
  termsAccepted: z.literal(true),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(30),
  message: z.string().min(5).max(3000),
});
