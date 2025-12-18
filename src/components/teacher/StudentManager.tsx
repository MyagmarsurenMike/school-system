'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  TimePicker, 
  message, 
  Tabs, 
  Tag, 
  Space,
  Tooltip,
  Empty
} from 'antd';
import { 
  PlusOutlined, 
  UserAddOutlined, 
  CalendarOutlined, 
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { Student, Schedule, StudentInput } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import { WeeklyScheduleView } from '@/components/shared';

interface StudentManagerProps {
  onStudentAdded?: (student: Student) => void;
  onScheduleAdded?: (schedule: Schedule) => void;
}

// Extended Schedule type with new fields
interface ExtendedSchedule extends Schedule {
  profession: string;
  classTime: 'morning' | 'night';
}

const translations = {
  mn: {
    title: 'Оюутны удирдлага',
    addStudent: 'Оюутан нэмэх',
    addSchedule: 'Хуваарь нэмэх',
    studentList: 'Оюутны жагсаалт',
    scheduleList: 'Хуваарийн жагсаалт',
    studentId: 'Оюутны код',
    name: 'Нэр (Монгол)',
    nameEn: 'Нэр (Англи)',
    major: 'Мэргэжил',
    year: 'Курс',
    email: 'И-мэйл',
    phone: 'Утас',
    semester: 'Улирал',
    actions: 'Үйлдэл',
    courseCode: 'Хичээлийн код',
    courseName: 'Хичээлийн нэр',
    course: 'Хичээл',
    profession: 'Мэргэжил',
    classTime: 'Өдөр/Оройн',
    morning: 'Өдөр',
    night: 'Оройн',
    teacher: 'Багш',
    room: 'Өрөө',
    dayOfWeek: 'Өдөр',
    startTime: 'Эхлэх цаг',
    endTime: 'Дуусах цаг',
    type: 'Төрөл',
    lecture: 'Лекц',
    lab: 'Лаборатори',
    tutorial: 'Семинар',
    save: 'Хадгалах',
    cancel: 'Цуцлах',
    delete: 'Устгах',
    success: 'Амжилттай хадгалагдлаа',
    deleteSuccess: 'Амжилттай устгагдлаа',
    search: 'Хайх...',
    noStudents: 'Оюутан байхгүй байна',
    noSchedules: 'Хуваарь байхгүй байна',
    weeklySchedule: 'Долоо хоногийн хуваарь',
    totalStudents: 'Нийт оюутан',
    totalSchedules: 'Нийт хуваарь',
    selectCourse: 'Хичээл сонгох',
    selectProfession: 'Мэргэжил сонгох',
    selectClassTime: 'Өдөр/Оройн',
    allCourses: 'Бүх хичээл',
    allProfessions: 'Бүх мэргэжил',
    allClassTimes: 'Бүгд',
    filters: 'Шүүлтүүр',
  },
};

const courseOptions = [
  { value: 'CS101', label: 'CS101 - 1' },
  { value: 'CS201', label: 'CS201 - 2' },
  { value: 'CS301', label: 'CS301 - 3' },
  { value: 'CS401', label: 'CS401 - 4' },
  { value: 'CS402', label: 'CS402 - 5' },
  { value: 'CS403', label: 'CS403 - 6' },
  { value: 'CS404', label: 'CS404 - 7' },
];

// Mock data for schedules
const mockSchedules: ExtendedSchedule[] = [
  {
    id: 'schedule-1',
    courseCode: 'CS101',
    courseName: 'Програмчлалын үндэс',
    teacher: 'Доктор Б.Эрдэнэ',
    room: '301',
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '10:30',
    type: 'lecture',
    profession: 'Програм хангамж',
    classTime: 'morning',
  },
  {
    id: 'schedule-2',
    courseCode: 'CS201',
    courseName: 'Өгөгдлийн бүтэц',
    teacher: 'Доктор Г.Батболд',
    room: '205',
    dayOfWeek: 1,
    startTime: '11:00',
    endTime: '12:30',
    type: 'lecture',
    profession: 'Компьютерийн шинжлэх ухаан',
    classTime: 'morning',
  },
  {
    id: 'schedule-3',
    courseCode: 'CS301',
    courseName: 'Алгоритм',
    teacher: 'Профессор Д.Оюунцэцэг',
    room: '102',
    dayOfWeek: 2,
    startTime: '14:00',
    endTime: '15:30',
    type: 'tutorial',
    profession: 'Програм хангамж',
    classTime: 'morning',
  },
  {
    id: 'schedule-4',
    courseCode: 'CS401',
    courseName: 'Өгөгдлийн сан',
    teacher: 'Доктор Н.Мөнхбат',
    room: '401',
    dayOfWeek: 3,
    startTime: '18:00',
    endTime: '19:30',
    type: 'lecture',
    profession: 'Мэдээллийн систем',
    classTime: 'night',
  },
  {
    id: 'schedule-5',
    courseCode: 'CS402',
    courseName: 'Вэб программчлал',
    teacher: 'Доктор А.Ганболд',
    room: '303',
    dayOfWeek: 4,
    startTime: '09:00',
    endTime: '10:30',
    type: 'lecture',
    profession: 'Програм хангамж',
    classTime: 'morning',
  },
  {
    id: 'schedule-6',
    courseCode: 'CS403',
    courseName: 'Програм хангамжийн инженерчлэл',
    teacher: 'Профессор С.Энхтүвшин',
    room: '202',
    dayOfWeek: 0,
    startTime: '18:30',
    endTime: '20:00',
    type: 'lecture',
    profession: 'Кибер аюулгүй байдал',
    classTime: 'night',
  },
  {
    id: 'schedule-7',
    courseCode: 'CS404',
    courseName: 'Машин сургалт',
    teacher: 'Доктор Ц.Батсүх',
    room: '105',
    dayOfWeek: 2,
    startTime: '11:00',
    endTime: '12:30',
    type: 'tutorial',
    profession: 'Компьютерийн шинжлэх ухаан',
    classTime: 'morning',
  },
  {
    id: 'schedule-8',
    courseCode: 'CS101',
    courseName: 'Програмчлалын үндэс',
    teacher: 'Доктор Б.Эрдэнэ',
    room: '301',
    dayOfWeek: 3,
    startTime: '09:00',
    endTime: '10:30',
    type: 'tutorial',
    profession: 'Мэдээллийн систем',
    classTime: 'morning',
  },
];

export default function StudentManager({ onStudentAdded, onScheduleAdded }: StudentManagerProps) {
  const t = translations.mn;
  
  // State
  const [students, setStudents] = useState<Student[]>([]);
  const [schedules, setSchedules] = useState<ExtendedSchedule[]>(mockSchedules);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  // Filter states for schedule table
  const [filterCourse, setFilterCourse] = useState<string | null>(null);
  const [filterProfession, setFilterProfession] = useState<string | null>(null);
  const [filterClassTime, setFilterClassTime] = useState<string | null>(null);
  
  // Forms
  const [studentForm] = Form.useForm();
  const [scheduleForm] = Form.useForm();

  // Add Student
  const handleAddStudent = (values: StudentInput) => {
    const newStudent: Student = {
      ...values,
      gpa: 0,
      paymentStatus: 'pending',
      canViewGrades: false,
    };
    
    setStudents([...students, newStudent]);
    onStudentAdded?.(newStudent);
    message.success(t.success);
    setStudentModalOpen(false);
    studentForm.resetFields();
  };

  // Delete Student
  const handleDeleteStudent = (studentId: string) => {
    Modal.confirm({
      title: 'Устгах уу?',
      content: 'Та энэ оюутныг устгахдаа итгэлтэй байна уу?',
      okText: 'Тийм',
      cancelText: 'Үгүй',
      onOk: () => {
        setStudents(students.filter(s => s.id !== studentId));
        message.success(t.deleteSuccess);
      },
    });
  };

  // Add Schedule
  const handleAddSchedule = (values: any) => {
    const selectedCourse = courseOptions.find(c => c.value === values.course);
    
    const newSchedule: ExtendedSchedule = {
      id: `schedule-${Date.now()}`,
      courseCode: values.course,
      courseName: selectedCourse?.label.split(' - ')[1] || values.course,
      teacher: values.teacher,
      room: values.room,
      dayOfWeek: values.dayOfWeek,
      startTime: values.startTime.format('HH:mm'),
      endTime: values.endTime.format('HH:mm'),
      type: values.type,
      profession: values.profession,
      classTime: values.classTime,
    };
    
    setSchedules([...schedules, newSchedule]);
    onScheduleAdded?.(newSchedule);
    message.success(t.success);
    setScheduleModalOpen(false);
    scheduleForm.resetFields();
  };

  // Update Schedule field inline
  const handleUpdateSchedule = (scheduleId: string, field: keyof ExtendedSchedule, value: any) => {
    setSchedules(schedules.map(s => {
      if (s.id === scheduleId) {
        return { ...s, [field]: value };
      }
      return s;
    }));
  };

  // Delete Schedule
  const handleDeleteSchedule = (scheduleId: string) => {
    setSchedules(schedules.filter(s => s.id !== scheduleId));
    message.success(t.deleteSuccess);
  };

  // Filter students
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchText.toLowerCase()) ||
    s.id.toLowerCase().includes(searchText.toLowerCase())
  );

  // Filter schedules based on dropdown selections
  const filteredSchedules = schedules.filter(s => {
    if (filterCourse && s.courseCode !== filterCourse) return false;
    if (filterProfession && s.profession !== filterProfession) return false;
    if (filterClassTime && s.classTime !== filterClassTime) return false;
    return true;
  });

  // Student columns
  const studentColumns: ColumnsType<Student> = [
    {
      title: t.studentId,
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => <span className="font-semibold text-blue-600">{id}</span>,
    },
    {
      title: t.name,
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="font-medium">{name}</span>,
    },
    {
      title: t.major,
      dataIndex: 'major',
      key: 'major',
      width: 180,
    },
    {
      title: t.year,
      dataIndex: 'year',
      key: 'year',
      width: 80,
      align: 'center',
      render: (year: number) => <Tag color="blue">{year}</Tag>,
    },
    {
      title: t.email,
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: t.actions,
      key: 'actions',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Tooltip title={t.delete}>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteStudent(record.id)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserAddOutlined className="text-2xl text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{students.length}</div>
              <div className="text-gray-600">{t.totalStudents}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CalendarOutlined className="text-2xl text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{schedules.length}</div>
              <div className="text-gray-600">{t.totalSchedules}</div>
            </div>
          </div>
        </Card>
      </div>

      <WeeklyScheduleView 
        schedules={schedules} 
        userRole="teacher" 
        onScheduleUpdate={(updated) => console.log(updated)} 
      />
    </div>
  );
}
