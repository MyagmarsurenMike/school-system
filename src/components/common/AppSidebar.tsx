'use client';

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { UserRole } from '@/types';
import { getSidebarMenuItems, getRoleBranding } from '@/constants/navigation';

export interface AppSidebarProps {
  activeKey: string;
  onMenuClick: (key: string) => void;
  userRole: UserRole;
  collapsed?: boolean;
}

export default function AppSidebar({ 
  activeKey, 
  onMenuClick, 
  userRole,
  collapsed = false,
}: AppSidebarProps) {
  const branding = getRoleBranding(userRole);
  const menuItems = getSidebarMenuItems(userRole);

  return (
    <div className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all ${collapsed ? 'w-20' : 'w-64'}`}>
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {branding.logo}
            <span className="font-bold text-lg">{branding.title}</span>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => onMenuClick(key)}
          items={menuItems as MenuProps['items']}
          className="border-none"
          inlineCollapsed={collapsed}
        />
      </div>
    </div>
  );
}
