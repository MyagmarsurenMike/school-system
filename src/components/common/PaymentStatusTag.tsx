'use client';

import React from 'react';
import { Tag } from 'antd';
import { Language, PaymentStatus } from '@/types';
import { paymentStatusTranslations, getPaymentStatusColor } from '@/constants/translations';

// =============================================================================
// TYPES
// =============================================================================

interface PaymentStatusTagProps {
  status: PaymentStatus;
  language?: Language;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Reusable component for displaying payment status as a colored tag
 * @param status - The payment status (paid, pending, overdue)
 * @param language - Display language (defaults to 'mn')
 */
export const PaymentStatusTag: React.FC<PaymentStatusTagProps> = ({ 
  status, 
  language = 'mn' 
}) => {
  const statusLabel = paymentStatusTranslations[language][status];
  const color = getPaymentStatusColor(status);
  
  return <Tag color={color}>{statusLabel}</Tag>;
};

export default PaymentStatusTag;
