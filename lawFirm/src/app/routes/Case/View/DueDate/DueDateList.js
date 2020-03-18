import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import AlignBox from 'components/AlignBox';
import CheckBox from 'components/CheckBox';
import Button from 'components/Button';
import InputBox from 'components/InputBox';
import Select from 'components/Select';
import DatePicker from 'components/DatePicker';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import classnames from 'classnames';
import { setReduxValues } from '../../Redux/Action';

const { mlMessage } = RU;

class DueDateList extends Component {
  render() {
    const { classes, handleCommonAlertConfirmSet, setReduxValues } = this.props;
    return (
      <ContentCard
        withButton
        title="title"
        customHeader={
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div
              className={classnames('p-0')}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexGrow: 10,
              }}
            >
              <h2>기일 목록</h2>
              <span className="pt-1">
                <Button color="primary" onClick={() => this.toggleEditTab()}>
                  <Box>대법원 사건매치/업데이트</Box>
                </Button>
              </span>
            </div>
            <div
              className={classnames('p-0')}
              style={{
                textAlign: 'right',
                flexWrap: 'nowrap',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flexGrow: 1,
              }}
            >
              <CheckBox label="나의 기일" onChange={value => console.log(value)} />
              <Button color="inverted" onClick={() => setReduxValues({ formMode: 'create' })}>
                기일 생성
              </Button>
            </div>
          </div>
        }
        contents={[
          <div>
            <div className="paginatn-table left">
              <Table
                initOrder="asc"
                initOrderBy="date"
                condComponents={
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <AlignBox>
                      <div>
                        <Select
                          style={{ marginLeft: '-5px', width: 130 }}
                          multiSelect
                          placeholder="종류 선택"
                          options={[
                            { key: '', text: '종류 선택', itemType: DropdownMenuItemType.Header },
                            { key: 0, text: '불변' },
                            { key: 1, text: '엄수' },
                            { key: 2, text: '추정' },
                            { key: 3, text: '내부' },
                            { key: 4, text: '기타' },
                          ]}
                          onChange={(e, o) => console.log(o)}
                        />
                      </div>
                      {/* <div>
                        <DatePicker clearable />
                        <span className="font-weight-bold pl-2 pr-3">-</span>
                        <DatePicker clearable />
                      </div> */}
                      <div>
                        <InputBox placeholder="기일명/기관/담당자..." iconName="Search" />
                      </div>
                    </AlignBox>
                  </div>
                }
                rows={[
                  { id: 'date', label: '날짜' },
                  { id: 'time', label: '시간' },
                  { id: 'type', label: '종류' },
                  { id: 'name', label: '기일 명(내용)' },
                  { id: 'organization', label: '기관' },
                  { id: 'attendance', label: '출석' },
                  { id: 'owner', label: '담당자' },
                ]}
                data={[
                  {
                    id: 1,
                    date: '2019-08-01',
                    time: '14:00',
                    type: '불변',
                    name: '심문기일',
                    organization: '인천 지방 법원',
                    attendance: '김변호사, 의뢰인',
                    owner: '김변호사',
                  },
                  {
                    id: 2,
                    date: '2019-08-01',
                    time: '14:00',
                    type: '불변',
                    name: '심문기일',
                    organization: '인천 지방 법원',
                    attendance: '김변호사, 의뢰인',
                    owner: '김변호사',
                  },
                  {
                    id: 3,
                    date: '2019-08-01',
                    time: '14:00',
                    type: '불변',
                    name: '심문기일',
                    organization: '인천 지방 법원',
                    attendance: '김변호사, 의뢰인',
                    owner: '김변호사',
                  },
                  {
                    id: 4,
                    date: '2019-08-01',
                    time: '14:00',
                    type: '불변',
                    name: '심문기일',
                    organization: '인천 지방 법원',
                    attendance: '김변호사, 의뢰인',
                    owner: '김변호사',
                  },
                  {
                    id: 5,
                    date: '2019-08-01',
                    time: '14:00',
                    type: '불변',
                    name: '심문기일',
                    organization: '인천 지방 법원',
                    attendance: '김변호사, 의뢰인',
                    owner: '김변호사',
                  },
                ]}
                mngIcons={id => (
                  <React.Fragment>
                    <Button size="square" icon="attach_file" color="blue" />
                    <Button
                      size="square"
                      icon="description"
                      color="success"
                      onClick={() => setReduxValues({ formMode: 'detail' })}
                    />
                    <Button
                      size="square"
                      icon="delete"
                      color="danger"
                      onClick={() => {
                        handleCommonAlertConfirmSet({
                          msgObj: {
                            title: mlMessage('alertDialog.delete'),
                            contents: '',
                            isConfirm: true,
                          },
                          waitDatas: {
                            name: '',
                            value: {},
                          },
                        });
                      }}
                    />
                  </React.Fragment>
                )}
                mngIconsWidth="180px"
              />
            </div>
          </div>,
        ]}
      />
    );
  }
}

const mapStateToProps = ({ case_ }) => {
  const { formMode } = case_;
  return {
    formMode,
  };
};
const mapDispatchToProps = {
  setReduxValues,
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DueDateList);
