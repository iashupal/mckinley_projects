import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

function ToolTip({ title, children, placement }) {
    return (
      <Tooltip title={title} placement={placement}>
        {children}
      </Tooltip>
    );
}

Tooltip.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    placement: PropTypes.string
};

export default ToolTip;
