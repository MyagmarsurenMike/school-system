'use client';

import React from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Schedule, Language } from '@/types';
import { TIME_SLOTS, WEEKDAYS, scheduleTranslations } from '@/constants/schedule';
import { ScheduleCell } from './ScheduleCell';

export interface ScheduleGridProps {
  /** List of schedules to display */
  schedules: Schedule[];
  /** Current language */
  language: Language;
  /** Whether the grid is editable */
  editable?: boolean;
  /** Handler for clicking on an empty cell */
  onEmptyCellClick?: (day: number, time: string) => void;
  /** Handler for clicking on a schedule */
  onScheduleClick?: (schedule: Schedule, day: number, time: string) => void;
  /** Custom time slots (defaults to standard slots) */
  timeSlots?: readonly string[];
  /** Custom weekdays (defaults to Mon-Fri) */
  weekdays?: readonly number[];
}

/**
 * Reusable weekly schedule grid component
 * Displays schedules in a time-slot x day-of-week matrix
 */
export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  schedules,
  language,
  editable = false,
  onEmptyCellClick,
  onScheduleClick,
  timeSlots = TIME_SLOTS,
  weekdays = WEEKDAYS,
}) => {
  const t = scheduleTranslations[language];

  const getScheduleForSlot = (day: number, time: string): Schedule[] => {
    return schedules.filter(s => s.dayOfWeek === day && s.startTime === time);
  };

  return (
    <div className="overflow-x-auto">
      {editable && (
        <div className="p-3 bg-blue-50 border-b border-blue-200 text-sm text-blue-700">
          <EditOutlined className="mr-2" />
          {t.editPermissionHint}
        </div>
      )}
      <table className="w-full border-collapse min-w-[800px] table-fixed">
        <thead>
          <tr>
            <th className="border border-gray-200 bg-gray-50 p-2 w-20 text-xs font-semibold text-gray-600" />
            {weekdays.map((day, index) => (
              <th 
                key={index} 
                className="border border-gray-200 bg-gray-50 p-2 text-sm font-semibold text-gray-700"
              >
                {t.days[day - 1]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td className="border border-gray-200 bg-gray-50 p-2 text-xs text-gray-600 text-center font-medium">
                {time}
              </td>
              {weekdays.map((day, dayIndex) => {
                const scheduleItems = getScheduleForSlot(day, time);
                const isEmpty = scheduleItems.length === 0;

                return (
                  <td
                    key={dayIndex}
                    className={`
                      border border-gray-200 p-1 align-top min-h-[60px]
                      ${editable ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}
                      ${isEmpty && editable ? 'hover:bg-blue-50' : ''}
                    `}
                    onClick={() => isEmpty && editable && onEmptyCellClick?.(day, time)}
                  >
                    {isEmpty && editable && (
                      <div className="h-full min-h-[50px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <PlusOutlined className="text-gray-400" />
                      </div>
                    )}
                    {scheduleItems.map((schedule, idx) => (
                      <ScheduleCell
                        key={idx}
                        schedule={schedule}
                        language={language}
                        editable={editable}
                        onClick={(s) => onScheduleClick?.(s, day, time)}
                      />
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleGrid;
