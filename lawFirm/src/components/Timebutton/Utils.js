import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';

export const SetLS = (key, value) => {
  if (!key) return;
  const newKey = `timebutton_${key}`;
  localStorage.setItem(newKey, value);
};

export const GetLS = (key, defaultValue) => {
  if (!key) return defaultValue;
  const newKey = `timebutton_${key}`;
  return localStorage.getItem(newKey) || 0;
};

export const styles = theme => ({
  timer: {
    position: 'relative',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '180',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    padding: 5,
  },
  timerInr: {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    position: 'relative',
    verticalAlign: 'middle',
  },
  heading: {
    display: 'inline',
    paddingLeft: '10px',
    verticalAlign: 'text-bottom',
    fontSize: '15px',
    letterSpacing: '.5px',
    color: 'white',
  },
});

export const SmallIcon = ({ name, handler }) => {
  return (
    <i
      className={`material-icons ${name ? 'left' : 'right'}`}
      onClick={handler}
      style={{ cursor: 'pointer', fontSize: '20px', color: '#575757' }}
      role="button"
      tabIndex="-1"
    >
      {name || 'query_builder'}
    </i>
  );
};
