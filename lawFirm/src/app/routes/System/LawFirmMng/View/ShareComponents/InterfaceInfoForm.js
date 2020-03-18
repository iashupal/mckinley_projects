import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import DatePicker from 'components/DatePicker';
import InputBox from 'components/InputBox';
import FieldRow from 'components/FieldRow';
import Fields, { FieldItem } from 'components/Fields';
import { BlankSpan } from 'helpers/ui';
import AlignBox from 'components/AlignBox';
import Toggle from 'components/Toggle';
import Select from 'components/Select';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import Table, { IconButton } from 'components/Table/EnhancedTable';
import { R, RU } from 'helpers/ramda';

const { mlMessage } = RU;

class InterfaceInfoForm extends Component {
  state = {
    checkA: true,
  };

  onChange(e) {
    this.setState({
      [e.target.value]: !e.target.checked,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'no-wrap' }}>
        <div className={classes.initial} style={{ width: '100%' }}>
          <div>
            <ContentCard
              title="이메일 연동"
              contents={[
                <div className="row">
                  <div className="col-md-10">
                    <Fields fullScreen>
                      <FieldItem title="SMTP Mail Server">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ paddingLeft: '5px' }}>
                            <InputBox name="text4" style={{ width: '19em' }} />
                          </div>
                          <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                            <Toggle checked={this.state.checkA} onChange={e => this.onChange(e)} value="checkA" />
                          </div>
                        </div>
                      </FieldItem>
                      <FieldItem title="아이디">
                        <div style={{ paddingLeft: '5px' }}>
                          <InputBox name="text5" style={{ width: '19em' }} />
                        </div>
                      </FieldItem>
                      <FieldItem title="비밀번호">
                        <div style={{ paddingLeft: '5px' }}>
                          <InputBox name="text5" type="password" style={{ width: '19em' }} />
                        </div>
                      </FieldItem>
                      <FieldItem title="연결방식">
                        <Select
                          placeholder="연결방식"
                          options={[
                            { key: '0', text: '연결방식', itemType: DropdownMenuItemType.Header },
                            { key: '1', text: 'SSL' },
                            { key: '2', text: 'TLS' },
                            { key: '3', text: 'Unsecured' },
                          ]}
                          width={150}
                          styles={{
                            dropdown: { width: 150 },
                          }}
                          onChange={option => console.log('언어:', option)}
                        />
                      </FieldItem>
                      <FieldItem title="포트번호">
                        <div style={{ paddingLeft: '5px' }}>
                          <InputBox name="text5" style={{ width: '19em' }} />
                        </div>
                      </FieldItem>
                    </Fields>
                  </div>
                </div>,
              ]}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <ContentCard
              title="외부시스템 연동"
              contents={[
                <div className="row">
                  <div className="col-md-10">
                    <Fields fullScreen>
                      <FieldItem title="ERP 시스템 연동">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <InputBox name="text4" style={{ width: '19em' }} />
                          <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                            <Toggle checked={this.state.checkA} onChange={e => this.onChange(e)} value="checkA" />
                          </div>
                        </div>
                      </FieldItem>
                      <FieldItem title="공인인증서 연동">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <InputBox name="text4" style={{ width: '19em' }} />
                          <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                            <Toggle checked={this.state.checkA} onChange={e => this.onChange(e)} value="checkA" />
                          </div>
                        </div>
                      </FieldItem>
                      <FieldItem title="회계 시스템 연동">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <InputBox name="text4" style={{ width: '19em' }} />
                          <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                            <Toggle checked={this.state.checkA} onChange={e => this.onChange(e)} value="checkA" />
                          </div>
                        </div>
                      </FieldItem>
                    </Fields>
                  </div>
                </div>,
              ]}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <ContentCard
              title="OA 연동"
              contents={[
                <div>
                  <div className="col-md-10">
                    <Fields
                      fullScreen
                      fieldArray={[
                        {
                          id: 1,
                          title: '장치 유형',
                          contents: (
                            <Select
                              placeholder="장치유형"
                              options={[
                                { key: '0', text: '장치유형', itemType: DropdownMenuItemType.Header },
                                { key: '1', text: '팩스' },
                                { key: '2', text: '프린터' },
                                { key: '3', text: '스캐너' },
                              ]}
                              width={150}
                              styles={{
                                dropdown: { width: 150 },
                              }}
                              onChange={option => console.log('언어:', option)}
                            />
                          ),
                        },
                        {
                          id: 2,
                          title: '호스트명, IP주소',
                          contents: (
                            <div style={{ paddingLeft: '5px' }}>
                              <InputBox name="text4" style={{ width: '19em' }} />
                            </div>
                          ),
                        },
                        {
                          id: 3,
                          title: '포트번호',
                          contents: (
                            <div style={{ paddingLeft: '5px' }}>
                              <InputBox name="text4" style={{ width: '19em' }} />
                            </div>
                          ),
                        },
                      ]}
                    />
                  </div>

                  <div className="col-md-12">
                    <Table
                      initOrder="desc"
                      initOrderBy="Port"
                      condComponents={<InputBox name="text5" placeholder="장치유형 검색" style={{ width: '19em' }} />}
                      rows={[
                        { id: 'DeviceType', numeric: false, disablePadding: true, label: '장치유형' },
                        { id: 'Host', numeric: false, disablePadding: true, label: '호스트이름 또는 IP주소' },
                        { id: 'Port', numeric: true, disablePadding: true, label: '포트번호' },
                        { id: 'Manage', numeric: true, disablePadding: false, label: '관리' },
                      ]}
                      data={[
                        {
                          id: '1',
                          DeviceType: '팩스',
                          Host: '127.0.0.1',
                          Port: '9987',
                          Manage: <IconButton />,
                        },
                        {
                          id: '2',
                          DeviceType: '스캐너',
                          Host: '127.0.0.2',
                          Port: '9987',
                          Manage: <IconButton />,
                        },
                        {
                          id: '3',
                          DeviceType: '프린터',
                          Host: '127.0.0.3',
                          Port: '9987',
                          Manage: <IconButton />,
                        },
                      ]}
                    />
                  </div>
                </div>,
              ]}
            />
          </div>
          <div className={classes.submitButtonContainer}>
            <Button color="primary" size="large" mode="regular">
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.save')}
              </Box>
            </Button>
            <Button className={classes.subBtnMargin} color="inverted" size="large" mode="regular">
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.reset')}
              </Box>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  initial: {
    display: 'grid',
  },
  caseDetailsContainer: {
    position: 'relative',
    width: '100%',
    borderRight: '1px solid lightgray',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0',
    },
  },
  caseDetailsRight: {
    position: 'relative',
    paddingLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      paddingLeft: 0,
    },
  },
  accordionFull: {
    width: '100%',
    flex: 1,
  },
  gridTable: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
      paddingRight: '7px',
    },
  },
  btnMargin: {
    marginRight: 5,
    display: 'inline-block',
  },
  subBtnMargin: {
    float: 'left',
    marginLeft: 10,
  },
  accordRight: {
    width: '90%',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      width: '84%',
    },
  },
  select: {
    width: '50%',
    display: 'inline-block',
  },
  radioSelectContainer: {
    display: 'inline-block',
    float: 'left',
    width: '30%',
    marginTop: 0,
    marginLeft: 'auto',
    marginBottom: 0,
    marginRight: '15px',
    [theme.breakpoints.down('md')]: {
      width: '27%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
  radioSelectTitle: {
    position: 'relative',
    top: '10px',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  execCheckbox: {
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    border: '1px solid lightgray',
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '10px 15px',
    height: '120px',
  },
  accordianCheckDiv: {
    width: '100%',
    textAlign: 'left',
  },
  submitButtonContainer: {
    marginTop: '10px',
    width: '100%',
    textAlign: 'center',
  },
});

export default withStyles(styles)(InterfaceInfoForm);
