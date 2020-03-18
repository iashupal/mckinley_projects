import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    state = {
      component: null,
    };

    async componentDidMount() {
      this.mounted = true;
      const { default: Component } = await importComponent();
      if (this.mounted) {
        this.setState({
          component: <Component {...this.props} />,
        });
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const Component = this.state.component || <div />;
      return <>{Component}</>;
    }
  }

  return AsyncFunc;
}
