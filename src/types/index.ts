// =============================================================================
// CORE TYPES - Fundamental types used throughout the application
// =============================================================================

/** Supported languages for internationalization */
export type Language = 'mn' | 'en';

/** User role type for permission-based UI */
export type UserRole = 'student' | 'teacher' | 'admin' | 'finance';

/** Payment status type */
export type PaymentStatus = 'paid' | 'pending' | 'overdue';

/** Schedule class type */
export type ScheduleType = 'lecture' | 'lab' | 'tutorial';

/** Calendar event type */
export type CalendarEventType = 'exam' | 'assignment' | 'holiday' | 'event';

/** Lecture file type */
export type LectureFileType = 'pdf' | 'pptx' | 'docx' | 'video';

/** Course material type for student lecture viewing */
export type CourseMaterialType = 'pdf' | 'ppt';

// =============================================================================
// BASE INTERFACES - Common patterns used across entities
// =============================================================================

/** Base interface for entities with bilingual names */
interface BilingualEntity {
  name: string;
  nameEn: string;
}

/** Base interface for entities with bilingual titles */
interface BilingualTitleEntity {
  title: string;
  titleEn: string;
}

/** Base interface for course-related entities */
interface CourseBase {
  courseCode: string;
  courseName: string;
  courseNameEn: string;
}

// =============================================================================
// USER ENTITIES
// =============================================================================

/** Represents a student in the system */
export interface Student extends BilingualEntity {
  id: string;
  major: string;
  gpa: number;
  semester: string;
  year: number;
  email: string;
  phone: string;
  photo?: string;
  paymentStatus: PaymentStatus;
  canViewGrades: boolean;
}

/** Represents a teacher in the system */
export interface Teacher extends BilingualEntity {
  id: string;
  email: string;
  phone: string;
  department: string;
  photo?: string;
}

// =============================================================================
// ACADEMIC ENTITIES
// =============================================================================

/** Represents a course in the system */
export interface Course extends CourseBase {
  id: string;
  credits: number;
  teacherId: string;
  semester: string;
}

/** Represents a student's grade for a course */
export interface Grade extends CourseBase {
  id: string;
  credits: number;
  grade: string;
  gradePoint: number;
  semester: string;
  teacher: string;
}

/** Represents a class schedule entry */
export interface Schedule extends CourseBase {
  id: string;
  teacher: string;
  room: string;
  /** Day of week: 0-6 (Monday-Sunday) */
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  type: ScheduleType;
}

// =============================================================================
// CALENDAR & EVENTS
// =============================================================================

/** Represents a calendar event */
export interface CalendarEvent extends BilingualTitleEntity {
  id: string;
  date: string;
  type: CalendarEventType;
  description?: string;
}

// =============================================================================
// FINANCIAL ENTITIES
// =============================================================================

/** Represents a payment record */
export interface Payment {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  description: string;
}

/** Represents student payment permission status */
export interface StudentPaymentPermission extends BilingualEntity {
  studentName: any;
  studentId: string;
  paymentStatus: PaymentStatus;
  canViewGrades: boolean;
  totalAmount: number;
  paidAmount: number;
  semester: string;
}

// =============================================================================
// LECTURE & COURSE MATERIALS (Teacher Upload)
// =============================================================================

/** Represents an uploaded lecture file by a teacher */
export interface Lecture extends BilingualTitleEntity {
  id: string;
  courseId: string;
  description?: string;
  uploadDate: string;
  fileUrl: string;
  fileType: LectureFileType;
  fileSize: string;
}

// =============================================================================
// COURSE MATERIALS (Student View)
// =============================================================================

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

// =============================================================================
// INPUT/FORM TYPES
// =============================================================================

/** Input type for creating a new student */
export interface StudentInput {
  id: string;
  name: string;
  nameEn: string;
  major: string;
  year: number;
  email: string;
  phone: string;
  semester: string;
}

/** Input type for grade entry by teachers */
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

/** Input type for assigning a schedule to a student */
export interface StudentScheduleInput {
  studentId: string;
  courseCode: string;
  courseName: string;
  courseNameEn: string;
  teacher: string;
  room: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  type: ScheduleType;
}
