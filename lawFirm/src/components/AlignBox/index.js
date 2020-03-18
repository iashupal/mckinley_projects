import React from 'react';
import Box from 'components/BoxOld';

export default function AlignBox(props) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      {props.children}
    </Box>
  );
}
