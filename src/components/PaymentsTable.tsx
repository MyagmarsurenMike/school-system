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
    title: t.description,
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
  },
  {
    title: t.amount,
    dataIndex: 'amount',
    key: 'amount',
    width: 150,
    align: 'left',
    render: (amount: number) => (
      <span className="font-semibold text-blue-600">{formatMoney(amount)}</span>
    ),
  },
  {
    title: t.dueDate,
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: 130,
    render: formatDate,
  },
  {
    title: t.paidDate,
    dataIndex: 'paidDate',
    key: 'paidDate',
    width: 130,
    render: formatDate,
  },
  {
    title: t.status,
    dataIndex: 'status',
    key: 'status',
    width: 120,
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
    <div className="p-6 rounded-lg bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 bg-size-[200%_200%] animate-fade-bg text-white mb-6 shadow-md">
      <div className="mb-4">
        <div className="text-xl">{semesterTitle}</div>
        <div className="text-2xl font-bold mt-1">{formatMoney(summary.total)}</div>
      </div>

      <div className="grid grid-cols-4 text-xl divide-x divide-white">
        {summaryItems.map(({ label, value }) => (
          <div key={label} className="px-2">
            <div className="opacity-80">{label}</div>
            <div className="font-bold">{formatMoney(value)}</div>
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

      <Table
        className="bg-white rounded-lg shadow-sm py-4 px-4"
        columns={columns}
        dataSource={payments}
        rowKey="id"
        pagination={false}
        size="middle"
      />
    </div>
  );
}
