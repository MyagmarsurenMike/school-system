'use client';

import React, { useCallback } from 'react';
import { Avatar, Dropdown, Space, Button, Tag } from 'antd';
import type { MenuProps } from 'antd';
import { MenuOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import type { TopHeaderProps, UserMenuItem, UserRole } from '@/types';

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default header configuration */
const DEFAULT_CONFIG = {
  HEIGHT: 64,
  MOBILE_HEIGHT: 56,
} as const;

/** Role display labels */
const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Оюутан',
  teacher: 'Багш',
  admin: 'Админ',
  finance: 'Санхүү',
  manager: 'Менежер',
};

/** Role badge colors */
const ROLE_COLORS: Record<UserRole, string> = {
  student: 'blue',
  teacher: 'purple',
  admin: 'red',
  finance: 'green',
  manager: 'orange',
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Transform UserMenuItem[] to Ant Design Dropdown menu items format
 */
const transformUserMenuItems = (items: UserMenuItem[]): MenuProps['items'] => {
  return items.map((item) => {
    if (item.type === 'divider') {
      return { type: 'divider' as const, key: item.key };
    }

    return {
      key: item.key,
      label: item.label,
      icon: item.icon,
      danger: item.danger,
    };
  });
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface MobileMenuToggleProps {
  onClick?: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ onClick }) => (
  <Button
    type="text"
    icon={<MenuOutlined className="text-lg" />}
    onClick={onClick}
    className="flex items-center justify-center w-10 h-10 touch-manipulation"
    aria-label="Toggle menu"
  />
);

interface HeaderBrandingProps {
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  userRole?: UserRole;
}

const HeaderBranding: React.FC<HeaderBrandingProps> = ({ logo, title, subtitle, userRole }) => (
  <div className="flex items-center space-x-2 sm:space-x-3">
    {logo && <div className="shrink-0">{logo}</div>}
    <div className="flex flex-col min-w-0">
      <div className="flex items-center gap-2">
        {title && (
          <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">
            {title}
          </h1>
        )}
        {userRole && (
          <Tag 
            color={ROLE_COLORS[userRole]} 
            className="text-xs font-semibold m-0 hidden sm:inline-block"
          >
            {ROLE_LABELS[userRole]}
          </Tag>
        )}
      </div>
      {subtitle && (
        <span className="text-xs text-gray-500 truncate hidden sm:block">
          {subtitle}
        </span>
      )}
    </div>
  </div>
);

interface UserDropdownProps {
  userName?: string;
  userAvatar?: string;
  menuItems: MenuProps['items'];
  onMenuClick?: (key: string) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  userName,
  userAvatar,
  menuItems,
  onMenuClick,
}) => {
  const handleMenuClick: MenuProps['onClick'] = useCallback(
    (info: { key: string }) => onMenuClick?.(info.key),
    [onMenuClick]
  );

  const menuProps: MenuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  // Get initials from name
  const initials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  return (
    <Dropdown menu={menuProps} placement="bottomRight" trigger={['click']}>
      <Space className="cursor-pointer hover:bg-gray-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors touch-manipulation">
        <Avatar
          size={28}
          src={userAvatar}
          icon={!userAvatar && !userName ? <UserOutlined /> : undefined}
          className="bg-blue-500 sm:w-8 sm:h-8"
        >
          {!userAvatar && initials}
        </Avatar>
        <span className="hidden sm:inline text-sm text-gray-700 max-w-[120px] truncate">
          {userName}
        </span>
        <DownOutlined className="hidden sm:inline text-xs text-gray-500" />
      </Space>
    </Dropdown>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Reusable TopHeader component with responsive design and mobile menu support.
 * 
 * @example
 * ```tsx
 * <TopHeader
 *   branding={{ 
 *     title: 'My App', 
 *     logo: <LogoIcon />,
 *     subtitle: 'Dashboard' 
 *   }}
 *   userName="John Doe"
 *   userRole="student"
 *   userMenuItems={[
 *     { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
 *     { key: 'divider', type: 'divider' },
 *     { key: 'logout', label: 'Logout', danger: true },
 *   ]}
 *   onUserMenuClick={(key) => handleUserAction(key)}
 *   showMobileToggle
 *   onMobileMenuToggle={() => setMobileOpen(true)}
 *   rightContent={<NotificationBell />}
 * />
 * ```
 */
export const TopHeader: React.FC<TopHeaderProps> = ({
  branding,
  userName,
  userAvatar,
  userRole,
  userMenuItems = [],
  onUserMenuClick,
  showMobileToggle = true,
  onMobileMenuToggle,
  rightContent,
  centerContent,
  className = '',
  fixed = true,
}) => {
  // Transform menu items once
  const dropdownItems = React.useMemo(
    () => transformUserMenuItems(userMenuItems),
    [userMenuItems]
  );

  const positionClasses = fixed
    ? 'fixed top-0 left-0 right-0 z-50'
    : 'relative';

  return (
    <header
      className={`
        ${positionClasses}
        bg-white border-b border-gray-200
        ${className}
      `}
    >
      <div className="flex items-center justify-between px-3 sm:px-6 h-14 sm:h-16">
        {/* Left Section: Mobile Toggle + Branding */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Menu Toggle - Only visible on mobile */}
          {showMobileToggle && (
            <div className="block md:hidden">
              <MobileMenuToggle onClick={onMobileMenuToggle} />
            </div>
          )}

          {/* Branding with Role Badge */}
          {branding && (
            <HeaderBranding
              logo={branding.logo}
              title={branding.title}
              subtitle={branding.subtitle}
              userRole={userRole}
            />
          )}
        </div>

        {/* Center Section */}
        {centerContent && (
          <div className="hidden md:flex flex-1 justify-center px-4">
            {centerContent}
          </div>
        )}

        {/* Right Section: Extra Content + User Dropdown */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Custom Right Content */}
          {rightContent}

          {/* User Dropdown */}
          {(userName || userMenuItems.length > 0) && (
            <UserDropdown
              userName={userName}
              userAvatar={userAvatar}
              menuItems={dropdownItems}
              onMenuClick={onUserMenuClick}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
