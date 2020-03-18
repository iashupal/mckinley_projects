import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { NotificationManager } from 'react-notifications';
import { withStyles } from '@material-ui/core';
import PageTitle from 'components/PageTitle';
import ButtonN from 'components/ButtonN';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import Table from 'components/Table/EnhancedTable';
import Select from 'components/Select';
import DateRange from 'components/DateRange';
import InputBox from 'components/InputBox';
import Box from 'components/BoxOld';
import ListDetailContainer from 'components/ListDetailContainer';
import DetailComponent from './SharedComponents/DetailComponent';
import { setReduxValues } from '../Redux/Action';

class Invoice extends Component {
  state = {
    isOpenDetail: false,
    isOpenHistoryDialog: false,
    isOpenTCDialog: false,
    formMode: '',
    formModeTitle: '',
  };

  handleToggleDialog = dialogName => {
    this.setState({
      [dialogName]: !this.state[dialogName],
    });
  };

  render() {
    const { isOpenDetail, isOpenHistoryDialog, isOpenTCDialog, formMode, formModeTitle } = this.state;
    const { classes, invoice, autoComplete, setReduxValues } = this.props;
    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div style={{ textAlign: 'right' }}>
            <ButtonN
              type="icon"
              icon="add_to_queue"
              color="primary"
              onClick={() => {
                this.setState({
                  isOpenDetail: true,
                  formMode: 'create',
                  formModeTitle: '청구 등록',
                });
              }}
              label="신규 청구"
            />
          </div>
        }
        contents={[
          <>
            <Table
              initOrder="desc"
              initOrderBy="invoiceDate"
              rows={[
                { id: 'invoiceType', type: 'text', label: '청구종류', width: '5%' },
                { id: 'title', type: 'text', label: '청구대상', width: '12.5%', align: 'left' },
                { id: 'invoiceTitle', type: 'text', label: '청구제목', width: '12.5%', align: 'left' },
                { id: 'client', type: 'text', label: '의뢰인', width: '10%' },
                { id: 'manager', type: 'text', label: '담당자', width: '10%' },
                { id: 'invoiceItem', type: 'text', label: '청구항목', width: '5%' },
                { id: 'invoiceAmount', type: 'text', label: '금액', width: '7.5%', align: 'right' },
                { id: 'VAT', type: 'text', label: 'VAT', width: '5%', align: 'right' },
                { id: 'invoiceDate', type: 'date', label: '청구일', width: '5%' },
                { id: 'depositStatus', type: 'date', label: '입금일', width: '5%' },
                { id: 'taxCacultationStatus', type: 'date', label: '세금계산일', width: '5%' },
                { id: 'invoiceStatus', type: 'text', label: '상태', width: '5%' },
              ]}
              data={[
                {
                  id: 1,
                  invoiceType: '송무',
                  title: '송무명',
                  invoiceTitle: '사건-1차 청구서',
                  client: '의뢰인1',
                  manager: '박변호사',
                  invoiceItem: '4건',
                  invoiceAmount: '5,800,000',
                  VAT: '0',
                  invoiceDate: '',
                  depositStatus: '',
                  taxCacultationStatus: '2019.04.01',
                  invoiceStatus: '리뷰중',
                },
                {
                  id: 2,
                  invoiceType: '자문',
                  title: '자문명',
                  invoiceTitle: '1월 자문료',
                  client: '의뢰인2',
                  manager: '김변호사',
                  invoiceItem: '1건',
                  invoiceAmount: '1,000,000',
                  VAT: '100,000',
                  invoiceDate: '',
                  depositStatus: '2019.04.01',
                  taxCacultationStatus: '',
                  invoiceStatus: '입금완료',
                },
                {
                  id: 3,
                  invoiceType: '고문',
                  title: '고문 비용',
                  invoiceTitle: '고문명',
                  client: '의뢰인3',
                  manager: '이스탭',
                  invoiceItem: '1건',
                  invoiceAmount: '80,000',
                  VAT: '0',
                  invoiceDate: '',
                  depositStatus: '',
                  taxCacultationStatus: '',
                  invoiceStatus: '최종리뷰',
                },
                {
                  id: 4,
                  invoiceType: '기타',
                  title: '사건명',
                  invoiceTitle: '실비청구',
                  client: '의뢰인4',
                  manager: '박변호사',
                  invoiceItem: '1건',
                  invoiceAmount: '12,000,000',
                  VAT: '0',
                  invoiceDate: '2019.03.23',
                  depositStatus: '',
                  taxCacultationStatus: '',
                  invoiceStatus: '입금요청',
                },
              ]}
              mngIcons={id => (
                <>
                  <Button
                    size="square"
                    icon="description"
                    color="success"
                    onClick={e => {
                      this.setState({
                        isOpenDetail: true,
                        formMode: 'des',
                        formModeTitle: '청구 상세',
                      });
                    }}
                  />
                  <Button
                    size="square"
                    icon="border_color"
                    color="success"
                    onClick={() => {
                      this.setState({
                        isOpenDetail: true,
                        formMode: 'mod',
                        formModeTitle: '청구 수정',
                      });
                    }}
                  />
                  <Button size="square" icon="delete" color="danger" onClick={() => {}} />
                </>
              )}
              mngIconsWidth="15%%"
              condComponents={
                <>
                  <div>
                    <Select
                      multiSelect
                      style={{ marginLeft: '-5px', marginRight: '-5px' }}
                      placeholder="청구종류"
                      options={[{ key: 0, text: '청구종류', itemType: DropdownMenuItemType.Header }].concat([
                        { key: '1', text: '송무' },
                        { key: '2', text: '자문' },
                        { key: '3', text: '고문' },
                        { key: '4', text: '기타' },
                      ])}
                      onChange={(event, selectedOption) => {}}
                    />
                  </div>
                  <DateRange
                    label="청구일"
                    // startDate={}
                    // endDate={}
                    handleChange={obj => {}}
                    handleSubmit={(startDate, endDate) => {
                      NotificationManager.info(`청구일: ${startDate} ~ ${endDate}`);
                    }}
                  />
                  <div>
                    <InputBox
                      placeholder="청구대상/청구제목/의뢰인/담당자"
                      iconName="Search"
                      //   value={timeSheet.timeSheetSearch.searchText}
                      onChange={e => {}}
                      handleSubmit={e => {}}
                      width={300}
                    />
                  </div>
                </>
              }
              customColumn={[
                {
                  field: 'invoiceStatus',
                  component: ({ row }) => (
                    <div
                      style={{ height: '60%', fontSize: '13px', borderRadius: '5px' }}
                      className={
                        row.invoiceStatus === '입금완료' ? 'badge text-black bg-light' : 'badge text-white bg-black'
                      }
                    >
                      {row.invoiceStatus}
                    </div>
                  ),
                },
              ]}
              //   multiKey={['LawFirmID', 'TSID']}
              //   isLoading={timeSheet.isLoading}
            />
          </>,
        ]}
      />
    );

    const DetailComponentBtn = (
      <>
        {formMode !== 'des' && <ButtonN type="large" color="primary" onClick={async e => {}} label="저장" />}
        <ButtonN type="large" color="inverted" onClick={e => this.setState({ isOpenDetail: false })} label="닫기" />
      </>
    );

    return (
      <>
        <div className={classes.container}>
          <Box
            mb={1}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <PageTitle icon="class">청구</PageTitle>
          </Box>
          <ListDetailContainer
            TableComponent={TableComponent}
            DetailComponent={
              <DetailComponent
                formMode={formMode}
                isOpenHistoryDialog={isOpenHistoryDialog}
                isOpenTCDialog={isOpenTCDialog}
                invoice={invoice}
                autoComplete={autoComplete}
                setReduxValues={setReduxValues}
                handleToggleDialog={this.handleToggleDialog}
              />
            }
            DetailComponentTitle={formModeTitle}
            DetailComponentBtn={DetailComponentBtn}
            isOpenDetail={isOpenDetail}
            handleDialogClose={() => {}}
          />
        </div>
      </>
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
});

const mapStateToProps = ({ auth, timeSheet, common, invoice }) => {
  const { MyLFID } = auth.authUser;
  const { autoComplete, allCodes } = common;
  return {
    MyLFID,
    timeSheet,
    autoComplete,
    invoice,
  };
};

const mapDispatchToProps = {
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Invoice));
