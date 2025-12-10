'use client';

import React from 'react';
import { Card, Table, Tag } from 'antd';
import { Payment, Language } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface PaymentsTableProps {
  payments: Payment[];
  language: Language;
}

const translations = {
  mn: {
    title: 'Төлбөрийн мэдээлэл',
    description: 'Тайлбар',
    amount: 'Дүн',
    dueDate: 'Хугацаа',
    paidDate: 'Төлсөн огноо',
    status: 'Төлөв',
    paid: 'Төлсөн',
    total: 'Нийт',
  },
  en: {
    title: 'Payment Information',
    description: 'Description',
    amount: 'Amount',
    dueDate: 'Due Date',
    paidDate: 'Paid Date',
    status: 'Status',
    paid: 'Paid',
    total: 'Total',
  },
};

const getStatusColor = (status: string): string => {
  if (status === 'paid') return 'success';
  if (status === 'pending') return 'warning';
  return 'error';
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('mn-MN').format(amount) + '₮';
};

export default function PaymentsTable({ payments, language }: PaymentsTableProps) {
  const t = translations[language];

  const columns: ColumnsType<Payment> = [
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
        <span className="font-semibold text-blue-600">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: t.dueDate,
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 130,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: t.paidDate,
      dataIndex: 'paidDate',
      key: 'paidDate',
      width: 130,
      render: (date?: string) => date ? dayjs(date).format('YYYY-MM-DD') : '-',
    },
    {
      title: t.status,
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status: string) => {
        const statusText = status === 'paid' ? t.paid : status === 'pending' ? t.pending : t.overdue;
        return <Tag color={getStatusColor(status)} className="font-medium">{statusText}</Tag>;
      },
    },
  ];

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div>
        <div className="p-6 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-[length:200%_200%] animate-fade-bg text-white mb-6 shadow-md">
            {/* Header */}
            <div className="mb-4">
                <div className="text-xl">
                    2025-2026 оны Намар-н хичээлийн жилийн сургалтын төлбөр
                </div>
                <div className="text-2xl font-bold mt-1">
                    {formatCurrency(totalAmount)}
                </div>
            </div>

            {/* Row with 4 columns */}
            <div className="grid grid-cols-4 text-xl divide-x divide-white">
                <div className="px-2">
                    <div className="opacity-80">Эхний үлдэгдэл</div>
                <div className="font-bold">{formatCurrency(0)}</div>
                </div>
                <div className="px-2">
                    <div className="opacity-80">Хөнгөлөлт</div>
                <div className="font-bold">{formatCurrency(0)}</div>
                </div>
                <div className="px-2">
                    <div className="opacity-80">Төлсөн</div>
                <div className="font-bold">{formatCurrency(paidAmount)}</div>
                </div>
                <div className="px-2">
                    <div className="opacity-80">Дутуу төлбөр</div>
                    <div className="font-bold">{formatCurrency(pendingAmount)}</div>
                </div>
            </div>
        </div>



        <Table
            className='bg-white rounded-lg shadow-sm py-4 px-4'
            columns={columns}
            dataSource={payments}
            rowKey="id"
            pagination={false}
            size="middle"
        />
    </div>
  );
}
