'use client';

import React from 'react';
import { Card, Avatar, Descriptions, Tag, Progress } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, TrophyOutlined, IdcardOutlined, BookOutlined } from '@ant-design/icons';
import { Student, Language } from '@/types';

interface StudentProfileCardProps {
  student: Student;
  language: Language;
}

const translations = {
  mn: {
    profile: 'Оюутны мэдээлэл',
    studentId: 'Оюутны дугаар',
    major: 'Мэргэжил',
    year: 'Курс',
    gpa: 'Голч дүн',
    email: 'И-мэйл',
    phone: 'Утас',
    semester: 'Улирал',
  },
  en: {
    profile: 'Student Profile',
    studentId: 'Student ID',
    major: 'Major',
    year: 'Year',
    gpa: 'GPA',
    email: 'Email',
    phone: 'Phone',
    semester: 'Semester',
  },
};

export default function StudentProfileCard({ student, language }: StudentProfileCardProps) {
  const t = translations[language];
  const gpaPercentage = (student.gpa / 4.0) * 100;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow border border-gray-200 rounded-xl py-4">
      <div className="text-center mb-6">
        <Avatar 
          size={96} 
          icon={<UserOutlined />} 
          className="bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-4"
        />
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {language === 'mn' ? student.name : student.nameEn}
        </h2>
        <div className="flex items-center justify-center space-x-2 text-gray-500 mb-1">
          <IdcardOutlined />
          <span className="text-sm font-medium">{student.id}</span>
        </div>
        <Tag color="blue" className="font-medium">
          <BookOutlined className="mr-1" />
          {student.year} {language === 'mn' ? 'курс' : 'year'}
        </Tag>
      </div>

      <div className="mb-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex justify-center text-xs text-gray-500 mt-1 text-right">
          <span className="text-blue-500 text-4xl">{student.gpa}</span>
          <span className="text-gray-400 text-4xl">/4.00</span>
        </div>
      </div>

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
          label={<span className="text-gray-600 font-medium"><MailOutlined className="mr-1" />{t.email}</span>}
        >
          <span className="text-gray-700 text-sm">{student.email}</span>
        </Descriptions.Item>
        <Descriptions.Item 
          label={<span className="text-gray-600 font-medium"><PhoneOutlined className="mr-1" />{t.phone}</span>}
        >
          <span className="text-gray-700 text-sm">{student.phone}</span>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
