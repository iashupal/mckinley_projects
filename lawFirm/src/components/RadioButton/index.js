import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

function RadioButton({ classes, checked, padding, label, value, onChange, name }) {
  return (
    <FormControlLabel
      checked={checked}
      value={value}
      onChange={onChange}
      control={<Radio name={name} color="primary" style={{ padding }} />}
      label={label}
      style={{
        color: '#575757',
      }}
      labelPlacement="end"
    />
  );
}

const styles = theme => ({
  radiobtn: {
    position: 'relative',
    verticalAlign: 'top',
    top: '8px',
    display: 'inline-block',
    marginRight: '15px',
  },
});

export default withStyles(styles)(RadioButton);
