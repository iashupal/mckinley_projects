import React, { Component } from 'react';
import UserRating from 'components/UserRating';
import ContentCard from 'components/ContentCard';
import AlignBox from 'components/AlignBox';
import Heading from 'components/Heading';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import Overlay from 'components/Overlay';
import { withStyles } from '@material-ui/core';

class Test extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="app-wrapper">
        <div className={classes.overlayOuter}>
          <Overlay />
          <ContentCard
            boxShadow="0 0 0 0"
            border="1px solid lightgray"
            title="Test1"
            position="relative"
            contents={[
              <div>
                <AlignBox>
                  <Heading fontSize="17px">Test1</Heading>
                </AlignBox>
                <div className={classes.empytyContainer} />
              </div>,
            ]}
          />
          <ContentCard
            boxShadow="0 0 0 0"
            border="1px solid lightgray"
            title="Test2"
            position="relative"
            contents={[
              <div>
                <AlignBox>
                  <Heading fontSize="17px">Test2</Heading>
                </AlignBox>
                <div className={classes.empytyContainer} />
              </div>,
            ]}
          />
        </div>
        <ContentCard
          boxShadow="0 0 0 0"
          border="1px solid lightgray"
          title="대법원 사건정보"
          contents={[
            <div>
              <AlignBox>
                <Heading fontSize="17px">UserRating</Heading>
                <AlignBox>
                  <Heading fontSize="15px">Rating</Heading>
                  <UserRating rating={5} top="3px" />
                </AlignBox>
              </AlignBox>
              <div className={classes.empytyContainer} />
              <div className={classes.submitButtonContainer}>
                <Button size="medium" mode="regular" color="primary">
                  <Box pl={5} pr={5}>
                    저장
                  </Box>
                </Button>
                <Button size="medium" mode="regular" color="inverted">
                  <Box pl={5} pr={5}>
                    저장
                  </Box>
                </Button>
              </div>
            </div>,
          ]}
        />
        <br /> ==개발 테스트== <br />
        <br />
        <br />
        <br /> ==요청사항== <br />
        [컴포넌트] 고객만족도 (화면 전체적으로 옵션을 준 Component 를 제외하고는, 모두 불투명하게 처리하는 공통 기능
        포함)
        <br />
        <a href="http://sian.giantsoft.co.kr/view.php?c=HUMAXIT2&v=16405" target="_blank">
          http://sian.giantsoft.co.kr/view.php?c=HUMAXIT2&v=16405
        </a>
        <br />
      </div>
    );
  }
}
const styles = theme => ({
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
    clear: 'both',
    paddingTop: 20,
    paddingBottom: 20,
  },
  empytyContainer: {
    width: '100%',
    border: '1px solid lightgray',
    height: 120,
    margin: '15px auto',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  overlayOuter: {
    position: 'relative',
  },
});
export default withStyles(styles)(Test);
