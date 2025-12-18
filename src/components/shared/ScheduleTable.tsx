'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Schedule } from '@/types';
import { SCHEDULE_LABELS, DAY_NAMES, SCHEDULE_TYPE_LABELS, getScheduleTypeStyle } from '@/constants/schedule';

interface ScheduleTableProps {
  schedules: Schedule[];
}

export default function ScheduleTable({ schedules }: ScheduleTableProps) {
  const columns: ColumnsType<Schedule> = [
    {
      title: SCHEDULE_LABELS.day,
      dataIndex: 'dayOfWeek',
      key: 'dayOfWeek',
      render: (day: number) => DAY_NAMES[day - 1],
      width: 100,
    },
    {
      title: SCHEDULE_LABELS.time,
      key: 'time',
      render: (_, record) => `${record.startTime} - ${record.endTime}`,
      width: 150,
    },
    {
      title: SCHEDULE_LABELS.courseCode,
      dataIndex: 'courseCode',
      key: 'courseCode',
      width: 100,
    },
    {
      title: SCHEDULE_LABELS.courseName,
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: SCHEDULE_LABELS.teacher,
      dataIndex: 'teacher',
      key: 'teacher',
      width: 150,
    },
    {
      title: SCHEDULE_LABELS.room,
      dataIndex: 'room',
      key: 'room',
      width: 100,
    },
    {
      title: SCHEDULE_LABELS.type,
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: 'lecture' | 'lab' | 'tutorial') => {
        const style = getScheduleTypeStyle(type);
        return (
          <Tag color={style.color} className={style.bgClass}>
            {SCHEDULE_TYPE_LABELS[type]}
          </Tag>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={schedules}
      rowKey="id"
      pagination={false}
    />
  );
}
