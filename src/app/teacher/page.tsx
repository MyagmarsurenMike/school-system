'use client';

import React, { useState } from 'react';
import { Card, Avatar, Statistic, Typography } from 'antd';
import { 
  BookOutlined, 
  FileTextOutlined, 
  UploadOutlined, 
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getRoleBranding } from '@/constants/navigation';
import { TeacherGradeManagement, TeacherLectureUpload } from '@/components/teacher';
import { NotificationTab } from '@/components/shared';
import { mockTeacher, mockCourses } from '@/data/mockData';
import { User } from '@/types';

const { Title } = Typography;

// Convert mockTeacher to User type for NotificationTab
const mockTeacherUser: User = {
  id: mockTeacher.id,
  name: mockTeacher.name,
  role: 'teacher',
  email: mockTeacher.email,
  phone: mockTeacher.phone,
  department: mockTeacher.department,
};

export default function TeacherPage() {
  const [activeKey, setActiveKey] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = getSidebarMenuItems('teacher');
  const branding = getRoleBranding('teacher');

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      console.log('Logout clicked');
      return;
    }
    setActiveKey(key);
  };

  const renderContent = () => {
    switch (activeKey) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-sm">
                <Statistic 
                  title="Нийт оюутан" 
                  value={156} 
                  prefix={<TeamOutlined className="text-blue-500" />} 
                />
              </Card>
              <Card className="shadow-sm">
                <Statistic 
                  title="Нийт хичээл" 
                  value={mockCourses.length} 
                  prefix={<BookOutlined className="text-purple-500" />} 
                />
              </Card>
              <Card className="shadow-sm">
                <Statistic 
                  title="Хүлээгдэж буй үнэлгээ" 
                  value={12} 
                  prefix={<CheckCircleOutlined className="text-orange-500" />} 
                />
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Title level={4} className="mb-4">Шуурхай үйлдлүүд</Title>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card 
                  hoverable 
                  className="cursor-pointer border-l-4 border-l-blue-500"
                  onClick={() => setActiveKey('grades')}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <FileTextOutlined className="text-2xl text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Үнэлгээ оруулах</h3>
                      <p className="text-gray-500 text-sm">Үйлдэл сонгох</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  hoverable 
                  className="cursor-pointer border-l-4 border-l-purple-500"
                  onClick={() => setActiveKey('upload')}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <UploadOutlined className="text-2xl text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Хичээл байршуулах</h3>
                      <p className="text-gray-500 text-sm">Үйлдэл сонгох</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  hoverable 
                  className="cursor-pointer border-l-4 border-l-green-500"
                  onClick={() => setActiveKey('courses')}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <BookOutlined className="text-2xl text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Миний хичээлүүд</h3>
                      <p className="text-gray-500 text-sm">Үйлдэл сонгох</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'grades':
        return <TeacherGradeManagement courses={mockCourses} />;
      case 'upload':
        return <TeacherLectureUpload courses={mockCourses} />;
      case 'notifications':
        return <NotificationTab currentUser={mockTeacherUser} />;
      default:
        return <div className="p-8 text-center text-gray-500">Удахгүй</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader
        userName={mockTeacher.name}
        onMobileMenuToggle={() => setMobileMenuOpen(true)}
      />

      <Sidebar
        items={sidebarItems}
        activeKey={activeKey}
        onMenuClick={handleMenuClick}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <main className="md:ml-64 mt-14 sm:mt-16 transition-all duration-200">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-4">
              <Avatar size={64} icon={<UserOutlined />} className="bg-blue-100 text-blue-600" />
              <div>
                <Title level={3} style={{ margin: 0 }}>{mockTeacher.name}</Title>
                <div className="flex items-center gap-4 text-gray-500 mt-1">
                  <span><BookOutlined /> {mockTeacher.department}</span>
                  <span><UserOutlined /> {mockTeacher.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
