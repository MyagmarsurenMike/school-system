'use client';

import React from 'react';
import { Tag } from 'antd';
import { Language } from '@/types';
import { paymentStatusTranslations, getPaymentStatusColor } from '@/constants/translations';

interface PaymentStatusTagProps {
  status: 'paid' | 'pending' | 'overdue';
  language?: Language;
}

/**
 * Reusable component for displaying payment status as a colored tag
 */
export const PaymentStatusTag: React.FC<PaymentStatusTagProps> = ({ 
  status, 
  language = 'mn' 
}) => {
  const t = paymentStatusTranslations[language];
  const color = getPaymentStatusColor(status);
  
  return <Tag color={color}>{t[status]}</Tag>;
};

export default PaymentStatusTag;
