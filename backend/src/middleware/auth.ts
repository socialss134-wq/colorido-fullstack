import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
export interface AuthRequest extends Request { admin?: { id: string; email: string } }
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined;
  if (!token) return res.status(401).json({success:false,message:'Authentication required',code:'UNAUTHORIZED'});
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string };
    req.admin = { id: payload.id, email: payload.email };
    next();
  } catch {
    return res.status(401).json({success:false,message:'Invalid or expired token',code:'UNAUTHORIZED'});
  }
}
