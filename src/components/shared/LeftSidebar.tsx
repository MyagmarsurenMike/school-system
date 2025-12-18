'use client';

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

interface LeftSidebarProps {
  menuItems: MenuProps['items'];
  activeKey: string;
  onMenuClick: (key: string) => void;
  className?: string;
}

export default function LeftSidebar({ 
  menuItems, 
  activeKey, 
  onMenuClick,
  className = ''
}: LeftSidebarProps) {
  return (
    <div className={`h-screen bg-white border-r border-gray-200 flex flex-col ${className}`}>
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        onClick={({ key }) => onMenuClick(key)}
        items={menuItems}
        className="border-none h-full"
      />
    </div>
  );
}
