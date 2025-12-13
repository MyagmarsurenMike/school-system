'use client';

import React from 'react';
import { ConfigProvider, theme as antTheme, Avatar, Button, Breadcrumb, Typography } from 'antd';
import { 
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  BookOutlined
} from '@ant-design/icons';
import StudentManager from '@/components/StudentManager';
import { mockTeacher } from '@/data/mockData';

const { Title } = Typography;

export default function StudentManagerPage() {
  const translations = {
    mn: {
      title: 'Оюутны удирдлага',
      subtitle: 'Оюутан нэмэх болон долоо хоногийн хуваарь оруулах',
      logout: 'Гарах',
      dashboard: 'Хяналтын самбар',
    },
  };

  const t = translations.mn;

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
        {/* Main Content - No Sidebar */}
        <main className="transition-all duration-200">
          <div className="p-8 max-w-7xl mx-auto">
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
                <div className="flex items-center gap-3">
                  <Button 
                    href="/teacher"
                    size="large"
                    className="flex items-center"
                  >
                    <HomeOutlined /> Буцах
                  </Button>
                  <Button 
                    danger 
                    icon={<LogoutOutlined />} 
                    size="large"
                    className="flex items-center"
                    href="/login"
                  >
                    {t.logout}
                  </Button>
                </div>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { title: <HomeOutlined />, href: '/teacher' },
                  { title: t.dashboard, href: '/teacher' },
                  { title: t.title }
                ]}
              />
            </div>

            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-gray-600 mt-1">{t.subtitle}</p>
            </div>

            {/* Student Manager Component */}
            <StudentManager />
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}
