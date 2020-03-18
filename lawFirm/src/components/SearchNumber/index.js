import React from 'react';
import { withStyles } from '@material-ui/core';

function SearchNumber({ classes, children, backgroundColor, borderRadius, padding, margin }) {
  return (
    <div className={classes.numberWrapper}>
      <span className={classes.number} style={{ backgroundColor, borderRadius, padding, margin }}>
        {children}
      </span>
    </div>
  );
}
const styles = theme => ({
  numberWrapper: {
    display: 'inline-block',
  },
  number: {
    color: 'white',
    fontSize: 12,
    borderRadius: '50%',
    backgroundColor: 'blue',
    width: 20,
    padding: '5px 8px',
    fontWeight: 'bold',
  },
});
export default withStyles(styles)(SearchNumber);
