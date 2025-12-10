'use client';

import React from 'react';
import { Button, Select, Menu, Input } from 'antd';
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
  SearchOutlined,
  GlobalOutlined,
  LogoutOutlined,
  PieChartFilled
} from '@ant-design/icons';
import { Language } from '@/types';

interface TopNavigationProps {
  language: Language;
  activeKey?: string;
  onMenuClick?: (key: string) => void;
  onLanguageChange: (language: Language) => void;
  userName: string;
  userRole?: 'student' | 'teacher' | 'finance';
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
    search: 'Хайх...',
    logout: 'Гарах',
    welcome: 'Тавтай морил',
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
    search: 'Search...',
    logout: 'Logout',
    welcome: 'Welcome',
  },
};

export default function TopNavigation({ 
  language, 
  activeKey, 
  onMenuClick, 
  onLanguageChange, 
  userName,
  userRole = 'student' 
}: TopNavigationProps) {
  const t = translations[language];

  const getRoleColor = () => {
    switch (userRole) {
      case 'teacher':
        return 'from-purple-600 to-indigo-600';
      case 'finance':
        return 'from-green-600 to-teal-600';
      default:
        return 'from-blue-600 to-indigo-600';
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'teacher':
        return '👨‍🏫';
      case 'finance':
        return <PieChartFilled className="text-2xl" />;
      default:
        return '🎓';
    }
  };

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
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${getRoleColor()} rounded-lg flex items-center justify-center shadow-md`}>
              <span className="text-2xl">{getRoleIcon()}</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900">
                {userRole === 'teacher' 
                  ? (language === 'mn' ? 'Багшийн систем' : 'Teacher Portal')
                  : userRole === 'finance'
                  ? (language === 'mn' ? 'Санхүүгийн систем' : 'Finance Portal')
                  : (language === 'mn' ? 'Оюутны систем' : 'Student Portal')}
              </h1>
              <span className="text-xs text-gray-500">{userName}</span>
            </div>
          </div>

          {/* Show search and menu only for student role */}
          {userRole === 'student' && (
            <>
              {/* Search Input */}
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder={t.search}
                className="w-80 rounded-lg"
                size="middle"
              />

              {/* Menu */}
              {activeKey && onMenuClick && (
                <Menu
                  mode="horizontal"
                  selectedKeys={[activeKey]}
                  onClick={({ key }) => onMenuClick(key)}
                  items={menuItems}
                  className="flex-1 border-none justify-end"
                  style={{ 
                    lineHeight: '64px',
                    minWidth: 'auto',
                  }}
                />
              )}
            </>
          )}

          {/* Spacer for non-student roles */}
          {userRole !== 'student' && <div className="flex-1" />}

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Select
              value={language}
              onChange={onLanguageChange}
              options={[
                { value: 'mn', label: '🇲🇳 Монгол' },
                { value: 'en', label: '🇺🇸 English' },
              ]}
              className="w-40"
              suffixIcon={<GlobalOutlined />}
            />
            <Button 
              type="text" 
              icon={<LogoutOutlined />}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {t.logout}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
