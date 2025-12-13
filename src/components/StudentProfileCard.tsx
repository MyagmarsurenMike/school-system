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
  <div className="text-center mb-6">
    <Avatar 
      size={96} 
      icon={<UserOutlined />} 
      className="bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg mb-4"
    />
    <h2 className="text-xl font-bold text-gray-900 mb-1">
      {getStudentName(student, language)}
    </h2>
    <div className="flex items-center justify-center space-x-2 text-gray-500 mb-1">
      <IdcardOutlined />
      <span className="text-sm font-medium">{student.id}</span>
    </div>
    <Tag color="blue" className="font-medium">
      <BookOutlined className="mr-1" />
      {student.year} {t.yearSuffix}
    </Tag>
  </div>
);

interface GPADisplayProps {
  gpa: number;
}

const GPADisplay: React.FC<GPADisplayProps> = ({ gpa }) => (
  <div className="mb-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
    <div className="flex justify-center text-xs text-gray-500 mt-1 text-right">
      <span className="text-blue-500 text-4xl">{gpa}</span>
      <span className="text-gray-400 text-4xl">/4.00</span>
    </div>
  </div>
);

interface StudentInfoProps {
  student: Student;
  translations: StudentProfileTranslations;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ student, translations: t }) => (
  <Descriptions column={1} size="small" className="student-info">
    <Descriptions.Item 
      label={<span className="text-gray-600 font-medium">{t.major}</span>}
    >
      <span className="text-gray-900 font-medium">{student.major}</span>
    </Descriptions.Item>
    <Descriptions.Item 
      label={<span className="text-gray-600 font-medium">{t.semester}</span>}
    >
      <span className="text-gray-700 text-sm">{student.semester}</span>
    </Descriptions.Item>
    <Descriptions.Item 
      label={
        <span className="text-gray-600 font-medium">
          <MailOutlined className="mr-1" />{t.email}
        </span>
      }
    >
      <span className="text-gray-700 text-sm">{student.email}</span>
    </Descriptions.Item>
    <Descriptions.Item 
      label={
        <span className="text-gray-600 font-medium">
          <PhoneOutlined className="mr-1" />{t.phone}
        </span>
      }
    >
      <span className="text-gray-700 text-sm">{student.phone}</span>
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
    <Card className="shadow-sm hover:shadow-md transition-shadow border border-gray-200 rounded-xl py-4">
      <ProfileHeader student={student} language={language} translations={t} />
      <GPADisplay gpa={student.gpa} />
      <StudentInfo student={student} translations={t} />
    </Card>
  );
}
