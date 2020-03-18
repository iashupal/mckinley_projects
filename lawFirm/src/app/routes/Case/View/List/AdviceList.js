import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import ContentCard from 'components/ContentCard';
import Table from 'components/Table/EnhancedTable';
import AlignBox from 'components/AlignBox';
import Select from 'components/Select';
import InputBox from 'components/InputBox';
import { R, RU } from 'helpers/ramda';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { setReduxValues, handleFetch, setDetailBindList, setSelectList } from '../../Redux/Action';

const { parseQueryStr, mlMessage, changeURL } = RU;

class AdviceList extends React.Component {
  state = {};

  render() {
    const { classes, search, setReduxValues, setSelectList, handleFetch, list, case_, MyLFID, allCodes } = this.props;
    const { caseType, isLoading } = case_;
    const { searchValue } = case_.list.search;
    return (
      <div className={classes.content}>
        <ContentCard
          title=""
          customHeader={
            <AlignBox justifyContent="flex-end">
              <div style={{ marginBottom: '5px' }}>
                <Button
                  icon="unarchive"
                  color="primary"
                  onClick={() => {
                    location.href = `/#/app/CaseExcelUpload/${1}`;
                  }}
                >
                  <Box pr={2}>{mlMessage('pages.litigation.excelUpload')}</Box>
                </Button>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <Button icon="archive" color="primary" onClick={() => {}}>
                  <Box pr={2}>{mlMessage('pages.litigation.excelExport')}</Box>
                </Button>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <Button
                  icon="add_to_queue"
                  color="primary"
                  onClick={() => changeURL(`/Case/save?caseType=${caseType}&mode=1`)}
                >
                  <Box pr={2}>신규 자문</Box>
                </Button>
              </div>
            </AlignBox>
          }
          contents={[
            <div className="row">
              <div className="col-md-12">
                <div className="paginatn-table left">
                  <Table
                    isLoading={isLoading}
                    initOrder="desc"
                    initOrderBy="dueDate"
                    tableID="woijefwiefjwoeifjwoeifj"
                    condComponents={
                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Select
                          style={{ marginLeft: '-5px', marginBottom: '5px', width: '220px' }}
                          placeholder="의뢰인 선택"
                          multiSelect
                          options={R.prepend(
                            { key: 0, text: '의뢰인 선택', itemType: DropdownMenuItemType.Header },
                            list.clientList &&
                              list.clientList.map(list => ({
                                key: list.PartyDesc,
                                text: list.PartyDesc,
                              })),
                          )}
                          onChange={async (e, o) => {
                            await setSelectList({
                              list: 'searchClient',
                              o,
                            });

                            await handleFetch({
                              LFID: MyLFID,
                              caseType,
                              searchValue,
                              statusCode: this.props.statusCode,
                              searchRL: this.props.searchRL,
                              searchClient: this.props.searchClient,
                            });
                          }}
                        />
                        <Select
                          style={{ marginBottom: '5px', width: '220px' }}
                          placeholder="수임자 선택"
                          multiSelect
                          options={R.prepend(
                            { key: 0, text: '수임자 선택', itemType: DropdownMenuItemType.Header },
                            list.RL_List &&
                              list.RL_List.map(list => ({
                                key: list.UserID,
                                text: list.Name,
                              })),
                          )}
                          onChange={async (e, o) => {
                            await setSelectList({
                              list: 'searchRL',
                              o,
                            });

                            await handleFetch({
                              LFID: MyLFID,
                              caseType,
                              searchValue,
                              statusCode: this.props.statusCode,
                              searchRL: this.props.searchRL,
                              searchClient: this.props.searchClient,
                            });
                          }}
                        />
                        <Select
                          style={{ marginBottom: '5px', marginRight: '5px' }}
                          placeholder="상태 선택"
                          multiSelect
                          options={R.prepend(
                            { key: '', text: '상태 선택', itemType: DropdownMenuItemType.Header },
                            allCodes.CASEST &&
                              allCodes.CASEST.map(list => ({
                                key: list.FullCode,
                                text: list.CodeName,
                              })),
                          )}
                          onChange={async (e, o) => {
                            await setSelectList({
                              list: 'statusCode',
                              o,
                            });

                            await handleFetch({
                              LFID: MyLFID,
                              caseType,
                              searchValue,
                              statusCode: this.props.statusCode,
                              searchRL: this.props.searchRL,
                              searchClient: this.props.searchClient,
                            });
                          }}
                        />
                        <div style={{ marginBottom: '5px' }}>
                          <InputBox
                            value={search.searchValue}
                            placeholder="자문/자문번호/분류"
                            onChange={e => {
                              setReduxValues({ _path: 'list.search', searchValue: e.target.value });
                            }}
                            iconName="Search"
                            handleSubmit={e => {
                              handleFetch({ LFID: MyLFID, caseType, searchValue });
                            }}
                          />
                        </div>
                      </div>
                    }
                    rows={[
                      {
                        id: 'title',
                        type: 'text',
                        numeric: false,
                        disablePadding: false,
                        label: '자문',
                        width: '23%',
                        align: 'left',
                      },
                      {
                        id: 'managementNo',
                        type: 'text',
                        numeric: false,
                        disablePadding: false,
                        label: `자문 번호`,
                        width: '7%',
                      },
                      {
                        id: 'caseCategory',
                        type: 'text',
                        numeric: false,
                        disablePadding: false,
                        label: `분류`,
                        width: '10%',
                      },
                      {
                        id: 'client',
                        type: 'text',
                        numeric: false,
                        disablePadding: false,
                        label: '의뢰인',
                        width: '10%',
                      },

                      {
                        id: 'lawer',
                        type: 'text',
                        numeric: true,
                        disablePadding: false,
                        label: '수임자',
                        width: '10%',
                      },
                      {
                        id: 'mainPerformer',
                        type: 'text',
                        numeric: true,
                        disablePadding: false,
                        label: '책임 수행자',
                        width: '10%',
                      },
                      {
                        id: 'performer',
                        type: 'text',
                        numeric: true,
                        disablePadding: false,
                        label: '수행자',
                        width: '10%',
                      },
                      {
                        id: 'dueDate',
                        type: 'text',
                        numeric: false,
                        disablePadding: false,
                        label: '기일(잔여일)',
                        width: '10%',
                      },
                      {
                        id: 'retainedDate',
                        type: 'date',
                        numeric: true,
                        disablePadding: false,
                        label: '수임일',
                        width: '10%',
                      },
                      { id: 'status', type: 'text', numeric: false, disablePadding: false, label: '상태' },
                    ]}
                    showPriority={['title', 'bigCate', 'smallCate']}
                    customColumn={[
                      {
                        field: 'title',
                        component: ({ row }) => (
                          <div
                            role="button"
                            tabIndex="0"
                            style={{ cursor: 'pointer', color: '#3F51B5', outline: 'none' }}
                            onClick={async e => {
                              changeURL(`/Case?LFID=${row.LFID}&caseType=${caseType}&caseUUID=${row.caseUUID}`);
                            }}
                          >
                            {row.title}
                          </div>
                        ),
                      },
                      {
                        field: 'status',
                        component: ({ row }) => (
                          <div
                            style={{ height: '60%', fontSize: '13px', borderRadius: '5px' }}
                            className={
                              row.caseStatus === '진행중' ? 'badge text-black bg-light' : 'badge text-white bg-black'
                            }
                          >
                            {row.caseStatus}
                          </div>
                        ),
                      },
                    ]}
                    data={list.caseList || []}
                  />
                </div>
              </div>
            </div>,
          ]}
        />
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
});

const mapStateToProps = ({ case_, auth, router, common }) => {
  const { list } = case_;
  const { MyLFID } = auth.authUser;
  const { search } = list;
  const { allCodes } = common;
  const queryString = parseQueryStr(router.location.search);
  return {
    allCodes,
    case_,
    queryString,
    list,
    MyLFID,
    search,
  };
};

const mapDispatchToProps = {
  setReduxValues,
  handleFetch,
  setDetailBindList,
  setSelectList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(AdviceList));
