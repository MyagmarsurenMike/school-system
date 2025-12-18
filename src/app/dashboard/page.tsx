'use client';

import React, { useState, useMemo } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getUserMenuItems, getRoleBranding } from '@/constants/navigation';
import StudentProfileCard from '@/components/StudentProfileCard';
import GradesTable from '@/components/GradesTable';
import WeeklyScheduleView from '@/components/WeeklyScheduleView';
import PaymentsTable from '@/components/PaymentsTable';
import StudentCertificate from '@/components/StudentCertificate';
import { Language } from '@/types';
import { mockStudent, mockGrades, mockSchedules, mockPayments } from '@/data/mockData';
import LecturesTab from '@/components/LecturesTab';
import { CalendarOutlined } from '@ant-design/icons';

export default function DashboardPage() {
  const [language, setLanguage] = useState<Language>('mn');
  const [activeMenu, setActiveMenu] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get config-driven menu items based on role and language
  const sidebarItems = useMemo(
    () => getSidebarMenuItems('student', language),
    [language]
  );

  const userMenuItems = useMemo(
    () => getUserMenuItems(language),
    [language]
  );

  const branding = useMemo(
    () => getRoleBranding('student', language),
    [language]
  );

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      // Handle logout
      console.log('Logout clicked');
      return;
    }
    setActiveMenu(key);
  };

  const handleUserMenuClick = (key: string) => {
    if (key === 'logout') {
      console.log('Logout clicked');
      return;
    }
    // Handle other user menu actions
    console.log('User menu clicked:', key);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="lg:col-span-8 gap-4 space-y-8 sm:space-y-12">
              <WeeklyScheduleView schedules={mockSchedules} language={language} />
              <div className='my-4'>
                <GradesTable grades={mockGrades} language={language} />
              </div>
            </div>
            <div className="lg:col-span-4 space-y-4 sm:space-y-8">
              <StudentProfileCard student={mockStudent} language={language} />
            </div>
          </div>
        );
      
      case 'lectures':
        return <LecturesTab language={language} />;
      
      case 'student-info':
        return (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'>
            <div className="md:col-span-1">
              <StudentProfileCard student={mockStudent} language={language} small />
            </div>
            <div className='md:col-span-2'>
              <StudentCertificate student={mockStudent} language={language} />
            </div>
          </div>
        );
      
      case 'payments':
        return <PaymentsTable payments={mockPayments} language={language} />;
      
      case 'lessons':
        return <LecturesTab language={language} />;
      
      case 'schedules':
        return <WeeklyScheduleView schedules={mockSchedules} language={language} />;
      
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600">
              {language === 'mn' ? 'Удахгүй бэлэн болно' : 'Coming Soon'}
            </h2>
          </div>
        );
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
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Reusable TopHeader */}
        <TopHeader 
          branding={branding}
          userName={language === 'mn' ? mockStudent.name : mockStudent.nameEn}
          userMenuItems={userMenuItems}
          onUserMenuClick={handleUserMenuClick}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
          rightContent={
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <CalendarOutlined />
              <span>{language === 'mn' ? '2025-2026, Намар' : '2025-2026, Fall'}</span>
            </div>
          }
        />

        {/* Reusable Sidebar */}
        <Sidebar 
          items={sidebarItems}
          activeKey={activeMenu}
          onMenuClick={handleMenuClick}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
          width={208}
        />
        
        {/* Main Content */}
        <main className="md:ml-52 mt-14 sm:mt-16 p-3 sm:p-6">
          <div className="max-w-[1600px] mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}
