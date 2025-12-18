'use client';

import React, { useState } from 'react';
import { Card, Calendar, Badge, List, Typography } from 'antd';
import { CalendarEvent, CalendarEventType } from '@/types';
import { CALENDAR_LABELS } from '@/constants';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/mn';

const { Title, Text } = Typography;

export interface CalendarViewProps {
  events: CalendarEvent[];
}

/**
 * Calendar view component with event list
 */
export default function CalendarView({ events }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  // Event type colors
  const eventTypeColors: Record<CalendarEventType, 'error' | 'warning' | 'success' | 'processing'> = {
    exam: 'error',
    assignment: 'warning',
    holiday: 'success',
    event: 'processing',
  };

  // Event type labels
  const eventTypeLabels: Record<CalendarEventType, string> = {
    exam: CALENDAR_LABELS.exam,
    assignment: CALENDAR_LABELS.assignment,
    holiday: CALENDAR_LABELS.holiday,
    event: CALENDAR_LABELS.event,
  };

  // Get events for a specific date
  const getEventsForDate = (date: Dayjs): CalendarEvent[] => {
    return events.filter(event => 
      dayjs(event.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );
  };

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = (): CalendarEvent[] => {
    const today = dayjs();
    const nextWeek = today.add(7, 'day');
    return events
      .filter(event => {
        const eventDate = dayjs(event.date);
        return eventDate.isAfter(today) && eventDate.isBefore(nextWeek);
      })
      .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
  };

  // Render cell content with event badges
  const dateCellRender = (value: Dayjs) => {
    const dayEvents = getEventsForDate(value);
    return (
      <ul className="events">
        {dayEvents.map((event) => (
          <li key={event.id}>
            <Badge 
              status={eventTypeColors[event.type]} 
              text={event.title}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <Calendar
          dateCellRender={dateCellRender}
          onSelect={setSelectedDate}
        />
      </Card>

      <Card title={CALENDAR_LABELS.upcomingEvents}>
        <List
          dataSource={getUpcomingEvents()}
          locale={{
            emptyText: 'Ирэх үйл явдал байхгүй'
          }}
          renderItem={(event) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Badge status={eventTypeColors[event.type]} />
                }
                title={event.title}
                description={
                  <div>
                    <div>{eventTypeLabels[event.type]}</div>
                    <div className="text-gray-500">
                      {dayjs(event.date).format('YYYY оны MM сарын DD')}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
