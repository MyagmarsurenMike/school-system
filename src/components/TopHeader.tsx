'use client';

import React from 'react';
import { Menu, Avatar, Dropdown, Space, Switch } from 'antd';
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
  DownOutlined,
  BellOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Language } from '@/types';

interface TopHeaderProps {
  language: Language;
  activeKey: string;
  onMenuClick: (key: string) => void;
  onLanguageChange: (lang: Language) => void;
  studentName: string;
}

const translations = {
  mn: {
    home: 'Нүүр хуудас',
    calendar: 'Сургалтын хуваарь',
    studentInfo: 'Миний мэдээлэл',
    payments: 'Төлбөрийн мэдээлэл',
    surveys: 'Судалгаа',
    lessons: 'Судалгаа',
    schedules: 'Сургалт',
    definitions: 'Цахим сургалт',
    guides: 'Хэтэч',
    schoolName: 'Шинэ Монгол технологийн коллеж',
    semester: '2025-2026, Намар',
    darkMode: 'Харанхуй горим',
  },
  en: {
    home: 'Home',
    calendar: 'Schedule',
    studentInfo: 'My Info',
    payments: 'Payments',
    surveys: 'Survey',
    lessons: 'Study',
    schedules: 'Training',
    definitions: 'E-Learning',
    guides: 'Support',
    schoolName: 'Shine Mongol Technology College',
    semester: '2025-2026, Fall',
    darkMode: 'Dark Mode',
  },
};

export default function TopHeader({ language, activeKey, onMenuClick, onLanguageChange, studentName }: TopHeaderProps) {
  const t = translations[language];

  const userMenuItems = [
    { key: 'profile', label: language === 'mn' ? 'Профайл' : 'Profile', icon: <UserOutlined /> },
    { key: 'settings', label: language === 'mn' ? 'Тохиргоо' : 'Settings', icon: <SettingOutlined /> },
    { type: 'divider' as const },
    { key: 'logout', label: language === 'mn' ? 'Гарах' : 'Logout', danger: true },
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
              <h1 className="text-lg font-bold text-gray-900">{language === 'mn' ? 'Оюутан' : 'Student'}</h1>
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
