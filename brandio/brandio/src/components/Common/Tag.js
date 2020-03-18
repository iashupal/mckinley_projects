import { Tag } from "antd";
import React from "react";

const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = { checked: true };

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckableTag
        {...this.props}
        checked={this.state.checked}
        onChange={this.handleChange}
      />
    );
  }
}

export default MyTag;
