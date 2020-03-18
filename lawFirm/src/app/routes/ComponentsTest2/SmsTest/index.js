import React, { Component } from 'react';
import { withStyles, Icon } from '@material-ui/core';
import ContentCard from 'components/ContentCard';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import Heading from 'components/Heading';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import classnames from 'classnames';
import InputBox from 'components/InputBox';
import Toggle from 'components/Toggle';
import DatePicker from 'components/DatePicker';
import BackgroundBox from 'components/BackgroundBox';
import TimePicker from 'components/TimePicker';
import moment from 'moment';
import './style.css';

class Test extends Component {
  state = {
    checkA: true,
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
    const { checkA, value } = this.state;
    const { classes } = this.props;
    return (
      <div className="app-wrapper">
        <div className={classes.smsContainer}>
          <ContentCard
            title="SMS"
            boxShadow="0 0 0 0"
            border="1px solid lightgray"
            noMargin
            contents={[
              <div className={classes.smsLeftContainer}>
                <div className={classnames('paginatn-table', 'left')}>
                  <Table
                    initOrder="desc"
                    initOrderBy="createDate"
                    hideFilter
                    hidePagination
                    boxShadow="0 0 0 0"
                    condComponents={
                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                        <AlignBox>
                          <AlignBox>
                            <Heading>Content :</Heading>
                            <div style={{ width: '70%' }}>
                              <InputBox type="text" placeholder="템플릿명" onChange={(e, text) => {}} />
                            </div>
                          </AlignBox>
                          <AlignBox className="smsUserInput">
                            <Icon className={classes.smsUserIcon}>people_alt</Icon>
                            <InputBox type="text" placeholder="템플릿명" onChange={(e, text) => {}} />
                          </AlignBox>
                        </AlignBox>
                      </div>
                    }
                    mngIconsWidth="100px"
                    mngIcons={id => (
                      <>
                        <Button size="square" icon="delete" color="danger" />
                      </>
                    )}
                    rows={[
                      {
                        id: 'templateName',
                        numeric: false,
                        disablePadding: true,
                        label: '템플릿 이름',
                        width: '30%',
                        align: 'center',
                      },
                      {
                        id: 'number',
                        numeric: false,
                        align: 'left',
                        disablePadding: true,
                        label: '수정일',
                        width: '55%',
                      },
                    ]}
                    data={[
                      {
                        id: '1',
                        templateName: '문서 1 양식',
                        number: '011-333-4444',
                      },
                      {
                        id: '2',
                        templateName: '문서 2 양식',
                        number: '010-444-5555',
                      },
                      {
                        id: '3',
                        templateName: '문서 3 양식',
                        number: '010-555-6666',
                      },
                      {
                        id: '4',
                        templateName: '문서 4 양식',
                        number: '010-666-7777',
                      },
                      {
                        id: '5',
                        templateName: '문서 5 양식',
                        number: '010-444-5555',
                      },
                      {
                        id: '6',
                        templateName: '문서 6 양식',
                        number: '010-555-6666',
                      },
                      {
                        id: '7',
                        templateName: '문서 7 양식',
                        number: '010-666-7777',
                      },
                    ]}
                  />
                </div>
                <div className={classes.divider} />
                <Box>
                  <div className={classes.smsRightContainer}>
                    <div className={classes.smsHeading}>
                      <Heading display="block" padding="14px" fontSize="14px">
                        SMS
                      </Heading>
                    </div>
                    <div className="smsMessageBox">
                      <InputBox placeholder="우편 발송을 처리 하세요" rows="15" multiline />
                    </div>
                    <BackgroundBox
                      backgroundColor="#f3f3f3"
                      padding="15px"
                      borderTop="1px solid lightgray"
                      borderBottom="1px solid lightgray"
                    >
                      <AlignBox>
                        <Heading>344/2000 Byte</Heading>
                        <Heading paddingRight="0px">Character</Heading>
                      </AlignBox>
                    </BackgroundBox>
                    <BackgroundBox backgroundColor="white" padding="15px" borderRadius="10px">
                      <AlignBox>
                        <AlignBox>
                          <Toggle checked={checkA} onChange={e => this.onChange(e)} value="checkA" />
                          <Heading padding="0 0 0 10px" margin="0 0 10px 0">
                            Switch
                          </Heading>
                        </AlignBox>
                        <AlignBox>
                          <DatePicker
                            selected={new Date()}
                            onChange={date => console.log('Date:', date)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />
                          <Box ml={1.2}>
                            <TimePicker
                              style={{ width: '95px', fontSize: '12px' }}
                              showSecond={false}
                              use12Hours
                              value={value}
                              inputReadOnly
                              onChange={this.handleValueChange}
                            />
                          </Box>
                        </AlignBox>
                      </AlignBox>
                    </BackgroundBox>
                  </div>
                  <div className={classes.submitButtonContainer}>
                    <Button size="large" mode="regular" color="primary">
                      <Box pl={5} pr={5}>
                        저장
                      </Box>
                    </Button>
                  </div>
                </Box>
              </div>,
            ]}
          />
          <ContentCard
            title="SMS"
            noMargin
            boxShadow="0 0 0 0"
            border="1px solid lightgray"
            contents={[
              <Box mt={-3.6}>
                <div className={classnames('paginatn-table')}>
                  <Table
                    initOrder="desc"
                    initOrderBy="createDate"
                    mngIconsWidth="100px"
                    hideFilter
                    hidePagination
                    boxShadow="0 0 0 0"
                    mngIcons={id => (
                      <>
                        <Button size="square" icon="border_color" color="success" />
                      </>
                    )}
                    rows={[
                      {
                        id: 'templateName',
                        numeric: false,
                        disablePadding: true,
                        label: '템플릿 이름',
                        width: '60%',
                        align: 'left',
                      },
                      { id: 'number', numeric: false, disablePadding: true, label: '수정일', width: '25%' },
                    ]}
                    data={[
                      {
                        id: '1',
                        templateName: '문서 1 양식 문서 1 양식 문서 1 양식 문서 1 양식 문서 1 양식',
                        number: '011-333-4444',
                      },
                      {
                        id: '2',
                        templateName: '문서 2 양식',
                        number: '010-444-5555',
                      },
                      {
                        id: '3',
                        templateName: '문서 3 양식',
                        number: '010-555-6666',
                      },
                      {
                        id: '4',
                        templateName: '문서 4 양식',
                        number: '010-666-7777',
                      },
                      {
                        id: '5',
                        templateName: '문서 5 양식',
                        number: '010-444-5555',
                      },
                      {
                        id: '6',
                        templateName: '문서 6 양식',
                        number: '010-555-6666',
                      },
                      // {
                      //   id: '7',
                      //   templateName: '문서 7 양식',
                      //   number: '010-666-7777',
                      // },
                    ]}
                  />
                </div>
                <Box mt={1}>
                  <InputBox placeholder="TextArea" rows="6" multiline />
                </Box>
                <div className={classes.submitButtonContainer}>
                  <Button size="large" mode="regular" color="primary">
                    <Box pl={5} pr={5}>
                      저장
                    </Box>
                  </Button>
                  <Button size="large" mode="regular" color="inverted">
                    <Box pl={5} pr={5}>
                      저장
                    </Box>
                  </Button>
                </div>
              </Box>,
            ]}
          />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  smsContainer: {
    display: 'grid',
    gridTemplateColumns: '8fr 4fr',
    gridTemplateRows: '1fr',
    gridGap: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  smsLeftContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.1fr 1fr',
    gridGap: '10px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  divider: {
    borderLeft: '1px solid lightgray',
    position: 'relative',
    left: 25,
    height: '100%',
  },
  smsRightContainer: {
    border: '1px solid lightgray',
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  smsHeading: {
    borderBottom: '1px solid lightgray',
    backgroundColor: '#f3f3f3',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    textAlign: 'center',
  },
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
    clear: 'both',
    paddingTop: 25,
  },
  smsUserIcon: {
    position: 'absolute',
    top: '8px',
    right: '15px',
    zIndex: 1,
    fontSize: '22px',
  },
  // smsUserInput: {
  //   width: '40%',
  //   position: 'relative',
  //   [theme.breakpoints.down('lg')]: {
  //     // width: '50%',
  //     marginTop: '10px',
  //   },
  // },
});
export default withStyles(styles)(Test);
