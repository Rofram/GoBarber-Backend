import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import AppError from '@shared/errors/AppError';

import cache from '@config/cache';

const redisClient = redis.createClient({
  host: cache.config.redis.host,
  port: cache.config.redis.port,
  password: cache.config.redis.password,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter:',
  points: 5,
  duration: 1,
});

export default async function rateLimiter( 
  req: Request, 
  res: Response, 
  next: NextFunction 
  ): Promise<void> {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}