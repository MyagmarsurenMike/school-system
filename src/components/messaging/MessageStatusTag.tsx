'use client';

import React from 'react';
import { Tag } from 'antd';
import { CheckOutlined, SendOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { MessageStatus } from '@/types';

interface MessageStatusTagProps {
  status: MessageStatus;
}

const getMessageStatusColor = (status: MessageStatus): string => {
  const colors: Record<MessageStatus, string> = {
    sent: 'blue',
    delivered: 'cyan',
    read: 'green',
  };
  return colors[status];
};

const getMessageStatusIcon = (status: MessageStatus) => {
  const icons: Record<MessageStatus, React.ReactNode> = {
    sent: <SendOutlined />,
    delivered: <DoubleRightOutlined />,
    read: <CheckOutlined />,
  };
  return icons[status];
};

const getMessageStatusLabel = (status: MessageStatus): string => {
  const labels: Record<MessageStatus, string> = {
    sent: 'Илгээсэн',
    delivered: 'Хүргэгдсэн',
    read: 'Уншсан',
  };
  return labels[status];
};

export const MessageStatusTag: React.FC<MessageStatusTagProps> = ({ status }) => {
  return (
    <Tag 
      icon={getMessageStatusIcon(status)} 
      color={getMessageStatusColor(status)}
    >
      {getMessageStatusLabel(status)}
    </Tag>
  );
};

export default MessageStatusTag;