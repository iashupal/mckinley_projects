import React from 'react';
import PropTypes from 'prop-types';

import '../styles/text-hero.css';

function TextHero({ children, compact }) {
  return (
    <div className={`text-hero slide-up-fade-in ${compact ? 'text-hero--compact' : ''}`}>
      <h1>{children}</h1>
    </div>
  );
}

TextHero.propTypes = {
  children: PropTypes.string.isRequired,
  compact: PropTypes.bool,
};

TextHero.defaultProps = {
  compact: false,
};

export default TextHero;
