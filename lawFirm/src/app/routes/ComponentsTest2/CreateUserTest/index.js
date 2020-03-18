import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Heading from 'components/Heading';
import InputBox from 'components/InputBox';
import Box from 'components/BoxOld';
import Button from 'components/Button';

class Test extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="app-wrapper">
        <div className={classes.createUserContainer}>
          <div className={classes.createUserCenterAlign}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }}>
              <Heading display="block" fontWeight="400" color="white" fontSize="32px">
                CloudLaw
              </Heading>
              <Heading display="block" fontSize="32px" fontWeight="400" color="white">
                Register yourself
              </Heading>
              <Box mt={3} mb={3}>
                <div className="createInputWrapper">
                  <InputBox
                    placeholder="우편발송"
                    name="text2"
                    backgroundColor="white"
                    borderRadius="50px"
                    padding="0 0 0 35px"
                  />
                  <div style={{ position: 'absolute', top: 0, right: '-5px' }}>
                    <Button size="large" color="blue" width="100%" borderRadius="50px">
                      <Box pl={4} pr={4} pt={1.5} pb={1.4}>
                        Submit
                      </Box>
                    </Button>
                  </div>
                </div>
              </Box>
              <Box mb={5}>
                <Heading color="white" fontSize="16px">
                  Message
                </Heading>
              </Box>
              <Box>
                {/* <Heading color="white" cursor="pointer" fontSize="16px" borderBottom="1px solid white">
                  
                </Heading> */}
              </Box>
            </div>
          </div>
        </div>
        <br /> ==개발 테스트== <br />
        <br />
        <br />
        <br /> ==요청사항== <br />
        [컴포넌트] 회원가입 모달 => 모바일 반응형
        <br />
        <a href="http://sian.giantsoft.co.kr/view.php?c=HUMAXIT2&v=16232" target="_blank">
          http://sian.giantsoft.co.kr/view.php?c=HUMAXIT2&v=16232
        </a>
        <br />
      </div>
    );
  }
}
const styles = theme => ({
  createUserContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '1000px',
    padding: 30,
    minHeight: '100%',
  },
  createUserCenterAlign: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'table',
    width: '100%',
    height: '100%',
  },
});
export default withStyles(styles)(Test);
