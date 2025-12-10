'use client';

import React from 'react';
import { Card, Calendar as AntCalendar, Badge, Tag, Space, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { CalendarEvent, Language } from '@/types';
import { 
  FileTextOutlined, 
  AlertOutlined, 
  SmileOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';

interface CalendarViewProps {
  events: CalendarEvent[];
  language: Language;
}

const translations = {
  mn: {
    title: 'Календарь',
    exam: 'Шалгалт',
    assignment: 'Даалгавар',
    holiday: 'Амралт',
    event: 'Үйл явдал',
    upcomingEvents: 'Ирэх үйл явдлууд',
  },
  en: {
    title: 'Academic Calendar',
    exam: 'Exam',
    assignment: 'Assignment',
    holiday: 'Holiday',
    event: 'Event',
    upcomingEvents: 'Upcoming Events',
  },
};

const getEventIcon = (type: string) => {
  if (type === 'exam') return <AlertOutlined />;
  if (type === 'assignment') return <FileTextOutlined />;
  if (type === 'holiday') return <SmileOutlined />;
  return <CalendarOutlined />;
};

const getEventColor = (type: string): 'error' | 'warning' | 'success' | 'processing' => {
  if (type === 'exam') return 'error';
  if (type === 'assignment') return 'warning';
  if (type === 'holiday') return 'success';
  return 'processing';
};

const getTagColor = (type: string): string => {
  if (type === 'exam') return 'red';
  if (type === 'assignment') return 'blue';
  if (type === 'holiday') return 'yellow';
  return 'green';
};

export default function CalendarView({ events, language }: CalendarViewProps) {
  const t = translations[language];

  const getListData = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    return events.filter(event => event.date === dateStr);
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events m-0 p-0 list-none">
        {listData.map(item => (
          <li key={item.id} className="mb-1">
            <Tooltip title={language === 'mn' ? item.title : item.titleEn}>
              <Badge 
                status={getEventColor(item.type)} 
                text={
                  <span className="text-xs truncate block">
                    {language === 'mn' ? item.title : item.titleEn}
                  </span>
                } 
              />
            </Tooltip>
          </li>
        ))}
      </ul>
    );
  };

  const upcomingEvents = events
    .filter(event => dayjs(event.date).isAfter(dayjs()))
    .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
    .slice(0, 5);

  return (
    <Card 
      className="shadow-sm hover:shadow-md transition-shadow border border-gray-200 rounded-xl"
      title={<span className="text-lg font-bold text-gray-900">{t.title}</span>}
    >
      <AntCalendar 
        cellRender={dateCellRender}
        className="rounded-lg border border-gray-200"
      />
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <CalendarOutlined className="mr-2 text-blue-600" />
          {t.upcomingEvents}
        </h4>
        <Space direction="vertical" size="small" className="w-full">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
              <div className="flex items-center space-x-3">
                <span className="text-blue-600">{getEventIcon(event.type)}</span>
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {language === 'mn' ? event.title : event.titleEn}
                  </div>
                  <div className="text-xs text-gray-500">
                    {dayjs(event.date).format('YYYY-MM-DD')}
                  </div>
                </div>
              </div>
              <Tag color={getTagColor(event.type)} className="ml-2">
                {event.type === 'exam' ? t.exam : 
                 event.type === 'assignment' ? t.assignment : 
                 event.type === 'holiday' ? t.holiday : t.event}
              </Tag>
            </div>
          ))}
        </Space>
      </div>
    </Card>
  );
}
