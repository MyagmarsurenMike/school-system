'use client';

import React, { useMemo } from 'react';
import { Card, Table } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Grade, Language } from '@/types';
import { GradeTag } from '@/components/common';
import { gradesTranslations, GradesTranslations } from '@/constants/translations';

// =============================================================================
// TYPES
// =============================================================================

interface GradesTableProps {
  grades: Grade[];
  language: Language;
}

interface GradeSummary {
  totalCourses: number;
  totalCredits: number;
  avgGPA: number;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const calculateGradeSummary = (grades: Grade[]): GradeSummary => {
  const totalCourses = grades.length;
  const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
  const weightedSum = grades.reduce(
    (sum, grade) => sum + grade.gradePoint * grade.credits, 
    0
  );
  const avgGPA = totalCredits > 0 ? weightedSum / totalCredits : 0;

  return { totalCourses, totalCredits, avgGPA };
};

const createTableColumns = (t: GradesTranslations): ColumnsType<Grade> => [
  {
    title: <span className="text-xs sm:text-sm">{t.courseCode}</span>,
    dataIndex: 'courseCode',
    key: 'courseCode',
    width: 70,
    render: (code: string) => (
      <span className="text-blue-600 font-semibold text-xs sm:text-sm">{code}</span>
    ),
  },
  {
    title: <span className="text-xs sm:text-sm">{t.courseName}</span>,
    dataIndex: 'teacher',
    key: 'teacher',
    ellipsis: true,
    render: (teacher: string) => (
      <span className="text-gray-700 text-xs sm:text-sm">{teacher}</span>
    ),
  },
  {
    title: <span className="text-xs sm:text-sm">{t.credits}</span>,
    dataIndex: 'credits',
    key: 'credits',
    width: 50,
    align: 'center',
    render: (credits: number) => (
      <span className="font-medium text-xs sm:text-sm">{credits}</span>
    ),
  },
  {
    title: <span className="text-xs sm:text-sm">{t.grade}</span>,
    dataIndex: 'grade',
    key: 'grade',
    width: 60,
    align: 'center',
    render: (grade: string) => <GradeTag grade={grade} />,
  },
  {
    title: <span className="text-xs sm:text-sm">{t.gradePoint}</span>,
    dataIndex: 'gradePoint',
    key: 'gradePoint',
    width: 50,
    align: 'center',
    render: (point: number) => (
      <span className="font-semibold text-gray-900 text-xs sm:text-sm">{point.toFixed(1)}</span>
    ),
  },
];

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface SummaryStatsProps {
  summary: GradeSummary;
  translations: GradesTranslations;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ summary, translations: t }) => {
  const stats = [
    { 
      label: t.totalCourses, 
      value: summary.totalCourses, 
      color: 'text-blue-600' 
    },
    { 
      label: t.totalCredits, 
      value: summary.totalCredits, 
      color: 'text-indigo-600' 
    },
    { 
      label: t.avgGrade, 
      value: summary.avgGPA.toFixed(2), 
      color: 'text-green-600',
      icon: <TrophyOutlined className="text-green-600 mr-1 text-xs sm:text-sm" />
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
      {stats.map(({ label, value, color, icon }) => (
        <div key={label} className="flex items-center space-x-1 sm:space-x-2">
          {icon}
          <span className="text-xs sm:text-sm text-gray-600">{label}:</span>
          <span className={`text-base sm:text-xl font-bold ${color}`}>{value}</span>
        </div>
      ))}
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function GradesTable({ grades, language }: GradesTableProps) {
  const t = gradesTranslations[language];
  
  const summary = useMemo(() => calculateGradeSummary(grades), [grades]);
  const columns = useMemo(() => createTableColumns(t), [t]);

  return (
    <Card 
      className="shadow-sm border border-gray-200 rounded-lg overflow-hidden"
      styles={{ body: { padding: '0.75rem' } }}
      classNames={{ body: 'sm:!p-4' }}
    >
      <div className="mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.title}</h3>
        <SummaryStats summary={summary} translations={t} />
      </div>

      <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
        <Table
          columns={columns}
          dataSource={grades}
          rowKey="id"
          pagination={false}
          size="small"
          className="grades-table-compact [&_.ant-table-cell]:p-1.5! [&_.ant-table-cell]:sm:p-2!"
          bordered
          scroll={{ x: 350 }}
        />
      </div>
    </Card>
  );
}
