import React from 'react';

import PropTypes from 'prop-types';
import '../styles/showcase-grid.css';

function ShowCaseGrid({ members }) {
  return (
    <div className="showcase-grid">
      {Object.keys(members).map(key => (
        <div key={key} className="showcase-grid__tile">
          <img className="showcase-grid__image" src={members[key].image} alt={key} />
          <p className="showcase-grid__title">{members[key].name}</p>
          <p className="showcase-grid__title showcase-grid__role">{members[key].role}</p>
          <p className="showcase-grid__title showcase-grid__educatn">{members[key].education}</p>
          <a href={members[key].bioLink} className="showcase-grid__btn-view">
						View Bio
          </a>
        </div>
      ))}
    </div>
  );
}

ShowCaseGrid.propTypes = {
  members: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ShowCaseGrid;
