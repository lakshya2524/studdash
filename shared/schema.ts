import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  studentId: text("student_id").notNull().unique(),
  email: text("email").notNull(),
  department: text("department").notNull(),
});

export const insertStudentSchema = createInsertSchema(students).pick({
  name: true,
  studentId: true,
  email: true,
  department: true,
});

export const updateStudentIdSchema = z.object({
  studentId: z.string().min(5, "Student ID must be at least 5 characters long"),
});

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type UpdateStudentId = z.infer<typeof updateStudentIdSchema>;
export type Student = typeof students.$inferSelect;

// Keeping the original user schema as it was referenced in the code
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
