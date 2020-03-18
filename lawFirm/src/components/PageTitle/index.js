import React from 'react';
import { Icon, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../styles/ui/_page-title.scss';

const styles = theme => ({
  pageTitle: {
    position: 'relative',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: '400',
    display: 'inline-block',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    },
  },
  icon: {
    fontSize: '1.5rem',
    paddingRight: '2rem',
    // verticalAlign: 'sub',
    alignSelf: 'flex-start',
    position: 'relative',
    top: 4,
  },
});
function PageTitle({ children, color, icon, classes }) {
  return (
    <div className={classes.pageTitle}>
      {icon && (
        <Icon className={classes.icon} color={color}>
          {icon}
        </Icon>
      )}
      <h2 color={color} className={classes.heading}>
        {children}
      </h2>
    </div>
  );
}

PageTitle.propTypes = {
  classes: PropTypes.object,
  icon: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
};
export default withStyles(styles)(PageTitle);
