import React, { Component } from 'react';
import Box from 'components/BoxOld';
import Button from 'components/Button';

class BoxTest extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Box>라이브러리 버전 관련 테스트, 일반적으로 사용 X</Box>
        {/* <Button  size="large" mode="regular" color="primary">
          <Box pl={5} pr={5}>
            저장
          </Box>
        </Button>

        <Box display="flex" flexDirection="row">
          ddd
        </Box> */}
      </div>
    );
  }
}

export default BoxTest;
