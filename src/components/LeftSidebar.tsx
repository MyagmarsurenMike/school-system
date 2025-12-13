'use client';

import React, { useMemo } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  BookOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Language } from '@/types';
import { navigationTranslations, NavigationTranslations } from '@/constants/navigation';

// =============================================================================
// TYPES
// =============================================================================

interface LeftSidebarProps {
  language: Language;
  activeKey: string;
  onMenuClick: (key: string) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

// =============================================================================
// CONSTANTS
// =============================================================================

/** Sidebar menu item keys */
const MENU_KEYS = {
  HOME: 'home',
  LESSONS: 'lessons',
  STUDENT_INFO: 'student-info',
  PAYMENTS: 'payments',
  GUIDES: 'guides',
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const createMenuItems = (t: NavigationTranslations): MenuItem[] => [
  { key: MENU_KEYS.HOME, icon: <HomeOutlined />, label: t.home },
  { key: MENU_KEYS.LESSONS, icon: <BookOutlined />, label: t.lessons },
  { key: MENU_KEYS.STUDENT_INFO, icon: <UserOutlined />, label: t.studentInfo },
  { key: MENU_KEYS.PAYMENTS, icon: <DollarOutlined />, label: t.payments },
  { key: MENU_KEYS.GUIDES, icon: <QuestionCircleOutlined />, label: t.support },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function LeftSidebar({ 
  language, 
  activeKey, 
  onMenuClick 
}: LeftSidebarProps) {
  const translations = navigationTranslations[language];
  const menuItems = useMemo(() => createMenuItems(translations), [translations]);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    onMenuClick(key);
  };

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-64px)] w-52 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        onClick={handleMenuClick}
        items={menuItems}
        className="border-none bg-gray-50 pt-2"
        style={{ height: '100%' }}
      />
    </div>
  );
}
