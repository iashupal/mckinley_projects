import React from 'react';
import { withStyles } from '@material-ui/core';

function AllSearchPdf({ classes, children, borderColor, color }) {
	return (
        <div className={classes.allSearchPdfWrapper}>
            <p className={classes.searchPdf} style={{ borderColor, color }}>
            {children}
            </p>
        </div>
	);
}
const styles = theme => ({
	allSearchPdfWrapper: {
		margin: '10px 0',
		flexDirection: 'row'
	},
	searchPdf: {
		fontSize: 14,
		display: 'inline-block',
		border: '1px solid',
        padding: 10,
        borderColor: 'blue',
        color: 'blue',
		borderRadius: 5,
		margin: 0
	}
});
export default withStyles(styles)(AllSearchPdf);
