import React from 'react';
import type { card } from '../models/card';

export const Card: React.FC<card> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};