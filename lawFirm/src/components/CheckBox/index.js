import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function CheckBox({ checked, label, value, id, onChange, color, margin }) {
  return (
    <FormControlLabel
      style={{ margin }}
      control={
        <Checkbox
          disableRipple
          checked={checked}
          color="primary"
          style={{
            color,
            '&$checked': {
              color: 'grey',
            },
          }}
          onChange={onChange}
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          value={value}
        />
      }
      label={label}
    />
  );
}

export default CheckBox;
