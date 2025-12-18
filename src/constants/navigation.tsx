/**
 * Navigation configuration for sidebar menus
 * @module constants/navigation
 */

import React from 'react';
import {
  HomeOutlined,
  UserOutlined,
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
  ArrowLeftOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { UserRole, SidebarMenuItem, UserMenuItem } from '@/types';

// =============================================================================
// NAVIGATION LABELS
// =============================================================================

export const NAV_LABELS = {
  // Common navigation
  home: 'Нүүр хуудас',
  calendar: 'Календарь',
  logout: 'Гарах',
  exit: 'Гарах',
  settings: 'Тохиргоо',
  profile: 'Профайл',
  notifications: 'Мэдэгдэл',
  
  // Student navigation
  studentInfo: 'Миний мэдээлэл',
  payments: 'Төлбөрийн мэдээлэл',
  surveys: 'Судалгаа',
  lessons: 'Хичээл',
  schedules: 'Сургалт',
  definitions: 'Тодорхойлолт',
  guides: 'Хэтэч',
  support: 'Хэтэч',
  
  // Teacher navigation
  dashboard: 'Хяналтын самбар',
  myCourses: 'Миний хичээлүүд',
  gradeEntry: 'Үнэлгээ оруулах',
  uploadLecture: 'Хичээл байршуулах',
  studentManager: 'Оюутны удирдлага',
  eLearning: 'Цахим сургалт',
  training: 'Сургалт',
  
  // Finance navigation
  financeManagement: 'Санхүүгийн удирдлага',
  gradePermissions: 'Дүнгийн эрх',

  // Manager navigation
  schedule: 'Хуваарь',
  scheduleMonthly: 'Сарын хуваарь',
  attendance: 'Ирц',
  reports: 'Тайлан',
  back: 'Буцах',
} as const;

// =============================================================================
// MENU ITEM GENERATORS
// =============================================================================

/**
 * Get sidebar menu items for a specific user role
 */
export const getSidebarMenuItems = (role: UserRole): SidebarMenuItem[] => {
  const menuConfigs: Record<UserRole, SidebarMenuItem[]> = {
    student: [
      { key: 'home', icon: <HomeOutlined />, label: NAV_LABELS.home },
      { key: 'lessons', icon: <BookOutlined />, label: NAV_LABELS.lessons },
      { key: 'student-info', icon: <UserOutlined />, label: NAV_LABELS.studentInfo },
      { key: 'payments', icon: <BankOutlined />, label: NAV_LABELS.payments },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: NAV_LABELS.logout, danger: true },
    ],

    teacher: [
      { key: 'dashboard', icon: <HomeOutlined />, label: NAV_LABELS.dashboard, href: '/teacher' },
      { key: 'courses', icon: <BookOutlined />, label: NAV_LABELS.myCourses },
      { key: 'grades', icon: <EditOutlined />, label: NAV_LABELS.gradeEntry },
      { key: 'upload', icon: <CloudUploadOutlined />, label: NAV_LABELS.uploadLecture },
      { 
        key: 'students', 
        icon: <TeamOutlined />, 
        label: NAV_LABELS.studentManager,
        href: '/teacher/student-manager',
      },
      { key: 'notifications', icon: <BellOutlined />, label: NAV_LABELS.notifications },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: NAV_LABELS.logout, danger: true },
    ],

    finance: [
      { key: 'dashboard', icon: <HomeOutlined />, label: NAV_LABELS.dashboard },
      { key: 'payments', icon: <BankOutlined />, label: NAV_LABELS.financeManagement },
      { key: 'permissions', icon: <SafetyCertificateOutlined />, label: NAV_LABELS.gradePermissions },
      { key: 'notfications', icon: <BellOutlined />, label: NAV_LABELS.notifications },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: NAV_LABELS.logout, danger: true },
    ],

    admin: [
      { key: 'dashboard', icon: <HomeOutlined />, label: NAV_LABELS.dashboard },
      { key: 'students', icon: <TeamOutlined />, label: NAV_LABELS.studentManager },
      { key: 'courses', icon: <BookOutlined />, label: NAV_LABELS.myCourses },
      { key: 'payments', icon: <BankOutlined />, label: NAV_LABELS.financeManagement },
      { key: 'settings', icon: <SettingOutlined />, label: NAV_LABELS.settings },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: NAV_LABELS.logout, danger: true },
    ],

    manager: [
      { key: 'dashboard', icon: <ArrowLeftOutlined />, label: NAV_LABELS.back, href: '/teacher' },
      { key: 'students', icon: <TeamOutlined />, label: NAV_LABELS.studentManager },
      { key: 'schedule', icon: <CalendarOutlined />, label: NAV_LABELS.schedule },
      { key: 'grade-permissions', icon: <SafetyCertificateOutlined />, label: NAV_LABELS.gradePermissions },
      { key: 'notfications', icon: <BellOutlined />, label: NAV_LABELS.notifications },
      { key: 'divider-1', type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: NAV_LABELS.logout, danger: true },
    ],
  };

  return menuConfigs[role];
};

/**
 * Get user dropdown menu items
 */
export const getUserMenuItems = (): UserMenuItem[] => {
  return [
    { key: 'profile', label: NAV_LABELS.profile, icon: <UserOutlined /> },
    { key: 'settings', label: NAV_LABELS.settings, icon: <SettingOutlined /> },
    { key: 'divider', type: 'divider' },
    { key: 'logout', label: NAV_LABELS.logout, danger: true },
  ];
};

/**
 * Get default branding for a user role
 */
export const getRoleBranding = (role: UserRole): { title: string; logo: React.ReactNode } => {
  const titles: Record<UserRole, string> = {
    student: 'Оюутны систем',
    teacher: 'Багшийн систем',
    finance: 'Санхүүгийн систем',
    admin: 'Админ систем',
    manager: 'Оюутны удирдлага',
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
    title: titles[role],
    logo: (
      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${logoColors[role]} rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-base sm:text-xl">
          {logoLetters[role]}
        </span>
      </div>
    ),
  };
};
