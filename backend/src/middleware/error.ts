import type { Request, Response, NextFunction } from 'express';
export function notFound(_req: Request, res: Response) {
  res.status(404).json({ success: false, message: 'Route not found', code: 'NOT_FOUND' });
}
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  if (err?.code === 'ALREADY_REGISTERED') return res.status(409).json({success:false,message:err.message,code:'ALREADY_REGISTERED'});
  if (err?.code === 'P2002') return res.status(409).json({ success:false, message:'A record with the same unique value already exists.', code:'DUPLICATE' });
  if (err?.code === 'P2025') return res.status(404).json({ success:false, message:'Record not found', code:'NOT_FOUND' });
  return res.status(500).json({ success:false, message:'Internal server error', code:'INTERNAL_ERROR' });
}
