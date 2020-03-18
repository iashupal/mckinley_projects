import React from 'react';
import { withStyles } from '@material-ui/core';
import Filler from 'components/Filler';
import PropTypes from 'prop-types';

const ProgressBar = ({ classes, percentage, width }) => {
	return (
  <div className={classes.progressbarWrapper} style={{ width }}>
    <Filler percentage={percentage} />
  </div>
	);
};
const styles = theme => ({
	progressbarWrapper: {
		position: 'relative',
		height: 24,
		borderRadius: 5,
		backgroundColor: '#D7E7FA'
	}
});

ProgressBar.propTypes = {
	percentage: PropTypes.number
};
export default withStyles(styles)(ProgressBar);
