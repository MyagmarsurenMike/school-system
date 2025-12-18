import React, { useState } from 'react';
import { Modal, Form, Select, Input, Button, Space, App } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { MessageInput, User, MessagePriority, SenderRole } from '@/types';

const { TextArea } = Input;
const { Option } = Select;

interface SendMessageModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: (message: MessageInput) => Promise<void>;
  currentUser: User;
  availableReceivers: User[];
}

const translations = {
  mn: {
    title: 'Зурвас илгээх',
    receiver: 'Хүлээн авагч',
    selectReceiver: 'Хүлээн авагч сонгох',
    subject: 'Гарчиг',
    subjectPlaceholder: 'Зурвасны гарчиг оруулна уу...',
    content: 'Агуулга',
    contentPlaceholder: 'Зурвасны агуулгыг энд бичнэ үү...',
    priority: 'Ач холбогдол',
    low: 'Бага',
    normal: 'Энгийн',
    high: 'Өндөр',
    urgent: 'Яаралтай',
    cancel: 'Болих',
    send: 'Илгээх',
    sendSuccess: 'Зурвас амжилттай илгээгдлээ',
    sendError: 'Зурвас илгээхэд алдаа гарлаа',
    required: {
      receiver: 'Хүлээн авагч сонгоно уу',
      subject: 'Гарчиг оруулна уу',
      content: 'Агуулга оруулна уу',
    },
  },
};

/**
 * SendMessageModal - Modal for composing and sending messages
 * Only accessible by Teacher, Manager, and Finance roles
 * @component
 */
export const SendMessageModal: React.FC<SendMessageModalProps> = ({
  visible,
  onClose,
  onSend,
  currentUser,
  availableReceivers,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const t = translations['mn'];

  // Check if current user has permission to send messages
  const canSendMessages = (role: string): role is SenderRole => {
    return ['teacher', 'manager', 'finance'].includes(role);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const messageInput: MessageInput = {
        receiverId: values.receiverId,
        subject: values.subject,
        content: values.content,
        priority: values.priority || 'normal',
      };

      await onSend(messageInput);
      
      message.success({
        content: t.sendSuccess,
        icon: <SendOutlined style={{ color: '#52c41a' }} />,
      });
      
      form.resetFields();
      onClose();
    } catch (error) {
      if (error instanceof Error && error.message !== 'Validation failed') {
        message.error(t.sendError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  // Filter receivers - can't send to yourself
  const filteredReceivers = availableReceivers.filter(
    (user) => user.id !== currentUser.id
  );

  if (!canSendMessages(currentUser.role)) {
    return null;
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-semibold">
          <SendOutlined className="text-blue-600" />
          {t.title}
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="receiverId"
          label={t.receiver}
          rules={[{ required: true, message: t.required.receiver }]}
        >
          <Select
            showSearch
            placeholder={t.selectReceiver}
            optionFilterProp="children"
            size="large"
            suffixIcon={<UserOutlined />}
            filterOption={(input, option) =>
              String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {filteredReceivers.map((user) => (
              <Option key={user.id} value={user.id} label={user.name}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {user.role === 'student' ? 'Оюутан' : 
                     user.role === 'teacher' ? 'Багш' :
                     user.role === 'manager' ? 'Менежер' : 'Санхүү'}
                  </span>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label={t.priority}
          initialValue="normal"
        >
          <Select size="large">
            <Option value="low">{t.low}</Option>
            <Option value="normal">{t.normal}</Option>
            <Option value="high">{t.high}</Option>
            <Option value="urgent">{t.urgent}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="subject"
          label={t.subject}
          rules={[{ required: true, message: t.required.subject }]}
        >
          <Input
            placeholder={t.subjectPlaceholder}
            size="large"
            maxLength={100}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="content"
          label={t.content}
          rules={[{ required: true, message: t.required.content }]}
        >
          <TextArea
            placeholder={t.contentPlaceholder}
            rows={6}
            maxLength={1000}
            showCount
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Space className="w-full justify-end">
            <Button onClick={handleCancel} size="large">
              {t.cancel}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={loading}
              size="large"
              className="bg-blue-600"
            >
              {t.send}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendMessageModal;