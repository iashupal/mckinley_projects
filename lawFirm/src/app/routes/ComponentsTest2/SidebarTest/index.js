import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import BackgroundBox from 'components/BackgroundBox';
import AlignBox from 'components/AlignBox';
import Box from 'components/BoxOld';
import Heading from 'components/Heading';
import InputBox from 'components/InputBox';
import Toggle from 'components/Toggle';
import DatePicker from 'components/DatePicker';
import Button from 'components/Button';
import Select from 'components/Select';
import Fields, { FieldItem } from 'components/Fields';
import CheckBox from 'components/CheckBox';
import TimePicker from 'components/TimePicker';
import moment from 'moment';
import RadioButton from 'components/RadioButton';
import options from '../../../../containers/CaseScreen/dummyData';

class Test extends Component {
  state = {
    checkA: true,
    checkB: true,
    checkC: true,
    value: moment(),
  };

  handleValueChange = value => {
    console.log(value && value.format('HH:mm:ss'));
    this.setState({ value });
  };

  clear = () => {
    this.setState({
      value: undefined,
    });
  };

  onChange = e => {
    this.setState({
      [e.target.value]: !e.target.checked,
    });
  };

  render() {
    const { checkA, checkB, checkC, value } = this.state;
    const { classes } = this.props;
    return (
      <div className="app-wrapper">
        <Box>
          <div>
            <div className={classes.sidebarContainer}>
              <BackgroundBox borderTopLeftRadius="5px" borderTopRightRadius="5px">
                <div className={classes.smsHeading}>
                  <AlignBox>
                    <Heading padding="14px 20px" color="white" fontSize="16px" fontWeight="400">
                      SMS
                    </Heading>
                    <Box style={{ padding: '10px 20px' }}>
                      <i className="material-icons" style={{ color: 'white', lineHeight: 1.5 }}>
                        cancel
                      </i>
                    </Box>
                  </AlignBox>
                </div>
              </BackgroundBox>
              <div className={classes.sidebarContent}>
                <div className={classes.detailsSectionLeft}>
                  <Fields>
                    <FieldItem title="사건 고유 정보">0001</FieldItem>
                    <FieldItem title="사건 계약서">
                      <div style={{ marginLeft: '-5px', width: '200px' }}>
                        <Select
                          width={100}
                          style={{
                            width: 200,
                          }}
                          placeholder="필터 조건"
                          options={options}
                          onChange={() => console.log('Changed')}
                        />
                      </div>
                    </FieldItem>
                    <FieldItem title="사건 설명">
                      <div style={{ width: '190px' }}>
                        <InputBox placeholder="우편발송" name="text2" borderRadius="5px" />
                      </div>
                    </FieldItem>
                  </Fields>
                </div>
                <div className={classes.detailsSectionRight}>
                  <Fields>
                    <FieldItem title="사건 고유" />
                    <FieldItem title="사건 계약서">
                      <div className={classes.sidebarAlignDateWrapper}>
                        <DatePicker
                          selected={new Date()}
                          onChange={date => console.log('Date:', date)}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                        <Box ml={0.4} mr={0.4}>
                          <TimePicker
                            style={{ fontSize: '13px' }}
                            showSecond={false}
                            use12Hours
                            value={value}
                            inputReadOnly
                            onChange={this.handleValueChange}
                          />
                        </Box>
                        <div className={classes.difference}>~</div>
                        <Box ml={0.4} mr={0.4}>
                          <TimePicker
                            style={{ fontSize: '13px' }}
                            showSecond={false}
                            use12Hours
                            value={value}
                            inputReadOnly
                            onChange={this.handleValueChange}
                          />
                        </Box>
                      </div>
                    </FieldItem>
                  </Fields>
                </div>
              </div>
              <div className={classes.sidebarTextarea}>
                <Heading display="block" padding="0 0 10px 0">
                  Textarea
                </Heading>
                <div className="sidebarInput">
                  <InputBox placeholder="우편 발송을 처리 하세요" rows="5" borderRadius="10px" multiline />
                </div>
              </div>
              <BackgroundBox padding="5px 20px">
                <AlignBox>
                  <Heading color="white" fontSize="16px" fontWeight="400">
                    Switch
                  </Heading>
                  <Box>
                    <Heading color="white" fontSize="16px">
                      Switch
                    </Heading>
                    &nbsp;<span style={{ color: 'white' }}>:</span>&nbsp; &nbsp;
                    <CheckBox color="white" margin="0px" onChange={value => console.log(value)} />
                    <Heading color="white">나의 Task</Heading>
                  </Box>
                </AlignBox>
              </BackgroundBox>
              <div className={classes.sidebarDetailContent}>
                <Box>
                  <Fields>
                    <FieldItem title="사건 고유">
                      <Toggle checked={checkA} onChange={e => this.onChange(e)} value="checkA" />
                    </FieldItem>
                  </Fields>
                  <AlignBox style={{ width: '200px' }}>
                    <Heading>사건</Heading>
                    <div style={{ width: '100px' }}>
                      <InputBox name="text1" borderRadius="5px" />
                    </div>
                    <Heading>사건</Heading>
                  </AlignBox>
                </Box>
                <Box className={classes.sidebarSwitch__row}>
                  <div style={{ width: '100%' }}>
                    <Fields fullScreen>
                      <FieldItem title="사건 고유">
                        <Toggle padding="0 0 10px 0" checked={checkB} onChange={e => this.onChange(e)} value="checkB" />
                      </FieldItem>
                    </Fields>
                    <AlignBox style={{ width: '200px' }}>
                      <Heading>사건</Heading>
                      <div style={{ width: '100px' }}>
                        <InputBox placeholder="20000" value="20000" name="text2" borderRadius="5px" />
                      </div>
                      <Heading>사건</Heading>
                    </AlignBox>
                    <Heading padding="6px 0 0 50px" color="#9e9e9e">
                      사건사건사건사건사건사건
                    </Heading>
                  </div>
                </Box>
                <Box className={classes.sidebarVat__sectn}>
                  <AlignBox style={{ alignItems: 'flex-start' }}>
                    <Heading>VAT</Heading>
                    <div style={{ width: '70%' }}>
                      <Box>
                        <RadioButton
                          padding="0px 10px 5px"
                          label="VAT A"
                          value="a"
                          name="a"
                          onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                        />
                      </Box>
                      <Box>
                        <RadioButton
                          padding="0px 10px 5px"
                          label="VAT B"
                          value="b"
                          name="b"
                          onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                        />
                      </Box>
                      <Box>
                        <RadioButton
                          padding="0px 10px 5px"
                          label="VAT C"
                          value="c"
                          name="c"
                          onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                        />
                      </Box>
                    </div>
                  </AlignBox>
                </Box>
                <Box>
                  <Fields>
                    <FieldItem title="사건 고유">
                      <Toggle checked={checkC} onChange={e => this.onChange(e)} value="checkC" />
                    </FieldItem>
                  </Fields>
                  <AlignBox style={{ width: '200px' }}>
                    <Heading>사건</Heading>
                    <div style={{ width: '100px' }}>
                      <InputBox placeholder="우편발송" name="text2" borderRadius="5px" />
                    </div>
                    <Heading>사건</Heading>
                  </AlignBox>
                </Box>
                <Box className={classes.sidebarSwitch__row}>
                  <AlignBox style={{ width: '200px', height: '100%', alignItems: 'flex-end' }}>
                    <Box style={{ position: 'relative', bottom: '7px' }}>
                      <Heading>사건</Heading>
                    </Box>
                    <div style={{ width: '100px' }}>
                      <InputBox placeholder="우편발송" name="text2" borderRadius="5px" />
                    </div>
                    <Box style={{ position: 'relative', bottom: '7px' }}>
                      <Heading>사건</Heading>
                    </Box>
                  </AlignBox>
                </Box>
                <Box className={classes.sidebarVat__sectn}>
                  <AlignBox style={{ width: '200px', height: '100%', alignItems: 'flex-end' }}>
                    <Box style={{ position: 'relative', bottom: '7px' }}>
                      <Heading>사건</Heading>
                    </Box>
                    <div style={{ width: '100px' }}>
                      <InputBox placeholder="우편발송" name="text2" borderRadius="5px" />
                    </div>
                    <Box style={{ position: 'relative', bottom: '7px' }}>
                      <Heading>사건</Heading>
                    </Box>
                  </AlignBox>
                </Box>
                <Box />
                <Box />

                <div className={classes.sidebarVatBtn}>
                  <Box className={classes.sidebarVat__sectn}>
                    <AlignBox style={{ alignItems: 'flex-start' }}>
                      <Heading>VAT</Heading>
                      <div style={{ width: '70%' }}>
                        <Box>
                          <RadioButton
                            padding="0px 10px 5px"
                            label="VAT D"
                            value="d"
                            name="d"
                            onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                          />
                        </Box>
                        <Box>
                          <RadioButton
                            padding="0px 10px 5px"
                            label="VAT E"
                            value="e"
                            name="e"
                            onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                          />
                        </Box>
                        <Box>
                          <RadioButton
                            padding="0px 10px 5px"
                            label="VAT F"
                            value="f"
                            name="f"
                            onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                          />
                        </Box>
                      </div>
                    </AlignBox>
                  </Box>
                </div>
              </div>

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
            <div className={classes.sidebarModal}>
              <BackgroundBox borderTopLeftRadius="5px" borderTopRightRadius="5px">
                <div className={classes.smsHeading}>
                  <AlignBox>
                    <Heading padding="10px 14px" color="white" fontSize="16px" fontWeight="400">
                      SMS
                    </Heading>
                    <Box style={{ padding: '10px 14px' }}>
                      <i className="material-icons" style={{ color: 'white', lineHeight: 1.5 }}>
                        cancel
                      </i>
                    </Box>
                  </AlignBox>
                </div>
              </BackgroundBox>
              <div className={classes.sidebarModalContent}>
                <Box style={{ textAlign: 'center' }}>
                  <Heading display="block">fvghjk</Heading>
                </Box>
                <div className={classes.submitButtonContainer}>
                  <Button size="small" mode="regular" color="primary">
                    <Box pl={2} pr={2}>
                      저장
                    </Box>
                  </Button>
                  <Button size="small" mode="regular" color="inverted">
                    <Box pl={2} pr={2}>
                      저장
                    </Box>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
        <br /> ==개발 테스트== <br />
        <br />
        <br />
        <br /> ==요청사항== <br />
        [컴포넌트 그룹] 왼쪽 메뉴 (메뉴 아이콘 적용)
        <br />
        <a href="http://sian.giantsoft.co.kr/view.php?c=HUMAXIT2&v=16229" target="_blank">
          http://sian.giantsoft.co.kr/view.php?c=HUMAXIT2&v=16229
        </a>
      </div>
    );
  }
}
const styles = theme => ({
  sidebarContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '15px',
    padding: '20px',
    backgroundColor: 'white',
    [theme.breakpoints.down('1599px')]: {
      gridTemplateColumns: '1fr',
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  sidebarDetailContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '20px',
    padding: '20px',
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  sidebarContainer: {
    border: '1px solid lightgray',
    borderRadius: 5,
    width: '65%',
    margin: '20px auto',
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
      width: '66%',
    },
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  smsHeading: {
    borderBottom: '1px solid lightgray',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    textAlign: 'center',
  },
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
    clear: 'both',
    padding: '20px 0',
  },
  detailsSectionLeft: {
    width: '95%',
    height: '100%',
    position: 'relative',
    borderRight: '1px solid lightgray',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      borderRight: '0',
    },
  },
  detailsSectionRight: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {},
  },
  sidebarAlignDateWrapper: {
    display: 'grid',
    gridTemplateColumns: '2.5fr 2.5fr 0.2fr 2.5fr',
  },
  difference: {
    alignItems: 'center',
    display: 'inherit',
    // marginLeft: '5px',
  },
  sidebarTextarea: {
    backgroundColor: 'white',
    padding: '0 20px 20px',
  },
  sidebarModal: {
    width: '275px',
    position: 'absolute',
    bottom: '94px',
    right: '15px',
    border: '1px solid lightgray',
    borderRadius: 5,
  },
  sidebarModalContent: {
    width: '100%',
    padding: '20px 0 0',
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  sidebarVatBtn: {
    width: '100%',
    display: 'table',
    verticalAlign: 'middle',
    margin: '0 auto',
  },
  sidebarSwitch__row: {
    width: '70%',
    margin: '0 auto',
    display: 'table',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  sidebarVat__sectn: {
    width: '60%',
    margin: '0 auto',
    // float: 'right',
    [theme.breakpoints.down('md')]: {
      width: '50%',
      float: 'none',
      margin: 0,
    },
  },
});
export default withStyles(styles)(Test);
