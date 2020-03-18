import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
// import './index.css';

export default function Splitter({ children }) {
  return <SplitterLayout>{children}</SplitterLayout>;
}
