'use client';

import React from 'react';
import { Table, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Payment } from '@/types';
import { PaymentStatusTag } from '@/components/common';
import { PAYMENTS_LABELS } from '@/constants';
import { formatCurrency } from '@/utils/format';

interface PaymentsTableProps {
  payments: Payment[];
  showSummary?: boolean;
}

export default function PaymentsTable({ payments, showSummary = true }: PaymentsTableProps) {
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const columns: ColumnsType<Payment> = [
    {
      title: PAYMENTS_LABELS.description,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: PAYMENTS_LABELS.amount,
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: PAYMENTS_LABELS.dueDate,
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
    },
    {
      title: PAYMENTS_LABELS.paidDate,
      dataIndex: 'paidDate',
      key: 'paidDate',
      width: 120,
      render: (date?: string) => date || '-',
    },
    {
      title: PAYMENTS_LABELS.status,
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status: 'paid' | 'pending' | 'overdue') => (
        <PaymentStatusTag status={status} />
      ),
    },
  ];

  return (
    <Card title={PAYMENTS_LABELS.title} className="shadow-sm">
      <Table
        columns={columns}
        dataSource={payments}
        rowKey="id"
        pagination={false}
        summary={() =>
          showSummary ? (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <strong>{PAYMENTS_LABELS.total}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <strong>{formatCurrency(totalAmount)}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={3}>
                  <div className="flex justify-between px-4">
                    <span>{PAYMENTS_LABELS.paidAmount}: <strong>{formatCurrency(paidAmount)}</strong></span>
                    <span>{PAYMENTS_LABELS.pendingAmount}: <strong className="text-red-600">{formatCurrency(totalAmount - paidAmount)}</strong></span>
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          ) : null
        }
      />
    </Card>
  );
}
