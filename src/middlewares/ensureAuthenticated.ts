import { Request, Response, NextFunction } from 'express'

export default function ensureAuthenticated(
  req: Request, 
  res: Response, 
  next: NextFunction
  ): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('JWT token is missing');
    }
}