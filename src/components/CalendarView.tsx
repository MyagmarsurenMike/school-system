'use client';

import React from 'react';
import { Card, Calendar as AntCalendar, Badge, Tag, Space, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { CalendarEvent, Language, CalendarEventType } from '@/types';
import { calendarTranslations } from '@/constants/translations';
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

const getEventIcon = (type: CalendarEventType) => {
  const icons: Record<CalendarEventType, React.ReactNode> = {
    exam: <AlertOutlined />,
    assignment: <FileTextOutlined />,
    holiday: <SmileOutlined />,
    event: <CalendarOutlined />,
  };
  return icons[type];
};

const getEventColor = (type: CalendarEventType): 'error' | 'warning' | 'success' | 'processing' => {
  const colors: Record<CalendarEventType, 'error' | 'warning' | 'success' | 'processing'> = {
    exam: 'error',
    assignment: 'warning',
    holiday: 'success',
    event: 'processing',
  };
  return colors[type];
};

const getTagColor = (type: CalendarEventType): string => {
  const colors: Record<CalendarEventType, string> = {
    exam: 'red',
    assignment: 'blue',
    holiday: 'yellow',
    event: 'green',
  };
  return colors[type];
};

export default function CalendarView({ events, language }: CalendarViewProps) {
  const t = calendarTranslations[language];

  const getEventTypeLabel = (type: CalendarEventType): string => {
    const labels: Record<CalendarEventType, string> = {
      exam: t.exam,
      assignment: t.assignment,
      holiday: t.holiday,
      event: t.event,
    };
    return labels[type];
  };

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
                {getEventTypeLabel(event.type)}
              </Tag>
            </div>
          ))}
        </Space>
      </div>
    </Card>
  );
}
