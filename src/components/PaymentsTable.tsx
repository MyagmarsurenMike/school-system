'use client';

import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Payment, Language, PaymentStatus } from '@/types';
import { formatMoney } from '@/utils';
import { PaymentStatusTag } from '@/components/common/PaymentStatusTag';
import { paymentsTableTranslations, PaymentsTableTranslations } from '@/constants/translations';

// =============================================================================
// TYPES
// =============================================================================

interface PaymentsTableProps {
  payments: Payment[];
  language: Language;
}

interface PaymentSummary {
  total: number;
  paid: number;
  pending: number;
  initialBalance: number;
  discount: number;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DATE_FORMAT = 'YYYY-MM-DD';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const formatDate = (date?: string): string => 
  date ? dayjs(date).format(DATE_FORMAT) : '-';

const calculatePaymentSummary = (payments: Payment[]): PaymentSummary => {
  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  const paid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const pending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return {
    total,
    paid,
    pending,
    initialBalance: 0,
    discount: 0,
  };
};

const createTableColumns = (
  t: PaymentsTableTranslations, 
  language: Language
): ColumnsType<Payment> => [
  {
    title: <span className="text-xs sm:text-sm">{t.description}</span>,
    dataIndex: 'description',
    key: 'description',
    // width: 200,
    ellipsis: true,
    render: (desc: string) => (
      <span className="text-xs sm:text-sm">{desc}</span>
    ),
  },
  {
    title: <span className="text-xs sm:text-sm">{t.amount}</span>,
    dataIndex: 'amount',
    key: 'amount',
    // width: 100,
    align: 'left',
    render: (amount: number) => (
      <span className="font-semibold text-blue-600 text-xs sm:text-sm">{formatMoney(amount)}</span>
    ),
  },
  {
    title: <span className="text-xs sm:text-sm hidden sm:inline">{t.dueDate}</span>,
    dataIndex: 'dueDate',
    key: 'dueDate',
    // width: 100,
    responsive: ['sm'] as const,
    render: (date: string) => (
      <span className="text-xs sm:text-sm">{formatDate(date)}</span>
    ),
  },
  {
    title: <span className="text-xs sm:text-sm hidden md:inline">{t.paidDate}</span>,
    dataIndex: 'paidDate',
    key: 'paidDate',
    // width: 100,
    responsive: ['md'] as const,
    render: (date: string) => (
      <span className="text-xs sm:text-sm">{formatDate(date)}</span>
    ),
  },
  {
    title: <span className="text-xs sm:text-sm">{t.status}</span>,
    dataIndex: 'status',
    key: 'status',
    // width: 90,
    align: 'center',
    render: (status: PaymentStatus) => (
      <PaymentStatusTag status={status} language={language} />
    ),
  },
];

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface SummaryHeaderProps {
  summary: PaymentSummary;
  translations: PaymentsTableTranslations;
  language: Language;
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({ 
  summary, 
  translations: t, 
  language 
}) => {
  const semesterTitle = language === 'mn' 
    ? '2025-2026 оны Намар-н хичээлийн жилийн сургалтын төлбөр' 
    : '2025-2026 Fall Semester Tuition Fee';

  const summaryItems = [
    { label: t.initialBalance, value: summary.initialBalance },
    { label: t.discount, value: summary.discount },
    { label: t.paidAmount, value: summary.paid },
    { label: t.pendingAmount, value: summary.pending },
  ];

  return (
    <div className="p-4 sm:p-6 rounded-lg bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 bg-size-[200%_200%] animate-fade-bg text-white mb-4 sm:mb-6 shadow-md">
      <div className="mb-3 sm:mb-4">
        <div className="text-sm sm:text-xl leading-tight">{semesterTitle}</div>
        <div className="text-xl sm:text-2xl font-bold mt-1">{formatMoney(summary.total)}</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 text-sm sm:text-xl sm:divide-x sm:divide-white">
        {summaryItems.map(({ label, value }) => (
          <div key={label} className="px-0 sm:px-2 py-1 sm:py-0">
            <div className="opacity-80 text-xs sm:text-base">{label}</div>
            <div className="font-bold text-sm sm:text-xl">{formatMoney(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function PaymentsTable({ payments, language }: PaymentsTableProps) {
  const t = paymentsTableTranslations[language];
  
  const summary = useMemo(() => calculatePaymentSummary(payments), [payments]);
  const columns = useMemo(() => createTableColumns(t, language), [t, language]);

  return (
    <div>
      <SummaryHeader 
        summary={summary} 
        translations={t} 
        language={language} 
      />

      <div className="overflow-x-auto">
        <Table
          className="bg-white rounded-lg shadow-sm py-2 px-2 sm:py-4 sm:px-4 [&_.ant-table-cell]:p-2! [&_.ant-table-cell]:sm:p-3!"
          columns={columns}
          dataSource={payments}
          rowKey="id"
          pagination={false}
          size="small"
          scroll={{ x: 400 }}
        />
      </div>
    </div>
  );
}
