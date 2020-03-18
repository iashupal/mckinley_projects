import React from 'react';
import Button from 'components/Button';
import Box from 'components/BoxOld';

const ButtonN = ({ type, color, icon, onClick, children, label }) => {
  if (type === 'large') {
    return (
      <Button color={color} size="large" mode="regular" onClick={onClick}>
        <Box pl={5} pr={5}>
          {label}
          {children}
        </Box>
      </Button>
    );
  }

  if (type === 'icon') {
    return (
      <Button icon={icon} color={color} onClick={onClick}>
        <Box pr={2}>
          {label}
          {children}
        </Box>
      </Button>
    );
  }

  return (
    <Button color={color} onClick={onClick}>
      {label}
      {children}
    </Button>
  );
};

export default ButtonN;
