import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PageTitle from 'components/PageTitle';
import AlignBox from 'components/AlignBox';
import ContentCard from 'components/ContentCard';
import Select from 'components/Select';
import DatePicker from 'components/DatePicker';
import Table, { IconButton } from 'components/Table/EnhancedTable';
import Button from 'components/Button';
import GridTable from 'components/GridTable';
import InputBox from 'components/InputBox';
import AlertDialog from 'components/AlertDialog';
import { DialogBtnBox, EditorW } from 'helpers/ui';

import { RU } from 'helpers/ramda';
import ListDetailContainer from 'components/ListDetailContainer';
import NoticeList from './NoticeList';
import NoticeForm from './NoticeForm';
import { setReduxValues, setListFetch, checkInputData } from '../Redux/Action';

const { mlMessage } = RU;

const styles = theme => ({
  container: {
    gridTemplateColumns: '1fr',
    padding: 30,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  taskTabContainer: {
    display: 'grid',
    gridTemplateColumns: '7fr 5fr',
    gridTemplateRows: '1fr',
    gridGap: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  detailStyle: {
    maxWidth: '600px',
    '@media screen and (max-width: 1911px)': {
      maxWidth: '100%',
    },
  },
});

class NoticeMng extends Component {
  componentDidMount = () => {
    const { setReduxValues, setListFetch, search } = this.props;
    const { searchIsPopUp, searchIsMailing, searchStartDate, searchEndDate, searchValue } = search;

    setListFetch({
      searchIsPopUp,
      searchIsMailing,
      searchStartDate,
      searchEndDate,
      searchValue,
    });

    setReduxValues({ formMode: '' });
  };

  render() {
    const { classes, formMode, setReduxValues, search, noticeMng, checkInputData, noticeDetail } = this.props;
    const { isOpenDetail } = noticeMng;
    const { searchIsPopUp, searchIsMailing } = search;

    const TableComponent = <NoticeList searchIsPopUp={searchIsPopUp} searchIsMailing={searchIsMailing} />;
    const DetailComponent = <NoticeForm />;

    const DetailComponentBtn = (
      // <div className={classes.detailStyle}>
      <>
        <Button
          color="primary"
          size="large"
          mode="regular"
          onClick={() => {
            checkInputData({ noticeDetail });
          }}
        >
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.save')}
          </Box>
        </Button>

        <Button color="inverted" size="large" mode="regular" onClick={() => setReduxValues({ isOpenDetail: false })}>
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.cancel')}
          </Box>
        </Button>
      </>
      // </div>
    );

    return (
      <div>
        <div className={classes.container}>
          <PageTitle icon="class">{mlMessage('pages.noticeMng')}</PageTitle>
          {/* {formMode ===''&&
            <NoticeList searchIsPopUp={searchIsPopUp} searchIsMailing={searchIsMailing} />
          }
            {formMode !==''&&
            <NoticeForm />
          } */}

          <ListDetailContainer
            TableComponent={TableComponent}
            DetailComponent={DetailComponent}
            DetailComponentTitle={formMode === 'create' ? '공지 등록' : '공지 수정'}
            DetailComponentBtn={DetailComponentBtn}
            isOpenDetail={isOpenDetail}
            handleDialogClose={() => setReduxValues({ isOpenDetail: false })}
            flexBasis="30%"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ noticeMng }) => {
  const { formMode, search, noticeDetail } = noticeMng;
  return {
    noticeMng,
    formMode,
    search,
    noticeDetail,
  };
};
const mapDispatchToProps = {
  setReduxValues,
  setListFetch,
  checkInputData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NoticeMng));
