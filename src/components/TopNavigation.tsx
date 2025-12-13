'use client';

import React from 'react';
import { Button, Select, Input } from 'antd';
import { 
  SearchOutlined,
  GlobalOutlined,
  LogoutOutlined,
  PieChartFilled
} from '@ant-design/icons';
import { Language, UserRole } from '@/types';
import { navigationTranslations } from '@/constants/navigation';
import { commonTranslations } from '@/constants/translations';

interface TopNavigationProps {
  language: Language;
  activeKey?: string;
  onMenuClick?: (key: string) => void;
  onLanguageChange: (language: Language) => void;
  userName: string;
  userRole?: UserRole;
}

/** Portal title translations */
const portalTitles: Record<UserRole, Record<Language, string>> = {
  student: { mn: 'Оюутны систем', en: 'Student Portal' },
  teacher: { mn: 'Багшийн систем', en: 'Teacher Portal' },
  finance: { mn: 'Санхүүгийн систем', en: 'Finance Portal' },
  admin: { mn: 'Админ систем', en: 'Admin Portal' },
};

/** Role-based gradient colors */
const roleColors: Record<UserRole, string> = {
  student: 'from-blue-600 to-indigo-600',
  teacher: 'from-purple-600 to-indigo-600',
  finance: 'from-green-600 to-teal-600',
  admin: 'from-red-600 to-orange-600',
};

/** Role-based icons */
const roleIcons: Record<UserRole, React.ReactNode> = {
  student: '🎓',
  teacher: '👨‍🏫',
  finance: <PieChartFilled className="text-2xl" />,
  admin: '⚙️',
};

export default function TopNavigation({ 
  language, 
  activeKey, 
  onMenuClick, 
  onLanguageChange, 
  userName,
  userRole = 'student' 
}: TopNavigationProps) {
  const nav = navigationTranslations[language];
  const common = commonTranslations[language];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${roleColors[userRole]} rounded-lg flex items-center justify-center shadow-md`}>
              <span className="text-2xl">{roleIcons[userRole]}</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900">
                {portalTitles[userRole][language]}
              </h1>
              <span className="text-xs text-gray-500">{userName}</span>
            </div>
          </div>

          {/* Show search only for student role */}
          {userRole === 'student' && (
            <Input
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder={common.search}
              className="w-80 rounded-lg"
              size="middle"
            />
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
              {nav.logout}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
