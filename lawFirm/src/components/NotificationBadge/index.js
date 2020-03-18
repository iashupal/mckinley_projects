import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

const NotificationBadge = ({ count }) => (
  <IconButton color="inherit">
    <Badge badgeContent={count} color="error">
      <i className="material-icons">notification_important</i>
    </Badge>
  </IconButton>
);

export default NotificationBadge;
