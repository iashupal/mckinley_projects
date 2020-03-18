import React, { Component } from 'react';
import { connect } from 'react-redux';
import { R, RU } from 'helpers/ramda';
import { BlankSpan } from 'helpers/ui';
import ListDetailContainer from 'components/ListDetailContainer';
import ContentCard from 'components/ContentCard';
import ButtonN from 'components/ButtonN';
import Button from 'components/Button';
import TimePicker from 'components/TimePicker';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import AlignBox from 'components/AlignBox';
import DragDropPopUp from 'components/FileUpload';
import Select from 'components/Select';
import GridTable, { GridRow } from 'components/GridTable';
import DatePicker from 'components/DatePicker';
import AutoComplete, { AutoCompleteMultiLabel } from 'components/AutoComplete';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import {
  setReduxValues,
  setListFetchDueDate,
  checkInputDataDueDate,
  setDetailBindDueDate,
  setSelectDueDate,
  deleteDataDueDate,
  deleteFileDueDate,
} from '../../Redux/Action';

const { mlMessage, addCategoryInFileList } = RU;

class DueDate extends Component {
  componentDidMount = () => {
    const { setReduxValues, setListFetchDueDate, case_ } = this.props;
    const { LFID, caseID } = case_.common.selectedCase;

    setReduxValues({ formMode: '' });
    setListFetchDueDate({
      LFID,
      caseID,
      searchValue: '',
      searchTypeCode: [],
    });
  };

  handleFileAdd = target => {
    const { setReduxValues, case_ } = this.props;
    const { files } = case_.dueDate.save;
    const result = files.concat(target);
    setReduxValues({ _path: 'dueDate.save', files: result });
  };

  handleFileRemove = target => {
    const { setReduxValues, case_, deleteFileDueDate } = this.props;
    const { files, fileRefID } = case_.dueDate.save;
    const result = files.filter(file => file.key !== target);
    setReduxValues({ _path: 'dueDate.save', files: result });
    deleteFileDueDate({
      key: target,
      fileRefID,
    });
  };

  handleFileDivisionAdd = (fileKey, fileDivision) => {
    const { case_, setReduxValues } = this.props;
    const { files } = case_.dueDate.save;
    const result = addCategoryInFileList({ files, fileKey, fileDivision });
    setReduxValues({ _path: 'dueDate.save', files: result });
  };

  handleAutoCompleteMultiChange = name => selected => {
    const { setReduxValues } = this.props;
    setReduxValues({ _path: 'dueDate.save', [name]: selected.value });
  };

  handleAutoCompleteChange = name => selected => {
    const { setReduxValues } = this.props;
    setReduxValues({ _path: 'dueDate.save', [name]: selected });
  };

  handlePerformerAutoComplete = list => {
    return list.map(item => {
      return {
        value: `${item.attendeeID}_${item.attendeeType}`,
        label: item.label,
        attendeeID: item.attendeeID,
        attendeeType: item.attendeeType,
      };
    });
  };

  render() {
    const {
      authUser,
      case_,
      allCodes,
      autoComplete,
      FILECAT_SELECT,
      setReduxValues,
      setListFetchDueDate,
      handleCommonAlertConfirmSet,
      checkInputDataDueDate,
      setDetailBindDueDate,
      setSelectDueDate,
    } = this.props;
    const { formMode, dueDate, isLoading, common } = case_;
    const { LFID, caseID } = common.selectedCase;
    const { performerList, managerList } = common;
    const { DUEDTP } = allCodes;
    const { list, save } = dueDate;
    const { search } = list;
    const { lawFirmEmpList } = autoComplete;

    const TableComponent = (
      <ContentCard
        withButton
        customHeader={
          <AlignBox justifyContent="space-between">
            <div>
              <h2>{mlMessage('pages.case.dueDate.list')}</h2>
            </div>
            <div>
              <ButtonN color="primary" label="대법원 사건매치/업데이트" onClick={() => this.toggleEditTab()} />
              <BlankSpan num={1} />
              <ButtonN
                type="icon"
                icon="add_to_queue"
                color="primary"
                onClick={async () => {
                  await setReduxValues({ formMode: 'create' });

                  await setReduxValues({
                    _path: 'dueDate',
                    save: {
                      dueDateSeq: null,
                      dueDate: new Date(),
                      dueDateTime: '',
                      dueDateName: '',
                      dueDateRemark: '',
                      dueDateTypeCode: 'DUEDTP_01',
                      pendingOrg: '',
                      managerRefID: null,
                      dueDateAttendee: [],
                      manager: {},
                      dueDateSharer: [],
                      isLimitedShare: 0,
                      files: [],
                      fileRefID: null,
                      createDate: '',
                      updateDate: '',
                    },
                  });
                }}
                label={mlMessage('pages.case.dueDate.createButton')}
              />
            </div>
          </AlignBox>
        }
        contents={[
          <div>
            <div className="paginatn-table left">
              <Table
                tableID="owiefhwifhwioeufhasf"
                initOrder="desc"
                initOrderBy="DueDate"
                isLoading={isLoading}
                multiKey={['DueDateSeq']}
                condComponents={
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <AlignBox>
                      <div>
                        <Select
                          style={{ marginLeft: '-5px', width: 130 }}
                          multiSelect
                          placeholder={mlMessage('pages.common.typeSelect')}
                          options={R.prepend(
                            {
                              key: '0',
                              text: mlMessage('pages.case.dueDateType'),
                              itemType: DropdownMenuItemType.Header,
                            },
                            DUEDTP.map(item => ({ key: item.FullCode, text: item.CodeName })),
                          )}
                          onChange={async (e, o) => {
                            await setSelectDueDate({
                              list: 'searchTypeCode',
                              o,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <InputBox
                          placeholder={mlMessage('pages.case.dueDate.search')}
                          iconName="Search"
                          onChange={e => {
                            setReduxValues({ _path: 'dueDate.list.search', searchValue: e.target.value });
                          }}
                          handleSubmit={() => {
                            setListFetchDueDate({
                              LFID,
                              caseID,
                              searchValue: search.searchValue,
                              searchTypeCode: search.searchTypeCode,
                            });
                          }}
                        />
                      </div>
                    </AlignBox>
                  </div>
                }
                rows={[
                  { id: 'DueDate', type: 'date', label: mlMessage('pages.common.date'), width: '120px' },
                  { id: 'DueDateTypeCode', type: 'text', label: mlMessage('pages.common.type'), width: '50px' },
                  {
                    id: 'DueDateName',
                    type: 'text',
                    label: mlMessage('pages.case.dueDateName'),
                    width: '210px',
                    align: 'left',
                  },
                  { id: 'PendingOrg', type: 'text', label: mlMessage('pages.common.pendingOrg'), width: '210px' },
                  {
                    id: 'Attendee',
                    type: 'text',
                    label: mlMessage('pages.common.attendee'),
                    align: 'center',
                    width: '120px',
                  },
                  { id: 'Manager', type: 'text', label: mlMessage('pages.common.manager'), width: '120px' },
                ]}
                customColumn={[
                  {
                    field: 'DueDateName',
                    component: ({ row }) => <div style={{ wordBreak: 'break-all' }}>{row.DueDateName}</div>,
                  },
                  {
                    field: 'PendingOrg',
                    component: ({ row }) => <div style={{ wordBreak: 'break-all' }}>{row.PendingOrg}</div>,
                  },
                ]}
                data={list.list}
                mngIcons={(id, rows) => (
                  <>
                    <Button size="square" icon="access_time" color="warning" />
                    <Button
                      size="square"
                      icon="border_color"
                      color="success"
                      onClick={async () => {
                        await setReduxValues({ formMode: 'mod' });
                        await setDetailBindDueDate({ LFID, caseID, dueDateSeq: rows.DueDateSeq });
                      }}
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
                            name: 'dueDateDelete',
                            value: { LFID, caseID, dueDateSeq: rows.DueDateSeq },
                          },
                        });
                      }}
                    />
                  </>
                )}
                mngIconsWidth="130px"
              />
            </div>
          </div>,
        ]}
      />
    );

    const DetailComponent = (
      <GridTable colWidth1="30%" colWidth2="70%">
        <GridRow title={mlMessage('pages.case.dueDate')} redStar>
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <DatePicker
                value={save.dueDate}
                minDate={new Date()}
                onChange={date => {
                  setReduxValues({ _path: 'dueDate.save', dueDate: date });
                }}
              />
            </div>
            <div>
              <TimePicker
                use12Hours
                showSecond={false}
                value={save.dueDateTime}
                onChange={value => {
                  setReduxValues({ _path: 'dueDate.save', dueDateTime: value });
                }}
                format="h:mm a"
              />
            </div>
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.case.dueDateName')} redStar>
          <div>
            <InputBox
              value={save.dueDateName}
              placeholder={mlMessage('pages.case.dueDateName')}
              maxLength={1000}
              onChange={e => {
                setReduxValues({ _path: 'dueDate.save', dueDateName: e.target.value });
              }}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.case.dueDateRemark')}>
          <div>
            <InputBox
              value={save.dueDateRemark}
              placeholder={mlMessage('pages.case.dueDateRemark')}
              multiline
              onChange={e => {
                setReduxValues({ _path: 'dueDate.save', dueDateRemark: e.target.value });
              }}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.case.dueDateType')} redStar>
          <div>
            <Select
              style={{ marginLeft: '-5px' }}
              selectedKey={save.dueDateTypeCode}
              options={DUEDTP.map(item => ({ key: item.FullCode, text: item.CodeName }))}
              onChange={(e, o) =>
                setReduxValues({
                  _path: 'dueDate.save',
                  dueDateTypeCode: o.key,
                })
              }
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.common.pendingOrg')} redStar>
          <div>
            <InputBox
              value={save.pendingOrg}
              placeholder={mlMessage('pages.common.pendingOrg')}
              maxLength={255}
              onChange={e => {
                setReduxValues({ _path: 'dueDate.save', pendingOrg: e.target.value });
              }}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.common.attendee')} redStar>
          <div>
            <AutoComplete
              isMulti
              options={this.handlePerformerAutoComplete(performerList) || []}
              selectedOptions={save.dueDateAttendee}
              handleChange={this.handleAutoCompleteMultiChange('dueDateAttendee')}
              placeholder={mlMessage('pages.common.attendee')}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.common.manager')} redStar>
          <div>
            <AutoComplete
              options={managerList || []}
              selectedOption={save.manager}
              handleChange={this.handleAutoCompleteChange('manager')}
              placeholder={mlMessage('pages.common.manager')}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.common.share')} redStar>
          <div style={{ marginBottom: '5px' }}>
            <Select
              style={{ width: '25%', minWidth: '130px', marginLeft: '-5px' }}
              selectedKey={save.isLimitedShare}
              options={[
                { key: 0, text: mlMessage('pages.common.allShare') },
                { key: 1, text: mlMessage('pages.common.limitedShare') },
              ]}
              onChange={(e, o) => setReduxValues({ _path: 'dueDate.save', isLimitedShare: o.key })}
            />
          </div>
          {save.isLimitedShare === 1 && (
            <div className="form-group left">
              <AutoComplete
                isMulti
                options={lawFirmEmpList}
                selectedOptions={save.dueDateSharer}
                handleChange={this.handleAutoCompleteMultiChange('dueDateSharer')}
                placeholder={mlMessage('pages.common.share')}
              />
            </div>
          )}
        </GridRow>
        <GridRow title={mlMessage('pages.common.relatedFile')}>
          <div style={{ marginLeft: '-5px' }}>
            <DragDropPopUp
              files={save.files || []}
              handleFileAdd={target => this.handleFileAdd(target)}
              handleFileRemove={target => this.handleFileRemove(target)}
              handleFileDivisionAdd={this.handleFileDivisionAdd}
              fileChart={FILECAT_SELECT || []}
              LFID={authUser.MyLFID}
              showDownloadList
              isHideInfluxSelectBoxAndInputBox
              existingFileID={case_.dueDate.save.fileRefID}
            />
          </div>
        </GridRow>
        {formMode === 'mod' && (
          <>
            <GridRow title={mlMessage('pages.common.updateDate')}>
              <div className="p-1">{save.updateDate}</div>
            </GridRow>
            <GridRow title={mlMessage('pages.common.regDate')}>
              <div className="p-1">{save.createDate}</div>
            </GridRow>
          </>
        )}
      </GridTable>
    );

    const DetailComponentBtn = (
      <>
        <ButtonN
          type="large"
          color="primary"
          label={mlMessage('pages.common.button.save')}
          onClick={() => {
            checkInputDataDueDate({ save });
          }}
        />

        <ButtonN
          color="inverted"
          type="large"
          label={mlMessage('pages.common.button.close')}
          onClick={async () => {
            await setReduxValues({ formMode: '' });

            await setReduxValues({
              _path: 'dueDate',
              save: {
                dueDateSeq: null,
                dueDate: new Date(),
                dueDateTime: '',
                dueDateName: '',
                dueDateRemark: '',
                dueDateTypeCode: 'DUEDTP_01',
                pendingOrg: '',
                managerRefID: null,
                dueDateAttendee: [],
                manager: {},
                dueDateSharer: [],
                isLimitedShare: 0,
                files: [],
                fileRefID: null,
                createDate: '',
                updateDate: '',
              },
            });
          }}
        />
      </>
    );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={
          formMode === 'create' ? mlMessage('pages.case.dueDate.create') : mlMessage('pages.case.dueDate.mod')
        }
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={formMode !== ''}
        handleDialogClose={() => setReduxValues({ formMode: '' })}
      />
    );
  }
}
const mapStateToProps = ({ case_, common, auth }) => {
  const { authUser } = auth;
  const { FILECAT_SELECT } = common.allCodes;
  const { allCodes, autoComplete } = common;
  return {
    autoComplete,
    authUser,
    case_,
    allCodes,
    FILECAT_SELECT,
  };
};
const mapDispatchToProps = {
  setReduxValues,
  handleCommonAlertConfirmSet,
  setListFetchDueDate,
  checkInputDataDueDate,
  setDetailBindDueDate,
  setSelectDueDate,
  deleteDataDueDate,
  deleteFileDueDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DueDate);
