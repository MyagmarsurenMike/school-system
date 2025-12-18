'use client';

import React from 'react';
import { Avatar, Dropdown, Badge, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { HEADER_LABELS, COMMON_LABELS } from '@/constants';

interface TopHeaderProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
}

export default function TopHeader({
  userName = 'Оюутан',
  userAvatar,
  notificationCount = 0,
  onNotificationClick,
  onMenuToggle,
  showMobileMenu = false,
}: TopHeaderProps) {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: COMMON_LABELS.profile,
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: COMMON_LABELS.settings,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: COMMON_LABELS.logout,
      danger: true,
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {showMobileMenu && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onMenuToggle}
            className="lg:hidden"
          />
        )}
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            {HEADER_LABELS.schoolName}
          </h1>
          <p className="text-sm text-gray-500">{HEADER_LABELS.semester}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge count={notificationCount} size="small">
          <Button
            type="text"
            icon={<BellOutlined className="text-lg" />}
            onClick={onNotificationClick}
          />
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Avatar
              size="default"
              icon={<UserOutlined />}
              src={userAvatar}
            />
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {userName}
            </span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
