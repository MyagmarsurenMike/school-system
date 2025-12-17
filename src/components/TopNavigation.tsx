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

// =============================================================================
// TYPES
// =============================================================================

interface TopNavigationProps {
  language: Language;
  activeKey?: string;
  onMenuClick?: (key: string) => void;
  onLanguageChange: (language: Language) => void;
  userName: string;
  userRole?: UserRole;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Portal title translations by role */
const PORTAL_TITLES: Readonly<Record<UserRole, Record<Language, string>>> = {
  student: { mn: 'Оюутны систем', en: 'Student Portal' },
  teacher: { mn: 'Багшийн систем', en: 'Teacher Portal' },
  finance: { mn: 'Санхүүгийн систем', en: 'Finance Portal' },
  admin: { mn: 'Админ систем', en: 'Admin Portal' },
  manager: { mn: 'Менежерийн систем', en: 'Manager Portal' },
} as const;

/** Role-based gradient colors for branding */
const ROLE_COLORS: Readonly<Record<UserRole, string>> = {
  student: 'from-blue-600 to-indigo-600',
  teacher: 'from-purple-600 to-indigo-600',
  finance: 'from-green-600 to-teal-600',
  admin: 'from-red-600 to-orange-600',
  manager: 'from-yellow-600 to-orange-600',
} as const;

/** Role-based icons */
const ROLE_ICONS: Readonly<Record<UserRole, React.ReactNode>> = {
  student: '🎓',
  teacher: '👨‍🏫',
  finance: <PieChartFilled className="text-2xl" />,
  admin: '⚙️',
  manager: '👔',
} as const;

/** Language selector options */
const LANGUAGE_OPTIONS = [
  { value: 'mn' as Language, label: '🇲🇳 Монгол' },
  { value: 'en' as Language, label: '🇺🇸 English' },
] as const;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface LogoBrandingProps {
  userRole: UserRole;
  language: Language;
  userName: string;
}

const LogoBranding: React.FC<LogoBrandingProps> = ({ userRole, language, userName }) => (
  <div className="flex items-center space-x-3">
    <div 
      className={`
        w-12 h-12 rounded-lg flex items-center justify-center shadow-md
        bg-linear-to-br ${ROLE_COLORS[userRole]}
      `}
    >
      <span className="text-2xl">{ROLE_ICONS[userRole]}</span>
    </div>
    <div className="flex flex-col">
      <h1 className="text-lg font-bold text-gray-900">
        {PORTAL_TITLES[userRole][language]}
      </h1>
      <span className="text-xs text-gray-500">{userName}</span>
    </div>
  </div>
);

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => (
  <Input
    prefix={<SearchOutlined className="text-gray-400" />}
    placeholder={placeholder}
    className="w-80 rounded-lg"
    size="middle"
  />
);

interface RightActionsProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  logoutLabel: string;
}

const RightActions: React.FC<RightActionsProps> = ({ 
  language, 
  onLanguageChange, 
  logoutLabel 
}) => (
  <div className="flex items-center gap-4">
    <Select
      value={language}
      onChange={onLanguageChange}
      options={[...LANGUAGE_OPTIONS]}
      className="w-40"
      suffixIcon={<GlobalOutlined />}
    />
    <Button 
      type="text" 
      icon={<LogoutOutlined />}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      {logoutLabel}
    </Button>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function TopNavigation({ 
  language, 
  onLanguageChange, 
  userName,
  userRole = 'student' 
}: TopNavigationProps) {
  const nav = navigationTranslations[language];
  const common = commonTranslations[language];
  const showSearch = userRole === 'student';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <LogoBranding 
            userRole={userRole} 
            language={language} 
            userName={userName} 
          />

          {showSearch ? (
            <SearchBar placeholder={common.search} />
          ) : (
            <div className="flex-1" />
          )}

          <RightActions
            language={language}
            onLanguageChange={onLanguageChange}
            logoutLabel={nav.logout}
          />
        </div>
      </div>
    </div>
  );
}
