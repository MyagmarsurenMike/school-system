'use client';

import { Sidebar } from '@/components/common';
import { getSidebarMenuItems, getRoleBranding } from '@/constants/navigation';

export interface TeacherSidebarProps {
  activeKey: string;
  onMenuClick: (key: string) => void;
}

export default function TeacherSidebar({ activeKey, onMenuClick }: TeacherSidebarProps) {
  const branding = getRoleBranding('teacher');
  const menuItems = getSidebarMenuItems('teacher');

  return (
    <Sidebar
      items={menuItems}
      activeKey={activeKey}
      onMenuClick={onMenuClick}
      branding={branding}
      bgColor="bg-purple-600"
    />
  );
}
