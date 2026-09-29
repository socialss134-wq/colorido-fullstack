import { prisma } from '../config/db';
import { env } from '../config/env';
import { ok, fail } from '../utils/http';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import type { AuthRequest } from '../middleware/auth';

const loginSchema=z.object({email:z.string().email(),password:z.string().min(1)});
export async function login(req:any,res:any){
  const parsed=loginSchema.safeParse(req.body);
  if(!parsed.success) return fail(res,'Invalid email or password','VALIDATION_ERROR',422);
  const admin=await prisma.admin.findUnique({where:{email:parsed.data.email.toLowerCase()}});
  if(!admin || !(await bcrypt.compare(parsed.data.password,admin.passwordHash))) return fail(res,'Invalid email or password','INVALID_CREDENTIALS',401);
  const token=jwt.sign({id:admin.id,email:admin.email},env.JWT_SECRET,{expiresIn:'8h'});
  return ok(res,{token,admin:{id:admin.id,email:admin.email,name:admin.name}});
}
export async function me(req:AuthRequest,res:any){ const a=await prisma.admin.findUnique({where:{id:req.admin!.id},select:{id:true,email:true,name:true}}); return a?ok(res,{admin:a}):fail(res,'Admin not found','NOT_FOUND',404); }
