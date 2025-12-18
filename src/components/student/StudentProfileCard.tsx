'use client';

import React from 'react';
import { Card, Avatar, Descriptions, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Student } from '@/types';
import { STUDENT_PROFILE_LABELS } from '@/constants';
import { PaymentStatusTag } from '@/components/common';

interface StudentProfileCardProps {
  student: Student;
}

export default function StudentProfileCard({ student }: StudentProfileCardProps) {
  return (
    <Card className="shadow-sm">
      <div className="flex flex-col items-center mb-6">
        <Avatar 
          size={100} 
          icon={<UserOutlined />} 
          src={student.photo}
          className="mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
        <p className="text-gray-500">{student.id}</p>
      </div>

      <Descriptions 
        bordered 
        column={1}
        labelStyle={{ fontWeight: 'bold', width: '40%' }}
      >
        <Descriptions.Item label={STUDENT_PROFILE_LABELS.major}>
          {student.major}
        </Descriptions.Item>
        <Descriptions.Item label={STUDENT_PROFILE_LABELS.year}>
          {student.year} {STUDENT_PROFILE_LABELS.yearSuffix}
        </Descriptions.Item>
        <Descriptions.Item label={STUDENT_PROFILE_LABELS.gpa}>
          <Tag color="blue" className="text-base font-semibold">
            {student.gpa.toFixed(2)}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label={STUDENT_PROFILE_LABELS.semester}>
          {student.semester}
        </Descriptions.Item>
        <Descriptions.Item label={STUDENT_PROFILE_LABELS.email}>
          <a href={`mailto:${student.email}`} className="text-blue-600">
            {student.email}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label={STUDENT_PROFILE_LABELS.phone}>
          <a href={`tel:${student.phone}`} className="text-blue-600">
            {student.phone}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="Төлбөрийн байдал">
          <PaymentStatusTag status={student.paymentStatus} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
