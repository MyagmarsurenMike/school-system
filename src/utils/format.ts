/**
 * Utility functions for formatting values
 */

/**
 * Formats a number as Mongolian Tugrik currency
 */
export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a date string to localized format
 */
export const formatDate = (dateString: string, locale: 'mn' | 'en' = 'mn'): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'mn' ? 'mn-MN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculates percentage with rounding
 */
export const calculatePercentage = (partial: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((partial / total) * 100);
};

/**
 * Gets color for progress bars based on percentage
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage >= 100) return '#52c41a';
  if (percentage >= 50) return '#1890ff';
  if (percentage >= 25) return '#faad14';
  return '#ff4d4f';
};
