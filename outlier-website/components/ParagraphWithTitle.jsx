import React from 'react';
import PropTypes from 'prop-types';

import '../styles/paragraph-with-title.css';

export default function ParagraphWithTitle({ centered }) {
  return (
    <div
      className={`paragraph-with-title ${
        centered ? 'paragraph-with-title--centered' : ''
      }`}
    >
      <h3>What we did</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
        exercitationem rem perspiciatis! Unde laborum omnis sunt tenetur
        eligendi, tempore, voluptates nesciunt asperiores culpa pariatur vitae
        nam eos dolor! Excepturi, perspiciatis.
      </p>
    </div>
  );
}

ParagraphWithTitle.propTypes = {
  centered: PropTypes.bool,
};

ParagraphWithTitle.defaultProps = {
  centered: false,
};
