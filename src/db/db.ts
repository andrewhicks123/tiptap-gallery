import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon<boolean, boolean>(process.env.DATABASE_URL || 'URL')
export const db = drizzle(sql);