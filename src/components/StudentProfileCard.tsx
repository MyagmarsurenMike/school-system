'use client';

import React from 'react';
import { Card, Avatar, Descriptions, Tag } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  IdcardOutlined, 
  BookOutlined 
} from '@ant-design/icons';
import { Student, Language } from '@/types';
import { studentProfileTranslations, StudentProfileTranslations } from '@/constants/translations';

// =============================================================================
// TYPES
// =============================================================================

interface StudentProfileCardProps {
  student: Student;
  language: Language;
  small?: boolean;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getStudentName = (student: Student, language: Language): string =>
  language === 'mn' ? student.name : student.nameEn;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface ProfileHeaderProps {
  student: Student;
  language: Language;
  translations: StudentProfileTranslations;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ student, language, translations: t }) => (
  <div className="text-center mb-4 sm:mb-6">
    <Avatar 
      size={72} 
      icon={<UserOutlined />} 
      className="bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg mb-3 sm:mb-4 sm:w-24! sm:h-24! sm:text-2xl!"
    />
    <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-1 px-2">
      {getStudentName(student, language)}
    </h2>
    <div className="flex items-center justify-center space-x-2 text-gray-500 mb-1">
      <IdcardOutlined className="text-sm sm:text-base" />
      <span className="text-xs sm:text-sm font-medium">{student.id}</span>
    </div>
    <Tag color="blue" className="font-medium text-xs sm:text-sm">
      <BookOutlined className="mr-1" />
      {student.year} {t.yearSuffix}
    </Tag>
  </div>
);

interface GPADisplayProps {
  gpa: number;
}

const GPADisplay: React.FC<GPADisplayProps> = ({ gpa }) => (
  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
    <div className="flex justify-center text-xs text-gray-500 mt-1 text-right">
      <span className="text-blue-500 text-2xl sm:text-4xl">{gpa}</span>
      <span className="text-gray-400 text-2xl sm:text-4xl">/4.00</span>
    </div>
  </div>
);

interface StudentInfoProps {
  student: Student;
  translations: StudentProfileTranslations;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ student, translations: t }) => (
  <Descriptions 
    column={1} 
    size="small" 
    className="student-info [&_.ant-descriptions-item-label]:text-xs [&_.ant-descriptions-item-label]:sm:text-sm [&_.ant-descriptions-item-content]:text-xs [&_.ant-descriptions-item-content]:sm:text-sm"
  >
    <Descriptions.Item 
      label={<span className="text-gray-600 font-medium">{t.major}</span>}
    >
      <span className="text-gray-900 font-medium break-all">{student.major}</span>
    </Descriptions.Item>
    <Descriptions.Item 
      label={<span className="text-gray-600 font-medium">{t.semester}</span>}
    >
      <span className="text-gray-700">{student.semester}</span>
    </Descriptions.Item>
    <Descriptions.Item 
      label={
        <span className="text-gray-600 font-medium">
          <MailOutlined className="mr-1" />{t.email}
        </span>
      }
    >
      <span className="text-gray-700 break-all">{student.email}</span>
    </Descriptions.Item>
    <Descriptions.Item 
      label={
        <span className="text-gray-600 font-medium">
          <PhoneOutlined className="mr-1" />{t.phone}
        </span>
      }
    >
      <span className="text-gray-700">{student.phone}</span>
    </Descriptions.Item>
  </Descriptions>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function StudentProfileCard({ 
  student, 
  language, 
}: StudentProfileCardProps) {
  const t = studentProfileTranslations[language];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:py-4">
      <ProfileHeader student={student} language={language} translations={t} />
      <GPADisplay gpa={student.gpa} />
      <StudentInfo student={student} translations={t} />
    </Card>
  );
}
