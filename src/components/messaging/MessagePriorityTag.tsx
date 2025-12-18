'use client';

import React from 'react';
import { Tag } from 'antd';
import { ExclamationCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { MessagePriority } from '@/types';

interface MessagePriorityTagProps {
  priority: MessagePriority;
}

const getMessagePriorityColor = (priority: MessagePriority): string => {
  const colors: Record<MessagePriority, string> = {
    low: 'default',
    normal: 'blue',
    high: 'orange',
    urgent: 'red',
  };
  return colors[priority];
};

const getMessagePriorityIcon = (priority: MessagePriority) => {
  if (priority === 'urgent' || priority === 'high') {
    return <ExclamationCircleOutlined />;
  }
  return <MinusCircleOutlined />;
};

const getMessagePriorityLabel = (priority: MessagePriority): string => {
  const labels: Record<MessagePriority, string> = {
    low: 'Бага',
    normal: 'Энгийн',
    high: 'Өндөр',
    urgent: 'Яаралтай',
  };
  return labels[priority];
};

export const MessagePriorityTag: React.FC<MessagePriorityTagProps> = ({ priority }) => {
  return (
    <Tag 
      icon={getMessagePriorityIcon(priority)} 
      color={getMessagePriorityColor(priority)}
    >
      {getMessagePriorityLabel(priority)}
    </Tag>
  );
};

export default MessagePriorityTag;