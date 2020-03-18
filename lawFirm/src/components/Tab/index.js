import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    backgroundColor: 'white',
    border: '1.5px solid #e4e4e4',
    borderRadius: 5,
    color: 'gray',
    paddingTop: 6,
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 6,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  active: {
    border: `1.5px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    borderRadius: 5,
  },
});

function Tab({ text, selected, classes, onClick }) {
  return (
    <Button className={classnames(classes.root, { [classes.active]: selected })} onClick={onClick}>
      {text}
    </Button>
  );
}

Tab.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  selected: false,
};

export default withStyles(styles)(Tab);
