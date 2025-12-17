'use client';

import React, { useState, useEffect } from 'react';
import { Table, Tag, Switch, Card, Input, Progress, Tooltip, App } from 'antd';
import { SearchOutlined, LockOutlined, UnlockOutlined, CheckCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Language, StudentPaymentPermission } from '@/types';
import { mockStudentPayments } from '@/data/mockData';
import { formatMoney, calculatePercentage, getProgressColor } from '@/utils';
import { PaymentStatusTag } from '@/components/common/PaymentStatusTag';
import type { ColumnsType } from 'antd/es/table';

interface FinanceGradePermissionProps {
  language: Language;
}

const translations = {
  mn: {
    title: 'Үнэлгээ харах эрх',
    studentId: 'Оюутны дугаар',
    studentName: 'Оюутны нэр',
    paymentStatus: 'Төлбөрийн байдал',
    canViewGrades: 'Үнэлгээ харах эрх',
    actions: 'Үйлдэл',
    search: 'Хайх',
    paid: 'Төлсөн',
    pending: 'Хүлээгдэж буй',
    overdue: 'Хугацаа хэтэрсэн',
    enabled: 'Идэвхтэй',
    disabled: 'Идэвхгүй',
    updateSuccess: 'Эрх амжилттай шинэчлэгдлээ',
    warning: 'Анхааруулга',
    notPaidWarning: 'Оюутан төлбөрөө төлөөгүй байна. Та үнэлгээ харах эрх олгохдоо итгэлтэй байна уу?',
    yes: 'Тийм',
    no: 'Үгүй',
    paidAmount: 'Төлсөн дүн',
    totalAmount: 'Нийт дүн',
    semester: 'Улирал',
    paymentProgress: 'Төлбөрийн хувь',
    auto: 'Авто',
    autoGranted: '50%-с дээш төлсөн тул автоматаар эрх олгогдсон',
    autoGrantInfo: '50%-с дээш төлсөн оюутнуудад автоматаар эрх олгоно',
  },
  en: {
    title: 'Grade View Permission',
    studentId: 'Student ID',
    studentName: 'Student Name',
    paymentStatus: 'Payment Status',
    canViewGrades: 'Can View Grades',
    actions: 'Actions',
    search: 'Search',
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
    enabled: 'Enabled',
    disabled: 'Disabled',
    updateSuccess: 'Permission updated successfully',
    warning: 'Warning',
    notPaidWarning: 'Student has not paid in full. Are you sure you want to grant grade view permission?',
    yes: 'Yes',
    no: 'No',
    paidAmount: 'Paid Amount',
    totalAmount: 'Total Amount',
    semester: 'Semester',
    paymentProgress: 'Payment Progress',
    auto: 'Auto',
    autoGranted: 'Auto-granted (paid 50%+ of tuition)',
    autoGrantInfo: 'Students who paid 50%+ automatically get grade view permission',
  },
};

// Helper function to check if student qualifies for auto permission (paid >= 50%)
const qualifiesForAutoPermission = (paidAmount: number, totalAmount: number): boolean => {
  if (totalAmount === 0) return false;
  return (paidAmount / totalAmount) >= 0.5;
};

export default function FinanceGradePermission({ language }: FinanceGradePermissionProps) {
  const t = translations[language];
  const [students, setStudents] = useState<StudentPaymentPermission[]>([]);
  const [searchText, setSearchText] = useState('');
  const { modal, message: messageApi } = App.useApp();

  // Initialize students with auto-permission logic
  useEffect(() => {
    const processedStudents = mockStudentPayments.map((student) => {
      const autoQualifies = qualifiesForAutoPermission(student.paidAmount, student.totalAmount);
      return {
        ...student,
        // Auto-grant permission if paid >= 50%
        canViewGrades: autoQualifies || student.canViewGrades,
        isAutoGranted: autoQualifies,
      };
    });
    setStudents(processedStudents);
  }, []);

  const handlePermissionChange = (studentId: string, newPermission: boolean) => {
    const student = students.find((s) => s.studentId === studentId);
    
    if (!student) return;

    // Check if student qualifies for auto permission
    const autoQualifies = qualifiesForAutoPermission(student.paidAmount, student.totalAmount);
    
    // If trying to disable but student qualifies for auto, show warning
    if (!newPermission && autoQualifies) {
      modal.warning({
        title: language === 'mn' ? 'Анхааруулга' : 'Warning',
        content: language === 'mn' 
          ? 'Энэ оюутан 50%-с дээш төлбөр төлсөн тул эрхийг хасах боломжгүй.'
          : 'Cannot revoke permission as this student has paid 50%+ of tuition.',
      });
      return;
    }

    // If enabling permission but student hasn't paid at least 50%, show warning
    if (newPermission && !autoQualifies) {
      modal.confirm({
        title: t.warning,
        content: t.notPaidWarning,
        okText: t.yes,
        cancelText: t.no,
        onOk: () => {
          updatePermission(studentId, newPermission, false);
        },
      });
    } else {
      updatePermission(studentId, newPermission, autoQualifies);
    }
  };

  const updatePermission = (studentId: string, newPermission: boolean, isAutoGranted: boolean) => {
    const updatedStudents = students.map((s) => {
      if (s.studentId === studentId) {
        return { ...s, canViewGrades: newPermission, isAutoGranted };
      }
      return s;
    });

    setStudents(updatedStudents);
    messageApi.success({
      content: t.updateSuccess,
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    });
  };

  const columns: ColumnsType<StudentPaymentPermission & { isAutoGranted?: boolean }> = [
    {
      title: t.studentId,
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
      fixed: 'left',
      render: (id: string) => <span className="font-semibold text-blue-600">{id}</span>,
    },
    {
      title: t.studentName,
      dataIndex: language === 'mn' ? 'studentName' : 'studentNameEn',
      key: 'studentName',
      width: 180,
      fixed: 'left',
      render: (name: string) => <span className="font-medium">{name}</span>,
    },
    {
      title: t.semester,
      dataIndex: 'semester',
      key: 'semester',
      width: 120,
    },
    {
      title: t.paymentProgress,
      key: 'paymentProgress',
      width: 200,
      render: (_, record) => {
        const percentage = calculatePercentage(record.paidAmount, record.totalAmount);
        return (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">{formatMoney(record.paidAmount)}</span>
              <span className="font-semibold">{percentage}%</span>
            </div>
            <Progress 
              percent={percentage} 
              size="small" 
              strokeColor={getProgressColor(percentage)}
              showInfo={false}
            />
            <div className="text-xs text-gray-400">/ {formatMoney(record.totalAmount)}</div>
          </div>
        );
      },
    },
    {
      title: t.paymentStatus,
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 140,
      align: 'center',
      render: (status: 'paid' | 'pending' | 'overdue') => <PaymentStatusTag status={status} language={language} />,
    },
    {
      title: t.canViewGrades,
      dataIndex: 'canViewGrades',
      key: 'canViewGrades',
      width: 180,
      align: 'center',
      render: (canView: boolean, record) => {
        const isAutoGranted = record.isAutoGranted;
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={canView}
                onChange={(checked) => handlePermissionChange(record.studentId, checked)}
                checkedChildren={<UnlockOutlined />}
                unCheckedChildren={<LockOutlined />}
                disabled={isAutoGranted}
              />
              {isAutoGranted && (
                <Tooltip title={t.autoGranted}>
                  <Tag color="cyan" className="flex items-center gap-1 cursor-help">
                    <ThunderboltOutlined />
                    {t.auto}
                  </Tag>
                </Tooltip>
              )}
            </div>
            <Tag color={canView ? 'green' : 'red'}>
              {canView ? t.enabled : t.disabled}
            </Tag>
          </div>
        );
      },
    },
  ];

  const filteredStudents = students.filter((s) =>
    s.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
    s.name.toLowerCase().includes(searchText.toLowerCase()) ||
    s.nameEn.toLowerCase().includes(searchText.toLowerCase())
  );

  // Calculate statistics
  const totalWithPermission = students.filter((s) => s.canViewGrades).length;
  const totalWithoutPermission = students.filter((s) => !s.canViewGrades).length;
  const autoGrantedCount = students.filter((s) => (s as any).isAutoGranted).length;

  return (
    <div className="space-y-6">
      {/* Auto-grant Info Banner */}
      <Card className="bg-cyan-50 border-cyan-200">
        <div className="flex items-center gap-3">
          <ThunderboltOutlined className="text-2xl text-cyan-600" />
          <div>
            <div className="font-semibold text-cyan-800">
              {language === 'mn' ? 'Автомат эрх олголт' : 'Automatic Permission Grant'}
            </div>
            <div className="text-cyan-700 text-sm">{t.autoGrantInfo}</div>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Card>
          <div className="text-center">
            <UnlockOutlined className="text-4xl text-green-500 mb-2" />
            <div className="text-2xl font-bold text-green-600">{totalWithPermission}</div>
            <div className="text-gray-600">
              {language === 'mn' ? 'Эрхтэй оюутан' : 'With Permission'}
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <LockOutlined className="text-4xl text-red-500 mb-2" />
            <div className="text-2xl font-bold text-red-600">{totalWithoutPermission}</div>
            <div className="text-gray-600">
              {language === 'mn' ? 'Эрхгүй оюутан' : 'Without Permission'}
            </div>
          </div>
        </Card>
        <Card >
          <div className="text-center">
            <ThunderboltOutlined className="text-4xl text-cyan-500 mb-2" />
            <div className="text-2xl font-bold text-cyan-600">{autoGrantedCount}</div>
            <div className="text-gray-600">
              {language === 'mn' ? 'Автоматаар эрх олгогдсон' : 'Auto-granted'}
            </div>
          </div>
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
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `${language === 'mn' ? 'Нийт' : 'Total'}: ${total}`,
          }}
          bordered
          rowClassName={(record) => {
            if ((record as any).isAutoGranted) return 'bg-cyan-50';
            if (record.canViewGrades && record.paymentStatus !== 'paid') return 'bg-orange-50';
            return '';
          }}
        />
      </Card>

      {/* Legend */}
      <div className='mt-4'>
        <Card size="small" >
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-semibold">{language === 'mn' ? 'Тэмдэглэгээ:' : 'Legend:'}</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-50 border border-cyan-200"></div>
              <span>{language === 'mn' ? '50%+ төлсөн (автомат эрх)' : 'Paid 50%+ (auto-granted)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-50 border border-orange-200"></div>
              <span>{language === 'mn' ? 'Төлбөр дутуу боловч гараар эрх олгосон' : 'Manually granted with partial payment'}</span>
            </div>
          </div>
        </Card>      
      </div>
    </div>
  );
}
