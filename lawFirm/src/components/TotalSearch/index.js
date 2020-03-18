import React from 'react';
import { withStyles } from '@material-ui/core';

function TotalSearch({ classes, contents }) {
	return (
  <div className={classes.totalSearch}>
    {contents.map((content, index) => (
      <div key={index} className={classes.contents}>
        {content}
      </div>
			))}
  </div>
	);
}
const styles = theme => ({
	totalSearch: {
		alignItems: 'center'
	}
});
export default withStyles(styles)(TotalSearch);
