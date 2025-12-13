'use client';

import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Schedule, Language, ScheduleType } from '@/types';
import { getScheduleTypeStyle } from '@/constants/schedule';

export interface ScheduleCellProps {
  /** Schedule item to display */
  schedule: Schedule;
  /** Current language */
  language: Language;
  /** Whether the cell is editable */
  editable?: boolean;
  /** Click handler */
  onClick?: (schedule: Schedule) => void;
  /** Compact mode for smaller displays */
  compact?: boolean;
}

/**
 * Reusable component for displaying a schedule item in a cell
 * Used in weekly schedule grids and calendar views
 */
export const ScheduleCell: React.FC<ScheduleCellProps> = ({
  schedule,
  language,
  editable = false,
  onClick,
  compact = false,
}) => {
  const style = getScheduleTypeStyle(schedule.type);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(schedule);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        p-2 rounded text-xs mb-1 break-all relative group
        ${style.bgClass} ${style.textClass}
        ${editable ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-blue-400' : ''}
        ${compact ? 'p-1' : 'p-2'}
      `}
    >
      {editable && (
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <EditOutlined className="text-xs" />
        </div>
      )}
      <div className="font-semibold">{schedule.courseCode}</div>
      <div className="truncate">
        {language === 'mn' ? schedule.courseName : schedule.courseNameEn}
      </div>
      {!compact && (
        <div className="text-[10px] mt-1">
          {language === 'mn' 
            ? `${schedule.room}(${schedule.teacher.split(' ')[0]})` 
            : schedule.room
          }
        </div>
      )}
    </div>
  );
};

export default ScheduleCell;
