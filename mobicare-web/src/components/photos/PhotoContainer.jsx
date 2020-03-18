import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'

import '../../assets/styles/photos/photo-container.css'

function PhotoContainer({
  photoUrl, date, clickHandler, index
}) {
  return (
    <div className="same-col" onClick={() => clickHandler(index)}>
      <div className="photo-box">
        <img src={photoUrl} alt={photoUrl} />
        <div className="img-caption">{moment(date).format("YYYY-MM-DD HH:MM")}</div>
      </div>
    </div>
  )
}

PhotoContainer.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
};

PhotoContainer.defaultProps = {
  clickHandler: () => {}
};

export default PhotoContainer;


