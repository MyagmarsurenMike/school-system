/**
 * Shared translations for common UI elements
 * @module constants/translations
 */

import { Language, PaymentStatus } from '@/types';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** Generic type for bilingual translation records */
type TranslationRecord<T> = Readonly<Record<Language, T>>;

/** Payment status translations interface */
export interface PaymentStatusTranslations {
  paid: string;
  pending: string;
  overdue: string;
}

/** Common UI element translations interface */
export interface CommonTranslations {
  search: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  view: string;
  actions: string;
  total: string;
  yes: string;
  no: string;
  warning: string;
  success: string;
  error: string;
  profile: string;
  settings: string;
  logout: string;
  welcome: string;
  darkMode: string;
}

/** Grades table translations interface */
export interface GradesTranslations {
  title: string;
  courseCode: string;
  courseName: string;
  credits: string;
  grade: string;
  gradePoint: string;
  totalCourses: string;
  totalCredits: string;
  avgGrade: string;
}

/** Calendar translations interface */
export interface CalendarTranslations {
  title: string;
  exam: string;
  assignment: string;
  holiday: string;
  event: string;
  upcomingEvents: string;
}

/** Payments table translations interface */
export interface PaymentsTableTranslations {
  title: string;
  description: string;
  amount: string;
  dueDate: string;
  paidDate: string;
  status: string;
  paid: string;
  total: string;
  initialBalance: string;
  discount: string;
  paidAmount: string;
  pendingAmount: string;
  semesterFee: string;
}

/** Student profile translations interface */
export interface StudentProfileTranslations {
  profile: string;
  studentId: string;
  major: string;
  year: string;
  gpa: string;
  email: string;
  phone: string;
  semester: string;
  yearSuffix: string;
}

/** Top header translations interface */
export interface TopHeaderTranslations {
  schoolName: string;
  semester: string;
  student: string;
  notifications: string;
}

// =============================================================================
// TRANSLATION DATA
// =============================================================================

export const paymentStatusTranslations: TranslationRecord<PaymentStatusTranslations> = {
  mn: {
    paid: 'Төлсөн',
    pending: 'Хүлээгдэж буй',
    overdue: 'Хугацаа хэтэрсэн',
  },
  en: {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
  },
} as const;

export const commonTranslations: TranslationRecord<CommonTranslations> = {
  mn: {
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
  },
  en: {
    search: 'Search',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    actions: 'Actions',
    total: 'Total',
    yes: 'Yes',
    no: 'No',
    warning: 'Warning',
    success: 'Success',
    error: 'Error',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    welcome: 'Welcome',
    darkMode: 'Dark Mode',
  },
} as const;

export const gradesTranslations: TranslationRecord<GradesTranslations> = {
  mn: {
    title: 'Дүнгийн хүснэгт',
    courseCode: 'Код',
    courseName: 'Багш',
    credits: 'Кредит',
    grade: 'Үнэлгээ',
    gradePoint: 'Оноо',
    totalCourses: 'Хичээл',
    totalCredits: 'Нийт кредит',
    avgGrade: 'Дундаж',
  },
  en: {
    title: 'Grade Report',
    courseCode: 'Code',
    courseName: 'Instructor',
    credits: 'Credits',
    grade: 'Grade',
    gradePoint: 'Points',
    totalCourses: 'Courses',
    totalCredits: 'Total Credits',
    avgGrade: 'Average',
  },
} as const;

export const calendarTranslations: TranslationRecord<CalendarTranslations> = {
  mn: {
    title: 'Календарь',
    exam: 'Шалгалт',
    assignment: 'Даалгавар',
    holiday: 'Амралт',
    event: 'Үйл явдал',
    upcomingEvents: 'Ирэх үйл явдлууд',
  },
  en: {
    title: 'Academic Calendar',
    exam: 'Exam',
    assignment: 'Assignment',
    holiday: 'Holiday',
    event: 'Event',
    upcomingEvents: 'Upcoming Events',
  },
} as const;

export const paymentsTableTranslations: TranslationRecord<PaymentsTableTranslations> = {
  mn: {
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
  },
  en: {
    title: 'Payment Information',
    description: 'Description',
    amount: 'Amount',
    dueDate: 'Due Date',
    paidDate: 'Paid Date',
    status: 'Status',
    paid: 'Paid',
    total: 'Total',
    initialBalance: 'Initial Balance',
    discount: 'Discount',
    paidAmount: 'Paid',
    pendingAmount: 'Pending Amount',
    semesterFee: 'Semester Tuition Fee',
  },
} as const;

export const studentProfileTranslations: TranslationRecord<StudentProfileTranslations> = {
  mn: {
    profile: 'Оюутны мэдээлэл',
    studentId: 'Оюутны дугаар',
    major: 'Мэргэжил',
    year: 'Курс',
    gpa: 'Голч дүн',
    email: 'И-мэйл',
    phone: 'Утас',
    semester: 'Улирал',
    yearSuffix: 'курс',
  },
  en: {
    profile: 'Student Profile',
    studentId: 'Student ID',
    major: 'Major',
    year: 'Year',
    gpa: 'GPA',
    email: 'Email',
    phone: 'Phone',
    semester: 'Semester',
    yearSuffix: 'year',
  },
} as const;

export const topHeaderTranslations: TranslationRecord<TopHeaderTranslations> = {
  mn: {
    schoolName: 'Шинэ Монгол технологийн коллеж',
    semester: '2025-2026, Намар',
    student: 'Оюутан',
    notifications: 'Мэдэгдэл',
  },
  en: {
    schoolName: 'Shine Mongol Technology College',
    semester: '2025-2026, Fall',
    student: 'Student',
    notifications: 'Notifications',
  },
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Color mapping for payment status (Ant Design tag colors) */
const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  paid: 'green',
  pending: 'orange',
  overdue: 'red',
} as const;

/**
 * Get the Ant Design tag color for a payment status
 * @param status - The payment status
 * @returns Ant Design color string
 */
export const getPaymentStatusColor = (status: PaymentStatus): string => {
  return PAYMENT_STATUS_COLORS[status];
};

// =============================================================================
// UNIFIED TRANSLATION ACCESSOR
// =============================================================================

/** All available translation namespaces */
export interface AllTranslations {
  common: CommonTranslations;
  paymentStatus: PaymentStatusTranslations;
  grades: GradesTranslations;
  calendar: CalendarTranslations;
  paymentsTable: PaymentsTableTranslations;
  studentProfile: StudentProfileTranslations;
  topHeader: TopHeaderTranslations;
}

/**
 * Get all translations for a specific language
 * @param language - Target language code
 * @returns All translation namespaces for the language
 */
export const getTranslations = (language: Language): AllTranslations => ({
  common: commonTranslations[language],
  paymentStatus: paymentStatusTranslations[language],
  grades: gradesTranslations[language],
  calendar: calendarTranslations[language],
  paymentsTable: paymentsTableTranslations[language],
  studentProfile: studentProfileTranslations[language],
  topHeader: topHeaderTranslations[language],
});
