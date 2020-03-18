import React from 'react';
import { withStyles } from '@material-ui/core';

function Overlay({ classes, height }) {
  return <div className={classes.overlay} style={{ height }} />;
}
const styles = theme => ({
  overlay: {
    backgroundColor: 'rgba(248, 248, 248, 0.5)',
    display: 'block',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '88888',
  },
});

export default withStyles(styles)(Overlay);
