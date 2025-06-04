import React, { FC } from 'react';

interface StatusDisplayProps {
  color: string;
  label: string;
}

export const StatusDisplay: FC<StatusDisplayProps> = ({ color, label }) => (
  <span
    className="text text_type_main-default pt-2"
    style={{ color }}
  >
    {label}
  </span>
);
