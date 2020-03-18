import React, { Component } from 'react';
import Splitter from 'components/Splitter';

class SplitterTest extends Component {
  render() {
    return (
      <React.Fragment>
        Splitter Test1 : <br />
        <Splitter>
          <div>Pane 1</div>
          <div>Pane 2</div>
        </Splitter>
        <br />
        <span>2등분 밖에 적용 안됨.</span>
      </React.Fragment>
    );
  }
}

export default SplitterTest;
