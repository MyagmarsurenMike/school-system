'use client';

import { Card, Table, Tag } from 'antd';
import { Schedule, Language } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import { ClockCircleOutlined, HomeOutlined } from '@ant-design/icons';
import { 
  scheduleTranslations, 
  getScheduleTypeStyle, 
  getScheduleTypeLabel 
} from '@/constants/schedule';

interface ScheduleTableProps {
  schedules: Schedule[];
  language: Language;
}

export default function ScheduleTable({ schedules, language }: ScheduleTableProps) {
  const t = scheduleTranslations[language];

  const columns: ColumnsType<Schedule> = [
    {
      title: <span className="font-semibold text-gray-700">{t.day}</span>,
      dataIndex: 'dayOfWeek',
      key: 'dayOfWeek',
      width: 110,
      render: (day: number) => (
        <Tag color="geekblue" className="font-medium px-3 py-1">
          {t.days[day]}
        </Tag>
      ),
      sorter: (a, b) => a.dayOfWeek - b.dayOfWeek,
    },
    {
      title: <span className="font-semibold text-gray-700"><ClockCircleOutlined className="mr-1" />{t.time}</span>,
      key: 'time',
      width: 130,
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-semibold text-blue-600">{record.startTime}</span>
          <span className="text-xs text-gray-500">{record.endTime}</span>
        </div>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">{t.courseCode}</span>,
      dataIndex: 'courseCode',
      key: 'courseCode',
      width: 90,
      render: (code: string) => <span className="font-mono font-semibold text-indigo-600">{code}</span>,
    },
    {
      title: <span className="font-semibold text-gray-700">{t.courseName}</span>,
      dataIndex: language === 'mn' ? 'courseName' : 'courseNameEn',
      key: 'courseName',
      ellipsis: true,
      render: (name: string) => <span className="font-medium text-gray-900">{name}</span>,
    },
    {
      title: <span className="font-semibold text-gray-700">{t.teacher}</span>,
      dataIndex: 'teacher',
      key: 'teacher',
      width: 170,
      render: (teacher: string) => <span className="text-gray-600">{teacher}</span>,
    },
    {
      title: <span className="font-semibold text-gray-700"><HomeOutlined className="mr-1" />{t.room}</span>,
      dataIndex: 'room',
      key: 'room',
      width: 90,
      align: 'center',
      render: (room: string) => (
        <Tag color="cyan" className="font-medium">{room}</Tag>
      ),
    },
    {
      title: <span className="font-semibold text-gray-700">{t.type}</span>,
      dataIndex: 'type',
      key: 'type',
      width: 110,
      align: 'center',
      render: (type: 'lecture' | 'lab' | 'tutorial') => {
        const style = getScheduleTypeStyle(type);
        return (
          <Tag icon={style.icon} color={style.color} className="font-medium">
            {getScheduleTypeLabel(type, language)}
          </Tag>
        );
      },
    },
  ];

  return (
    <Card
      title={<span className="text-lg font-bold text-gray-900">{t.weekly}</span>}
      className="shadow-sm hover:shadow-md transition-shadow border border-gray-200 rounded-xl"
    >
      <Table
        columns={columns}
        dataSource={schedules}
        rowKey="id"
        pagination={false}
        size="middle"
        rowClassName={(_, index) => 
          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
        }
      />
    </Card>
  );
}
