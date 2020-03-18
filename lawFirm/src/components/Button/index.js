import React from 'react';
import Box from 'components/BoxOld';
import { Button as Btn, Icon, colors } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as classnames from 'classnames';

const styles = theme => ({
  inherit: {
    borderColor: theme.palette.common.white,
    '&:hover': {
      borderColor: theme.palette.common.white,
    },
    color: theme.palette.common.white,
  },
  warning: {
    backgroundColor: colors.amber[500],
    '&:hover': {
      backgroundColor: colors.amber[700],
      boxShadow: '1px 2px 5px #888888',
    },
    color: 'white',
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '1px 2px 5px #888888',
    },
    color: 'white',
  },
  success: {
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[700],
      boxShadow: '1px 2px 5px #888888',
    },
    color: 'white',
  },
  danger: {
    backgroundColor: colors.red[600],
    '&:hover': {
      backgroundColor: colors.red[700],
      boxShadow: '1px 2px 5px #888888',
    },
    color: 'white',
  },
  blue: {
    backgroundColor: colors.blue[600],
    '&:hover': {
      backgroundColor: colors.blue[700],
      boxShadow: '1px 2px 5px #888888',
    },
    color: 'white',
  },
  white: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#e8e8e8',
      boxShadow: '1px 2px 5px #888888',
    },
    color: 'black',
  },
  inverted: {
    backgroundColor: colors.grey[400],
    '&:hover': {
      backgroundColor: colors.grey[500],
      boxShadow: '1px 2px 5px #888888',
    },
    color: 'white',
  },
  dark: {
    backgroundColor: colors.blueGrey[900],
    '&:hover': {
      backgroundColor: colors.blueGrey[800],
      boxShadow: '1px 2px 5px #888888',
    },
    color: 'white',
  },
  root: {
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    minHeight: 0,
    minWidth: 0,
    textTransform: 'none',
  },
  square: {
    padding: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  small: {
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4,
  },
  medium: {
    paddingTop: 6,
    paddingRight: 13,
    paddingLeft: 13,
    paddingBottom: 6,
  },
  large: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
});

const Button = ({
  children,
  disabled,
  variant,
  icon,
  color,
  classes,
  size,
  onClick,
  width,
  borderRadius,
  position,
}) => {
  return (
    <Btn
      variant={variant}
      style={{ width, borderRadius }}
      disabled={disabled}
      className={classnames({
        [classes.root]: true,
        [classes.primary]: color === 'primary',
        [classes.warning]: color === 'warning',
        [classes.success]: color === 'success',
        [classes.danger]: color === 'danger',
        [classes.blue]: color === 'blue',
        [classes.inverted]: color === 'inverted',
        [classes.dark]: color === 'dark',
        [classes.white]: color === 'white',
        [classes.small]: size === 'small',
        [classes.medium]: size === 'medium',
        [classes.large]: size === 'large',
        [classes.square]: size === 'square',
        [classes.inherit]: color === 'inherit',
      })}
      onClick={onClick}
    >
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        {children}
        {icon && <Icon style={{ fontSize: '20px', paddingRight: 4, position, color }}>{icon}</Icon>}
      </Box>
    </Btn>
  );
};

Button.propTypes = {
  // classes: PropTypes.object,
  icon: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string,
};

Button.defaultProps = {
  color: 'default',
  size: 'medium',
  variant: 'text',
  icon: null,
  width: null,
};

export default withStyles(styles)(Button);
