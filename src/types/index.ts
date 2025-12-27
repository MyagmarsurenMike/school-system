// =============================================================================
// CORE TYPES - Fundamental types used throughout the application
// =============================================================================

/** User role type for permission-based UI */
export type UserRole = 'student' | 'teacher' | 'admin' | 'finance' | 'manager';

/** Sender roles - Only these roles can send messages */
export type SenderRole = Extract<UserRole, 'teacher' | 'manager' | 'finance'>;

/** Message delivery status */
export type MessageStatus = 'sent' | 'delivered' | 'read';

/** Message priority level */
export type MessagePriority = 'low' | 'normal' | 'high' | 'urgent';

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

/** Base interface for course-related entities */
interface CourseBase {
  courseCode: string;
  courseName: string;
}

// =============================================================================
// USER ENTITIES
// =============================================================================

/** Represents a student in the system */
export interface Student {
  id: string;
  name: string;
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
export interface Teacher {
  id: string;
  name: string;
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
export interface CalendarEvent {
  id: string;
  title: string;
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
export interface StudentPaymentPermission {
  major: any;
  year: number;
  studentId: string;
  name: string;
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
export interface Lecture {
  id: string;
  title: string;
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
  teacher: string;
  room: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  type: ScheduleType;
}

// =============================================================================
// LAYOUT COMPONENT TYPES
// =============================================================================

/** Menu item configuration for sidebar navigation */
export interface SidebarMenuItem {
  /** Unique key for the menu item */
  key: string;
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Label text or element (optional for dividers) */
  label?: React.ReactNode;
  /** Optional href for navigation links */
  href?: string;
  /** Mark as danger/destructive action */
  danger?: boolean;
  /** Nested menu items for submenus */
  children?: SidebarMenuItem[];
  /** Whether to render as divider */
  type?: 'divider' | 'group';
  /** Disable the menu item */
  disabled?: boolean;
}

/** Sidebar branding/logo configuration */
export interface SidebarBranding {
  /** Logo element or image URL */
  logo?: React.ReactNode;
  /** Title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
}

/** Sidebar component props */
export interface SidebarProps {
  /** Menu items configuration */
  items: SidebarMenuItem[];
  /** Currently active menu key */
  activeKey: string;
  /** Callback when menu item is clicked */
  onMenuClick: (key: string) => void;
  /** Branding configuration */
  branding?: SidebarBranding;
  /** Width of the sidebar in pixels */
  width?: number;
  /** Whether sidebar is collapsible */
  collapsible?: boolean;
  /** Current collapsed state */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapse?: (collapsed: boolean) => void;
  /** Mobile drawer visibility state */
  mobileOpen?: boolean;
  /** Callback to close mobile drawer */
  onMobileClose?: () => void;
  /** Custom class name */
  className?: string;
  /** Background color class */
  bgColor?: string;
  /** Footer content */
  footer?: React.ReactNode;
}

/** User dropdown menu item */
export interface UserMenuItem {
  key: string;
  /** Label text (optional for dividers) */
  label?: string;
  icon?: React.ReactNode;
  danger?: boolean;
  type?: 'divider';
}

/** Top header branding configuration */
export interface HeaderBranding {
  /** Logo element */
  logo?: React.ReactNode;
  /** Title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
}

/** Top header component props */
export interface TopHeaderProps {
  /** Branding configuration */
  branding?: HeaderBranding;
  /** User display name */
  userName?: string;
  /** User avatar URL */
  userAvatar?: string;
  /** User role to display */
  userRole?: UserRole;
  /** User dropdown menu items */
  userMenuItems?: UserMenuItem[];
  /** Callback when user menu item is clicked */
  onUserMenuClick?: (key: string) => void;
  /** Whether to show mobile menu toggle */
  showMobileToggle?: boolean;
  /** Callback when mobile menu toggle is clicked */
  onMobileMenuToggle?: () => void;
  /** Right side extra content */
  rightContent?: React.ReactNode;
  /** Center content */
  centerContent?: React.ReactNode;
  /** Height of the header */
  height?: number;
  /** Custom class name */
  className?: string;
  /** Whether header is fixed */
  fixed?: boolean;
}

/** Layout configuration for pages */
export interface LayoutConfig {
  /** Sidebar configuration */
  sidebar?: {
    items: SidebarMenuItem[];
    branding?: SidebarBranding;
    width?: number;
  };
  /** Header configuration */
  header?: {
    branding?: HeaderBranding;
    userMenuItems?: UserMenuItem[];
  };
}

// =============================================================================
// MESSAGING & NOTIFICATION ENTITIES
// =============================================================================

/** Represents a user who can send or receive messages */
export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  department?: string;
  photo?: string;
}

/** Represents a message in the system */
export interface Message {
  id: string;
  /** Sender user ID */
  senderId: string;
  /** Sender full details */
  sender: User;
  /** Receiver user ID */
  receiverId: string;
  /** Receiver full details */
  receiver: User;
  /** Message subject/title */
  subject: string;
  /** Message content/body */
  content: string;
  /** Message priority level */
  priority: MessagePriority;
  /** Current delivery status */
  status: MessageStatus;
  /** When the message was sent */
  sentAt: string;
  /** When the message was delivered (optional) */
  deliveredAt?: string;
  /** When the message was read (optional) */
  readAt?: string;
  /** Whether the message has attachments */
  hasAttachment?: boolean;
  /** Attachment URLs if any */
  attachments?: string[];
}

/** Input type for creating a new message */
export interface MessageInput {
  receiverId: string;
  subject: string;
  content: string;
  priority: MessagePriority;
  attachments?: File[];
}

/** Message statistics for dashboard */
export interface MessageStats {
  totalSent: number;
  totalReceived: number;
  unreadCount: number;
  readCount: number;
}

/** Filter criteria for message list */
export interface MessageFilter {
  status?: MessageStatus;
  priority?: MessagePriority;
  receiverRole?: UserRole;
  dateFrom?: string;
  dateTo?: string;
  searchTerm?: string;
}
