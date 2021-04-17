import { Request, Response } from 'express';

export default function logRequest(req: Request, res: Response, next: any) {
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()}] - ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}
