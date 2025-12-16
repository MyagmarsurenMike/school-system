'use client';

import React from 'react';
import { Avatar, Dropdown, Space, Button } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DownOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Language } from '@/types';
import { topHeaderTranslations, commonTranslations } from '@/constants/translations';

interface TopHeaderProps {
  language: Language;
  activeKey: string;
  onMenuClick: (key: string) => void;
  onLanguageChange: (lang: Language) => void;
  studentName: string;
  /** Callback to toggle mobile sidebar */
  onMobileMenuToggle?: () => void;
}

export default function TopHeader({ 
  language, 
  activeKey, 
  onMenuClick, 
  onLanguageChange, 
  studentName,
  onMobileMenuToggle,
}: TopHeaderProps) {
  const t = topHeaderTranslations[language];
  const common = commonTranslations[language];

  const userMenuItems = [
    { key: 'profile', label: common.profile, icon: <UserOutlined /> },
    { key: 'settings', label: common.settings, icon: <SettingOutlined /> },
    { type: 'divider' as const },
    { key: 'logout', label: common.logout, danger: true },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-3 sm:px-6 h-14 sm:h-16">
        {/* Left side: Hamburger + Logo */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Hamburger Menu Button - Mobile only (wrapped in div for proper Tailwind hiding) */}
          <div className="block md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined className="text-lg" />}
              onClick={onMobileMenuToggle}
              className="flex items-center justify-center w-10 h-10 touch-manipulation"
              aria-label="Toggle menu"
            />
          </div>
          
          {/* Logo and School Name */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-xl">О</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg font-bold text-gray-900">{t.student}</h1>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          {/* Semester - Hidden on small mobile */}
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
            <CalendarOutlined />
            <span>{t.semester}</span>
          </div>

          {/* User Dropdown */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
            <Space className="cursor-pointer hover:bg-gray-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors touch-manipulation">
              <Avatar size={28} className="bg-blue-500 sm:w-8 sm:h-8">
                {studentName.charAt(0)}
              </Avatar>
              <DownOutlined className="hidden sm:inline text-xs text-gray-500" />
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
