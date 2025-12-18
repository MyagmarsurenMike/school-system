'use client';

import React, { useState } from 'react';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getRoleBranding } from '@/constants/navigation';
import { StudentProfileCard, GradesTable, StudentCertificate } from '@/components/student';
import { WeeklyScheduleView } from '@/components/shared';
import { PaymentsTable } from '@/components/finance';
import { mockStudent, mockGrades, mockSchedules, mockPayments } from '@/data/mockData';
import { LecturesTab } from '@/components/teacher';

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = getSidebarMenuItems('student');

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      console.log('Logout clicked');
      return;
    }
    setActiveMenu(key);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="lg:col-span-8 space-y-8">
              <WeeklyScheduleView schedules={mockSchedules} />
              <GradesTable grades={mockGrades} />
            </div>
            <div className="lg:col-span-4">
              <StudentProfileCard student={mockStudent} />
            </div>
          </div>
        );
      
      case 'lectures':
        return <LecturesTab />;
      
      case 'student-info':
        return (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className="md:col-span-1">
              <StudentProfileCard student={mockStudent} />
            </div>
            <div className='md:col-span-2'>
              <StudentCertificate student={mockStudent} />
            </div>
          </div>
        );
      
      case 'payments':
        return <PaymentsTable payments={mockPayments} />;
      
      case 'lessons':
        return <LecturesTab />;
      
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600">Удахгүй бэлэн болно</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader 
        userName={mockStudent.name}
        onMobileMenuToggle={() => setMobileMenuOpen(true)}
      />

      <Sidebar 
        items={sidebarItems}
        activeKey={activeMenu}
        onMenuClick={handleMenuClick}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      
      <main className="md:ml-52 mt-14 sm:mt-16 p-3 sm:p-6">
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
