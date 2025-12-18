/**
 * Mongolian translations for common UI elements
 * @module constants/translations
 */

import { PaymentStatus } from '@/types';

// =============================================================================
// PAYMENT STATUS TRANSLATIONS
// =============================================================================

/** Payment status translations */
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: 'Төлсөн',
  pending: 'Хүлээгдэж буй',
  overdue: 'Хугацаа хэтэрсэн',
} as const;

/** Color mapping for payment status (Ant Design tag colors) */
export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  paid: 'green',
  pending: 'orange',
  overdue: 'red',
} as const;

/**
 * Get the Ant Design tag color for a payment status
 */
export const getPaymentStatusColor = (status: PaymentStatus): string => {
  return PAYMENT_STATUS_COLORS[status];
};

/**
 * Get the label for a payment status
 */
export const getPaymentStatusLabel = (status: PaymentStatus): string => {
  return PAYMENT_STATUS_LABELS[status];
};

// =============================================================================
// COMMON UI TRANSLATIONS
// =============================================================================

export const COMMON_LABELS = {
  search: 'Хайх',
  save: 'Хадгалах',
  cancel: 'Цуцлах',
  edit: 'Засах',
  delete: 'Устгах',
  view: 'Харах',
  actions: 'Үйлдэл',
  total: 'Нийт',
  yes: 'Тийм',
  no: 'Үгүй',
  warning: 'Анхааруулга',
  success: 'Амжилттай',
  error: 'Алдаа',
  profile: 'Профайл',
  settings: 'Тохиргоо',
  logout: 'Гарах',
  welcome: 'Тавтай морил',
  darkMode: 'Харанхуй горим',
} as const;

// =============================================================================
// GRADES TABLE TRANSLATIONS
// =============================================================================

export const GRADES_LABELS = {
  title: 'Дүнгийн хүснэгт',
  courseCode: 'Код',
  courseName: 'Багш',
  credits: 'Кредит',
  grade: 'Үнэлгээ',
  gradePoint: 'Оноо',
  totalCourses: 'Хичээл',
  totalCredits: 'Нийт кредит',
  avgGrade: 'Дундаж',
  total: 'Нийт',
} as const;

// =============================================================================
// CALENDAR TRANSLATIONS
// =============================================================================

export const CALENDAR_LABELS = {
  title: 'Календарь',
  exam: 'Шалгалт',
  assignment: 'Даалгавар',
  holiday: 'Амралт',
  event: 'Үйл явдал',
  upcomingEvents: 'Ирэх үйл явдлууд',
} as const;

// =============================================================================
// PAYMENTS TABLE TRANSLATIONS
// =============================================================================

export const PAYMENTS_LABELS = {
  title: 'Төлбөрийн мэдээлэл',
  description: 'Тайлбар',
  amount: 'Дүн',
  dueDate: 'Хугацаа',
  paidDate: 'Төлсөн огноо',
  status: 'Төлөв',
  paid: 'Төлсөн',
  total: 'Нийт',
  initialBalance: 'Эхний үлдэгдэл',
  discount: 'Хөнгөлөлт',
  paidAmount: 'Төлсөн',
  pendingAmount: 'Дутуу төлбөр',
  semesterFee: 'оны сургалтын төлбөр',
} as const;

// =============================================================================
// STUDENT PROFILE TRANSLATIONS
// =============================================================================

export const STUDENT_PROFILE_LABELS = {
  profile: 'Оюутны мэдээлэл',
  studentId: 'Оюутны дугаар',
  major: 'Мэргэжил',
  year: 'Курс',
  gpa: 'Голч дүн',
  email: 'И-мэйл',
  phone: 'Утас',
  semester: 'Улирал',
  yearSuffix: 'курс',
} as const;

// =============================================================================
// STUDENT MANAGER TRANSLATIONS
// =============================================================================

export const STUDENT_MANAGER_LABELS = {
  title: 'Оюутны удирдлага',
  subtitle: 'Оюутан нэмэх болон долоо хоногийн хуваарь оруулах',
  dashboard: 'Хяналтын самбар',
  studentManager: 'Оюутны удирдлага',
  schedule: 'Хуваарь',
  attendance: 'Ирц',
  reports: 'Тайлан',
  quickActions: 'Шуурхай үйлдлүүд',
  selectAction: 'Үйлдэл сонгох',
  totalStudents: 'Нийт оюутан',
  totalSchedules: 'Нийт хуваарь',
  activeClasses: 'Идэвхтэй анги',
  pendingReports: 'Хүлээгдэж буй тайлан',
  comingSoon: 'Удахгүй бэлэн болно',
  notifications: 'Мэдэгдэл',
} as const;

// =============================================================================
// TOP HEADER TRANSLATIONS
// =============================================================================

export const HEADER_LABELS = {
  schoolName: 'Шинэ Монгол технологийн коллеж',
  semester: '2025-2026, Намар',
  student: 'Оюутан',
  notifications: 'Мэдэгдэл',
} as const;
