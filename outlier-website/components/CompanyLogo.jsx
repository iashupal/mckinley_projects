import React from 'react';
import Link from 'next/link';

import '../styles/company-logo.css';

export default function Logo() {
  return (
    <Link href="/">
      <button type="button" className="company-logo" />
    </Link>
  );
}
