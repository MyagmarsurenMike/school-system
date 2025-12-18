import React, { useState, useMemo } from 'react';
import { Table, Input, Select, Space, Tag, Button, Empty, Badge } from 'antd';
import { SearchOutlined, EyeOutlined, FilterOutlined } from '@ant-design/icons';
import { Message, MessageFilter, UserRole } from '@/types';
import { formatMessageDate, truncateText } from '@/utils/format';
import { MessagePriorityTag } from './MessagePriorityTag';
import { MessageStatusTag } from './MessageStatusTag';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onViewMessage: (message: Message) => void;
  viewType: 'sent' | 'received';
}

const translations = {
  mn: {
    search: 'Хайх...',
    filterByStatus: 'Төлвөөр шүүх',
    filterByPriority: 'Ач холбогдлоор шүүх',
    all: 'Бүгд',
    receiver: 'Хүлээн авагч',
    sender: 'Илгээгч',
    subject: 'Гарчиг',
    preview: 'Урьдчилан үзэх',
    priority: 'Ач холбогдол',
    status: 'Төлөв',
    sentAt: 'Илгээсэн огноо',
    actions: 'Үйлдэл',
    view: 'Үзэх',
    noMessages: 'Зурвас олдсонгүй',
    noMessagesDesc: 'Танд одоогоор зурвас байхгүй байна',
    totalMessages: 'Нийт зурвас',
  },
};

/**
 * MessageList - Table component for displaying sent or received messages
 * @component
 */
export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  onViewMessage,
  viewType,
}) => {
  const t = translations['mn'];
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<MessageFilter>({});

  // Filter and search messages
  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      // Filter by view type (sent or received)
      if (viewType === 'sent' && message.senderId !== currentUserId) return false;
      if (viewType === 'received' && message.receiverId !== currentUserId) return false;

      // Filter by status
      if (filter.status && message.status !== filter.status) return false;

      // Filter by priority
      if (filter.priority && message.priority !== filter.priority) return false;

      // Search filter
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const matchesSubject = message.subject.toLowerCase().includes(searchLower);
        const matchesContent = message.content.toLowerCase().includes(searchLower);
        const matchesSender = message.sender.name.toLowerCase().includes(searchLower);
        const matchesReceiver = message.receiver.name.toLowerCase().includes(searchLower);
        
        if (!matchesSubject && !matchesContent && !matchesSender && !matchesReceiver) {
          return false;
        }
      }

      return true;
    });
  }, [messages, searchText, filter, viewType, currentUserId]);

  const columns: ColumnsType<Message> = [
    {
      title: viewType === 'sent' ? t.receiver : t.sender,
      key: 'person',
      width: 200,
      render: (_, record) => {
        const person = viewType === 'sent' ? record.receiver : record.sender;
        return (
          <div className="flex items-start">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{person.name}</div>
              <div className="text-xs text-gray-500 truncate">{person.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: t.subject,
      dataIndex: 'subject',
      key: 'subject',
      width: 250,
      render: (subject: string, record) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900 line-clamp-1">{subject}</div>
          <div className="text-xs text-gray-500 line-clamp-2">
            {truncateText(record.content, 80)}
          </div>
        </div>
      ),
    },
    {
      title: t.priority,
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      filters: [
        { text: 'Бага', value: 'low' },
        { text: 'Энгийн', value: 'normal' },
        { text: 'Өндөр', value: 'high' },
        { text: 'Яаралтай', value: 'urgent' },
      ],
      onFilter: (value, record) => record.priority === value,
      render: (priority) => <MessagePriorityTag priority={priority} />,
    },
    {
      title: t.status,
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: 'Илгээсэн', value: 'sent' },
        { text: 'Хүргэгдсэн', value: 'delivered' },
        { text: 'Уншсан', value: 'read' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => <MessageStatusTag status={status} />,
    },
    {
      title: t.sentAt,
      dataIndex: 'sentAt',
      key: 'sentAt',
      width: 150,
      sorter: (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
      defaultSortOrder: 'descend',
      render: (sentAt: string) => (
        <span className="text-gray-600 text-sm">
          {formatMessageDate(sentAt)}
        </span>
      ),
    },
    {
      title: t.actions,
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onViewMessage(record)}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          {t.view}
        </Button>
      ),
    },
  ];

  // Calculate unread count for received messages
  const unreadCount = useMemo(() => {
    if (viewType === 'received') {
      return messages.filter(
        (m) => m.receiverId === currentUserId && m.status !== 'read'
      ).length;
    }
    return 0;
  }, [messages, currentUserId, viewType]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Space className="w-full md:w-auto" wrap>
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder={t.search}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 280 }}
            allowClear
          />
          <Select
            placeholder={t.filterByStatus}
            style={{ width: 150 }}
            allowClear
            onChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}
          >
            <Option value="sent">Илгээсэн</Option>
            <Option value="delivered">Хүргэгдсэн</Option>
            <Option value="read">Уншсан</Option>
          </Select>
          <Select
            placeholder={t.filterByPriority}
            style={{ width: 150 }}
            allowClear
            onChange={(value) => setFilter((prev) => ({ ...prev, priority: value }))}
          >
            <Option value="low">Бага</Option>
            <Option value="normal">Энгийн</Option>
            <Option value="high">Өндөр</Option>
            <Option value="urgent">Яаралтай</Option>
          </Select>
        </Space>

        <div className="flex items-center gap-2">
          {viewType === 'received' && unreadCount > 0 && (
            <Badge count={unreadCount} className="mr-2">
              <Tag color="red" className="px-3 py-1">
                Шинэ зурвас
              </Tag>
            </Badge>
          )}
          <Tag color="blue">
            {t.totalMessages}: {filteredMessages.length}
          </Tag>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredMessages}
        rowKey="id"
        scroll={{ x: 1000 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `${t.totalMessages}: ${total}`,
        }}
        locale={{
          emptyText: (
            <Empty
              description={
                <div>
                  <div className="text-gray-500 font-medium">{t.noMessages}</div>
                  <div className="text-gray-400 text-sm">{t.noMessagesDesc}</div>
                </div>
              }
            />
          ),
        }}
        rowClassName={(record) =>
          viewType === 'received' && record.status !== 'read'
            ? 'bg-blue-50 font-medium'
            : ''
        }
      />
    </div>
  );
};

export default MessageList;