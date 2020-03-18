import React from 'react';
import { withStyles } from '@material-ui/core';

function LoginLeftImage({ classes, image }) {
	return (
  <div className={classes.imageContainer}>
    <img className={classes.image} src={image} alt="Login image" />
  </div>
	);
}
const styles = theme => ({
	imageContainer: {
		width: '100%'
	},
	image: {
		width: '100%'
	}
});
export default withStyles(styles)(LoginLeftImage);
