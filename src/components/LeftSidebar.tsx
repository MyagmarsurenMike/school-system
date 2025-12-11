'use client';

import React from 'react';
import { Menu } from 'antd';
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
  LogoutOutlined,
} from '@ant-design/icons';
import { Language } from '@/types';

interface LeftSidebarProps {
  language: Language;
  activeKey: string;
  onMenuClick: (key: string) => void;
}

const translations = {
  mn: {
    home: 'Нүүр хуудас',
    studentInfo: 'Миний мэдээлэл',
    payments: 'Төлбөрийн мэдээлэл',
    surveys: 'Судалгаа',
    lessons: 'Хичээл',
    schedules: 'Сургалт',
    definitions: 'Цахим сургалт',
    guides: 'Хэтэч',
  },
  en: {
    home: 'Home',
    studentInfo: 'My Info',
    payments: 'Payments',
    surveys: 'Survey',
    lessons: 'Study',
    schedules: 'Training',
    definitions: 'E-Learning',
    guides: 'Support',
  },
};

export default function LeftSidebar({ language, activeKey, onMenuClick }: LeftSidebarProps) {
  const t = translations[language];

  const menuItems = [
    { 
      key: 'home', 
      icon: <HomeOutlined />, 
      label: t.home,
    },    
    { 
      key: 'lessons', 
      icon: <BookOutlined />, 
      label: t.lessons,
    },
    { 
      key: 'student-info', 
      icon: <UserOutlined />, 
      label: t.studentInfo,
    },
    { 
      key: 'payments', 
      icon: <DollarOutlined />, 
      label: t.payments,
    },

    { 
      key: 'guides', 
      icon: <QuestionCircleOutlined />, 
      label: t.guides,
    },
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-64px)] w-52 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        onClick={({ key }) => onMenuClick(key)}
        items={menuItems}
        className="border-none bg-gray-50 pt-2"
        style={{ 
          height: '100%',
        }}
      />
    </div>
  );
}
