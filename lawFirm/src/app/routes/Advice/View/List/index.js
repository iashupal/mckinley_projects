import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import ContentCard from 'components/ContentCard';
import Table from 'components/Table/EnhancedTable';
import AlignBox from 'components/AlignBox';
import Select from 'components/Select';
import { R, RU } from 'helpers/ramda';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

const { mlMessage, changeURL } = RU;

class AdviceSearch extends React.Component {
  state = {
    isEditTab: false,
  };

  // componentDidMount = () => {
  //   const { handleFetch, MyLFID } = this.props;
  //   handleFetch({ LFID: MyLFID });
  // };

  toggleEditTab = () => {
    this.setState({ isEditTab: !this.state.isEditTab });
  };

  render() {
    const { classes, search } = this.props;
    const { isEditTab } = this.state;
    return (
      <div className={classes.container}>
        <Box
          mb={1}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <PageTitle icon="class">자문</PageTitle>
        </Box>

        <div className={classes.content}>
          <ContentCard
            title=""
            customHeader={
              <AlignBox justifyContent="flex-end">
                <div style={{ marginBottom: '5px' }}>
                  <Button icon="unarchive" color="primary">
                    <Box pr={2}>{mlMessage('pages.litigation.excelUpload')}</Box>
                  </Button>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Button icon="archive" color="primary" onClick={() => {}}>
                    <Box pr={2}>{mlMessage('pages.litigation.excelExport')}</Box>
                  </Button>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Button icon="add_to_queue" color="primary" onClick={() => changeURL('/adviceCreate')}>
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
                      condComponents={
                        <AlignBox justifyContent="flex-start" style={{ height: '0px' }}>
                          <Select
                            style={{ marginLeft: '-5px', marginBottom: '5px' }}
                            placeholder="의뢰인 선택"
                            multiSelect
                            // selectedKey={search.clientID}
                            options={[
                              { key: 0, text: '의뢰인 선택', itemType: DropdownMenuItemType.Header },
                              { key: 1, text: '김말숙' },
                              { key: 2, text: '김철수' },
                            ]}
                            onChange={(e, o) => {
                              //   setReduxValues({ _path: 'list.search', clientID: o.key });
                              // handleFetchByPaging({
                              //   isActive:  e.target.value,
                              //   searchText: text,
                              //   page,
                              //   records,
                              // });
                            }}
                          />
                          <Select
                            style={{ marginRight: '5px', marginBottom: '5px' }}
                            placeholder="수임자 선택"
                            multiSelect
                            // selectedKey={search.lawyerID}
                            options={[
                              { key: 0, text: '수임자 선택', itemType: DropdownMenuItemType.Header },
                              { key: 1, text: '김말숙' },
                              { key: 2, text: '김철수' },
                            ]}
                            onChange={(e, o) => {
                              //   setReduxValues({ _path: 'list.search', lawyerID: o.key });
                            }}
                          />
                          <Select
                            style={{ marginRight: '5px', marginBottom: '5px' }}
                            placeholder="상태 선택"
                            multiSelect
                            // selectedKey={search.status}
                            options={[
                              { key: '', text: '상태 선택', itemType: DropdownMenuItemType.Header },
                              { key: 1, text: '진행중' },
                              { key: 0, text: '종결' },
                            ]}
                            onChange={(e, o) => {
                              //   setReduxValues({ _path: 'list.search', status: o.key });
                            }}
                          />
                          <div style={{ marginBottom: '5px' }}>
                            <InputBox
                              value={search.text}
                              placeholder="자문/자문번호"
                              onChange={e => {
                                // setReduxValues({ _path: 'list.search', text: e.target.value });
                              }}
                              iconName="Search"
                              handleSubmit={e => {
                                //   this.handleSubmit();
                              }}
                              width="200px"
                            />
                          </div>
                        </AlignBox>
                      }
                      rows={[
                        { id: 'title', numeric: false, disablePadding: false, label: '자문', align: 'left' },
                        { id: 'managementNo', numeric: false, disablePadding: false, label: '자문번호' },
                        { id: 'court', numeric: false, disablePadding: false, label: '계속기관' },
                        { id: 'endDate', numeric: false, disablePadding: false, label: '기일(잔여일)' },
                        { id: 'client', numeric: false, disablePadding: false, label: '의뢰인' },
                        { id: 'lawer', numeric: false, disablePadding: false, label: '수임자' },
                        { id: 'performer', numeric: false, disablePadding: false, label: '수행자' },
                        { id: 'assistant', numeric: false, disablePadding: false, label: '보조자' },
                        { id: 'status', numeric: false, disablePadding: false, label: '상태' },
                      ]}
                      customColumn={[
                        {
                          field: 'title',
                          component: ({ row }) => (
                            <a href={`/#/app/Case?LFID=${row.LFID}&caseUUID=${row.caseUUID}`}>{row.title}</a>
                          ),
                        },
                        {
                          field: 'status',
                          component: ({ row }) => (
                            <div style={{ width: '70px' }} className="badge text-white bg-green">
                              진행중
                            </div>
                          ),
                        },
                      ]}
                      data={[]}
                    />
                  </div>
                </div>
              </div>,
            ]}
          />
        </div>
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

const mapStateToProps = ({ case_, auth }) => {
  const { list } = case_;
  const { MyLFID } = auth.authUser;
  const { search } = list;
  return {
    list,
    MyLFID,
    search,
  };
};

const mapDispatchToProps = {
  //   setReduxValues,
  //   handleFetch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(AdviceSearch));
