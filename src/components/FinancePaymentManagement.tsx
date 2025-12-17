'use client';

import React, { useState } from 'react';
import { Table, Button, Modal, Input, message, Card, Statistic } from 'antd';
import { SearchOutlined, EditOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Language, StudentPaymentPermission } from '@/types';
import { mockStudentPayments } from '@/data/mockData';
import { formatMoney } from '@/utils';
import { PaymentStatusTag } from '@/components/common/PaymentStatusTag';
import type { ColumnsType } from 'antd/es/table';

interface FinancePaymentManagementProps {
  language: Language;
}

const translations = {
  mn: {
    title: 'Төлбөрийн удирдлага',
    studentId: 'Оюутны дугаар',
    studentName: 'Оюутны нэр',
    totalAmount: 'Нийт дүн',
    paidAmount: 'Төлсөн дүн',
    remaining: 'Үлдэгдэл',
    paymentStatus: 'Төлбөрийн байдал',
    actions: 'Үйлдэл',
    edit: 'Засах',
    search: 'Хайх',
    updatePayment: 'Төлбөр шинэчлэх',
    paidAmountLabel: 'Төлсөн дүн',
    save: 'Хадгалах',
    cancel: 'Цуцлах',
    updateSuccess: 'Төлбөр амжилттай шинэчлэгдлээ',
    totalStudents: 'Нийт оюутан',
    totalPaid: 'Төлсөн оюутан',
    totalPending: 'Хүлээгдэж буй',
    totalRevenue: 'Нийт орлого',
  },
  en: {
    title: 'Payment Management',
    studentId: 'Student ID',
    studentName: 'Student Name',
    totalAmount: 'Total Amount',
    paidAmount: 'Paid Amount',
    remaining: 'Remaining',
    paymentStatus: 'Payment Status',
    actions: 'Actions',
    edit: 'Edit',
    search: 'Search',
    updatePayment: 'Update Payment',
    paidAmountLabel: 'Paid Amount',
    save: 'Save',
    cancel: 'Cancel',
    updateSuccess: 'Payment updated successfully',
    totalStudents: 'Total Students',
    totalPaid: 'Paid Students',
    totalPending: 'Pending',
    totalRevenue: 'Total Revenue',
  },
};

export default function FinancePaymentManagement({ language }: FinancePaymentManagementProps) {
  const t = translations[language];
  const [students, setStudents] = useState<StudentPaymentPermission[]>(mockStudentPayments);
  const [searchText, setSearchText] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentPaymentPermission | null>(null);
  const [newPaidAmount, setNewPaidAmount] = useState<number>(0);

  const handleEdit = (student: StudentPaymentPermission) => {
    setSelectedStudent(student);
    setNewPaidAmount(student.paidAmount);
    setEditModalVisible(true);
  };

  const handleUpdate = () => {
    if (!selectedStudent) return;

    const updatedStudents = students.map((s) => {
      if (s.studentId === selectedStudent.studentId) {
        const remaining = s.totalAmount - newPaidAmount;
        return {
          ...s,
          paidAmount: newPaidAmount,
          paymentStatus: remaining <= 0 ? 'paid' : (remaining > 0 && newPaidAmount > 0 ? 'pending' : 'overdue'),
          canViewGrades: remaining <= 0,
        } as StudentPaymentPermission;
      }
      return s;
    });

    setStudents(updatedStudents);
    message.success(t.updateSuccess);
    setEditModalVisible(false);
  };

  const columns: ColumnsType<StudentPaymentPermission> = [
    {
      title: t.studentId,
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
      render: (id: string) => <span className="font-semibold text-blue-600">{id}</span>,
    },
    {
      title: t.studentName,
      dataIndex: language === 'mn' ? 'studentName' : 'studentNameEn',
      key: 'studentName',
      width: 180,
      render: (name: string) => <span className="font-medium">{name}</span>,
    },
    {
      title: t.totalAmount,
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 150,
      align: 'right',
      render: (amount: number) => <span className="font-semibold">{formatMoney(amount)}</span>,
    },
    {
      title: t.paidAmount,
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      width: 150,
      align: 'right',
      render: (amount: number) => <span className="text-green-600 font-semibold">{formatMoney(amount)}</span>,
    },
    {
      title: t.remaining,
      key: 'remaining',
      width: 150,
      align: 'right',
      render: (_, record: StudentPaymentPermission) => {
        const remaining = record.totalAmount - record.paidAmount;
        return <span className={`font-semibold ${remaining > 0 ? 'text-red-600' : 'text-green-600'}`}>{formatMoney(remaining)}</span>;
      },
    },
    {
      title: t.paymentStatus,
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 120,
      align: 'center',
      render: (status: 'paid' | 'pending' | 'overdue') => <PaymentStatusTag status={status} language={language} />,
    },
    {
      title: t.actions,
      key: 'actions',
      width: 100,
      align: 'center',
      render: (_, record: StudentPaymentPermission) => (
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          {t.edit}
        </Button>
      ),
    },
  ];

  const filteredStudents = students.filter((s) =>
    s.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
    s.name.toLowerCase().includes(searchText.toLowerCase()) ||
    s.nameEn.toLowerCase().includes(searchText.toLowerCase())
  );

  // Calculate statistics
  const totalStudents = students.length;
  const paidStudents = students.filter((s) => s.paymentStatus === 'paid').length;
  const pendingStudents = students.filter((s) => s.paymentStatus === 'pending').length;
  const totalRevenue = students.reduce((sum, s) => sum + s.paidAmount, 0);

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Statistic
            title={t.totalStudents}
            value={totalStudents}
            prefix={<UserOutlined />}
            styles={{ content: { color: '#3f8600' } }}
          />
        </Card>
        <Card>
          <Statistic
            title={t.totalPaid}
            value={paidStudents}
            suffix={`/ ${totalStudents}`}
            styles={{ content: { color: '#52c41a' } }}
          />
        </Card>
        <Card>
          <Statistic
            title={t.totalPending}
            value={pendingStudents}
            styles={{ content: { color: '#faad14' } }}
          />
        </Card>
        <Card>
          <Statistic
            title={t.totalRevenue}
            value={totalRevenue}
            precision={0}
            styles={{ content: { color: '#1890ff' } }}
            formatter={(value) => formatMoney(Number(value))}
          />
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <div className="mb-4">
          <Input
            placeholder={t.search}
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
          rowKey="studentId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `${language === 'mn' ? 'Нийт' : 'Total'}: ${total}`,
          }}
          bordered
        />
      </Card>

      {/* Edit Modal */}
      <Modal
        title={t.updatePayment}
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            {t.cancel}
          </Button>,
          <Button key="save" type="primary" icon={<CheckCircleOutlined />} onClick={handleUpdate}>
            {t.save}
          </Button>,
        ]}
      >
        {selectedStudent && (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">{t.studentName}:</p>
              <p className="font-semibold text-lg">
                {language === 'mn' ? selectedStudent.name : selectedStudent.nameEn}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{t.totalAmount}:</p>
              <p className="font-semibold text-lg">{formatMoney(selectedStudent.totalAmount)}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t.paidAmountLabel}:</label>
              <Input
                type="number"
                value={newPaidAmount}
                onChange={(e) => setNewPaidAmount(Number(e.target.value))}
                min={0}
                max={selectedStudent.totalAmount}
                size="large"
                prefix="₮"
              />
            </div>
            <div>
              <p className="text-gray-600">{t.remaining}:</p>
              <p className={`font-semibold text-lg ${selectedStudent.totalAmount - newPaidAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatMoney(selectedStudent.totalAmount - newPaidAmount)}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
