'use client';

import { useState, useMemo } from 'react';
import { Card, Tabs, Select, Button, message } from 'antd';
import { FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { Schedule, Language, UserRole } from '@/types';
import { ScheduleGrid, ScheduleFormModal, ScheduleFormValues } from '@/components/common';
import GradesTable from './GradesTable';
import { mockGrades } from '@/data/mockData';
import { 
  scheduleTranslations, 
  COURSE_OPTIONS, 
  getCourseSelectOptions,
  getClassTimeSelectOptions,
  getYearSelectOptions,
  ClassTimeType,
  YearType
} from '@/constants/schedule';

/** Extended Schedule interface with classTime and year fields */
export interface ExtendedSchedule extends Schedule {
  classTime?: ClassTimeType;
  year?: YearType;
}

export interface WeeklyScheduleViewProps {
  schedules: ExtendedSchedule[];
  language: Language;
  userRole?: UserRole;
  onScheduleUpdate?: (schedules: ExtendedSchedule[]) => void;
}

/**
 * Weekly schedule view with tabs for schedule grid and grades table
 * Supports editing for teacher role and filtering by course/class time/year
 */
export default function WeeklyScheduleView({ 
  schedules: initialSchedules, 
  language, 
  userRole = 'student',
  onScheduleUpdate 
}: WeeklyScheduleViewProps) {
  const [schedules, setSchedules] = useState<ExtendedSchedule[]>(initialSchedules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ day: number; time: string } | null>(null);
  
  // Filter states
  const [filterCourse, setFilterCourse] = useState<string | null>(null);
  const [filterClassTime, setFilterClassTime] = useState<ClassTimeType | null>(null);
  const [filterYear, setFilterYear] = useState<YearType | null>(null);

  const t = scheduleTranslations[language];
  const canEdit = userRole === 'teacher';

  // Filter schedules based on selected filters
  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      if (filterCourse && schedule.courseCode !== filterCourse) return false;
      if (filterClassTime && schedule.classTime !== filterClassTime) return false;
      if (filterYear && schedule.year !== filterYear) return false;
      return true;
    });
  }, [schedules, filterCourse, filterClassTime, filterYear]);

  // Check if any filters are active
  const hasActiveFilters = filterCourse || filterClassTime || filterYear;

  // Clear all filters
  const handleClearFilters = () => {
    setFilterCourse(null);
    setFilterClassTime(null);
    setFilterYear(null);
  };

  const handleEmptyCellClick = (day: number, time: string) => {
    if (!canEdit) return;
    setSelectedCell({ day, time });
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const handleScheduleClick = (schedule: Schedule, day: number, time: string) => {
    if (!canEdit) return;
    setSelectedCell({ day, time });
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleSave = (values: ScheduleFormValues, isEdit: boolean) => {
    const selectedCourse = COURSE_OPTIONS.find(c => c.value === values.courseCode);
    
    const scheduleData: ExtendedSchedule = {
      id: editingSchedule?.id || `schedule-${Date.now()}`,
      courseCode: values.courseCode,
      courseName: selectedCourse?.label.split(' - ')[1] || values.courseName || '',
      courseNameEn: selectedCourse?.labelEn.split(' - ')[1] || values.courseNameEn || values.courseCode,
      teacher: values.teacher,
      room: values.room,
      dayOfWeek: selectedCell?.day || 1,
      startTime: values.startTime.format('HH:mm'),
      endTime: values.endTime.format('HH:mm'),
      type: values.type,
      classTime: filterClassTime || undefined,
    };

    let newSchedules: ExtendedSchedule[];
    
    if (isEdit && editingSchedule) {
      newSchedules = schedules.map(s => 
        s.id === editingSchedule.id ? scheduleData : s
      );
      message.success(t.updateSuccess);
    } else {
      newSchedules = [...schedules, scheduleData];
      message.success(t.saveSuccess);
    }

    setSchedules(newSchedules);
    onScheduleUpdate?.(newSchedules);
    setIsModalOpen(false);
  };

  const handleDelete = (schedule: Schedule) => {
    const newSchedules = schedules.filter(s => s.id !== schedule.id);
    setSchedules(newSchedules);
    onScheduleUpdate?.(newSchedules);
    setIsModalOpen(false);
    message.success(t.deleteSuccess);
  };

  // Filter toolbar component
  const FilterToolbar = () => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-2 text-gray-600">
        <FilterOutlined className="text-sm sm:text-base" />
        <span className="font-medium text-xs sm:text-sm">{t.filters}:</span>
      </div>
      
      <div className="flex flex-wrap gap-2 flex-1">
        <Select
          allowClear
          placeholder={t.allYears}
          value={filterYear}
          onChange={setFilterYear}
          options={getYearSelectOptions(language)}
          className="w-full sm:w-28"
          size="middle"
        />

        <Select
          allowClear
          placeholder={t.allCourses}
          value={filterCourse}
          onChange={setFilterCourse}
          options={getCourseSelectOptions(language)}
          className="w-full sm:w-48 lg:w-64"
          size="middle"
        />
        
        <Select
          allowClear
          placeholder={t.allClassTimes}
          value={filterClassTime}
          onChange={setFilterClassTime}
          options={getClassTimeSelectOptions(language)}
          className="w-full sm:w-28"
          size="middle"
        />
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2">
        {hasActiveFilters && (
          <Button 
            type="text" 
            icon={<ClearOutlined />} 
            onClick={handleClearFilters}
            className="text-gray-500 hover:text-red-500 text-xs sm:text-sm"
            size="small"
          >
            <span className="hidden sm:inline">{t.clearFilters}</span>
          </Button>
        )}

        <div className="text-xs sm:text-sm text-gray-500">
          {filteredSchedules.length} / {schedules.length}
        </div>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: '1',
      label: <span className="text-xs sm:text-sm">{t.weekly}</span>,
      children: (
        <div>
          {canEdit && <FilterToolbar />}
          <div className="overflow-x-auto">
            <ScheduleGrid
              schedules={filteredSchedules}
              language={language}
              editable={canEdit}
              onEmptyCellClick={handleEmptyCellClick}
              onScheduleClick={handleScheduleClick}
            />
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: <span className="text-xs sm:text-sm">{t.gradeTable}</span>,
      children: (
        <div className="p-2 sm:p-4">
          <GradesTable grades={mockGrades} language={language} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Card 
        className="shadow-sm border border-gray-200 rounded-lg overflow-hidden" 
        styles={{ body: { padding: '0' } }}
      >
        <Tabs 
          defaultActiveKey="1" 
          items={tabItems} 
          className="schedule-tabs [&_.ant-tabs-nav]:px-2 [&_.ant-tabs-nav]:sm:px-4" 
        />
      </Card>

      <ScheduleFormModal
        open={isModalOpen}
        schedule={editingSchedule}
        selectedCell={selectedCell}
        language={language}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}
