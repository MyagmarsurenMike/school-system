/**
 * Utility functions for formatting values
 * @module utils/format
 */

import { Language } from '@/types';

// =============================================================================
// CONSTANTS
// =============================================================================

/** Progress color thresholds */
const PROGRESS_COLORS = {
  complete: '#52c41a',
  high: '#1890ff',
  medium: '#faad14',
  low: '#ff4d4f',
} as const;

// =============================================================================
// CURRENCY FORMATTING
// =============================================================================

/**
 * Formats a number as Mongolian Tugrik currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    minimumFractionDigits: 0,
  }).format(amount);
};

// =============================================================================
// DATE FORMATTING
// =============================================================================

/**
 * Formats a date string to localized format
 * @param dateString - ISO date string
 * @param locale - Target locale ('mn' or 'en')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, locale: Language = 'mn'): string => {
  const date = new Date(dateString);
  const localeMap: Record<Language, string> = {
    mn: 'mn-MN',
    en: 'en-US',
  };
  
  return date.toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// =============================================================================
// NUMERIC CALCULATIONS
// =============================================================================

/**
 * Calculates percentage with rounding
 * @param partial - The partial value
 * @param total - The total value
 * @returns Rounded percentage (0-100)
 */
export const calculatePercentage = (partial: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((partial / total) * 100);
};

/**
 * Gets color for progress bars based on percentage
 * @param percentage - The percentage value (0-100)
 * @returns Hex color string
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage >= 100) return PROGRESS_COLORS.complete;
  if (percentage >= 50) return PROGRESS_COLORS.high;
  if (percentage >= 25) return PROGRESS_COLORS.medium;
  return PROGRESS_COLORS.low;
};
