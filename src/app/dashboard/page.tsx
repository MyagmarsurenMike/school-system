'use client';

import React, { useState } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import TopHeader from '@/components/TopHeader';
import LeftSidebar from '@/components/LeftSidebar';
import StudentProfileCard from '@/components/StudentProfileCard';
import GradesTable from '@/components/GradesTable';
import WeeklyScheduleView from '@/components/WeeklyScheduleView';
import PaymentsTable from '@/components/PaymentsTable';
import StudentCertificate from '@/components/StudentCertificate';
import { Language } from '@/types';
import { mockStudent, mockGrades, mockSchedules, mockEvents, mockPayments } from '@/data/mockData';
import LecturesTab from '@/components/LecturesTab';

export default function DashboardPage() {
  const [language, setLanguage] = useState<Language>('mn');
  const [activeMenu, setActiveMenu] = useState('home');

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Profile and Grades */}
            <div className="lg:col-span-8">
              <WeeklyScheduleView schedules={mockSchedules} language={language} />
            </div>

            {/* Right Column - Weekly Schedule (Full Height) */}
            <div className="lg:col-span-4 space-y-8">
              <StudentProfileCard student={mockStudent} language={language} />

              <GradesTable grades={mockGrades} language={language} />
            </div>
          </div>
        );
      
      case 'calendar':
        return <WeeklyScheduleView schedules={mockSchedules} language={language} />;

      case 'lectures':
        return <LecturesTab language={language} />;
      
      case 'student-info':
        return (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
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
        {/* Top Header */}
        <TopHeader 
          language={language}
          activeKey={activeMenu}
          onMenuClick={setActiveMenu}
          onLanguageChange={setLanguage}
          studentName={language === 'mn' ? mockStudent.name : mockStudent.nameEn}
        />

        {/* Left Sidebar */}
        <LeftSidebar 
          language={language}
          activeKey={activeMenu}
          onMenuClick={setActiveMenu}
        />
        
        {/* Main Content */}
        <main className="ml-52 mt-16 p-6">
          <div className="max-w-[1600px] mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}
