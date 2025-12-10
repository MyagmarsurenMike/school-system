'use client';

import React from 'react';
import { Select, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Language } from '@/types';

interface TopNavBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  semester: string;
  onSemesterChange: (semester: string) => void;
  studentName: string;
}

const translations = {
  mn: {
    schoolName: 'Монгол Улсын Их Сургууль',
    profile: 'Профайл',
    settings: 'Тохиргоо',
    logout: 'Гарах',
  },
  en: {
    schoolName: 'National University of Mongolia',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
  },
};

export default function TopNavBar({
  language,
  onLanguageChange,
  semester,
  onSemesterChange,
  studentName,
}: TopNavBarProps) {
  const t = translations[language];

  const userMenuItems = [
    {
      key: 'profile',
      label: t.profile,
    },
    {
      key: 'settings',
      label: t.settings,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: t.logout,
      danger: true,
    },
  ];

  const semesters = [
    { value: '2025-2026-fall', label: language === 'mn' ? '2025-2026 намар' : '2025-2026 Fall' },
    { value: '2024-2025-spring', label: language === 'mn' ? '2024-2025 хавар' : '2024-2025 Spring' },
    { value: '2024-2025-fall', label: language === 'mn' ? '2024-2025 намар' : '2024-2025 Fall' },
  ];

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-sm border-b border-gray-200 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Select
            value={language}
            onChange={onLanguageChange}
            style={{ width: 120 }}
            suffixIcon={<GlobalOutlined />}
            options={[
              { value: 'mn', label: 'Монгол' },
              { value: 'en', label: 'English' },
            ]}
          />
          <Select
            value={semester}
            onChange={onSemesterChange}
            style={{ width: 200 }}
            options={semesters}
          />
        </div>

        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold text-gray-800">{t.schoolName}</h2>
        </div>

        <div className="flex items-center space-x-4">
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <Avatar icon={<UserOutlined />} className="bg-blue-500" />
              <span className="font-medium text-gray-700">{studentName}</span>
              <DownOutlined className="text-xs text-gray-500" />
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
