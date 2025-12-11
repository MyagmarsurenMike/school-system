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
    icon: <UserOutlined className="text-2xl" />,
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
      <div className="grid grid-cols-[1fr_2fr] max-h-screen h-screen">
        <div className="grow flex items-center justify-center p-4 relative z-10 bg-gray-100">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">HIS System</h1>
              <p className="text-gray-600">Сургуулийн мэдээллийн нэгдсэн систем</p>
            </div>

            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              {/* User Type Selection */}
              <div className="mb-6">
                <p className="text-gray-600 mb-3 text-center text-lg font-bold">Хэрэглэгчийн төрөл сонгоно уу</p>
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
            </Card>
          </div>
        </div>
        <div>

        </div>
      </div>

  );
}
