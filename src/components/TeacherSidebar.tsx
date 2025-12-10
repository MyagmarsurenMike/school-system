import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  EditOutlined,
  CloudUploadOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';

interface TeacherSidebarProps {
  activeKey: string;
  onMenuClick: (key: string) => void;
}

const translations = {
  mn: {
    dashboard: 'Нүүр',
    myCourses: 'Миний хичээлүүд',
    gradeEntry: 'Үнэлгээ оруулах',
    uploadLecture: 'Хичээл байршуулах',
    settings: 'Тохиргоо',
    logout: 'Гарах',
  },
};

export default function TeacherSidebar({ activeKey, onMenuClick }: TeacherSidebarProps) {
  const t = translations['mn'];

  const menuItems = [
    { key: 'dashboard', icon: <HomeOutlined />, label: t.dashboard },
    { key: 'courses', icon: <BookOutlined />, label: t.myCourses },
    { key: 'grades', icon: <EditOutlined />, label: t.gradeEntry },
    { key: 'upload', icon: <CloudUploadOutlined />, label: t.uploadLecture },
    { key: 'settings', icon: <SettingOutlined />, label: t.settings },
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: t.logout, danger: true },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40">
      <div className="flex-1 overflow-y-auto py-4">
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => onMenuClick(key)}
          items={menuItems}
          className="border-none text-base"
          style={{ borderRight: 'none' }}
        />
      </div>
    </div>
  );
}
