/**
 * Navigation and sidebar translations
 * @module constants/navigation
 */

import { Language } from '@/types';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** Generic type for bilingual translation records */
type TranslationRecord<T> = Readonly<Record<Language, T>>;

/** Navigation translations interface */
export interface NavigationTranslations {
  // Common navigation
  home: string;
  calendar: string;
  logout: string;
  exit: string;
  settings: string;
  
  // Student navigation
  studentInfo: string;
  payments: string;
  surveys: string;
  lessons: string;
  schedules: string;
  definitions: string;
  guides: string;
  support: string;
  
  // Teacher navigation
  dashboard: string;
  myCourses: string;
  gradeEntry: string;
  uploadLecture: string;
  studentManager: string;
  eLearning: string;
  training: string;
  
  // Finance navigation
  financeManagement: string;
  gradePermissions: string;
}

// =============================================================================
// TRANSLATION DATA
// =============================================================================

export const navigationTranslations: TranslationRecord<NavigationTranslations> = {
  mn: {
    // Common
    home: 'Нүүр хуудас',
    calendar: 'Календарь',
    logout: 'Гарах',
    exit: 'Гарах',
    settings: 'Тохиргоо',
    
    // Student
    studentInfo: 'Миний мэдээлэл',
    payments: 'Төлбөрийн мэдээлэл',
    surveys: 'Судалгаа',
    lessons: 'Хичээл',
    schedules: 'Сургалт',
    definitions: 'Тодорхойлолт',
    guides: 'Хэтэч',
    support: 'Хэтэч',
    
    // Teacher
    dashboard: 'Хяналтын самбар',
    myCourses: 'Миний хичээлүүд',
    gradeEntry: 'Үнэлгээ оруулах',
    uploadLecture: 'Хичээл байршуулах',
    studentManager: 'Оюутны удирдлага',
    eLearning: 'Цахим сургалт',
    training: 'Сургалт',
    
    // Finance
    financeManagement: 'Санхүүгийн удирдлага',
    gradePermissions: 'Дүнгийн эрх',
  },
  en: {
    // Common
    home: 'Home',
    calendar: 'Calendar',
    logout: 'Logout',
    exit: 'Exit',
    settings: 'Settings',
    
    // Student
    studentInfo: 'My Info',
    payments: 'Payments',
    surveys: 'Surveys',
    lessons: 'Lessons',
    schedules: 'Schedules',
    definitions: 'Definitions',
    guides: 'Guides',
    support: 'Support',
    
    // Teacher
    dashboard: 'Dashboard',
    myCourses: 'My Courses',
    gradeEntry: 'Grade Entry',
    uploadLecture: 'Upload Lecture',
    studentManager: 'Student Manager',
    eLearning: 'E-Learning',
    training: 'Training',
    
    // Finance
    financeManagement: 'Finance Management',
    gradePermissions: 'Grade Permissions',
  },
} as const;
