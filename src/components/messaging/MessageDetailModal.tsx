import React from 'react';
import { Modal, Descriptions, Tag, Space, Typography, Divider } from 'antd';
import { UserOutlined, ClockCircleOutlined, MailOutlined } from '@ant-design/icons';
import { Message } from '@/types';
import { formatMessageDate } from '@/utils/format';
import { MessagePriorityTag } from './MessagePriorityTag';
import { MessageStatusTag } from './MessageStatusTag';

const { Text, Paragraph } = Typography;

interface MessageDetailModalProps {
  visible: boolean;
  onClose: () => void;
  message: Message | null;
  onMarkAsRead?: (messageId: string) => void;
}

const translations = {
  mn: {
    title: 'Зурвасны дэлгэрэнгүй',
    from: 'Илгээгч',
    to: 'Хүлээн авагч',
    subject: 'Гарчиг',
    content: 'Агуулга',
    priority: 'Ач холбогдол',
    status: 'Төлөв',
    sentAt: 'Илгээсэн огноо',
    deliveredAt: 'Хүргэгдсэн огноо',
    readAt: 'Уншсан огноо',
    close: 'Хаах',
    noMessage: 'Зурвас сонгогдоогүй байна',
  },
};

/**
 * MessageDetailModal - Modal for viewing detailed message information
 * @component
 */
export const MessageDetailModal: React.FC<MessageDetailModalProps> = ({
  visible,
  onClose,
  message,
  onMarkAsRead,
}) => {
  const t = translations['mn'];

  React.useEffect(() => {
    if (visible && message && message.status !== 'read' && onMarkAsRead) {
      // Automatically mark as read when opened
      onMarkAsRead(message.id);
    }
  }, [visible, message, onMarkAsRead]);

  if (!message) {
    return null;
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-semibold">
          <MailOutlined className="text-blue-600" />
          {t.title}
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      destroyOnHidden
    >
      <div className="mt-4 space-y-4">
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item 
            label={
              <Space>
                <UserOutlined />
                <span>{t.from}</span>
              </Space>
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{message.sender.name}</div>
                <div className="text-xs text-gray-500">{message.sender.email}</div>
              </div>
              <Tag color="blue">
                {message.sender.role === 'teacher' ? 'Багш' :
                 message.sender.role === 'manager' ? 'Менежер' : 'Санхүү'}
              </Tag>
            </div>
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <UserOutlined />
                <span>{t.to}</span>
              </Space>
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{message.receiver.name}</div>
                <div className="text-xs text-gray-500">{message.receiver.email}</div>
              </div>
              <Tag color={message.receiver.role === 'student' ? 'green' : 'blue'}>
                {message.receiver.role === 'student' ? 'Оюутан' :
                 message.receiver.role === 'teacher' ? 'Багш' :
                 message.receiver.role === 'manager' ? 'Менежер' : 'Санхүү'}
              </Tag>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label={t.priority}>
            <MessagePriorityTag priority={message.priority} />
          </Descriptions.Item>

          <Descriptions.Item label={t.status}>
            <MessageStatusTag status={message.status} />
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <ClockCircleOutlined />
                <span>{t.sentAt}</span>
              </Space>
            }
          >
            <Text className="text-gray-700">
              {formatMessageDate(message.sentAt)}
            </Text>
          </Descriptions.Item>

          {message.deliveredAt && (
            <Descriptions.Item label={t.deliveredAt}>
              <Text className="text-gray-700">
                {formatMessageDate(message.deliveredAt)}
              </Text>
            </Descriptions.Item>
          )}

          {message.readAt && (
            <Descriptions.Item label={t.readAt}>
              <Text className="text-gray-700">
                {formatMessageDate(message.readAt)}
              </Text>
            </Descriptions.Item>
          )}
        </Descriptions>

        <Divider />

        <div>
          <div className="text-sm font-semibold text-gray-700 mb-2">{t.subject}</div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <Text strong className="text-base text-gray-900">
              {message.subject}
            </Text>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-700 mb-2">{t.content}</div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Paragraph className="text-gray-800 whitespace-pre-wrap mb-0">
              {message.content}
            </Paragraph>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MessageDetailModal;