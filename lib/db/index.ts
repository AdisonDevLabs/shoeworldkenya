// lib/db/index.ts
import { drizzle } from 'drizzle-orm/d1';
import { getRequestContext } from '@opennextjs/cloudflare';
import * as schema from './schema';

export function getDb() {
  // Grab the Cloudflare environment bindings injected by OpenNext
  const { env } = getRequestContext();
  
  // Return the initialized Drizzle client
  return drizzle(env.shoeworld_db, { schema });
}