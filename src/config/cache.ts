import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'memory' | 'redis';

  config: {
    redis: RedisOptions
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASS || undefined,
    }
  }
} as ICacheConfig;