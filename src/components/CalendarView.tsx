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

/** Short date format for mobile */
const DATE_FORMAT_SHORT = 'MM-DD';

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
    <li className="mb-0.5 sm:mb-1">
      <Tooltip title={title}>
        <Badge 
          status={getEventBadgeStatus(event.type)} 
          text={
            <span className="text-[0.625rem] sm:text-xs truncate block max-w-12 sm:max-w-20 md:max-w-full">
              {title}
            </span>
          } 
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
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-white rounded-lg border border-gray-200 gap-2 sm:gap-3 min-h-12 touch-manipulation">
    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
      <span className="text-blue-600 text-base sm:text-lg shrink-0">
        {getEventIcon(event.type)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">
          {getEventTitle(event, language)}
        </div>
        <div className="text-[0.625rem] sm:text-xs text-gray-500">
          <span className="hidden sm:inline">{dayjs(event.date).format(DATE_FORMAT)}</span>
          <span className="sm:hidden">{dayjs(event.date).format(DATE_FORMAT_SHORT)}</span>
        </div>
      </div>
    </div>
    <Tag 
      color={getEventTagColor(event.type)} 
      className="self-start sm:self-center shrink-0 text-[0.625rem] sm:text-xs px-1.5! sm:px-2! py-0.5!"
    >
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
      <ul className="events m-0 p-0 list-none overflow-hidden">
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
      className="shadow-sm hover:shadow-md transition-shadow border border-gray-200 rounded-lg sm:rounded-xl w-full overflow-hidden"
      title={
        <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
          {t.title}
        </span>
      }
      styles={{
        body: {
          padding: '0.5rem',
        },
      }}
      classNames={{
        body: 'sm:!p-4 md:!p-6',
      }}
    >
      {/* Calendar wrapper with responsive overflow handling */}
      <div className="w-full overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0">
        <div className="min-w-[280px] sm:min-w-0">
          <AntCalendar 
            cellRender={dateCellRender}
            className="rounded-lg border border-gray-200 [&_.ant-picker-calendar-date-content]:h-8 [&_.ant-picker-calendar-date-content]:sm:h-12 [&_.ant-picker-calendar-date-content]:md:h-16 [&_.ant-picker-calendar-date-content]:overflow-hidden [&_.ant-picker-cell]:p-0.5 [&_.ant-picker-cell]:sm:p-1"
            fullscreen={false}
          />
        </div>
      </div>
      
      {/* Upcoming events section */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
          <CalendarOutlined className="mr-1.5 sm:mr-2 text-blue-600" />
          {t.upcomingEvents}
        </h4>
        <Space 
          direction="vertical" 
          size="small" 
          className="w-full [&>.ant-space-item]:w-full"
        >
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <UpcomingEventCard
                key={event.id}
                event={event}
                language={language}
                typeLabel={eventTypeLabels[event.type]}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 text-xs sm:text-sm py-4">
              {language === 'mn' ? 'Ирэх үйл явдал байхгүй' : 'No upcoming events'}
            </div>
          )}
        </Space>
      </div>
    </Card>
  );
}
