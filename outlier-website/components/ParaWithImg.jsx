/**
 * TODO: Clarify the type of image assets to be included with this component
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '../styles/para-with-img.css';

function ParaWithImg({ contentData }) {
  return (
    <div className="para-with-img">
      {Object.keys(contentData).map(key => (
        <Fragment key={key}>
          <img
            src={contentData[key].imgSrc}
            alt={key}
            className="para-with-img__img"
          />
          <p className="para-with-img__para">{contentData[key].content}</p>
        </Fragment>
      ))}
    </div>
  );
}

ParaWithImg.propTypes = {
  contentData: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ParaWithImg;
