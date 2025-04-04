import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { log } from './vite';

// Define schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'teacher'], default: 'student' }
});

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  gradeLevel: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  instructor: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  schedule: { type: String },
  room: { type: String }
});

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String }
});

// Export models
export const User = mongoose.model('User', userSchema);
export const Student = mongoose.model('Student', studentSchema);
export const Course = mongoose.model('Course', courseSchema);
export const Announcement = mongoose.model('Announcement', announcementSchema);

// Connect to MongoDB
let mongoServer: MongoMemoryServer;

const connectToMongoDB = async () => {
  try {
    // Create an in-memory MongoDB instance for development
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connect to the in-memory MongoDB instance
    await mongoose.connect(mongoUri);
    
    log('Connected to MongoDB in-memory server');
    
    // Handle connection errors
    mongoose.connection.on('error', (error) => {
      log(`MongoDB connection error: ${error}`);
    });
    
    // Close the connection when the application is terminated
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      if (mongoServer) {
        await mongoServer.stop();
      }
      log('MongoDB connection closed');
      process.exit(0);
    });
    
    return mongoose.connection;
  } catch (error) {
    log(`Failed to connect to MongoDB: ${error}`);
    throw error;
  }
};

export default connectToMongoDB;