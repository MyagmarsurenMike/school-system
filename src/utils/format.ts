/**
 * Formatting utilities for dates, numbers, and text
 * @module utils/format
 */

import dayjs from 'dayjs';
import 'dayjs/locale/mn';
import relativeTime from 'dayjs/plugin/relativeTime';

// Configure dayjs
dayjs.extend(relativeTime);
dayjs.locale('mn');

// =============================================================================
// NUMBER FORMATTING
// =============================================================================

/**
 * Format a number as Mongolian currency (₮)
 * @param amount - Amount to format
 * @returns Formatted currency string with thousands separators
 * @example formatCurrency(1500000) // "₮1,500,000"
 */
export const formatCurrency = (amount: number): string => {
  return `₮${amount.toLocaleString('mn-MN')}`;
};

/**
 * Format a number with thousands separators
 * @param num - Number to format
 * @returns Formatted number string
 * @example formatNumber(1234567) // "1,234,567"
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('mn-MN');
};

// =============================================================================
// DATE FORMATTING
// =============================================================================

/**
 * Format a date string for display in Mongolian format
 * @param dateString - ISO date string or date object
 * @returns Formatted date in Mongolian locale (YYYY оны MM сарын DD)
 */
export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('YYYY оны MM сарын DD');
};

/**
 * Format a date with time
 * @param dateString - ISO date string or date object
 * @returns Formatted date and time
 */
export const formatDateTime = (dateString: string): string => {
  return dayjs(dateString).format('YYYY/MM/DD HH:mm');
};

/**
 * Get relative time from now in Mongolian
 * @param dateString - ISO date string or date object
 * @returns Relative time string (e.g., "2 цагийн өмнө")
 */
export const formatRelativeTime = (dateString: string): string => {
  return dayjs(dateString).fromNow();
};

/**
 * Format a date for short display (MM/DD)
 * @param dateString - ISO date string or date object
 * @returns Short date format
 */
export const formatShortDate = (dateString: string): string => {
  return dayjs(dateString).format('MM/DD');
};

/**
 * Format message date - shows relative time if recent, otherwise shows date
 * @param dateString - ISO date string
 * @returns Formatted date string based on recency
 */
export const formatMessageDate = (dateString: string): string => {
  const date = dayjs(dateString);
  const now = dayjs();
  const diffDays = now.diff(date, 'day');

  if (diffDays === 0) {
    return date.format('HH:mm');
  } else if (diffDays === 1) {
    return 'Өчигдөр';
  } else if (diffDays < 7) {
    return date.format('dddd');
  } else {
    return date.format('MM/DD');
  }
};

// =============================================================================
// TEXT FORMATTING
// =============================================================================

/**
 * Truncate text to a maximum length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with "..." if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Capitalize first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
