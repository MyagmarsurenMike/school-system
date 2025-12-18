'use client';

import React from 'react';
import { Button, Input } from 'antd';
import { 
  SearchOutlined,
  LogoutOutlined,
  PieChartFilled
} from '@ant-design/icons';
import { UserRole } from '@/types';
import { NAV_LABELS } from '@/constants/navigation';
import { COMMON_LABELS } from '@/constants';

// =============================================================================
// TYPES
// =============================================================================

interface TopNavigationProps {
  activeKey?: string;
  onMenuClick?: (key: string) => void;
  userName: string;
  userRole?: UserRole;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Portal title by role */
const PORTAL_TITLES: Record<UserRole, string> = {
  student: 'Оюутны систем',
  teacher: 'Багшийн систем',
  finance: 'Санхүүгийн систем',
  admin: 'Админ систем',
  manager: 'Менежерийн систем',
} as const;

/** Role-based gradient colors for branding */
const ROLE_COLORS: Record<UserRole, string> = {
  student: 'from-blue-600 to-indigo-600',
  teacher: 'from-purple-600 to-indigo-600',
  finance: 'from-green-600 to-teal-600',
  admin: 'from-red-600 to-orange-600',
  manager: 'from-yellow-600 to-orange-600',
} as const;

/** Role-based icons */
const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  student: '🎓',
  teacher: '👨‍🏫',
  finance: <PieChartFilled className="text-2xl" />,
  admin: '⚙️',
  manager: '👔',
} as const;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface LogoBrandingProps {
  userRole: UserRole;
  userName: string;
}

const LogoBranding: React.FC<LogoBrandingProps> = ({ userRole, userName }) => (
  <div className="flex items-center space-x-3">
    <div 
      className={`
        w-12 h-12 rounded-lg flex items-center justify-center shadow-md
        bg-gradient-to-br ${ROLE_COLORS[userRole]}
      `}
    >
      <span className="text-2xl">{ROLE_ICONS[userRole]}</span>
    </div>
    <div className="flex flex-col">
      <h1 className="text-lg font-bold text-gray-900">
        {PORTAL_TITLES[userRole]}
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

const RightActions: React.FC = () => (
  <div className="flex items-center gap-4">
    <Button 
      type="text" 
      icon={<LogoutOutlined />}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      {NAV_LABELS.logout}
    </Button>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function TopNavigation({ 
  userName,
  userRole = 'student' 
}: TopNavigationProps) {
  const showSearch = userRole === 'student';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <LogoBranding 
            userRole={userRole} 
            userName={userName} 
          />

          {showSearch ? (
            <SearchBar placeholder={COMMON_LABELS.search} />
          ) : (
            <div className="flex-1" />
          )}

          <RightActions />
        </div>
      </div>
    </div>
  );
}
