/**
 * Shared translations for common UI elements
 */

import { Language } from '@/types';

export interface PaymentStatusTranslations {
  paid: string;
  pending: string;
  overdue: string;
}

export interface CommonTranslations {
  search: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  view: string;
  actions: string;
  total: string;
  yes: string;
  no: string;
  warning: string;
  success: string;
  error: string;
}

export const paymentStatusTranslations: Record<Language, PaymentStatusTranslations> = {
  mn: {
    paid: 'Төлсөн',
    pending: 'Хүлээгдэж буй',
    overdue: 'Хугацаа хэтэрсэн',
  },
  en: {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
  },
};

export const commonTranslations: Record<Language, CommonTranslations> = {
  mn: {
    search: 'Хайх',
    save: 'Хадгалах',
    cancel: 'Цуцлах',
    edit: 'Засах',
    delete: 'Устгах',
    view: 'Харах',
    actions: 'Үйлдэл',
    total: 'Нийт',
    yes: 'Тийм',
    no: 'Үгүй',
    warning: 'Анхааруулга',
    success: 'Амжилттай',
    error: 'Алдаа',
  },
  en: {
    search: 'Search',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    actions: 'Actions',
    total: 'Total',
    yes: 'Yes',
    no: 'No',
    warning: 'Warning',
    success: 'Success',
    error: 'Error',
  },
};

/**
 * Helper to get payment status color for Ant Design Tag
 */
export const getPaymentStatusColor = (status: 'paid' | 'pending' | 'overdue'): string => {
  const colors = {
    paid: 'green',
    pending: 'orange',
    overdue: 'red',
  };
  return colors[status];
};
