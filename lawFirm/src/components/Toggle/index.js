// import React from 'react';
// import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
// import { withStyles } from '@material-ui/core';

// const styles = theme => ({
//   toggle: {
//     root: {
//       background: theme.palette.themePrimary,
//     },
//   },
// });
// function Switch({ props, classes }) {
//   return <Toggle className="toggle" classes={{ root: classes.pill }} {...props} />;
// }

// export default withStyles(styles)(Switch);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const AntSwitch = withStyles(theme => ({
  root: {
    width: 35,
    height: 18,
    padding: 0,
    // display: 'flex',
  },
  switchBase: {
    padding: 3,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(17px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function Toggle({ checked, value, padding, onChange, color, margin, label }) {
  return (
    <FormControlLabel
      style={{ margin }}
      control={
        <AntSwitch
          checked={!checked}
          color="primary"
          style={{
            color,
            '&$checked': {
              color: 'grey',
              position: 'relative',
              padding,
            },
          }}
          onChange={onChange}
          value={value}
        />
      }
      label={label}
    />
  );
}

export default Toggle;
