import type { Request, Response, NextFunction } from 'express';
export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
  return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req,res,next)).catch(next);
}
export function ok(res: Response, data: unknown, status = 200) {
  return res.status(status).json({ success: true, data });
}
export function fail(res: Response, message: string, code = 'BAD_REQUEST', status = 400) {
  return res.status(status).json({ success: false, message, code });
}
