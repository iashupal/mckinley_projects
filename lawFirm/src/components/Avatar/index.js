import React from 'react';
import { Avatar as MaterialAvatar } from '@material-ui/core';

export default function Avatar({ className, children, color }) {
  return (
    <MaterialAvatar className={className} style={{ backgroundColor: color }}>
      {children}
    </MaterialAvatar>
  );
}
