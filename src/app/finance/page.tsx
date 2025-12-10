'use client';

import React, { useState } from 'react';
import { ConfigProvider, theme as antTheme, Tabs, App } from 'antd';
import { DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TopNavigation from '@/components/TopNavigation';
import FinancePaymentManagement from '@/components/FinancePaymentManagement';
import FinanceGradePermission from '@/components/FinanceGradePermission';
import { Language } from '@/types';

export default function FinancePage() {
  const [language, setLanguage] = useState<Language>('mn');

  const translations = {
    mn: {
      title: 'Санхүүгийн систем',
      paymentManagement: 'Төлбөрийн удирдлага',
      gradePermission: 'Үнэлгээ харах эрх',
      welcome: 'Тавтай морил',
      department: 'Санхүү хэлтэс',
    },
    en: {
      title: 'Finance System',
      paymentManagement: 'Payment Management',
      gradePermission: 'Grade View Permission',
      welcome: 'Welcome',
      department: 'Finance Department',
    },
  };

  const t = translations[language];

  const tabItems = [
    {
      key: 'payments',
      label: (
        <span className="flex items-center gap-2">
          <DollarOutlined />
          {t.paymentManagement}
        </span>
      ),
      children: <FinancePaymentManagement language={language} />,
    },
    {
      key: 'permissions',
      label: (
        <span className="flex items-center gap-2">
          <CheckCircleOutlined />
          {t.gradePermission}
        </span>
      ),
      children: <FinanceGradePermission language={language} />,
    },
  ];

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
      <App>
        <div className="min-h-screen bg-gray-50">
          {/* Top Navigation */}
          <TopNavigation
            language={language}
            onLanguageChange={setLanguage}
            userName={t.department}
            userRole="finance"
          />

          {/* Main Content */}
          <main className="pt-20 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Header */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.welcome}, {t.department}
                </h1>
                <p className="text-gray-600">
                  {language === 'mn' 
                    ? 'Оюутны төлбөр болон үнэлгээ харах эрхийг удирдах' 
                    : 'Manage student payments and grade view permissions'}
                </p>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultActiveKey="payments" items={tabItems} size="large" />
              </div>
            </div>
          </main>
        </div>
      </App>
    </ConfigProvider>
  );
}
