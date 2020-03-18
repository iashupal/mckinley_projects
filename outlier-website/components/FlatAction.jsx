import React from 'react';
import PropTypes from 'prop-types';

import '../styles/flat-action.css';

function FlatAction({ children, primary, onClick }) {
  return (
    <span
      className={`flat-action ${primary ? 'flat-action--primary' : ''}`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </span>
  );
}

FlatAction.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  primary: PropTypes.bool,
  onClick: PropTypes.func,
};

FlatAction.defaultProps = {
  primary: false,
  onClick: () => {},
};

export default FlatAction;
