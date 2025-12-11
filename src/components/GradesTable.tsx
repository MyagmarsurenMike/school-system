'use client';

import React from 'react';
import { Card, Table } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import { Grade, Language } from '@/types';
import { GradeTag } from '@/components/common';
import type { ColumnsType } from 'antd/es/table';

interface GradesTableProps {
  grades: Grade[];
  language: Language;
}

const translations = {
  mn: {
    title: 'Үнэлгээний хүснэгт',
    courseCode: 'Код',
    courseName: 'Багш',
    credits: 'Кредит',
    grade: 'Үнэлгээ',
    gradePoint: 'Оноо',
    totalCourses: 'Хичээл',
    totalCredits: 'Нийт кредит',
    avgGrade: 'Дундаж',
  },
  en: {
    title: 'Grade Report',
    courseCode: 'Code',
    courseName: 'Instructor',
    credits: 'Credits',
    grade: 'Grade',
    gradePoint: 'Points',
    totalCourses: 'Courses',
    totalCredits: 'Total Credits',
    avgGrade: 'Average',
  },
};

export default function GradesTable({ grades, language }: GradesTableProps) {
  const t = translations[language];

  const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
  const avgGPA = grades.reduce((sum, grade) => sum + grade.gradePoint * grade.credits, 0) / totalCredits;

  const columns: ColumnsType<Grade> = [
    {
      title: t.courseCode,
      dataIndex: 'courseCode',
      key: 'courseCode',
      width: 80,
      render: (code: string) => <span className="text-blue-600 font-semibold">{code}</span>,
    },
    {
      title: t.courseName,
      dataIndex: 'teacher',
      key: 'teacher',
      ellipsis: true,
      render: (teacher: string) => <span className="text-gray-700">{teacher}</span>,
    },
    {
      title: t.credits,
      dataIndex: 'credits',
      key: 'credits',
      width: 70,
      align: 'center',
      render: (credits: number) => <span className="font-medium">{credits}</span>,
    },
    {
      title: t.grade,
      dataIndex: 'grade',
      key: 'grade',
      width: 80,
      align: 'center',
      render: (grade: string) => <GradeTag grade={grade} />,
    },
    {
      title: t.gradePoint,
      dataIndex: 'gradePoint',
      key: 'gradePoint',
      width: 60,
      align: 'center',
      render: (point: number) => (
        <span className="font-semibold text-gray-900">{point.toFixed(1)}</span>
      ),
    },
  ];

  return (
    <Card 
      className="shadow-sm border border-gray-200 rounded-lg"
      bodyStyle={{ padding: '16px' }}
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">{t.title}</h3>
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{t.totalCourses}:</span>
            <span className="text-xl font-bold text-blue-600">{grades.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{t.totalCredits}:</span>
            <span className="text-xl font-bold text-indigo-600">{totalCredits}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrophyOutlined className="text-green-600" />
            <span className="text-xl font-bold text-green-600">{avgGPA.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={grades}
        rowKey="id"
        pagination={false}
        size="small"
        className="grades-table-compact"
        bordered
      />
    </Card>
  );
}
