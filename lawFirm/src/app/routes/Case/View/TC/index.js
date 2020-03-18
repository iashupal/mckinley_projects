import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import ListDetailContainer from 'components/ListDetailContainer';
import Table from 'components/Table/EnhancedTable';
import { RU } from 'helpers/ramda';
import DateRange from 'components/DateRange';
import ConfirmDialog from 'components/ConfirmDialog';
import { NotificationManager } from 'react-notifications';
import DetailComponent from './SharedComponents/DetailComponent';
import {
  setReduxValues,
  handleTCListFetch,
  handleTCDetailBindFetch,
  handleTCModify,
  handleTCDelete,
} from '../../Redux/Action';

const { mlMessage, checkTCData, handleTextOverFlow } = RU;

const makeGeneralConfirm = title => ({ ...props }) => {
  return <ConfirmDialog {...props} title={title} />;
};
const ConfirmModify = makeGeneralConfirm(mlMessage('alertDialog.save'));
const ConfirmDelete = makeGeneralConfirm(mlMessage('alertDialog.delete'));

class TC extends Component {
  state = {
    isOpenDetail: false,
    isOpenModifyConfirm: false,
    isOpenDeleteConfirm: false,
    formMode: '',
    formModeTitle: '',
    deleteID: '',
  };

  handleListFetch = (LawFirmID, startDate, endDate) => {
    this.props.handleTCListFetch({
      LawFirmID,
      caseID: this.props.caseID,
      startDate,
      endDate,
    });
  };

  handleDetailBind = id => {
    const arr = id.split('_');
    const LawFirmID = arr[0];
    const TSID = arr[1];
    this.props.handleTCDetailBindFetch({ LawFirmID, TSID });
  };

  handleModify = () => {
    const { LFID, TSID, timeCharge, remark } = this.props.TC.TCDetail;
    this.props.handleTCModify({ LawFirmID: LFID, TSID, caseID: this.props.caseID, timeCharge, remark });

    this.setState({
      isOpenDetail: true,
      formMode: 'detail',
      formModeTitle: mlMessage('pages.case.TC.detail'),
    });
  };

  handleDelete = id => {
    const arr = id.split('_');
    const LawFirmID = arr[0];
    const TSID = arr[1];
    this.props.handleTCDelete({ LawFirmID, caseID: this.props.caseID, TSID });
  };

  checkValidation = () => {
    const { TCDetail } = this.props.TC;
    const alertMsg = checkTCData({ TCDetail });
    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), '아래 값들을 확인해 주시기 바랍니다.');
      return false;
    }
    return true;
  };

  render() {
    const { formMode, isOpenDetail, isOpenModifyConfirm, isOpenDeleteConfirm, formModeTitle, deleteID } = this.state;
    const { MyLFID, TC, setReduxValues } = this.props;
    const { TCList, TCDetail, TCSearch } = TC;
    const TableComponent = (
      <ContentCard
        withButton
        title=""
        noMargin
        customHeader={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{mlMessage('pages.case.TC.list')}</h2>
          </div>
        }
        contents={[
          <>
            <ConfirmDelete
              message=""
              isOpen={isOpenDeleteConfirm}
              handleOK={e => {
                this.handleDelete(deleteID);
                this.setState({ isOpenDeleteConfirm: false, deleteID: '' });
              }}
              handleNO={e => {
                this.setState({ isOpenDeleteConfirm: false, deleteID: '' });
              }}
            />
            <Table
              initOrder="desc"
              initOrderBy="RunDate"
              condComponents={
                <DateRange
                  label={mlMessage('pages.timeSheet.runDate')}
                  startDate={TCSearch.startDate}
                  endDate={TCSearch.endDate}
                  handleChange={obj => {
                    const { startDate, endDate } = obj;
                    if (startDate) setReduxValues({ _path: 'TC.TCSearch', startDate });
                    if (endDate) setReduxValues({ _path: 'TC.TCSearch', endDate });
                  }}
                  handleSubmit={(startDate, endDate) => {
                    this.handleListFetch(MyLFID, startDate, endDate);
                    NotificationManager.info(`${mlMessage('pages.timeSheet.runDate')}: ${startDate} ~ ${endDate}`);
                  }}
                />
              }
              mngIconsWidth="15%"
              mngIcons={id => (
                <>
                  <Button
                    size="square"
                    icon="description"
                    color="success"
                    onClick={e => {
                      this.setState({
                        isOpenDetail: true,
                        formMode: 'detail',
                        formModeTitle: mlMessage('pages.case.TC.detail'),
                      });
                      this.handleDetailBind(id);
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
                        formModeTitle: mlMessage('pages.case.TC.modify'),
                      });
                      this.handleDetailBind(id);
                    }}
                  />
                  <Button
                    size="square"
                    icon="delete"
                    color="danger"
                    onClick={() => this.setState({ isOpenDeleteConfirm: true, deleteID: id })}
                  />
                </>
              )}
              rows={[
                { id: 'ManagerName', type: 'text', label: mlMessage('pages.case.TC.performerName'), width: '10%' },
                { id: 'EmpType', type: 'text', label: mlMessage('pages.case.TC.employeeType'), width: '10%' },
                {
                  id: 'TimeCharge',
                  type: 'number',
                  label: mlMessage('pages.case.TC.unitPrice'),
                  width: '10%',
                  align: 'right',
                },
                {
                  id: 'FormattedBillableTime',
                  type: 'text',
                  label: mlMessage('pages.case.TC.runningTime'),
                  width: '10%',
                },
                {
                  id: 'BillingAmount',
                  type: 'number',
                  label: mlMessage('pages.case.TC.amount'),
                  width: '10%',
                  align: 'right',
                },
                {
                  id: 'Remark',
                  type: 'text',
                  label: mlMessage('pages.timeSheet.remark'),
                  width: '20%',
                  align: 'left',
                  noSort: true,
                  noFilter: true,
                },
                { id: 'RunDate', type: 'date', label: mlMessage('pages.timeSheet.runDate'), width: '10%' },
                { id: 'CreateDate', type: 'date', label: mlMessage('pages.case.TC.inputDate'), width: '10%' },
              ]}
              data={TCList || []}
              multiKey={['LawFirmID', 'TSID']}
              isLoading={TC.isLoading}
              customColumn={[
                {
                  field: 'Remark',
                  component: ({ row }) => handleTextOverFlow({ str: row.Remark, width: 250 }),
                },
              ]}
            />
          </>,
        ]}
      />
    );

    const DetailComponentBtn =
      formMode === 'mod' ? (
        <>
          <Button
            size="large"
            mode="regular"
            color="primary"
            onClick={() => {
              if (!this.checkValidation()) return;
              this.setState({ isOpenModifyConfirm: true });
            }}
          >
            <Box pl={5} pr={5}>
              {mlMessage('pages.common.button.save')}
            </Box>
          </Button>
          <Button color="inverted" size="large" mode="regular" onClick={() => this.setState({ isOpenDetail: false })}>
            <Box pl={5} pr={5}>
              {mlMessage('pages.common.button.close')}
            </Box>
          </Button>
          <ConfirmModify
            message=""
            isOpen={isOpenModifyConfirm}
            handleOK={e => {
              this.setState({ isOpenModifyConfirm: false });
              this.handleModify();
            }}
            handleNO={e => {
              this.setState({ isOpenModifyConfirm: false });
            }}
          />
        </>
      ) : (
        <>
          <Button color="inverted" size="large" mode="regular" onClick={() => this.setState({ isOpenDetail: false })}>
            <Box pl={5} pr={5}>
              {mlMessage('pages.common.button.close')}
            </Box>
          </Button>
        </>
      );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={<DetailComponent formMode={formMode} setReduxValues={setReduxValues} TCDetail={TCDetail} />}
        DetailComponentTitle={formModeTitle}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ isOpenDetail: false })}
      />
    );
  }
}

const mapStateToProps = ({ auth, case_ }) => {
  const { MyLFID } = auth.authUser;
  const { caseID } = case_.common.selectedCase;
  const { TC } = case_;
  return {
    MyLFID,
    caseID,
    TC,
  };
};

const mapDispatchToProps = {
  setReduxValues,
  handleTCListFetch,
  handleTCDetailBindFetch,
  handleTCModify,
  handleTCDelete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TC);
