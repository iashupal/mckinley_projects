import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import ContentCard from 'components/ContentCard';
import classnames from 'classnames';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import AlignBox from 'components/AlignBox';
import Heading from 'components/Heading';
import InputBox from 'components/InputBox';
import ProfileForm from 'components/ProfileForm';
import Select from 'components/Select';
import Avatar from 'components/Avatar';
import options from '../../../../containers/CaseScreen/dummyData';
import user_icon from '../../../../assets/images/user_icon.png';

class Test extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="app-wrapper">
        <div className={classes.container}>
          <ContentCard
            withButton
            title="Task 목록"
            noMargin
            contents={[
              <AlignBox>
                <div className={classes.profileContent}>
                  <div className={classes.profileLeftSide}>
                    <Heading fontSize="18px">Profile</Heading>
                    <div className={classes.profileButton}>
                      <Button size="medium" color="primary">
                        <Box pl={3} pr={3} pt={0.25} pb={0.25}>
                          Button1
                        </Box>
                      </Button>
                    </div>
                    <div className={classes.profileButton}>
                      <Button size="medium" variant="outlined">
                        <Box pl={3} pr={3}>
                          Button2
                        </Box>
                      </Button>
                    </div>
                    <div className={classes.profileButton}>
                      <Button size="medium" variant="outlined">
                        <Box pl={3} pr={3}>
                          Button3
                        </Box>
                      </Button>
                    </div>
                  </div>
                  <div className={classes.profileRghtContent}>
                    <Heading fontSize="22px">Profile</Heading>

                    <div className={classes.profileForm}>
                      <ProfileForm
                        contents={[
                          {
                            title: (
                              <div>
                                Profile <span style={{ color: 'red' }}>*</span>
                              </div>
                            ),
                            child: (
                              <Box>
                                <Avatar className={classes.avatar}>
                                  <img
                                    src={user_icon}
                                    className={classnames(classes.user_image, classes.saturate)}
                                    alt="profile"
                                  />
                                </Avatar>
                                <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                                  <Button size="small" mode="regular" color="warning">
                                    <Box pl={4} pr={4}>
                                      저장
                                    </Box>
                                  </Button>
                                </div>
                              </Box>
                            ),
                          },
                          {
                            title: (
                              <div>
                                Task <span style={{ color: 'red' }}>*</span>
                              </div>
                            ),
                            child: (
                              <div className="profileInputWrapper">
                                <InputBox
                                  placeholder="우편발송"
                                  name="text2"
                                  backgroundColor="#F8F8F8"
                                  borderRadius="5px"
                                />
                              </div>
                            ),
                          },
                          {
                            title: 'Dropdown',
                            child: (
                              <Box>
                                <div className="left profileDropdown">
                                  <Select
                                    padding="0 5px 0 0"
                                    placeholder="필터 조건"
                                    options={options}
                                    onChange={() => console.log('Changed')}
                                  />
                                </div>
                                <span className="left" style={{ lineHeight: '40px', paddingLeft: '20px' }}>
                                  (Task 관련 파일)
                                </span>
                              </Box>
                            ),
                          },
                          {
                            title: (
                              <div>
                                Task 상태<span style={{ color: 'red' }}>*</span>
                              </div>
                            ),
                            child: (
                              <div className="profileInputWrapper">
                                <InputBox
                                  placeholder="010-1234-5678"
                                  name="text3"
                                  backgroundColor="#F8F8F8"
                                  borderRadius="5px"
                                />
                              </div>
                            ),
                          },
                          {
                            title: 'Task 상태',
                            child: (
                              <div className="profileInputWrapper">
                                <InputBox
                                  placeholder="020000.0000"
                                  name="text4"
                                  backgroundColor="#F8F8F8"
                                  borderRadius="5px"
                                />
                              </div>
                            ),
                          },
                          {
                            title: 'Task 상태',
                            child: (
                              <div className="profileInputWrapper">
                                <InputBox
                                  placeholder="020000.0000"
                                  name="text5"
                                  backgroundColor="#F8F8F8"
                                  borderRadius="5px"
                                />
                              </div>
                            ),
                          },
                          {
                            title: 'Task 상태',
                            child: (
                              <Box>
                                <div className="profileInputWrapper">
                                  <InputBox
                                    placeholder="email@test.com"
                                    name="text6"
                                    backgroundColor="#F8F8F8"
                                    borderRadius="5px"
                                  />
                                </div>
                              </Box>
                            ),
                          },
                          {
                            title: '담당자',
                            child: (
                              <Box>
                                <AlignBox>
                                  <div className={classes.profileInputBtn}>
                                    <div className="profileInputWrapper">
                                      <InputBox placeholder="김변호사" backgroundColor="#F8F8F8" borderRadius="5px" />
                                    </div>
                                    <Box className={classes.profileInputRight__btn}>
                                      <Button borderRadius="0" size="medium" color="dark">
                                        <Box pt={0.25} pb={0.25} pl={2} pr={2}>
                                          파일 선택
                                        </Box>
                                      </Button>
                                    </Box>
                                  </div>
                                  <div className={classes.profileInputChild}>
                                    <div className="profileInputWrapper">
                                      <InputBox
                                        placeholder="우편발송"
                                        name="text6"
                                        backgroundColor="#F8F8F8"
                                        borderRadius="5px"
                                      />
                                    </div>
                                  </div>
                                </AlignBox>
                              </Box>
                            ),
                          },
                        ]}
                      />
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
                    </div>
                  </div>
                </div>
              </AlignBox>,
            ]}
          />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    gridTemplateColumns: '1fr',
    padding: 30,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  profileContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 10fr',
    gridTemplateRows: '1fr',
    width: '65%',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  profileButton: {
    display: 'block',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '-5px',
  },
  profileLeftSide: {
    borderRight: '1px solid',
    // borderColor: 'rgba(0, 0, 0, 0.23)',
    borderColor: '#DCDCDC',
    paddingRight: 30,
  },
  heading: {
    fontSize: 14,
    display: 'block',
  },
  profileRghtHeading: {
    fontSize: 16,
    display: 'block',
  },
  profileRghtContent: {
    padding: '0 20px',
  },
  profileForm: {
    marginTop: 25,
  },
  inputWrapper: {
    width: '84%',
    float: 'left',
  },
  btnRght: {
    float: 'right',
    marginRight: -5,
  },
  profileInputChild: {
    marginTop: 5,
    float: 'left',
    width: '100%',
  },
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
    clear: 'both',
    paddingTop: 20,
    paddingBottom: 100,
  },
  user_image: {
    width: 70,
    height: 70,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  saturate: {
    filter: 'invert(100%)',
  },
  profileInputBtn: {
    display: 'grid',
    gridTemplateRows: '1fr',
    width: '100%',
    gridTemplateColumns: '7.5fr 2fr',
    gridGap: '5px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  profileInputRight__btn: {
    marginRight: '-5px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '-5px',
    },
  },
});

export default withStyles(styles)(Test);
