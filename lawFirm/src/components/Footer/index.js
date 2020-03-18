import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import { BlankSpan } from 'helpers/ui';

const Footer = e => (
  <footer className="app-footer">
    <div className="d-flex flex-row justify-content-between">
      <div style={{ lineHeight: '2' }}>Copyright HUMAX IT Co., Ltd.</div>
    </div>
  </footer>
);

export default Footer;
