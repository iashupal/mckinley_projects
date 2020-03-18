import React, { Component } from 'react';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';

class AlignBoxTest extends Component {
  render() {
    return (
      <React.Fragment>
        * 아래 방식 사용 가능하나, Flex 직접 사용 권장.
        <br />
        <br />
        <br />
        <AlignBox>
          <h2>Task 목록</h2>
          <AlignBox pt={0.5} pb={0.5} ml={5}>
            <Button size="small" variant="outlined">
              전체
            </Button>
            <Button size="small" variant="outlined">
              이번 주
            </Button>
            <Button size="small" variant="outlined">
              오늘
            </Button>
            <Button size="small" variant="outlined">
              내일
            </Button>
            <Button size="small" variant="outlined">
              일정 지남
            </Button>
          </AlignBox>
        </AlignBox>
      </React.Fragment>
    );
  }
}

export default AlignBoxTest;
