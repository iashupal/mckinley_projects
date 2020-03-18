import React from 'react';
import { withStyles } from '@material-ui/core';

const Heading = ({
  styleName,
  classes,
  paddingRight,
  padding,
  children,
  display,
  fontSize,
  color,
  fontWeight,
  backgroundColor,
  margin,
  cursor,
}) => {
  return (
    <div className={classes.rowHeading} style={{ display, paddingRight }}>
      <div className={`${styleName}`} style={{ fontSize, cursor, color, backgroundColor, padding, fontWeight, margin }}>
        {children}
      </div>
    </div>
  );
};
const styles = theme => ({
  rowHeading: {
    display: 'inline-block',
    paddingRight: 10,
  },
  heading: {
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
  },
});
export default withStyles(styles)(Heading);
