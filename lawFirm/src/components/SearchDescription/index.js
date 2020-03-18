import React from 'react';
import withStyles from '@material-ui/styles/withStyles';

function SearchDescription({ descriptionTag, descriptionInfo, classes }) {
	return (
  <div className={classes.searchDescriptionWrapper}>
    <p className={classes.searchDescContent}>
      {descriptionTag} : {descriptionInfo}
    </p>
  </div>
	);
}
const styles = theme => ({
	searchDescriptionWrapper: {
		display: 'inline-block',
		paddingRight: '20px'
	},
	searchDescContent: {
		fontSize: 14,
		margin: 0
	}
});
export default withStyles(styles)(SearchDescription);
