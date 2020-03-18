import * as React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/BoxOld';

import CircularProgress from '@material-ui/core/CircularProgress';

function Loader({ title, color }) {
  return (
    <Box display="inline-block">
      <Box display="flex" flexDirection="column" alignItems="center">
        <CircularProgress color={color} />
        {title && <p style={{ marginTop: '10px' }}>{title}</p>}
      </Box>
    </Box>
  );
}

export default Loader;
