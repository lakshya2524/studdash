import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { students, users } from "@shared/schema";

// Create postgres connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);

// Create drizzle database instance
export const db = drizzle(client);