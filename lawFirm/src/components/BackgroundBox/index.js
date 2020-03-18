import React from 'react';
import { withStyles } from '@material-ui/core';

function BackgroundBox({
	classes,
	backgroundColor,
	margin,
	borderRadius,
	border,
	borderTop,
	borderBottom,
	borderTopRightRadius,
	borderTopLeftRadius,
	color,
	padding,
	children,
	props
}) {
	return (
  <div
    style={{ backgroundColor, margin, borderRadius, border, borderTop, borderTopLeftRadius, borderTopRightRadius, borderBottom, color, padding }}
    className={classes.bgBox}
		>
    {children}
  </div>
	);
}
const styles = theme => ({
	bgBox: {
		backgroundColor: theme.palette.primary.main,
	}
});
export default withStyles(styles)(BackgroundBox);
