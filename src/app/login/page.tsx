'use client';

import React, { useState } from 'react';
import { Button, Input, Card, Form, Checkbox, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  BookOutlined,
  TeamOutlined,
  PieChartFilled,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

type UserType = 'student' | 'teacher' | 'finance';

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const userTypes = [
  {
    key: 'student' as UserType,
    label: 'Оюутан',
    labelEn: 'Student',
    icon: <BookOutlined className="text-2xl" />,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    route: '/dashboard',
  },
  {
    key: 'teacher' as UserType,
    label: 'Багш',
    labelEn: 'Teacher',
    icon: <TeamOutlined className="text-2xl" />,
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700',
    route: '/teacher',
  },
  {
    key: 'finance' as UserType,
    label: 'Санхүү',
    labelEn: 'Finance',
    icon: <PieChartFilled className="text-2xl" />,
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    route: '/finance',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<UserType>('student');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = async (values: LoginForm) => {
    setLoading(true);
    
    // Simulate login delay (frontend only)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const selectedUserType = userTypes.find(u => u.key === selectedType);
    message.success(`Амжилттай нэвтэрлээ!`);
    
    // Navigate to the appropriate dashboard
    router.push(selectedUserType?.route || '/dashboard');
    
    setLoading(false);
  };

  const selectedUserTypeData = userTypes.find(u => u.key === selectedType);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <BookOutlined className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">HIS</h1>
          <p className="text-gray-500 mt-1">Их сургуулийн мэдээллийн систем</p>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
          {/* User Type Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-3">Хэрэглэгчийн төрөл сонгоно уу</p>
            <div className="grid grid-cols-3 gap-3">
              {userTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setSelectedType(type.key)}
                  className={`
                    relative p-4 rounded-xl transition-all duration-300 flex flex-col items-center gap-2
                    ${selectedType === type.key 
                      ? `bg-linear-to-r ${type.color} text-white shadow-lg scale-105` 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {type.icon}
                  <span className="text-sm font-medium">{type.label}</span>
                  {selectedType === type.key && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            layout="vertical"
            requiredMark={false}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Нэвтрэх нэр оруулна уу!' }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Нэвтрэх нэр"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Нууц үг оруулна уу!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Нууц үг"
                size="large"
                className="rounded-lg"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Намайг сана</Checkbox>
                </Form.Item>
                <a className="text-blue-600 hover:text-blue-700 text-sm" href="#">
                  Нууц үг мартсан?
                </a>
              </div>
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className={`w-full h-12 rounded-lg font-medium text-base bg-linear-to-r ${selectedUserTypeData?.color} border-0 hover:opacity-90`}
              >
                Нэвтрэх
              </Button>
            </Form.Item>
          </Form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Бүртгүүлэх бол{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                энд дарна уу
              </a>
            </p>
          </div>
        </Card>

        {/* Copyright */}
        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 HIS. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
    </div>
  );
}
