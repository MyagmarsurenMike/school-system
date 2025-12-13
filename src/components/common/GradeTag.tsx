'use client';

import React from 'react';
import { Tag } from 'antd';

// =============================================================================
// TYPES
// =============================================================================

interface GradeTagProps {
  grade: string;
}

type GradeColor = 'green' | 'lime' | 'blue' | 'orange' | 'red';

// =============================================================================
// CONSTANTS
// =============================================================================

/** Grade to color mapping for common grades */
const GRADE_COLORS: Readonly<Record<string, GradeColor>> = {
  'A': 'green',
  'A-': 'lime',
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Gets the appropriate color for a grade
 * @param grade - The letter grade (A, A-, B+, B, etc.)
 * @returns Ant Design tag color
 */
const getGradeColor = (grade: string): GradeColor => {
  // Check exact match first
  if (grade in GRADE_COLORS) {
    return GRADE_COLORS[grade];
  }
  
  // Check grade prefix
  if (grade.startsWith('B')) return 'blue';
  if (grade.startsWith('C')) return 'orange';
  
  return 'red';
};

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Reusable component for displaying academic grades as colored tags
 * @param grade - The letter grade to display
 */
export const GradeTag: React.FC<GradeTagProps> = ({ grade }) => (
  <Tag color={getGradeColor(grade)} className="font-bold m-0">
    {grade}
  </Tag>
);

export { getGradeColor };
export default GradeTag;
