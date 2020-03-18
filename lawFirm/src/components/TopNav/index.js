import React from 'react';
import { withRouter } from 'react-router-dom';

class TopNav extends React.Component {
  render() {
    return (
      <div className={`app-top-nav d-none d-md-block ${this.props.styleName}`}>
        <div className="d-flex app-toolbar align-items-center" />
      </div>
    );
  }
}

export default withRouter(TopNav);

TopNav.defaultProps = {
  styleName: '',
};
