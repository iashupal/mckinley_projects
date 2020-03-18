import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { EditorW, BlankSpan } from 'helpers/ui';
import { RU } from 'helpers/ramda';
import ContentCard from 'components/ContentCard';
import Fields, { FieldItem } from 'components/Fields';
import DialogInfoForm from 'components/DialogInfoForm';
import DatePicker from 'components/DatePicker';
import Accordian from 'components/Accordian';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import GridTable, { GridRow } from 'components/GridTable';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import Select from 'components/Select';
import ButtonN from 'components/ButtonN';
import classnames from 'classnames';
import { setReduxValues, setDetailBindCreate, setContractList } from '../../Redux/Action';

const { parseQueryStr, mlMessage, changeURL, yearMonthDay } = RU;

class SupremeCourt extends Component {
  render() {
    const { classes, case_, setReduxValues } = this.props;
    const { caseType, create, common } = case_;
    const { supremeCourt } = create;

    return (
      <Accordian
        title="대법원 나의 사건"
        className=""
        contents={[
          <div className={classes.accordionFull}>
            <Box mb={2}>
              <Button color="primary">대법원 진행정보 등록</Button>
            </Box>
            <div className={classes.gridTable}>
              <GridTable>
                <GridRow title="법원(기간)">
                  <InputBox
                    value={supremeCourt.courtOrg}
                    placeholder="법원(기관)"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', courtOrg: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="사건번호" redStar>
                  <div className="d-flex">
                    <InputBox
                      value={supremeCourt.caseYear}
                      placeholder="연도"
                      maxLength={4}
                      onChange={e => {
                        setReduxValues({ _path: 'create.supremeCourt', caseYear: e.target.value });
                      }}
                    />
                    <BlankSpan num={2} />
                    <InputBox
                      value={supremeCourt.caseClass}
                      placeholder="구분"
                      maxLength={6}
                      onChange={e => {
                        setReduxValues({ _path: 'create.supremeCourt', caseClass: e.target.value });
                      }}
                    />
                    <BlankSpan num={2} />
                    <InputBox
                      value={supremeCourt.caseNumber}
                      placeholder="번호"
                      maxLength={12}
                      onChange={e => {
                        setReduxValues({ _path: 'create.supremeCourt', caseNumber: e.target.value });
                      }}
                    />
                  </div>
                </GridRow>
                <GridRow title="사건명">
                  <InputBox
                    value={supremeCourt.caseName}
                    placeholder="사건명"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', caseName: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="전화">
                  <InputBox
                    value={supremeCourt.phoneNumber}
                    placeholder="전화"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', phoneNumber: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="위치">
                  <InputBox
                    value={supremeCourt.address}
                    placeholder="위치"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', address: e.target.value });
                    }}
                  />
                </GridRow>
              </GridTable>

              <GridTable>
                <GridRow title="재판장/기타">
                  <InputBox
                    value={supremeCourt.chiefJudge}
                    placeholder="재판장/기타"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', chiefJudge: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="재판부/기타">
                  <InputBox
                    value={supremeCourt.courtPanel}
                    placeholder="재판부/기타"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', courtPanel: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="팩스">
                  <InputBox
                    value={supremeCourt.faxNumber}
                    placeholder="팩스"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', faxNumber: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="상대방명">
                  <InputBox
                    value={supremeCourt.opposingPartyName}
                    placeholder="상대방명"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', opposingPartyName: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="상대방 지위">
                  <InputBox
                    value={supremeCourt.opposingPartyStatus}
                    placeholder="상대방 지위"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', opposingPartyStatus: e.target.value });
                    }}
                  />
                </GridRow>
              </GridTable>

              <GridTable>
                <GridRow title="장소(재판정)">
                  <InputBox
                    value={supremeCourt.courtLocation}
                    placeholder="장소(재판정)"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', courtLocation: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="주심/담당">
                  <InputBox
                    value={supremeCourt.responsibleJudge}
                    placeholder="주심/담당"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', responsibleJudge: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="비고">
                  <InputBox
                    value={supremeCourt.remark}
                    placeholder="비고"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', remark: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="이메일">
                  <InputBox
                    value={supremeCourt.email}
                    placeholder="email@example.com"
                    maxLength={255}
                    onChange={e => {
                      setReduxValues({ _path: 'create.supremeCourt', email: e.target.value });
                    }}
                  />
                </GridRow>
                <GridRow title="전자 소송 여부">
                  <Select
                    style={{ marginLeft: '-5px' }}
                    selectedKey={supremeCourt.isElectronicLitigation}
                    placeholder="전자 소송 여부"
                    options={[{ key: 0, text: '미소송' }, { key: 1, text: '소송' }]}
                    onChange={(e, o) => setReduxValues({ _path: 'create.supremeCourt', isElectronicLitigation: o.key })}
                  />
                </GridRow>
              </GridTable>
            </div>
          </div>,
        ]}
      />
    );
  }
}

const styles = theme => ({
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
});

const mapStateToProps = ({ auth, case_, common }) => {
  const { MyLFID } = auth.authUser;
  const { FirstName, LastName } = auth.authUser.MyLFIDInfo;
  const { allCodes } = common;
  return {
    FirstName,
    LastName,
    allCodes,
    MyLFID,
    case_,
  };
};

const mapDispatchToProps = {
  setDetailBindCreate,
  setContractList,
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SupremeCourt));
