import { z } from 'zod';

const schema = z.object({
  APP_PORT: z.coerce.number(),
  APP_ENV: z.enum(['development', 'production', 'staging']),
  DATABASE_URL: z.string(),
});

export const ENV = schema;
export type ENV = z.infer<typeof ENV>;
