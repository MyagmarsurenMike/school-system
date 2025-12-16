'use client';

import React, { useMemo } from 'react';
import { Menu, Drawer } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
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
  /** Controls mobile drawer visibility */
  mobileOpen?: boolean;
  /** Callback to close mobile drawer */
  onMobileClose?: () => void;
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
  onMenuClick,
  mobileOpen = false,
  onMobileClose,
}: LeftSidebarProps) {
  const translations = navigationTranslations[language];
  const menuItems = useMemo(() => createMenuItems(translations), [translations]);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    onMenuClick(key);
    // Close mobile drawer after selection
    onMobileClose?.();
  };

  const menuContent = (
    <Menu
      mode="inline"
      selectedKeys={[activeKey]}
      onClick={handleMenuClick}
      items={menuItems}
      className="border-none bg-gray-50 pt-2"
      style={{ height: '100%' }}
    />
  );

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-52 bg-gray-50 border-r border-gray-200 overflow-y-auto z-40">
        {menuContent}
      </aside>

      {/* Mobile Drawer - Only renders on mobile */}
      <div className="md:hidden">
        <Drawer
          placement="left"
          onClose={onMobileClose}
          open={mobileOpen}
          width={280}
          styles={{
            body: { padding: 0, backgroundColor: '#f9fafb' },
            header: { backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
          }}
          title={
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">О</span>
              </div>
              <span className="font-semibold text-gray-900">
                {language === 'mn' ? 'Цэс' : 'Menu'}
              </span>
            </div>
          }
          closeIcon={<CloseOutlined className="text-gray-500" />}
        >
          {menuContent}
        </Drawer>
      </div>
    </>
  );
}
