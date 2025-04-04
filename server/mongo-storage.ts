import bcrypt from 'bcryptjs';
import { User, Student, Course, Announcement } from './mongodb';

export interface IStorage {
  // User methods
  getUser(id: string): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Student methods
  getStudent(id: string): Promise<any | undefined>;
  getStudentByStudentId(studentId: string): Promise<any | undefined>;
  getAllStudents(): Promise<any[]>;
  createStudent(student: any): Promise<any>;
  updateStudentId(id: string, studentId: string): Promise<any | undefined>;
  
  // Course methods
  getCourse(id: string): Promise<any | undefined>;
  getAllCourses(): Promise<any[]>;
  getStudentCourses(studentId: string): Promise<any[]>;
  createCourse(course: any): Promise<any>;
  
  // Announcement methods
  getAnnouncements(): Promise<any[]>;
  createAnnouncement(announcement: any): Promise<any>;
}

export class MongoDBStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<any | undefined> {
    try {
      const user = await User.findById(id);
      return user || undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    try {
      const user = await User.findOne({ username });
      return user || undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(userData: any): Promise<any> {
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(userData.password, salt);

      // Create a new user with the hashed password
      const user = new User({
        username: userData.username,
        passwordHash,
        role: userData.role || 'student'
      });

      await user.save();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Student methods
  async getStudent(id: string): Promise<any | undefined> {
    try {
      const student = await Student.findById(id).populate('courses');
      return student || undefined;
    } catch (error) {
      console.error('Error getting student:', error);
      return undefined;
    }
  }

  async getStudentByStudentId(studentId: string): Promise<any | undefined> {
    try {
      const student = await Student.findOne({ studentId }).populate('courses');
      return student || undefined;
    } catch (error) {
      console.error('Error getting student by studentId:', error);
      return undefined;
    }
  }

  async getAllStudents(): Promise<any[]> {
    try {
      const students = await Student.find().populate('courses');
      return students;
    } catch (error) {
      console.error('Error getting all students:', error);
      return [];
    }
  }

  async createStudent(studentData: any): Promise<any> {
    try {
      const student = new Student(studentData);
      await student.save();
      return student;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  async updateStudentId(id: string, studentId: string): Promise<any | undefined> {
    try {
      const student = await Student.findByIdAndUpdate(
        id,
        { studentId },
        { new: true }
      );
      return student || undefined;
    } catch (error) {
      console.error('Error updating student ID:', error);
      return undefined;
    }
  }

  // Course methods
  async getCourse(id: string): Promise<any | undefined> {
    try {
      const course = await Course.findById(id).populate('students');
      return course || undefined;
    } catch (error) {
      console.error('Error getting course:', error);
      return undefined;
    }
  }

  async getAllCourses(): Promise<any[]> {
    try {
      const courses = await Course.find().populate('students');
      return courses;
    } catch (error) {
      console.error('Error getting all courses:', error);
      return [];
    }
  }

  async getStudentCourses(studentId: string): Promise<any[]> {
    try {
      const student = await Student.findOne({ studentId }).populate('courses');
      return student ? student.courses : [];
    } catch (error) {
      console.error('Error getting student courses:', error);
      return [];
    }
  }

  async createCourse(courseData: any): Promise<any> {
    try {
      const course = new Course(courseData);
      await course.save();
      return course;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  // Announcement methods
  async getAnnouncements(): Promise<any[]> {
    try {
      const announcements = await Announcement.find().sort({ date: -1 });
      return announcements;
    } catch (error) {
      console.error('Error getting announcements:', error);
      return [];
    }
  }

  async createAnnouncement(announcementData: any): Promise<any> {
    try {
      const announcement = new Announcement(announcementData);
      await announcement.save();
      return announcement;
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    }
  }
}

export const storage = new MongoDBStorage();