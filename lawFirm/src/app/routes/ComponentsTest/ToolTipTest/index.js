import React, { Component } from 'react';
import ToolTip from 'components/ToolTip';

class ToolTipTest extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <ToolTip title="bottom-end" placement="bottom-end">
          <span>툴팁테스트입니다.bottom-end</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="bottom-start" placement="bottom-start">
          <span>툴팁테스트입니다.bottom-start</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="bottom" placement="bottom">
          <span>툴팁테스트입니다.bottom</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="left-end" placement="left-end">
          <span>툴팁테스트입니다.left-end</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="left-start" placement="left-start">
          <span>툴팁테스트입니다.left-start</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="right-end" placement="right-end">
          <span>툴팁테스트입니다.right-end</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="right-start" placement="right-start">
          <span>툴팁테스트입니다.right-start</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="right" placement="right">
          <span>툴팁테스트입니다.right</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="top-end" placement="top-end">
          <span>툴팁테스트입니다.top-end</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="top-start" placement="top-start">
          <span>툴팁테스트입니다.top-start</span>
        </ToolTip>
        <br />
        <br />
        <ToolTip title="top" placement="top">
          <span>툴팁테스트입니다.top</span>
        </ToolTip>
      </div>
    );
  }
}

export default ToolTipTest;
