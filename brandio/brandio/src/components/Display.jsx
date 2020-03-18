import React, { Component, Fragment } from "react";

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { garment, selectedSide, item } = this.props;
    return garment.urls.map((url, index) => (
      <div
        id={`area-${index}`}
        style={{
          width: 600,
          height: 600,
          justifySelf: "center",
          alignSelf: "center",
          display: index === selectedSide ? "block" : "none"
        }}
      >
        <canvas id={`canvas-${index}`} height="600" width="600"></canvas>
      </div>
    ));
  }
}

export default Display;
