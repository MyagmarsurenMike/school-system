'use client';

import React, { useState, useMemo } from 'react';
import { Card, Tabs, Button, Space, Statistic, Row, Col, Badge } from 'antd';
import { 
  SendOutlined, 
  InboxOutlined, 
  MailOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Message, MessageInput, User, SenderRole } from '@/types';
import { mockMessages, mockUsers } from '@/data/mockData';
import { 
  SendMessageModal, 
  MessageList, 
  MessageDetailModal 
} from '@/components/messaging';

interface NotificationTabProps {
  /** Current logged-in user */
  currentUser: User;
}

const translations = {
  mn: {
    title: 'Зурвас / Мэдэгдэл',
    description: 'Илгээсэн болон хүлээн авсан зурваснууд',
    createMessage: 'Зурвас илгээх',
    receivedMessages: 'Хүлээн авсан',
    sentMessages: 'Илгээсэн',
    stats: {
      totalSent: 'Илгээсэн',
      totalReceived: 'Хүлээн авсан',
      unread: 'Уншаагүй',
    },
  },
};

/**
 * NotificationTab - Main notification/messaging feature component
 * Provides full messaging functionality for users with appropriate permissions
 * 
 * Features:
 * - Send 1-to-1 messages (Teacher, Manager, Finance only)
 * - View sent messages
 * - View received messages
 * - Message status tracking (sent, delivered, read)
 * - Priority levels
 * - Search and filter capabilities
 * 
 * @component
 */
export default function NotificationTab({ currentUser }: NotificationTabProps) {
  const t = translations['mn'];
  
  // State management
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  // Check if user can send messages
  const canSendMessages = (role: string): role is SenderRole => {
    return ['teacher', 'manager', 'finance'].includes(role);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const sent = messages.filter((m) => m.senderId === currentUser.id);
    const received = messages.filter((m) => m.receiverId === currentUser.id);
    const unread = received.filter((m) => m.status !== 'read');

    return {
      totalSent: sent.length,
      totalReceived: received.length,
      unreadCount: unread.length,
    };
  }, [messages, currentUser.id]);

  /**
   * Handle sending a new message
   */
  const handleSendMessage = async (messageInput: MessageInput): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const receiver = mockUsers.find((u) => u.id === messageInput.receiverId);
    if (!receiver) {
      throw new Error('Receiver not found');
    }

    const newMessage: Message = {
      id: `MSG${Date.now()}`,
      senderId: currentUser.id,
      sender: currentUser,
      receiverId: messageInput.receiverId,
      receiver,
      subject: messageInput.subject,
      content: messageInput.content,
      priority: messageInput.priority,
      status: 'sent',
      sentAt: new Date().toISOString(),
    };

    setMessages((prev) => [newMessage, ...prev]);

    // Simulate delivery after 2 seconds
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id
            ? { ...m, status: 'delivered', deliveredAt: new Date().toISOString() }
            : m
        )
      );
    }, 2000);
  };

  /**
   * Handle viewing message details
   */
  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setDetailModalVisible(true);
    
    // Auto-mark as read when viewing received messages
    if (message.receiverId === currentUser.id && message.status !== 'read') {
      handleMarkAsRead(message.id);
    }
  };

  /**
   * Mark message as read
   */
  const handleMarkAsRead = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.status !== 'read'
          ? { ...m, status: 'read', readAt: new Date().toISOString() }
          : m
      )
    );
  };

  // Tab items configuration - memoized to prevent infinite re-renders
  const tabItems = useMemo(() => [
    {
      key: 'received',
      label: (
        <Badge count={stats.unreadCount} offset={[10, 0]}>
          <Space>
            <InboxOutlined />
            {t.receivedMessages}
          </Space>
        </Badge>
      ),
      children: (
        <MessageList
          messages={messages}
          currentUserId={currentUser.id}
          onViewMessage={handleViewMessage}
          viewType="received"
        />
      ),
    },
    {
      key: 'sent',
      label: (
        <Space>
          <SendOutlined />
          {t.sentMessages}
        </Space>
      ),
      children: (
        <MessageList
          messages={messages}
          currentUserId={currentUser.id}
          onViewMessage={handleViewMessage}
          viewType="sent"
        />
      ),
    },
  ], [messages, currentUser.id, stats.unreadCount, t]);

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div>
        <Card className="shadow-sm border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BellOutlined className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 m-0">{t.title}</h2>
              </div>
              <p className="text-gray-500 m-0">{t.description}</p>
            </div>

            {canSendMessages(currentUser.role) && (
              <Button
                type="primary"
                size="large"
                icon={<SendOutlined />}
                onClick={() => setSendModalVisible(true)}
                className="bg-blue-600"
              >
                {t.createMessage}
              </Button>
            )}
          </div>

          {/* Statistics Row */}
          <Row gutter={16} className="mt-6">
            <Col xs={24} sm={8}>
              <Card className="bg-blue-50 border-blue-200">
                <Statistic
                  title={t.stats.totalReceived}
                  value={stats.totalReceived}
                  prefix={<InboxOutlined className="text-blue-600" />}
                  styles={{ content: { color: '#1890ff' } }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="bg-green-50 border-green-200">
                <Statistic
                  title={t.stats.totalSent}
                  value={stats.totalSent}
                  prefix={<SendOutlined className="text-green-600" />}
                  styles={{ content: { color: '#52c41a' } }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="bg-orange-50 border-orange-200">
                <Statistic
                  title={t.stats.unread}
                  value={stats.unreadCount}
                  prefix={<MailOutlined className="text-orange-600" />}
                  styles={{ content: { color: '#fa8c16' } }}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>


      {/* Messages Tabs */}
      <div>
        <Card className="px-6 shadow-sm border-gray-200" >
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as 'received' | 'sent')}
            items={tabItems}
            className="px-6"
          />
        </Card>
      </div>

      {/* Send Message Modal */}
      {canSendMessages(currentUser.role) && (
        <SendMessageModal
          visible={sendModalVisible}
          onClose={() => setSendModalVisible(false)}
          onSend={handleSendMessage}
          currentUser={currentUser}
          availableReceivers={mockUsers}
        />
      )}

      {/* Message Detail Modal */}
      <MessageDetailModal
        visible={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
          setSelectedMessage(null);
        }}
        message={selectedMessage}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}