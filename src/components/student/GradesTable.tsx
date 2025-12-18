'use client';

import React from 'react';
import { Table, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Grade } from '@/types';
import { GradeTag } from '@/components/common';
import { GRADES_LABELS } from '@/constants';

interface GradesTableProps {
  grades: Grade[];
}

export default function GradesTable({ grades }: GradesTableProps) {
  // Calculate totals
  const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
  const totalPoints = grades.reduce((sum, grade) => sum + (grade.gradePoint * grade.credits), 0);
  const avgGrade = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  const columns: ColumnsType<Grade> = [
    {
      title: GRADES_LABELS.courseCode,
      dataIndex: 'courseCode',
      key: 'courseCode',
      width: 100,
    },
    {
      title: GRADES_LABELS.courseName,
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: GRADES_LABELS.credits,
      dataIndex: 'credits',
      key: 'credits',
      width: 80,
      align: 'center',
    },
    {
      title: GRADES_LABELS.grade,
      dataIndex: 'grade',
      key: 'grade',
      width: 100,
      align: 'center',
      render: (grade: string) => <GradeTag grade={grade} />,
    },
    {
      title: GRADES_LABELS.gradePoint,
      dataIndex: 'gradePoint',
      key: 'gradePoint',
      width: 100,
      align: 'center',
      render: (point: number) => point.toFixed(1),
    },
  ];

  return (
    <Card title={GRADES_LABELS.title} className="shadow-sm">
      <Table
        columns={columns}
        dataSource={grades}
        rowKey="id"
        pagination={false}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>
                <strong>{GRADES_LABELS.total}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="center">
                <strong>{totalCredits}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} align="center">
                <strong>{GRADES_LABELS.avgGrade}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} align="center">
                <strong>{avgGrade}</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </Card>
  );
}
