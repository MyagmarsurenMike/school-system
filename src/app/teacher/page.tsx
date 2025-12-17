'use client';

import React, { useState, useMemo } from 'react';
import { ConfigProvider, theme as antTheme, Card, Avatar, Button, Breadcrumb, Typography, Statistic } from 'antd';
import { 
  BookOutlined, 
  FileTextOutlined, 
  UploadOutlined, 
  UserOutlined,
  HomeOutlined as AntHomeOutlined,
  TeamOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getUserMenuItems, getRoleBranding } from '@/constants/navigation';
import TeacherGradeManagement from '@/components/TeacherGradeManagement';
import TeacherLectureUpload from '@/components/TeacherLectureUpload';
import { mockTeacher, mockCourses } from '@/data/mockData';
import { Language } from '@/types';

const { Title } = Typography;

export default function TeacherPage() {
  const [activeKey, setActiveKey] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('mn');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get config-driven menu items
  const sidebarItems = useMemo(
    () => getSidebarMenuItems('teacher', language),
    [language]
  );

  const userMenuItems = useMemo(
    () => getUserMenuItems(language),
    [language]
  );

  const branding = useMemo(
    () => getRoleBranding('teacher', language),
    [language]
  );

  const translations = {
    mn: {
      title: 'Багшийн хяналтын самбар',
      gradeManagement: 'Үнэлгээ оруулах',
      lectureUpload: 'Хичээл байршуулах',
      myCourses: 'Миний хичээлүүд',
      totalStudents: 'Нийт оюутан',
      totalCourses: 'Нийт хичээл',
      pendingGrades: 'Хүлээгдэж буй үнэлгээ',
      quickActions: 'Шуурхай үйлдлүүд',
      selectAction: 'Үйлдэл сонгох',
    },
    en: {
      title: 'Teacher Dashboard',
      gradeManagement: 'Grade Management',
      lectureUpload: 'Lecture Upload',
      myCourses: 'My Courses',
      totalStudents: 'Total Students',
      totalCourses: 'Total Courses',
      pendingGrades: 'Pending Grades',
      quickActions: 'Quick Actions',
      selectAction: 'Select action',
    },
  };

  const t = translations[language];

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      console.log('Logout clicked');
      return;
    }
    setActiveKey(key);
  };

  const handleUserMenuClick = (key: string) => {
    if (key === 'logout') {
      console.log('Logout clicked');
      return;
    }
    console.log('User menu clicked:', key);
  };

  const renderContent = () => {
    switch (activeKey) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  title={t.totalCourses} 
                  value={mockCourses.length} 
                  prefix={<BookOutlined className="text-purple-500" />} 
                  styles={{ content: { color: '#8b5cf6' } }}
                />
              </Card>
              <Card variant="borderless" className="shadow-sm hover:shadow-md transition-shadow">
                <Statistic 
                  title={t.pendingGrades} 
                  value={12} 
                  prefix={<CheckCircleOutlined className="text-orange-500" />} 
                  styles={{ content: { color: '#f97316' } }}
                />
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Title level={4} className="mb-4">{t.quickActions}</Title>
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
                      <h3 className="font-semibold text-lg">{t.gradeManagement}</h3>
                      <p className="text-gray-500 text-sm">{t.selectAction}</p>
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
                      <h3 className="font-semibold text-lg">{t.lectureUpload}</h3>
                      <p className="text-gray-500 text-sm">{t.selectAction}</p>
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
                      <h3 className="font-semibold text-lg">{t.myCourses}</h3>
                      <p className="text-gray-500 text-sm">{t.selectAction}</p>
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
      default:
        return <div className="p-8 text-center text-gray-500">Coming Soon</div>;
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
          userName={mockTeacher.name}
          userMenuItems={userMenuItems}
          onUserMenuClick={handleUserMenuClick}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
        />

        {/* Reusable Sidebar */}
        <Sidebar
          items={sidebarItems}
          activeKey={activeKey}
          onMenuClick={handleMenuClick}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="md:ml-64 mt-14 sm:mt-16 transition-all duration-200">
          <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Avatar size={64} icon={<UserOutlined />} src={mockTeacher.photo} className="bg-blue-100 text-blue-600" />
                  <div>
                    <Title level={3} style={{ margin: 0 }}>
                      {mockTeacher.name}
                    </Title>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <BookOutlined /> {mockTeacher.department}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <UserOutlined /> {mockTeacher.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { title: <AntHomeOutlined />, href: '#' },
                  { title: t.title },
                  { title: activeKey === 'dashboard' ? t.title : 
                           activeKey === 'grades' ? t.gradeManagement :
                           activeKey === 'upload' ? t.lectureUpload : activeKey }
                ]}
              />
            </div>

            {/* Dynamic Content */}
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}
