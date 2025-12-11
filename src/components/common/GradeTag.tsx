'use client';

import React from 'react';
import { Tag } from 'antd';

interface GradeTagProps {
  grade: string;
}

/**
 * Gets the appropriate color for a grade
 */
const getGradeColor = (grade: string): string => {
  if (grade === 'A') return 'green';
  if (grade === 'A-') return 'lime';
  if (grade.startsWith('B')) return 'blue';
  if (grade.startsWith('C')) return 'orange';
  return 'red';
};

/**
 * Reusable component for displaying academic grades as colored tags
 */
export const GradeTag: React.FC<GradeTagProps> = ({ grade }) => {
  return (
    <Tag color={getGradeColor(grade)} className="font-bold m-0">
      {grade}
    </Tag>
  );
};

export { getGradeColor };
export default GradeTag;
