'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getRoleBranding } from '@/constants/navigation';
import { StudentProfileCard, GradesTable, StudentCertificate } from '@/components/student';
import { WeeklyScheduleView, NotificationTab } from '@/components/shared';
import { PaymentsTable } from '@/components/finance';
import { mockStudent, mockGrades, mockSchedules, mockPayments } from '@/data/mockData';
import { LecturesTab } from '@/components/teacher';
import { User } from '@/types';

// Convert mockStudent to User type for NotificationTab
const mockStudentUser: User = {
  id: mockStudent.id,
  name: mockStudent.name,
  role: 'student',
  email: mockStudent.email,
  phone: mockStudent.phone,
};

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
              <div>
                <WeeklyScheduleView schedules={mockSchedules} />
              </div>
              <div>
                <GradesTable grades={mockGrades} />
              </div>
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
          <StudentCertificate student={mockStudent} />
        );
      
      case 'payments':
        return <PaymentsTable payments={mockPayments} />;
      
      case 'lessons':
        return <LecturesTab />;
      
      case 'notifications':
        return <NotificationTab currentUser={mockStudentUser} />;
      
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
        branding={{ 
          logo: <Image src="/image.png" alt="Logo" width={40} height={40} className="rounded" />,
          title: 'Оюутны систем' 
        }}
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
      
      {/* Main content with proper spacing for header and sidebar */}
      <main className="pt-14 sm:pt-16 md:pl-64 min-h-screen">
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
