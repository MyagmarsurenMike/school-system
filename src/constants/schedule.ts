/**
 * Schedule-related constants and utilities
 */

import { ScheduleType } from '@/types';
import { ReadOutlined, ExperimentOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';

// =============================================================================
// TIME AND DAY CONSTANTS
// =============================================================================

/** Standard class time slots */
export const TIME_SLOTS = [
  '08:00', '09:40', '11:20', '13:00', '14:40', '16:20', '18:00', '19:40',
] as const;

/** Days of the week (Monday = 1, Friday = 5) */
export const WEEKDAYS = [1, 2, 3, 4, 5] as const;

/** Day names in Mongolian */
export const DAY_NAMES = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'] as const;

// =============================================================================
// SCHEDULE TYPE CONSTANTS
// =============================================================================

/** Schedule type options */
export const SCHEDULE_TYPES = [
  { value: 'lecture' as ScheduleType, label: 'Лекц' },
  { value: 'lab' as ScheduleType, label: 'Лаборатори' },
  { value: 'tutorial' as ScheduleType, label: 'Семинар' },
];

/** Schedule type labels */
export const SCHEDULE_TYPE_LABELS: Record<ScheduleType, string> = {
  lecture: 'Лекц',
  lab: 'Лаб',
  tutorial: 'Семинар',
} as const;

/** Style configuration for schedule types */
interface ScheduleTypeStyle {
  bgClass: string;
  textClass: string;
  color: string;
  icon: React.ReactNode;
}

/** Get styling for schedule type */
export const getScheduleTypeStyle = (type: ScheduleType): ScheduleTypeStyle => {
  const styles: Record<ScheduleType, ScheduleTypeStyle> = {
    lecture: {
      bgClass: 'bg-purple-100',
      textClass: 'text-purple-800',
      color: 'blue',
      icon: React.createElement(ReadOutlined),
    },
    lab: {
      bgClass: 'bg-blue-100',
      textClass: 'text-blue-800',
      color: 'green',
      icon: React.createElement(ExperimentOutlined),
    },
    tutorial: {
      bgClass: 'bg-orange-100',
      textClass: 'text-orange-800',
      color: 'orange',
      icon: React.createElement(EditOutlined),
    },
  };
  return styles[type];
};

// =============================================================================
// COURSE CONSTANTS
// =============================================================================

/** Available courses */
export const COURSES = [
  { value: 'CS101', label: 'CS101 - Програмчлалын үндэс' },
  { value: 'CS201', label: 'CS201 - Өгөгдлийн бүтэц' },
  { value: 'CS301', label: 'CS301 - Алгоритм' },
  { value: 'CS401', label: 'CS401 - Үйлдлийн систем' },
  { value: 'MATH101', label: 'MATH101 - Математик' },
];

// =============================================================================
// CLASS TIME AND YEAR CONSTANTS
// =============================================================================

/** Class time type */
export type ClassTimeType = 'morning' | 'night';

/** Year/Grade type */
export type YearType = 1 | 2 | 3 | 4;

/** Class time options */
export const CLASS_TIMES = [
  { value: 'morning' as ClassTimeType, label: 'Өдөр' },
  { value: 'night' as ClassTimeType, label: 'Оройн' },
];

/** Year/Grade options */
export const YEARS = [
  { value: 1 as YearType, label: '1-р курс' },
  { value: 2 as YearType, label: '2-р курс' },
  { value: 3 as YearType, label: '3-р курс' },
  { value: 4 as YearType, label: '4-р курс' },
];

// =============================================================================
// SCHEDULE UI LABELS
// =============================================================================

export const SCHEDULE_LABELS = {
  weekly: 'Хичээлийн хуваарь',
  gradeTable: 'Дүнгийн хүснэгт',
  attendance: 'Судалгаа',
  day: 'Өдөр',
  courseCode: 'Код',
  courseName: 'Хичээл',
  teacher: 'Багш',
  room: 'Өрөө',
  time: 'Цаг',
  type: 'Төрөл',
  editPermissionHint: 'Та хуваарийг засах эрхтэй байна. Хүснэгтийн нүд дээр дарж засах эсвэл нэмэх боломжтой.',
  addSchedule: 'Хуваарь нэмэх',
  editSchedule: 'Хуваарь засах',
  deleteSchedule: 'Устгах',
  deleteConfirmTitle: 'Хуваарь устгах',
  deleteConfirmContent: 'Та энэ хуваарийг устгахдаа итгэлтэй байна уу?',
  saveSuccess: 'Хуваарь амжилттай нэмэгдлээ',
  updateSuccess: 'Хуваарь амжилттай шинэчлэгдлээ',
  deleteSuccess: 'Хуваарь амжилттай устгагдлаа',
  startTime: 'Эхлэх цаг',
  endTime: 'Дуусах цаг',
  selectCourse: 'Хичээл сонгох',
  selectType: 'Төрөл сонгох',
  filters: 'Шүүлтүүр',
  allCourses: 'Мэргэжил',
  allClassTimes: 'Өдөр/Орой',
  allYears: 'Бүх курс',
  classTime: 'Өдөр/Оройн',
  clearFilters: 'Цэвэрлэх',
  year: 'Курс',
} as const;
