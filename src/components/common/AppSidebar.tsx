'use client';

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
  FormOutlined,
  BookOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  EditOutlined,
  CloudUploadOutlined,
  SettingOutlined,
  TeamOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Language, UserRole } from '@/types';
import { navigationTranslations, NavigationTranslations } from '@/constants/navigation';

type MenuItem = Required<MenuProps>['items'][number];

export interface AppSidebarProps {
  /** Current language */
  language?: Language;
  /** Currently active menu key */
  activeKey: string;
  /** Menu item click handler */
  onMenuClick: (key: string) => void;
  /** User role to determine menu items */
  role?: UserRole;
  /** Optional title/logo text */
  title?: string;
  /** Whether sidebar is fixed positioned */
  fixed?: boolean;
  /** Custom className */
  className?: string;
}

/** 
 * Get menu items based on user role 
 */
const getMenuItems = (
  role: UserRole, 
  t: NavigationTranslations
): MenuItem[] => {
  const studentItems: MenuItem[] = [
    { key: 'home', icon: <HomeOutlined />, label: t.home },
    { key: 'lessons', icon: <BookOutlined />, label: t.lessons },
    { key: 'student-info', icon: <UserOutlined />, label: t.studentInfo },
    { key: 'payments', icon: <DollarOutlined />, label: t.payments },
    { key: 'guides', icon: <QuestionCircleOutlined />, label: t.support },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
  ];

  const teacherItems: MenuItem[] = [
    { key: 'dashboard', icon: <HomeOutlined />, label: t.dashboard },
    { key: 'courses', icon: <BookOutlined />, label: t.myCourses },
    { key: 'grades', icon: <EditOutlined />, label: t.gradeEntry },
    { key: 'upload', icon: <CloudUploadOutlined />, label: t.uploadLecture },
    { 
      key: 'students', 
      icon: <TeamOutlined />, 
      label: <Link href="/teacher/student-manager">{t.studentManager}</Link>,
    },
    { key: 'settings', icon: <SettingOutlined />, label: t.settings },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
  ];

  const financeItems: MenuItem[] = [
    { key: 'dashboard', icon: <HomeOutlined />, label: t.dashboard },
    { key: 'payments', icon: <BankOutlined />, label: t.financeManagement },
    { key: 'permissions', icon: <SafetyCertificateOutlined />, label: t.gradePermissions },
    { key: 'settings', icon: <SettingOutlined />, label: t.settings },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
  ];

  const adminItems: MenuItem[] = [
    { key: 'dashboard', icon: <HomeOutlined />, label: t.dashboard },
    { key: 'students', icon: <TeamOutlined />, label: t.studentManager },
    { key: 'courses', icon: <BookOutlined />, label: t.myCourses },
    { key: 'payments', icon: <BankOutlined />, label: t.financeManagement },
    { key: 'settings', icon: <SettingOutlined />, label: t.settings },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
  ];

  const managerItems: MenuItem[] = [
    { key: 'dashboard', icon: <HomeOutlined />, label: t.dashboard },
    { key: 'schedule', icon: <CalendarOutlined />, label: t.schedule },
    { key: 'attendance', icon: <ClockCircleOutlined />, label: t.attendance },
    { key: 'reports', icon: <FileTextOutlined />, label: t.reports },
    { key: 'settings', icon: <SettingOutlined />, label: t.settings },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
  ];

  switch (role) {
    case 'teacher': return teacherItems;
    case 'finance': return financeItems;
    case 'admin': return adminItems;
    case 'manager': return managerItems;
    case 'student':
    default: return studentItems;
  }
};

/**
 * Unified sidebar component for all user roles
 * Supports student, teacher, finance, and admin navigation
 */
export const AppSidebar: React.FC<AppSidebarProps> = ({
  language = 'mn',
  activeKey,
  onMenuClick,
  role = 'student',
  title,
  fixed = true,
  className = '',
}) => {
  const t = navigationTranslations[language];
  const menuItems = getMenuItems(role, t);

  const baseClasses = `
    w-64 bg-white h-screen border-r border-gray-200 
    flex flex-col overflow-y-auto z-40
    ${fixed ? 'fixed left-0 top-0' : ''}
    ${className}
  `.trim();

  return (
    <div className={baseClasses}>
      {title && (
        <div className="h-16 flex items-center justify-center border-b border-gray-200 shrink-0">
          <h1 className="text-xl font-bold text-blue-600">{title}</h1>
        </div>
      )}
      <div className="flex-1 py-4">
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => onMenuClick(key)}
          items={menuItems}
          className="border-none"
          style={{ borderRight: 'none' }}
        />
      </div>
    </div>
  );
};

export default AppSidebar;
