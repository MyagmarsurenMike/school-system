'use client';

import { Card, Tabs } from 'antd';
import { Schedule, Language } from '@/types';
import GradesTable from './GradesTable';
import { mockGrades } from '@/data/mockData';

interface WeeklyScheduleViewProps {
  schedules: Schedule[];
  language: Language;
}

const titles = {
  weekly: 'Хичээлийн хуваарь',
  gradetable: 'Дүнгийн хүснэгт',
  attendance: 'Судалгаа',
  days: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'],
};

const timeSlots = [
  '08:00', '09:40', '11:20', '13:00', '14:40', '16:20', '18:00', '19:40',
];

export default function WeeklyScheduleView({ schedules, language }: WeeklyScheduleViewProps) {
  function getScheduleForSlot(day: number, time: string) {
    return schedules.filter(s => s.dayOfWeek === day && s.startTime === time);
  }

  const tabItems = [
    {
      key: '1',
      label: titles.weekly,
      children: (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px] table-fixed">
            <thead>
              <tr>
          <th className="border border-gray-200 bg-gray-50 p-2 w-20 text-xs font-semibold text-gray-600"></th>
          {titles.days.map((day, index) => (
            <th key={index} className="border border-gray-200 bg-gray-50 p-2 text-sm font-semibold text-gray-700">
              {day}
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
            {[1, 2, 3, 4, 5].map((day, dayIndex) => {
              const scheduleItems = getScheduleForSlot(day, time);
              return (
                <td key={dayIndex} className="border border-gray-200 p-1 align-top">
            {scheduleItems.map((schedule, idx) => (
              <div
                key={idx}
                className={`p-2 rounded text-xs mb-1 wrap-break-word ${
                  schedule.type === 'lecture'
              ? 'bg-purple-100 text-purple-800'
              : schedule.type === 'lab'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-orange-100 text-orange-800'
                }`}
              >
                <div className="font-semibold">{schedule.courseCode}</div>
                <div className="truncate">
                  {language === 'mn' ? schedule.courseName : schedule.courseNameEn}
                </div>
                <div className="text-[10px] mt-1">
                  {language === 'mn' ? `${schedule.room}(${schedule.teacher.split(' ')[0]})` : schedule.room}
                </div>
              </div>
            ))}
                </td>
              );
            })}
          </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: '2',
      label: titles.gradetable,
      children: (
        <div className="p-4">
          <GradesTable grades={mockGrades} language={language} />
        </div>
      ),
    },
  ];

  return (
    <Card className="shadow-sm border border-gray-200 rounded-lg" styles={{ body: { padding: '0' } }}>
      <Tabs defaultActiveKey="1" items={tabItems} className="schedule-tabs" />
    </Card>
  );
}
