/**
 * Schedule-related constants and utilities
 */

import { Language, ScheduleType } from '@/types';
import { ReadOutlined, ExperimentOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';

/** Standard class time slots */
export const TIME_SLOTS = [
  '08:00', '09:40', '11:20', '13:00', '14:40', '16:20', '18:00', '19:40',
] as const;

/** Days of the week (Monday = 1, Friday = 5) */
export const WEEKDAYS = [1, 2, 3, 4, 5] as const;

/** Schedule type options for forms */
export const SCHEDULE_TYPE_OPTIONS = [
  { value: 'lecture' as ScheduleType, label: 'Лекц', labelEn: 'Lecture' },
  { value: 'lab' as ScheduleType, label: 'Лаборатори', labelEn: 'Lab' },
  { value: 'tutorial' as ScheduleType, label: 'Семинар', labelEn: 'Tutorial' },
] as const;

/** Course options for schedule forms */
export const COURSE_OPTIONS = [
  { value: 'CS101', label: 'CS101 - Програмчлалын үндэс', labelEn: 'CS101 - Programming Fundamentals' },
  { value: 'CS201', label: 'CS201 - Өгөгдлийн бүтэц', labelEn: 'CS201 - Data Structures' },
  { value: 'CS301', label: 'CS301 - Алгоритм', labelEn: 'CS301 - Algorithms' },
  { value: 'CS401', label: 'CS401 - Өгөгдлийн сан', labelEn: 'CS401 - Databases' },
  { value: 'CS402', label: 'CS402 - Вэб программчлал', labelEn: 'CS402 - Web Development' },
] as const;

/** Class time type */
export type ClassTimeType = 'morning' | 'night';

/** Year/Grade type */
export type YearType = 1 | 2 | 3 | 4;

/** Class time options for filtering */
export const CLASS_TIME_OPTIONS = [
  { value: 'morning' as ClassTimeType, label: 'Өдөр', labelEn: 'Morning' },
  { value: 'night' as ClassTimeType, label: 'Оройн', labelEn: 'Night' },
] as const;

/** Year/Grade options for filtering */
export const YEAR_OPTIONS = [
  { value: 1 as YearType, label: '1-р курс', labelEn: '1st Year' },
  { value: 2 as YearType, label: '2-р курс', labelEn: '2nd Year' },
  { value: 3 as YearType, label: '3-р курс', labelEn: '3rd Year' },
  { value: 4 as YearType, label: '4-р курс', labelEn: '4th Year' },
] as const;

/** Schedule translations */
export interface ScheduleTranslations {
  weekly: string;
  gradeTable: string;
  attendance: string;
  days: string[];
  day: string;
  courseCode: string;
  courseName: string;
  teacher: string;
  room: string;
  time: string;
  type: string;
  lecture: string;
  lab: string;
  tutorial: string;
  editPermissionHint: string;
  addSchedule: string;
  editSchedule: string;
  deleteSchedule: string;
  deleteConfirmTitle: string;
  deleteConfirmContent: string;
  saveSuccess: string;
  updateSuccess: string;
  deleteSuccess: string;
  startTime: string;
  endTime: string;
  selectCourse: string;
  selectType: string;
  // Filter translations
  filters: string;
  allCourses: string;
  allClassTimes: string;
  allYears: string;
  classTime: string;
  morning: string;
  night: string;
  clearFilters: string;
  year: string;
}

export const scheduleTranslations: Record<Language, ScheduleTranslations> = {
  mn: {
    weekly: 'Хичээлийн хуваарь',
    gradeTable: 'Дүнгийн хүснэгт',
    attendance: 'Судалгаа',
    days: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'],
    day: 'Өдөр',
    courseCode: 'Код',
    courseName: 'Хичээл',
    teacher: 'Багш',
    room: 'Өрөө',
    time: 'Цаг',
    type: 'Төрөл',
    lecture: 'Лекц',
    lab: 'Лаб',
    tutorial: 'Семинар',
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
    // Filter translations
    filters: 'Шүүлтүүр',
    allCourses: 'Мэргэжил',
    allClassTimes: 'Өдөр/Орой',
    allYears: 'Бүх курс',
    classTime: 'Өдөр/Оройн',
    morning: 'Өдөр',
    night: 'Оройн',
    clearFilters: 'Цэвэрлэх',
    year: 'Курс',
  },
  en: {
    weekly: 'Weekly Schedule',
    gradeTable: 'Grade Table',
    attendance: 'Attendance',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    day: 'Day',
    courseCode: 'Code',
    courseName: 'Course',
    teacher: 'Instructor',
    room: 'Room',
    time: 'Time',
    type: 'Type',
    lecture: 'Lecture',
    lab: 'Lab',
    tutorial: 'Tutorial',
    editPermissionHint: 'You have permission to edit schedules. Click on a cell to edit or add.',
    addSchedule: 'Add Schedule',
    editSchedule: 'Edit Schedule',
    deleteSchedule: 'Delete',
    deleteConfirmTitle: 'Delete Schedule',
    deleteConfirmContent: 'Are you sure you want to delete this schedule?',
    saveSuccess: 'Schedule added successfully',
    updateSuccess: 'Schedule updated successfully',
    deleteSuccess: 'Schedule deleted successfully',
    startTime: 'Start Time',
    endTime: 'End Time',
    selectCourse: 'Select Course',
    selectType: 'Select Type',
    // Filter translations
    filters: 'Filters',
    allCourses: 'All Courses',
    allClassTimes: 'All',
    allYears: 'All Years',
    classTime: 'Class Time',
    morning: 'Morning',
    night: 'Night',
    clearFilters: 'Clear',
    year: 'Year',
  },
};

/** Style configuration for schedule types */
export interface ScheduleTypeStyle {
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

/** Get translated type label */
export const getScheduleTypeLabel = (type: ScheduleType, language: Language): string => {
  const labels: Record<ScheduleType, Record<Language, string>> = {
    lecture: { mn: 'Лекц', en: 'Lecture' },
    lab: { mn: 'Лаб', en: 'Lab' },
    tutorial: { mn: 'Семинар', en: 'Tutorial' },
  };
  return labels[type][language];
};

/** Get course options formatted for Select component */
export const getCourseSelectOptions = (language: Language = 'mn') => {
  return COURSE_OPTIONS.map(option => ({
    value: option.value,
    label: language === 'mn' ? option.label : option.labelEn,
  }));
};

/** Get type options formatted for Select component */
export const getTypeSelectOptions = (language: Language = 'mn') => {
  return SCHEDULE_TYPE_OPTIONS.map(option => ({
    value: option.value,
    label: language === 'mn' ? option.label : option.labelEn,
  }));
};

/** Get class time options formatted for Select component */
export const getClassTimeSelectOptions = (language: Language = 'mn') => {
  return CLASS_TIME_OPTIONS.map(option => ({
    value: option.value,
    label: language === 'mn' ? option.label : option.labelEn,
  }));
};

/** Get year options formatted for Select component */
export const getYearSelectOptions = (language: Language = 'mn') => {
  return YEAR_OPTIONS.map(option => ({
    value: option.value,
    label: language === 'mn' ? option.label : option.labelEn,
  }));
};
