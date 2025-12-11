export interface Student {
  id: string;
  name: string;
  nameEn: string;
  major: string;
  gpa: number;
  semester: string;
  year: number;
  email: string;
  phone: string;
  photo?: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  canViewGrades: boolean;
}

export interface Grade {
  id: string;
  courseCode: string;
  courseName: string;
  courseNameEn: string;
  credits: number;
  grade: string;
  gradePoint: number;
  semester: string;
  teacher: string;
}

export interface Schedule {
  id: string;
  courseCode: string;
  courseName: string;
  courseNameEn: string;
  teacher: string;
  room: string;
  dayOfWeek: number; // 0-6 (Monday-Sunday)
  startTime: string;
  endTime: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

export interface CalendarEvent {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  type: 'exam' | 'assignment' | 'holiday' | 'event';
  description?: string;
}

export interface Payment {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export type Language = 'mn' | 'en';

export interface Teacher {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  phone: string;
  department: string;
  photo?: string;
}

export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  courseNameEn: string;
  credits: number;
  teacherId: string;
  semester: string;
}

export interface StudentGradeInput {
  studentId: string;
  studentName: string;
  studentNameEn: string;
  courseId: string;
  grade?: string;
  gradePoint?: number;
  attendance?: number;
  midtermScore?: number;
  finalScore?: number;
}

/** Represents an uploaded lecture file by a teacher */
export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  titleEn: string;
  description?: string;
  uploadDate: string;
  fileUrl: string;
  fileType: 'pdf' | 'pptx' | 'docx' | 'video';
  fileSize: string;
}

export interface StudentPaymentPermission {
  studentId: string;
  studentName: string;
  studentNameEn: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  canViewGrades: boolean;
  totalAmount: number;
  paidAmount: number;
  semester: string;
}

// --- COURSE MATERIAL TYPES (for student lecture viewing) ---

/** Defines the types of course materials (e.g., PDF, PPT) */
export type CourseMaterialType = 'pdf' | 'ppt';

/** Represents a single course material file attached to a lecture */
export interface CourseMaterial {
  type: CourseMaterialType;
  name: string;
  url: string;
}

/** Represents a single lecture item within a subject (student view) */
export interface CourseLecture {
  id: number;
  title: string;
  description: string;
  materials: CourseMaterial[];
}

/** Represents a subject/course containing multiple lectures (student view) */
export interface Subject {
  id: number;
  title: string;
  description: string;
  credit: number;
  teacher: string;
  lectures: CourseLecture[];
}
