import { db } from "../server/db";
import { students, users } from "../shared/schema";
import { storage } from "../server/storage";

async function main() {
  console.log("Creating tables...");
  
  // Create the tables if they don't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      student_id TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      department TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  console.log("Tables created successfully");

  // Check if there's any data in the students table
  const existingStudents = await storage.getAllStudents();
  
  if (existingStudents.length === 0) {
    console.log("Seeding initial student data...");
    
    // Add a default student
    await storage.createStudent({
      name: "John Doe",
      studentId: "S12345678",
      email: "john.doe@university.edu",
      department: "Computer Science"
    });
    
    console.log("Initial data seeded successfully");
  } else {
    console.log("Database already has data, skipping seed");
  }

  console.log("Migration completed successfully");
  process.exit(0);
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});