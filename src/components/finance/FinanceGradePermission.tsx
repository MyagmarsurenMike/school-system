'use client';

import React, { useState } from 'react';
import { Card, Table, Switch, Input, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { StudentPaymentPermission } from '@/types';
import { PaymentStatusTag } from '@/components/common';
import { COMMON_LABELS } from '@/constants';

export interface FinanceGradePermissionProps {
  students?: StudentPaymentPermission[];
}

/**
 * Finance grade permission component for managing student grade access
 */
export default function FinanceGradePermission({ 
  students = [] 
}: FinanceGradePermissionProps) {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<StudentPaymentPermission[]>(students);

  const handlePermissionChange = (studentId: string, canView: boolean) => {
    setData(prev => 
      prev.map(student => 
        student.studentId === studentId 
          ? { ...student, canViewGrades: canView }
          : student
      )
    );
    message.success(
      canView 
        ? 'Дүн харах эрх нээгдлээ' 
        : 'Дүн харах эрх хаагдлаа'
    );
  };

  const columns: ColumnsType<StudentPaymentPermission> = [
    {
      title: 'ID',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 100,
    },
    {
      title: 'Нэр',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        const search = value.toString().toLowerCase();
        return (
          record.name.toLowerCase().includes(search) ||
          record.studentId.toLowerCase().includes(search)
        );
      },
    },
    {
      title: 'Дүн харах эрх',
      dataIndex: 'canViewGrades',
      key: 'canViewGrades',
      render: (canView: boolean, record) => (
        <Switch
          checked={canView}
          onChange={(checked) => handlePermissionChange(record.studentId, checked)}
        />
      ),
    },
    {
      title: 'Төлбөрийн байдал',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => <PaymentStatusTag status={status} />,
    },
  ];

  return (
    <div>
      <Card>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Хайх"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Table
            columns={columns}
            dataSource={data}
            rowKey="studentId"
          />
        </Space>
      </Card>
    </div>
  );
}
