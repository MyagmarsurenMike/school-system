'use client';

import React, { useState, useMemo } from 'react';
import { ConfigProvider, theme as antTheme, Card, Statistic, Typography } from 'antd';
import { 
  UserAddOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  TeamOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getUserMenuItems, getRoleBranding } from '@/constants/navigation';
import StudentManager from '@/components/StudentManager';
import { ScheduleGrid } from '@/components/common';
import { Language } from '@/types';
import StudentEdit from '@/components/StudentEdit';

const { Title } = Typography;

export default function StudentManagerPage() {
  const [activeMenu, setActiveMenu] = useState('students');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language] = useState<Language>('mn');

  // Get config-driven menu items for manager role
  const sidebarItems = useMemo(
    () => getSidebarMenuItems('manager', language),
    [language]
  );

  const userMenuItems = useMemo(
    () => getUserMenuItems(language),
    [language]
  );

  const branding = useMemo(
    () => getRoleBranding('manager', language),
    [language]
  );

  const translations = {
    mn: {
      title: 'Оюутны удирдлага',
      subtitle: 'Оюутан нэмэх болон долоо хоногийн хуваарь оруулах',
      dashboard: 'Хяналтын самбар',
      studentManager: 'Оюутны удирдлага',
      schedule: 'Хуваарь',
      attendance: 'Ирц',
      reports: 'Тайлан',
      quickActions: 'Шуурхай үйлдлүүд',
      selectAction: 'Үйлдэл сонгох',
      totalStudents: 'Нийт оюутан',
      totalSchedules: 'Нийт хуваарь',
      activeClasses: 'Идэвхтэй анги',
      pendingReports: 'Хүлээгдэж буй тайлан',
      comingSoon: 'Удахгүй бэлэн болно',
    },
    en: {
      title: 'Student Manager',
      subtitle: 'Add students and manage weekly schedules',
      dashboard: 'Dashboard',
      studentManager: 'Student Manager',
      schedule: 'Schedule',
      attendance: 'Attendance',
      reports: 'Reports',
      quickActions: 'Quick Actions',
      selectAction: 'Select action',
      totalStudents: 'Total Students',
      totalSchedules: 'Total Schedules',
      activeClasses: 'Active Classes',
      pendingReports: 'Pending Reports',
      comingSoon: 'Coming Soon',
    },
  };

  const t = translations[language];

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

  const handleUserMenuClick = (key: string) => {
    if (key === 'logout') {
      window.location.href = '/login';
      return;
    }
    console.log('User menu clicked:', key);
  };

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'students':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="borderless" className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic 
                  title={t.totalStudents} 
                  value={156} 
                  prefix={<TeamOutlined className="text-blue-500" />} 
                  styles={{ content: { color: '#3b82f6' } }}
                />
              </Card>
              <Card variant="borderless" className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic 
                  title={t.totalSchedules} 
                  value={24} 
                  prefix={<CalendarOutlined className="text-green-500" />} 
                  styles={{ content: { color: '#22c55e' } }}
                />
              </Card>
              <Card variant="borderless" className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic 
                  title={t.activeClasses} 
                  value={8} 
                  prefix={<ScheduleOutlined className="text-purple-500" />} 
                  styles={{ content: { color: '#8b5cf6' } }}
                />
              </Card>
              <Card variant="borderless" className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic 
                  title={t.pendingReports} 
                  value={3} 
                  prefix={<FileTextOutlined className="text-orange-500" />} 
                  styles={{ content: { color: '#f97316' } }}
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

      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <Title level={4}>{t.attendance}</Title>
              <p className="text-gray-600">{language === 'mn' ? 'Оюутны ирцийн бүртгэл' : 'Student attendance records'}</p>
            </div>
            <Card className="text-center py-16">
              <ClockCircleOutlined className="text-6xl text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">{t.comingSoon}</p>
            </Card>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <Title level={4}>{t.reports}</Title>
              <p className="text-gray-600">{language === 'mn' ? 'Тайлан болон статистик' : 'Reports and statistics'}</p>
            </div>
            <Card className="text-center py-16">
              <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">{t.comingSoon}</p>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600">{t.comingSoon}</h2>
          </div>
        );
    }
  };

  // Get current page title for breadcrumb
  const getCurrentTitle = () => {
    switch (activeMenu) {
      case 'students': return t.studentManager;
      case 'schedule': return t.schedule;
      case 'attendance': return t.attendance;
      case 'reports': return t.reports;
      default: return t.title;
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 8,
          colorBgContainer: '#ffffff',
          fontFamily: 'inherit',
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Reusable TopHeader */}
        <TopHeader
          branding={branding}
          userName={language === 'mn' ? 'Менежер' : 'Manager'}
          userMenuItems={userMenuItems}
          onUserMenuClick={handleUserMenuClick}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
        />

        {/* Reusable Sidebar with manager role */}
        <Sidebar
          items={sidebarItems}
          activeKey={activeMenu}
          onMenuClick={handleMenuClick}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="md:ml-64 mt-14 sm:mt-16 min-h-screen">
          <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getCurrentTitle()}</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">{t.subtitle}</p>
            </div>

            {/* Dynamic Content based on activeMenu */}
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}
