'use client';

import React from 'react';
import { Avatar, Dropdown, Space } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DownOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Language } from '@/types';
import { topHeaderTranslations, commonTranslations } from '@/constants/translations';

interface TopHeaderProps {
  language: Language;
  activeKey: string;
  onMenuClick: (key: string) => void;
  onLanguageChange: (lang: Language) => void;
  studentName: string;
}

export default function TopHeader({ language, activeKey, onMenuClick, onLanguageChange, studentName }: TopHeaderProps) {
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
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo and School Name */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">О</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900">{t.student}</h1>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-6">
          {/* Semester */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CalendarOutlined />
            <span>{t.semester}</span>
          </div>

          {/* Notifications */}
          <div className="relative cursor-pointer">
            <BellOutlined className="text-xl text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </div>

          {/* User Dropdown */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
            <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <Avatar size={32} className="bg-blue-500">
                {studentName.charAt(0)}
              </Avatar>
              <DownOutlined className="text-xs text-gray-500" />
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
