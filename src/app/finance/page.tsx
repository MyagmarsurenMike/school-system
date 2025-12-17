'use client';

import React, { useState, useMemo } from 'react';
import { ConfigProvider, theme as antTheme, Tabs, App } from 'antd';
import { DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getUserMenuItems, getRoleBranding } from '@/constants/navigation';
import FinancePaymentManagement from '@/components/FinancePaymentManagement';
import FinanceGradePermission from '@/components/FinanceGradePermission';
import { Language } from '@/types';

export default function FinancePage() {
  const [language, setLanguage] = useState<Language>('mn');
  const [activeKey, setActiveKey] = useState('payments');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get config-driven menu items
  const sidebarItems = useMemo(
    () => getSidebarMenuItems('finance', language),
    [language]
  );

  const userMenuItems = useMemo(
    () => getUserMenuItems(language),
    [language]
  );

  const branding = useMemo(
    () => getRoleBranding('finance', language),
    [language]
  );

  const translations = {
    mn: {
      title: 'Санхүүгийн систем',
      paymentManagement: 'Төлбөрийн удирдлага',
      gradePermission: 'Үнэлгээ харах эрх',
      department: 'Санхүү хэлтэс',
    },
    en: {
      title: 'Finance System',
      paymentManagement: 'Payment Management',
      gradePermission: 'Grade View Permission',
      department: 'Finance Department',
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
          {/* Reusable TopHeader */}
          <TopHeader
            branding={branding}
            userName={t.department}
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
          <main className="md:ml-64 mt-14 sm:mt-16 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs 
                  activeKey={activeKey === 'payments' || activeKey === 'permissions' ? activeKey : 'payments'}
                  onChange={(key) => setActiveKey(key)}
                  items={tabItems} 
                  size="large" 
                />
              </div>
            </div>
          </main>
        </div>
      </App>
    </ConfigProvider>
  );
}
