import React from 'react';
import { withStyles } from '@material-ui/core';

function Information({ contents, classes }) {
  return (
    <div>
      <div className="case-4-content">
        {contents.map((content, index) => (
          <div className="case-4-inr-content" key={index}>
            <div className="case-4-inr-para">
              <p>{content.title}</p>
            </div>
            <div className={classes.infoBorder}>
              <div className="case-4-inr-div">{content.child}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Styles = {
  infoBorder: {
    borderBottom: '1px solid lightgray',
  },
};

// Information.propTypes = {
//   contents: PropTypes.array.isRequired,
// };

// Information.defaultProps = {
//   contents: [],
// };

export default withStyles(Styles)(Information);
