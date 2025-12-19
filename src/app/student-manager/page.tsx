'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
import { NotificationTab } from '@/components/shared';
import { User } from '@/types';

const { Title } = Typography;

// Mock current manager user
const mockManagerUser: User = {
  id: 'M001',
  name: 'Менежер Б.Оюунболд',
  role: 'manager',
  email: 'b.oyunbold@university.edu.mn',
  phone: '+976 9999-9991',
  department: 'Удирдлага',
};

export default function StudentManagerPage() {
  const [activeMenu, setActiveMenu] = useState('students');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = getSidebarMenuItems('manager');


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
            <FinanceGradePermission />
          </div>
        );

      case 'notifications':
        return <NotificationTab currentUser={mockManagerUser} />;

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
        branding={{ 
          logo: <Image src="/image.png" alt="Logo" width={40} height={40} className="rounded" />,
          title: 'Менежерийн систем' 
        }}
        onMobileMenuToggle={() => setMobileMenuOpen(true)}
      />

      <Sidebar
        items={sidebarItems}
        activeKey={activeMenu}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)} // Recommended: Add this to handle mobile closing
      />

      {/* Main content with proper spacing for header and sidebar */}
      <main className="pt-14 sm:pt-16 md:pl-64 min-h-screen">
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
