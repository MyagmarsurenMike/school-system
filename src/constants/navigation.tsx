/**
 * Navigation configuration for sidebar menus
 * @module constants/navigation
 */

import React from 'react';
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  EditOutlined,
  CloudUploadOutlined,
  SettingOutlined,
  TeamOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  LeftSquareOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Language, UserRole, SidebarMenuItem, UserMenuItem } from '@/types';

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

  // Manager navigation
  schedule: string;
  scheduleMonthly: string;
  attendance: string;
  reports: string;

  // User menu
  profile: string;
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
    profile: 'Профайл',
    
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

    // Manager
    schedule: 'Хуваарь',
    scheduleMonthly: 'Сарын хуваарь',
    attendance: 'Ирц',
    reports: 'Тайлан',
  },
  en: {
    // Common
    home: 'Home',
    calendar: 'Calendar',
    logout: 'Logout',
    exit: 'Exit',
    settings: 'Settings',
    profile: 'Profile',
    
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

    // Manager
    schedule: 'Schedule',
    scheduleMonthly: 'Monthly Schedule',
    attendance: 'Attendance',
    reports: 'Reports',
  },
} as const;

// =============================================================================
// MENU ITEM GENERATORS
// =============================================================================

/**
 * Get sidebar menu items for a specific user role
 */
export const getSidebarMenuItems = (
  role: UserRole,
  language: Language = 'mn'
): SidebarMenuItem[] => {
  const t = navigationTranslations[language];

  const menuConfigs: Record<UserRole, SidebarMenuItem[]> = {
    student: [
      { key: 'home', icon: <HomeOutlined />, label: t.home },
      { key: 'lessons', icon: <BookOutlined />, label: t.lessons },
      { key: 'student-info', icon: <UserOutlined />, label: t.studentInfo },
      { key: 'payments', icon: <DollarOutlined />, label: t.payments },
      { key: 'guides', icon: <QuestionCircleOutlined />, label: t.support },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
    ],

    teacher: [
      { key: 'dashboard', icon: <HomeOutlined />, label: t.dashboard, href: '/teacher' },
      { key: 'courses', icon: <BookOutlined />, label: t.myCourses },
      { key: 'grades', icon: <EditOutlined />, label: t.gradeEntry },
      { key: 'upload', icon: <CloudUploadOutlined />, label: t.uploadLecture },
      { 
        key: 'students', 
        icon: <TeamOutlined />, 
        label: t.studentManager,
        href: '/teacher/student-manager',
      },
      { key: 'settings', icon: <SettingOutlined />, label: t.settings },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
    ],

    finance: [
      { key: 'dashboard', icon: <HomeOutlined />, label: t.dashboard },
      { key: 'payments', icon: <BankOutlined />, label: t.financeManagement },
      { key: 'permissions', icon: <SafetyCertificateOutlined />, label: t.gradePermissions },
      { key: 'settings', icon: <SettingOutlined />, label: t.settings },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
    ],

    admin: [
      { key: 'dashboard', icon: <HomeOutlined />, label: t.dashboard },
      { key: 'students', icon: <TeamOutlined />, label: t.studentManager },
      { key: 'courses', icon: <BookOutlined />, label: t.myCourses },
      { key: 'payments', icon: <BankOutlined />, label: t.financeManagement },
      { key: 'settings', icon: <SettingOutlined />, label: t.settings },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
    ],

    manager: [
      { key: 'dashboard', icon: <ArrowLeftOutlined />, label: 'Буцах', href: '/teacher' },
      { key: 'students', icon: <TeamOutlined />, label: t.studentManager },
      { key: 'schedule', icon: <CalendarOutlined />, label: t.schedule },
      { key: 'attendance', icon: <ClockCircleOutlined />, label: t.attendance },
      { key: 'reports', icon: <FileTextOutlined />, label: t.reports },
      { key: 'settings', icon: <SettingOutlined />, label: t.settings },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
    ],
  };

  return menuConfigs[role];
};

/**
 * Get user dropdown menu items
 */
export const getUserMenuItems = (language: Language = 'mn'): UserMenuItem[] => {
  const t = navigationTranslations[language];

  return [
    { key: 'profile', label: t.profile, icon: <UserOutlined /> },
    { key: 'settings', label: t.settings, icon: <SettingOutlined /> },
    { key: 'divider', type: 'divider' },
    { key: 'logout', label: t.logout, danger: true },
  ];
};

/**
 * Get default branding for a user role
 */
export const getRoleBranding = (
  role: UserRole,
  language: Language = 'mn'
): { title: string; logo: React.ReactNode } => {
  const titles: Record<UserRole, Record<Language, string>> = {
    student: { mn: 'Оюутны систем', en: 'Student Portal' },
    teacher: { mn: 'Багшийн систем', en: 'Teacher Portal' },
    finance: { mn: 'Санхүүгийн систем', en: 'Finance Portal' },
    admin: { mn: 'Админ систем', en: 'Admin Portal' },
    manager: { mn: 'Оюутны удирдлага', en: 'Student Manager' },
  };

  const logoColors: Record<UserRole, string> = {
    student: 'bg-blue-600',
    teacher: 'bg-purple-600',
    finance: 'bg-green-600',
    admin: 'bg-red-600',
    manager: 'bg-indigo-600',
  };

  const logoLetters: Record<UserRole, string> = {
    student: 'О',
    teacher: 'Б',
    finance: 'С',
    admin: 'А',
    manager: 'У',
  };

  return {
    title: titles[role][language],
    logo: (
      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${logoColors[role]} rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-base sm:text-xl">
          {logoLetters[role]}
        </span>
      </div>
    ),
  };
};
