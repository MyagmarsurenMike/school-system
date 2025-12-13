'use client';

import React from 'react';
import { Card, Calendar as AntCalendar, Badge, Tag, Space, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { 
  FileTextOutlined, 
  AlertOutlined, 
  SmileOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';
import { CalendarEvent, Language, CalendarEventType } from '@/types';
import { calendarTranslations, CalendarTranslations } from '@/constants/translations';

// =============================================================================
// TYPES
// =============================================================================

interface CalendarViewProps {
  events: CalendarEvent[];
  language: Language;
}

type BadgeStatus = 'error' | 'warning' | 'success' | 'processing';

// =============================================================================
// CONSTANTS
// =============================================================================

/** Icon mapping for event types */
const EVENT_ICONS: Readonly<Record<CalendarEventType, React.ReactNode>> = {
  exam: <AlertOutlined />,
  assignment: <FileTextOutlined />,
  holiday: <SmileOutlined />,
  event: <CalendarOutlined />,
} as const;

/** Badge status mapping for event types */
const EVENT_BADGE_STATUS: Readonly<Record<CalendarEventType, BadgeStatus>> = {
  exam: 'error',
  assignment: 'warning',
  holiday: 'success',
  event: 'processing',
} as const;

/** Tag color mapping for event types */
const EVENT_TAG_COLORS: Readonly<Record<CalendarEventType, string>> = {
  exam: 'red',
  assignment: 'blue',
  holiday: 'yellow',
  event: 'green',
} as const;

/** Number of upcoming events to display */
const UPCOMING_EVENTS_LIMIT = 5;

/** Date format for display */
const DATE_FORMAT = 'YYYY-MM-DD';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getEventIcon = (type: CalendarEventType): React.ReactNode => EVENT_ICONS[type];

const getEventBadgeStatus = (type: CalendarEventType): BadgeStatus => EVENT_BADGE_STATUS[type];

const getEventTagColor = (type: CalendarEventType): string => EVENT_TAG_COLORS[type];

const createEventTypeLabels = (t: CalendarTranslations): Record<CalendarEventType, string> => ({
  exam: t.exam,
  assignment: t.assignment,
  holiday: t.holiday,
  event: t.event,
});

const getEventTitle = (event: CalendarEvent, language: Language): string => 
  language === 'mn' ? event.title : event.titleEn;

const getEventsForDate = (events: CalendarEvent[], date: Dayjs): CalendarEvent[] => 
  events.filter(event => event.date === date.format(DATE_FORMAT));

const getUpcomingEvents = (events: CalendarEvent[]): CalendarEvent[] => 
  events
    .filter(event => dayjs(event.date).isAfter(dayjs()))
    .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
    .slice(0, UPCOMING_EVENTS_LIMIT);

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface EventBadgeItemProps {
  event: CalendarEvent;
  language: Language;
}

const EventBadgeItem: React.FC<EventBadgeItemProps> = ({ event, language }) => {
  const title = getEventTitle(event, language);
  
  return (
    <li className="mb-1">
      <Tooltip title={title}>
        <Badge 
          status={getEventBadgeStatus(event.type)} 
          text={<span className="text-xs truncate block">{title}</span>} 
        />
      </Tooltip>
    </li>
  );
};

interface UpcomingEventCardProps {
  event: CalendarEvent;
  language: Language;
  typeLabel: string;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ 
  event, 
  language, 
  typeLabel 
}) => (
  <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
    <div className="flex items-center space-x-3">
      <span className="text-blue-600">{getEventIcon(event.type)}</span>
      <div>
        <div className="font-medium text-gray-900 text-sm">
          {getEventTitle(event, language)}
        </div>
        <div className="text-xs text-gray-500">
          {dayjs(event.date).format(DATE_FORMAT)}
        </div>
      </div>
    </div>
    <Tag color={getEventTagColor(event.type)} className="ml-2">
      {typeLabel}
    </Tag>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CalendarView({ events, language }: CalendarViewProps) {
  const t = calendarTranslations[language];
  const eventTypeLabels = createEventTypeLabels(t);
  const upcomingEvents = getUpcomingEvents(events);

  const dateCellRender = (value: Dayjs) => {
    const dateEvents = getEventsForDate(events, value);
    
    return (
      <ul className="events m-0 p-0 list-none">
        {dateEvents.map(event => (
          <EventBadgeItem 
            key={event.id} 
            event={event} 
            language={language} 
          />
        ))}
      </ul>
    );
  };

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
            <UpcomingEventCard
              key={event.id}
              event={event}
              language={language}
              typeLabel={eventTypeLabels[event.type]}
            />
          ))}
        </Space>
      </div>
    </Card>
  );
}
