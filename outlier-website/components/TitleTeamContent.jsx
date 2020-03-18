import React from 'react';
import PropTypes from 'prop-types';
import '../styles/title-desc-grid.css';

function TitleTeamContent({ contentObject }) {
  return (
    <div>
      <section className="title-desc-grid">
        {Object.keys(contentObject).map(key => (
          <div key={key} className="title-desc-grid__card">
            <h3>{contentObject[key].title}</h3>
            <p>{contentObject[key].content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

TitleTeamContent.propTypes = {
  contentObject: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TitleTeamContent;
