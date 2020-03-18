import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

function Tab({ text, selected, classes, onClick }) {
  return (
    <Button onClick={onClick}>
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

export default Tab;