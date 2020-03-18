import React from 'react';
import PropTypes from 'prop-types';

import '../styles/page-separator.css';

function PageSeparator({ fullWidth }) {
  return (
    <hr
      className={`page-separator ${
        fullWidth ? 'page-separator--full-width' : ''
      }`}
    />
  );
}

PageSeparator.propTypes = {
  fullWidth: PropTypes.bool,
};

PageSeparator.defaultProps = {
  fullWidth: false,
};

export default PageSeparator;
