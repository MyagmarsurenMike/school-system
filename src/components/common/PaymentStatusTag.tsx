'use client';

import React from 'react';
import { Tag } from 'antd';
import { PaymentStatus } from '@/types';
import { getPaymentStatusLabel, getPaymentStatusColor } from '@/constants';

// =============================================================================
// TYPES
// =============================================================================

interface PaymentStatusTagProps {
  status: PaymentStatus;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Reusable component for displaying payment status as a colored tag
 * @param status - The payment status (paid, pending, overdue)
 */
export const PaymentStatusTag: React.FC<PaymentStatusTagProps> = ({ status }) => {
  const statusLabel = getPaymentStatusLabel(status);
  const color = getPaymentStatusColor(status);
  
  return <Tag color={color}>{statusLabel}</Tag>;
};

export default PaymentStatusTag;
