import { Express, Request, Response, NextFunction } from 'express';
import { createServer, Server } from 'http';
import { z } from 'zod';
import { storage } from './mongo-storage';

// Validation schemas
const userSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  role: z.enum(['admin', 'student', 'teacher']).optional()
});

const studentSchema = z.object({
  studentId: z.string().min(5).max(20),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  gradeLevel: z.number().min(1).max(12).optional(),
  userId: z.string().optional()
});

const updateStudentIdSchema = z.object({
  studentId: z.string().min(5).max(20)
});

const courseSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(2),
  description: z.string().optional(),
  instructor: z.string().optional(),
  schedule: z.string().optional(),
  room: z.string().optional()
});

const announcementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  author: z.string().optional()
});

export async function registerTechRoomRoutes(app: Express): Promise<Server> {
  const server = createServer(app);

  // Error handling middleware
  const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: err.errors
      });
    }
    next(err);
  };

  // User routes
  app.get("/api/users/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Omit sensitive information
      const { passwordHash, ...userWithoutPassword } = user.toObject();
      res.json(userWithoutPassword);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedUser = userSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedUser.username);
      
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      const user = await storage.createUser(validatedUser);
      
      // Omit sensitive information
      const { passwordHash, ...userWithoutPassword } = user.toObject();
      res.status(201).json(userWithoutPassword);
    } catch (err) {
      next(err);
    }
  });

  // Student routes
  app.get("/api/students", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await storage.getAllStudents();
      res.json(students);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/students/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await storage.getStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/students", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedStudent = studentSchema.parse(req.body);
      
      // Check if the student ID already exists
      const existingStudent = await storage.getStudentByStudentId(validatedStudent.studentId);
      if (existingStudent) {
        return res.status(400).json({ message: 'Student ID already exists' });
      }
      
      const student = await storage.createStudent(validatedStudent);
      res.status(201).json(student);
    } catch (err) {
      next(err);
    }
  });

  app.patch("/api/students/:id/update-student-id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId } = updateStudentIdSchema.parse(req.body);
      
      // Check if the student ID already exists (except for the current student)
      const existingStudent = await storage.getStudentByStudentId(studentId);
      if (existingStudent && existingStudent._id.toString() !== req.params.id) {
        return res.status(400).json({ message: 'Student ID already exists' });
      }
      
      const updatedStudent = await storage.updateStudentId(req.params.id, studentId);
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
      
      res.json(updatedStudent);
    } catch (err) {
      next(err);
    }
  });

  // Course routes
  app.get("/api/courses", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/courses/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/students/:id/courses", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await storage.getStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      
      const courses = await storage.getStudentCourses(student.studentId);
      res.json(courses);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/courses", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedCourse = courseSchema.parse(req.body);
      const course = await storage.createCourse(validatedCourse);
      res.status(201).json(course);
    } catch (err) {
      next(err);
    }
  });

  // Announcement routes
  app.get("/api/announcements", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/announcements", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedAnnouncement = announcementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(validatedAnnouncement);
      res.status(201).json(announcement);
    } catch (err) {
      next(err);
    }
  });

  // Apply error handling middleware
  app.use(handleErrors);

  return server;
}