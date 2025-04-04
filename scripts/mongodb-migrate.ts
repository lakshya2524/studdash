import bcrypt from 'bcryptjs';
import connectToMongoDB from '../server/mongodb';
import { User, Student, Course, Announcement } from '../server/mongodb';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connectToMongoDB();
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Course.deleteMany({});
    await Announcement.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash('admin123', salt);
    
    const adminUser = await User.create({
      username: 'admin',
      passwordHash: adminPasswordHash,
      role: 'admin'
    });
    
    console.log('Created admin user');
    
    // Create sample courses
    const courses = await Course.insertMany([
      {
        name: 'Introduction to Computer Science',
        code: 'CS101',
        description: 'An introductory course to computer science concepts.',
        instructor: 'Dr. Alan Turing',
        schedule: 'Mon/Wed 10:00-11:30',
        room: 'B201'
      },
      {
        name: 'Data Structures and Algorithms',
        code: 'CS201',
        description: 'Advanced algorithms and data structures.',
        instructor: 'Dr. Grace Hopper',
        schedule: 'Tue/Thu 13:00-14:30',
        room: 'B101'
      },
      {
        name: 'Web Development',
        code: 'CS301',
        description: 'Modern web development techniques and frameworks.',
        instructor: 'Dr. Tim Berners-Lee',
        schedule: 'Wed/Fri 15:00-16:30',
        room: 'C305'
      },
      {
        name: 'Database Systems',
        code: 'CS401',
        description: 'Design and implementation of database systems.',
        instructor: 'Dr. Edgar Codd',
        schedule: 'Mon/Fri 9:00-10:30',
        room: 'A201'
      }
    ]);
    
    console.log('Created sample courses');
    
    // Create student users and student profiles
    const studentUsers = [];
    const students = [];
    
    const sampleStudents = [
      {
        username: 'john.doe',
        password: 'password123',
        studentId: 'ST12345',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gradeLevel: 10
      },
      {
        username: 'jane.smith',
        password: 'password123',
        studentId: 'ST12346',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        gradeLevel: 11
      },
      {
        username: 'bob.johnson',
        password: 'password123',
        studentId: 'ST12347',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        gradeLevel: 9
      }
    ];
    
    for (const studentData of sampleStudents) {
      const passwordHash = await bcrypt.hash(studentData.password, salt);
      
      // Create user
      const user = await User.create({
        username: studentData.username,
        passwordHash,
        role: 'student'
      });
      
      studentUsers.push(user);
      
      // Create student with courses
      const student = await Student.create({
        studentId: studentData.studentId,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        gradeLevel: studentData.gradeLevel,
        userId: user._id,
        courses: [courses[0]._id, courses[1]._id]  // Assign first two courses to each student
      });
      
      students.push(student);
      
      // Update course with student
      await Course.updateMany(
        { _id: { $in: [courses[0]._id, courses[1]._id] } },
        { $push: { students: student._id } }
      );
    }
    
    console.log('Created student users and profiles, and linked them to courses');
    
    // Create sample announcements
    await Announcement.insertMany([
      {
        title: 'Welcome to the new semester!',
        content: 'We are excited to welcome you all to the new academic year. Please check your schedules and make sure you have access to all your course materials.',
        author: 'Admin',
        date: new Date()
      },
      {
        title: 'System Maintenance',
        content: 'The student portal will be undergoing maintenance this Saturday from 2 AM to 5 AM. Please plan accordingly.',
        author: 'IT Department',
        date: new Date(Date.now() - 86400000)  // yesterday
      },
      {
        title: 'New Library Hours',
        content: 'The library will now be open until 10 PM on weekdays to accommodate evening study sessions.',
        author: 'Library Services',
        date: new Date(Date.now() - 172800000)  // 2 days ago
      }
    ]);
    
    console.log('Created sample announcements');
    console.log('Database seeded successfully!');
    
    // Exit process
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Execute the seed function
seedDatabase();