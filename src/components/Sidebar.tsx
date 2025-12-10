'use client';

import React from 'react';
import { Menu } from 'antd';
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
} from '@ant-design/icons';
import { Language } from '@/types';

interface SidebarProps {
  language: Language;
  activeKey: string;
  onMenuClick: (key: string) => void;
}

const translations = {
  mn: {
    home: 'Нүүр',
    calendar: 'Календарь',
    studentInfo: 'Оюутны мэдээлэл',
    payments: 'Төлбөр',
    surveys: 'Судалгаа',
    lessons: 'Хичээл',
    schedules: 'Хуваарь',
    definitions: 'Тодорхойлолт',
    guides: 'Заавар',
    exit: 'Гарах',
  },
  en: {
    home: 'Home',
    calendar: 'Calendar',
    studentInfo: 'Student Info',
    payments: 'Payments',
    surveys: 'Surveys',
    lessons: 'Lessons',
    schedules: 'Schedules',
    definitions: 'Definitions',
    guides: 'Guides',
    exit: 'Exit',
  },
};

export default function Sidebar({ language, activeKey, onMenuClick }: SidebarProps) {
  const t = translations[language];

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: t.home },
    { key: 'calendar', icon: <CalendarOutlined />, label: t.calendar },
    { key: 'student-info', icon: <UserOutlined />, label: t.studentInfo },
    { key: 'payments', icon: <DollarOutlined />, label: t.payments },
    { key: 'surveys', icon: <FormOutlined />, label: t.surveys },
    { key: 'lessons', icon: <BookOutlined />, label: t.lessons },
    { key: 'schedules', icon: <ClockCircleOutlined />, label: t.schedules },
    { key: 'definitions', icon: <FileTextOutlined />, label: t.definitions },
    { key: 'guides', icon: <QuestionCircleOutlined />, label: t.guides },
    { type: 'divider' as const },
    { key: 'exit', icon: <LogoutOutlined />, label: t.exit, danger: true },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Student Portal</h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        onClick={({ key }) => onMenuClick(key)}
        items={menuItems}
        className="border-none"
        style={{ paddingTop: '1rem' }}
      />
    </div>
  );
}
