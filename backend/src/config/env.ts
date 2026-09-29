import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  ADMIN_EMAIL: z.string().email().default('admin@colorido.local'),
  ADMIN_PASSWORD: z.string().min(8).default('ChangeThisPassword123!'),
  ENFORCE_DEADLINE: z.enum(['true', 'false']).default('false'),
});
export const env = schema.parse(process.env);
