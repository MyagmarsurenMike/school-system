'use client';

import React, { useState } from 'react';
import { Card, Statistic, Typography } from 'antd';
import { 
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getRoleBranding } from '@/constants/navigation';
import { StudentManager } from '@/components/teacher';
import { StudentEdit } from '@/components/student';
import { FinanceGradePermission } from '@/components/finance';

const { Title } = Typography;

export default function StudentManagerPage() {
  const [activeMenu, setActiveMenu] = useState('students');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = getSidebarMenuItems('manager');
  const branding = getRoleBranding('manager');

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      window.location.href = '/login';
      return;
    }
    if (key === 'dashboard') {
      window.location.href = '/teacher';
      return;
    }
    setActiveMenu(key);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'students':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-sm">
                <Statistic 
                  title="Нийт оюутан" 
                  value={156} 
                  prefix={<TeamOutlined className="text-blue-500" />} 
                />
              </Card>
              <Card className="shadow-sm">
                <Statistic 
                  title="Нийт хуваарь" 
                  value={24} 
                  prefix={<CalendarOutlined className="text-green-500" />} 
                />
              </Card>
              <Card className="shadow-sm">
                <Statistic 
                  title="Идэвхтэй анги" 
                  value={8} 
                  prefix={<ScheduleOutlined className="text-purple-500" />} 
                />
              </Card>
              <Card className="shadow-sm">
                <Statistic 
                  title="Хүлээгдэж буй тайлан" 
                  value={3} 
                  prefix={<FileTextOutlined className="text-orange-500" />} 
                />
              </Card>
            </div>
            <StudentEdit />
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-6">
            <StudentManager />
          </div>
        );

      case 'grade-permissions':
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <Title level={4}>Хуваарь</Title>
              <p className="text-gray-600">Оюутны ангиудын хуваарь</p>
            </div>
            <FinanceGradePermission />
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600">Удахгүй бэлэн болно</h2>
          </div>
        );
    }
  };

  const getCurrentTitle = () => {
    switch (activeMenu) {
      case 'students': return 'Оюутны удирдлага';
      case 'schedule': return 'Хуваарь';
      case 'attendance': return 'Ирц';
      case 'notifications': return 'Мэдэгдэл';
      case 'reports': return 'Тайлан';
      default: return 'Менежерийн систем';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader
        userName="Менежер"
        onMobileMenuToggle={() => setMobileMenuOpen(true)}
      />

      <Sidebar
        items={sidebarItems}
        activeKey={activeMenu}
        onMenuClick={handleMenuClick}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <main className="md:ml-64 mt-14 sm:mt-16 min-h-screen">
        <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getCurrentTitle()}</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Оюутнуудын мэдээллийг удирдах</p>
          </div>

          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
