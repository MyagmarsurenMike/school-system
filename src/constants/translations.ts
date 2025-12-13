/**
 * Shared translations for common UI elements
 */

import { Language } from '@/types';

export interface PaymentStatusTranslations {
  paid: string;
  pending: string;
  overdue: string;
}

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

export interface CalendarTranslations {
  title: string;
  exam: string;
  assignment: string;
  holiday: string;
  event: string;
  upcomingEvents: string;
}

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

export interface TopHeaderTranslations {
  schoolName: string;
  semester: string;
  student: string;
  notifications: string;
}

export const paymentStatusTranslations: Record<Language, PaymentStatusTranslations> = {
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
};

export const commonTranslations: Record<Language, CommonTranslations> = {
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
};

export const gradesTranslations: Record<Language, GradesTranslations> = {
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
};

export const calendarTranslations: Record<Language, CalendarTranslations> = {
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
};

export const paymentsTableTranslations: Record<Language, PaymentsTableTranslations> = {
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
};

export const studentProfileTranslations: Record<Language, StudentProfileTranslations> = {
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
};

export const topHeaderTranslations: Record<Language, TopHeaderTranslations> = {
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
};

/**
 * Helper to get payment status color for Ant Design Tag
 */
export const getPaymentStatusColor = (status: 'paid' | 'pending' | 'overdue'): string => {
  const colors = {
    paid: 'green',
    pending: 'orange',
    overdue: 'red',
  };
  return colors[status];
};
