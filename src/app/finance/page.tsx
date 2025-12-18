'use client';

import React, { useState } from 'react';
import { App } from 'antd';
import { Sidebar, TopHeader } from '@/components/common';
import { getSidebarMenuItems, getRoleBranding } from '@/constants/navigation';
import { FinancePaymentManagement, FinanceGradePermission } from '@/components/finance';
import { NotificationTab } from '@/components/shared';
import { User } from '@/types';

// Mock current finance user
const mockFinanceUser: User = {
  id: 'F001',
  name: 'Санхүүч Д.Наранцэцэг',
  role: 'finance',
  email: 'd.narantsetseg@university.edu.mn',
  phone: '+976 8888-8891',
  department: 'Санхүү',
};

export default function FinancePage() {
  const [activeKey, setActiveKey] = useState('payments');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = getSidebarMenuItems('finance');
  const branding = getRoleBranding('finance');

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      console.log('Logout clicked');
      return;
    }
    setActiveKey(key);
  };

  const renderContent = () => {
    switch (activeKey) {
      case 'payments':
        return <FinancePaymentManagement />;
      
      case 'permissions':
        return <FinanceGradePermission />;
      
      case 'notifications':
        return <NotificationTab currentUser={mockFinanceUser} />;
      
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600">Удахгүй бэлэн болно</h2>
          </div>
        );
    }
  };

  return (
    <App>
      <div className="min-h-screen bg-gray-50">
        <TopHeader
          userName="Санхүү хэлтэс"
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
        />

        <Sidebar
          items={sidebarItems}
          activeKey={activeKey}
          onMenuClick={handleMenuClick}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        <main className="md:ml-64 mt-14 sm:mt-16 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </App>
  );
}
