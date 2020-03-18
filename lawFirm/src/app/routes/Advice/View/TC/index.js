import React, { Component } from 'react';
import Box from 'components/BoxOld';
import DatePicker from 'components/DatePicker';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import Select from 'components/Select';
import GridTable from 'components/GridTable';
import InputBox from 'components/InputBox';
import ListDetailContainer from 'components/ListDetailContainer';
import classnames from 'classnames';
import Table from 'components/Table/EnhancedTable';
import { RU } from 'helpers/ramda';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import NumberFormat from 'react-number-format';
import { BlankSpan } from 'helpers/ui';
import InputBoxNumber from 'components/InputBoxNumber';
import data from './data';

const { mlMessage, yearMonthDay } = RU;

class TC extends Component {
  state = {
    isOpenDetail: false,
    nowMode: '',
  };

  render() {
    const { nowMode, isOpenDetail } = this.state;

    const TableComponent = (
      <ContentCard
        withButton
        title=""
        noMargin
        customHeader={
          <div className="customHeader-cotainer">
            <div className="customHeader-left">
              <div>
                <h2>TC 목록</h2>
              </div>
            </div>
            <div className="customHeader-right">
              <Button
                color="inverted"
                onClick={() => {
                  this.setState({ ...this.state, isOpenDetail: true, nowMode: 'create' });
                }}
              >
                TC 생성
              </Button>
            </div>
          </div>
        }
        contents={[
          <div>
            <div className={classnames('paginatn-table', 'left')}>
              <Table
                initOrder="desc"
                initOrderBy="name"
                condComponents={
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <AlignBox>
                      <DatePicker
                        // value={searchStartDate}
                        onChange={date => {
                          //   setReduxValues({ _path: 'search', searchStartDate: yearMonthDay(date) });
                          //   setListFetch({
                          //     searchIsPopUp,
                          //     searchIsMailing,
                          //     searchStartDate: yearMonthDay(date),
                          //     searchEndDate,
                          //     searchValue,
                          //   });
                        }}
                        clearable
                      />
                      <div className="font-weight-bold pl-2 pr-4">-</div>
                      <DatePicker
                        // value={searchEndDate}
                        onChange={date => {
                          //   setReduxValues({ _path: 'search', searchStartDate: yearMonthDay(date) });
                          //   setListFetch({
                          //     searchIsPopUp,
                          //     searchIsMailing,
                          //     searchStartDate: yearMonthDay(date),
                          //     searchEndDate,
                          //     searchValue,
                          //   });
                        }}
                        clearable
                      />
                    </AlignBox>
                  </div>
                }
                mngIconsWidth="100px"
                mngIcons={id => (
                  <React.Fragment>
                    <Button
                      size="square"
                      icon="description"
                      color="success"
                      onClick={() => {
                        this.setState({ ...this.state, isOpenDetail: true, nowMode: 'detail' });
                      }}
                    />
                    <Button size="square" icon="delete" color="danger" />
                  </React.Fragment>
                )}
                rows={[
                  { id: 'name', numeric: false, disablePadding: false, label: '성명' },
                  { id: 'job', numeric: false, disablePadding: false, label: '유형' },
                  { id: 'costPerHour', numeric: true, disablePadding: false, label: '단가(원/h)' },
                  { id: 'runDate', numeric: false, disablePadding: false, label: '실행일' },
                  { id: 'time', numeric: true, disablePadding: false, label: '소요시간' },
                  { id: 'cost', numeric: true, disablePadding: false, label: '금액' },
                  { id: 'creationDate', numeric: false, disablePadding: false, label: '입력일시' },
                  { id: 'remarks', numeric: false, disablePadding: false, label: '비고' },
                ]}
                data={data}
              />
            </div>
          </div>,
        ]}
      />
    );

    const DetailComponent =
      nowMode === 'create' ? (
        <GridTable
          contents={[
            {
              title: '성명',
              child: <InputBox />,
            },
            {
              title: '유형',
              child: (
                <Select
                  placeholder="유형 선택"
                  style={{ marginLeft: '-5px' }}
                  options={[
                    { key: 'status', text: '상유형태 선택', itemType: DropdownMenuItemType.Header },
                    { key: '1', text: '변호사' },
                    { key: '2', text: '스탭' },
                    { key: '3', text: '기타' },
                  ]}
                  onChange={option => console.log('상태:', option)}
                />
              ),
            },
            {
              title: '단가/h',
              child: (
                <AlignBox justifyContent="flex-start">
                  <InputBoxNumber
                    width="200px"
                    thousandSeparator
                    // value={moneyValue}
                    onValueChange={obj => console.log(obj.value)}
                    unit="원"
                  />
                </AlignBox>
              ),
            },
            {
              title: '실행일',
              child: (
                <DatePicker
                  selected={new Date()}
                  onChange={date => console.log('Date:', date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              ),
            },
            {
              title: '소요시간',
              child: (
                <InputBoxNumber
                  width="70px"
                  // value={moneyValue}
                  decimalScale={0}
                  onValueChange={obj => console.log(obj.value)}
                />
              ),
            },
            {
              title: '금액',
              child: (
                <AlignBox justifyContent="flex-start">
                  <InputBoxNumber
                    width="200px"
                    thousandSeparator
                    // value={moneyValue}
                    onValueChange={obj => console.log(obj.value)}
                    unit="원"
                  />
                </AlignBox>
              ),
            },
          ]}
        />
      ) : (
        <GridTable
          contents={[
            {
              title: '성명',
              child: <div>김철수</div>,
            },
            {
              title: '유형',
              child: <div>변호사</div>,
            },
            {
              title: '단가/h',
              child: <div>450,000</div>,
            },
            {
              title: '실행일',
              child: (
                <DatePicker
                  selected={new Date()}
                  value={yearMonthDay(new Date())}
                  onChange={date => console.log('Date:', date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  readOnly
                />
              ),
            },
            {
              title: '소요시간',
              child: <div>0.90</div>,
            },
            {
              title: '금액',
              child: <div>405,000</div>,
            },
            {
              title: '수정일',
              child: (
                <DatePicker
                  selected={new Date()}
                  value={yearMonthDay(new Date())}
                  onChange={date => console.log('Date:', date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  readOnly
                />
              ),
            },
            {
              title: '생성일',
              child: (
                <DatePicker
                  selected={new Date()}
                  value={yearMonthDay(new Date())}
                  onChange={date => console.log('Date:', date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  readOnly
                />
              ),
            },
          ]}
        />
      );

    const DetailComponentBtn =
      nowMode === 'create' ? (
        <React.Fragment>
          <Button size="large" mode="regular" color="primary">
            <Box pl={5} pr={5}>
              저장
            </Box>
          </Button>
          <Button
            color="inverted"
            size="large"
            mode="regular"
            onClick={() => this.setState({ ...this.state, isOpenDetail: false })}
          >
            <Box pl={5} pr={5}>
              닫기
            </Box>
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button
            size="large"
            mode="regular"
            color="primary"
            onClick={() => this.setState({ ...this.state, nowMode: 'create' })}
          >
            <Box pl={5} pr={5}>
              수정
            </Box>
          </Button>
          <Button
            color="inverted"
            size="large"
            mode="regular"
            onClick={() => this.setState({ ...this.state, isOpenDetail: false })}
          >
            <Box pl={5} pr={5}>
              닫기
            </Box>
          </Button>
        </React.Fragment>
      );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={nowMode === 'detail' ? 'TC 상세' : 'TC 등록'}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
      />
    );
  }
}

export default TC;
