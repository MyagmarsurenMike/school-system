'use client';

import React, { useState } from 'react';
import { Table, Select, Input, Button, message, Card, Tag, Typography, Space, Tooltip } from 'antd';
import { SaveOutlined, CheckCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Course, StudentGradeInput } from '@/types';
import { mockStudentsForGrading } from '@/data/mockData';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

interface TeacherGradeManagementProps {
  courses: Course[];
}

const translations = {
  mn: {
    title: 'Үнэлгээ оруулах',
    selectCourse: 'Хичээл сонгох',
    searchStudent: 'Оюутан хайх...',
    studentId: 'Оюутны код',
    studentName: 'Оюутны нэр',
    attendance: 'Ирц',
    midterm: 'Явц',
    final: 'Шалгалт',
    grade: 'Үнэлгээ',
    gradePoint: 'Оноо',
    actions: 'Үйлдэл',
    save: 'Хадгалах',
    saveAll: 'Бүгдийг хадгалах',
    saved: 'Үнэлгээ амжилттай хадгалагдлаа',
    enterGrade: 'Сонгох',
    noCourseSelected: 'Үнэлгээ оруулах хичээлээ сонгоно уу',
    totalStudents: 'Нийт оюутан',
  },
};

const gradeOptions = [
  { value: 'A', label: 'A', point: 4.0 },
  { value: 'A-', label: 'A-', point: 3.7 },
  { value: 'B+', label: 'B+', point: 3.3 },
  { value: 'B', label: 'B', point: 3.0 },
  { value: 'B-', label: 'B-', point: 2.7 },
  { value: 'C+', label: 'C+', point: 2.3 },
  { value: 'C', label: 'C', point: 2.0 },
  { value: 'C-', label: 'C-', point: 1.7 },
  { value: 'D', label: 'D', point: 1.0 },
  { value: 'F', label: 'F', point: 0.0 },
];

export default function TeacherGradeManagement({ courses }: TeacherGradeManagementProps) {
  const t = translations['mn'];
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [students, setStudents] = useState<StudentGradeInput[]>(mockStudentsForGrading);

  const handleGradeChange = (studentId: string, field: keyof StudentGradeInput, value: any) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.studentId === studentId) {
          const updated = { ...student, [field]: value };
          // Auto-calculate grade point when grade is selected
          if (field === 'grade') {
            const gradeOption = gradeOptions.find((opt) => opt.value === value);
            if (gradeOption) {
              updated.gradePoint = gradeOption.point;
            }
          }
          return updated;
        }
        return student;
      })
    );
  };

  const handleSave = (studentId: string) => {
    message.success({
      content: `${t.saved} - ${students.find((s) => s.studentId === studentId)?.studentName}`,
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    });
  };

  const handleSaveAll = () => {
    message.success({
      content: t.saved,
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    });
  };

  const filteredStudents = students.filter(student => 
    student.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<StudentGradeInput> = [
    {
      title: t.studentId,
      dataIndex: 'studentId',
      key: 'studentId',
      width: 120,
      fixed: 'left',
      render: (id: string) => (
        <Space>
          <UserOutlined className="text-gray-400" />
          <span className="font-medium text-gray-700">{id}</span>
        </Space>
      ),
    },
    {
      title: t.studentName,
      dataIndex: 'studentName',
      key: 'studentName',
      width: 200,
      fixed: 'left',
      render: (name: string) => <span className="font-medium text-gray-900">{name}</span>,
    },
    {
      title: t.attendance,
      dataIndex: 'attendance',
      key: 'attendance',
      width: 120,
      render: (value: number, record: StudentGradeInput) => (
        <Input
          type="number"
          min={0}
          max={100}
          value={value}
          onChange={(e) => handleGradeChange(record.studentId, 'attendance', Number(e.target.value))}
          className="w-24 text-center"
          suffix="%"
          aria-label={`${t.attendance} for ${record.studentName}`}
        />
      ),
    },
    {
      title: t.midterm,
      dataIndex: 'midtermScore',
      key: 'midtermScore',
      width: 120,
      render: (value: number, record: StudentGradeInput) => (
        <Input
          type="number"
          min={0}
          max={100}
          value={value}
          onChange={(e) => handleGradeChange(record.studentId, 'midtermScore', Number(e.target.value))}
          className="w-24 text-center"
          aria-label={`${t.midterm} for ${record.studentName}`}
        />
      ),
    },
    {
      title: t.final,
      dataIndex: 'finalScore',
      key: 'finalScore',
      width: 120,
      render: (value: number, record: StudentGradeInput) => (
        <Input
          type="number"
          min={0}
          max={100}
          value={value}
          onChange={(e) => handleGradeChange(record.studentId, 'finalScore', Number(e.target.value))}
          className="w-24 text-center"
          aria-label={`${t.final} for ${record.studentName}`}
        />
      ),
    },
    {
      title: t.grade,
      dataIndex: 'grade',
      key: 'grade',
      width: 120,
      render: (value: string, record: StudentGradeInput) => (
        <Select
          value={value}
          onChange={(val) => handleGradeChange(record.studentId, 'grade', val)}
          className="w-24"
          placeholder={t.enterGrade}
          options={gradeOptions}
          aria-label={`${t.grade} for ${record.studentName}`}
        />
      ),
    },
    {
      title: t.gradePoint,
      dataIndex: 'gradePoint',
      key: 'gradePoint',
      width: 100,
      render: (value: number) => (
        <Tag 
          color={value >= 3.7 ? 'success' : value >= 3.0 ? 'processing' : value >= 2.0 ? 'warning' : 'error'}
          className="px-3 py-1 text-sm font-medium rounded-full"
        >
          {value ? value.toFixed(1) : '-'}
        </Tag>
      ),
    },
    {
      title: t.actions,
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record: StudentGradeInput) => (
        <Tooltip title={t.save}>
          <Button
            type="text"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            icon={<SaveOutlined />}
            onClick={() => handleSave(record.studentId)}
          />
        </Tooltip>
      ),
    },
  ];

  const courseOptions = courses.map((course) => ({
    value: course.id,
    label: `${course.courseCode} - ${course.courseName}`,
  }));

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.selectCourse}</label>
            <Select
              value={selectedCourse}
              onChange={setSelectedCourse}
              options={courseOptions}
              placeholder={t.selectCourse}
              className="w-full"
              size="large"
            />
          </div>
          
          {selectedCourse && (
            <div className="flex items-end gap-4">
              <div className="flex-1 md:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.searchStudent}</label>
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder={t.searchStudent}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  size="large"
                />
              </div>
              <Button
                type="primary"
                size="large"
                icon={<SaveOutlined />}
                onClick={handleSaveAll}
                className="bg-blue-600"
              >
                {t.saveAll}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {selectedCourse ? (
        <Card className="shadow-sm border-gray-200" bodyStyle={{ padding: 0 }}>
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
            <Title level={5} style={{ margin: 0 }}>
              {courses.find(c => c.id === selectedCourse)?.courseName}
            </Title>
            <Tag color="blue">{t.totalStudents}: {filteredStudents.length}</Tag>
          </div>
          <Table
            columns={columns}
            dataSource={filteredStudents}
            rowKey="studentId"
            scroll={{ x: 1000 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `${t.totalStudents}: ${total}`,
              className: "p-4"
            }}
          />
        </Card>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <div className="text-gray-400 text-5xl mb-4">
            <CheckCircleOutlined />
          </div>
          <p className="text-gray-500 text-lg">{t.noCourseSelected}</p>
        </div>
      )}
    </div>
  );
}
