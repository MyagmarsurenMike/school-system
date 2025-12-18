'use client';

import React, { useState } from 'react';
import { Card, Table, Input, Button, Space, Modal, Tag } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Student } from '@/types';
import { PaymentStatusTag } from '@/components/common';
import { PAYMENTS_LABELS } from '@/constants';

export interface FinancePaymentManagementProps {
  students?: Student[];
}

/**
 * Finance payment management component for viewing and managing student payments
 */
export default function FinancePaymentManagement({ 
  students = [] 
}: FinancePaymentManagementProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<Student> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
          record.id.toLowerCase().includes(search)
        );
      },
    },
    {
      title: PAYMENTS_LABELS.status,
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 120,
      render: (status: 'paid' | 'pending' | 'overdue') => (
        <PaymentStatusTag status={status} />
      ),
    },
    {
      title: 'Үйлдэл',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        >
          {PAYMENTS_LABELS.description}
        </Button>
      ),
    },
  ];

  const filteredStudents = students.filter((s) =>
    s.id.toLowerCase().includes(searchText.toLowerCase()) ||
    s.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Table */}
      <Card>
        <div className="mb-4">
          <Input
            placeholder="Хайх"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="large"
            className="max-w-md"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Нийт: ${total}`,
          }}
          bordered
        />
      </Card>

      {/* View Modal */}
      <Modal
        title="Төлбөрийн мэдээлэл"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Хаах
          </Button>,
        ]}
      >
        {selectedStudent && (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Нэр:</p>
              <p className="font-semibold text-lg">{selectedStudent.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Төлбөрийн байдал:</p>
              <p className="font-semibold text-lg">{selectedStudent.paymentStatus}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
