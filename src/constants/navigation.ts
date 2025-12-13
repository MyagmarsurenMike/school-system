/**
 * Navigation and sidebar translations
 */

import { Language, UserRole } from '@/types';

export interface NavigationTranslations {
  home: string;
  calendar: string;
  studentInfo: string;
  payments: string;
  surveys: string;
  lessons: string;
  schedules: string;
  definitions: string;
  guides: string;
  exit: string;
  logout: string;
  dashboard: string;
  myCourses: string;
  gradeEntry: string;
  uploadLecture: string;
  studentManager: string;
  settings: string;
  eLearning: string;
  training: string;
  support: string;
  financeManagement: string;
  gradePermissions: string;
}

export const navigationTranslations: Record<Language, NavigationTranslations> = {
  mn: {
    home: 'Нүүр хуудас',
    calendar: 'Календарь',
    studentInfo: 'Миний мэдээлэл',
    payments: 'Төлбөрийн мэдээлэл',
    surveys: 'Судалгаа',
    lessons: 'Хичээл',
    schedules: 'Сургалт',
    definitions: 'Тодорхойлолт',
    guides: 'Хэтэч',
    exit: 'Гарах',
    logout: 'Гарах',
    dashboard: 'Хяналтын самбар',
    myCourses: 'Миний хичээлүүд',
    gradeEntry: 'Үнэлгээ оруулах',
    uploadLecture: 'Хичээл байршуулах',
    studentManager: 'Оюутны удирдлага',
    settings: 'Тохиргоо',
    eLearning: 'Цахим сургалт',
    training: 'Сургалт',
    support: 'Хэтэч',
    financeManagement: 'Санхүүгийн удирдлага',
    gradePermissions: 'Дүнгийн эрх',
  },
  en: {
    home: 'Home',
    calendar: 'Calendar',
    studentInfo: 'My Info',
    payments: 'Payments',
    surveys: 'Surveys',
    lessons: 'Lessons',
    schedules: 'Schedules',
    definitions: 'Definitions',
    guides: 'Guides',
    exit: 'Exit',
    logout: 'Logout',
    dashboard: 'Dashboard',
    myCourses: 'My Courses',
    gradeEntry: 'Grade Entry',
    uploadLecture: 'Upload Lecture',
    studentManager: 'Student Manager',
    settings: 'Settings',
    eLearning: 'E-Learning',
    training: 'Training',
    support: 'Support',
    financeManagement: 'Finance Management',
    gradePermissions: 'Grade Permissions',
  },
};
