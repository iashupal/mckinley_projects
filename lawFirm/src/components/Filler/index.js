import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const Filler = ({ percentage, classes, color }) => {
	return (
  <div className={classes.fillerWrapper} style={{ width: `${percentage}%` }}>
    <p className={classes.label} style={{ color }}>
      {percentage}%
    </p>
  </div>
	);
};
const styles = theme => ({
	fillerWrapper: {
		height: '100%',
		borderRadius: 'inherit',
		transition: 'width .2s ease-in',
		backgroundColor: theme.palette.primary.main
	},
	label: {
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		textAlign: 'center',
		fontWeight: 500,
		fontSize: 14
	}
});

export default withStyles(styles)(Filler);
