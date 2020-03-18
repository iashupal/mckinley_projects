import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import ContentCard from 'components/ContentCard';
import Button from 'components/Button';
import GridTable from 'components/GridTable';
import InputBox from 'components/InputBox';
import DatePicker from 'components/DatePicker';
import Select from 'components/Select';
import classnames from 'classnames';
import { EditorW } from 'helpers/ui';
import { RU } from 'helpers/ramda';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import { setReduxValues, checkInputData } from '../Redux/Action';

const { mlMessage, yearMonthDay } = RU;

const styles = theme => ({
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
  },
  editorStyle: {
    width: '280px',
    '@media screen and (max-width: 1900px)': {
      width: '100%',
    },
  },
});

class NoticeForm extends Component {
  render() {
    const { noticeDetail, setReduxValues, checkInputData, classes } = this.props;
    const { noticeTitle, noticeContents, noticeDate, isPopUp, popUpEndDate, isMailing } = noticeDetail;
    const GridTitle = ({ titleMessage, isNecessary }) => {
      const titleStyle = {
        fontSize: '0.875rem',
        fontWeight: 'bold',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      };
      return (
        <div style={titleStyle}>
          {mlMessage(titleMessage)}
          {isNecessary && <span className="text-danger">*</span>}
        </div>
      );
    };
    const gridContents = [
      {
        title: <GridTitle titleMessage="pages.noticeMng.noticeTitle" isNecessary />,
        child: (
          <div className="pl-2">
            <InputBox
              value={noticeTitle}
              maxLength={50}
              onChange={e => setReduxValues({ _path: 'noticeDetail', noticeTitle: e.target.value })}
            />
          </div>
        ),
      },
      {
        title: <GridTitle titleMessage="pages.noticeMng.noticeDate" isNecessary />,
        child: (
          <div className="pl-2 p-0">
            <DatePicker
              value={noticeDate}
              style
              onChange={date => setReduxValues({ _path: 'noticeDetail', noticeDate: yearMonthDay(date) })}
            />
          </div>
        ),
      },
      {
        title: <GridTitle titleMessage="pages.noticeMng.noticeIsPopUp" isNecessary />,
        child: (
          <div className="pl-2" style={{ width: '75%' }}>
            <Select
              placeholder={mlMessage('pages.common.use')}
              style={{ marginLeft: '-5px' }}
              isReadOnly
              selectedKey={isPopUp}
              options={[
                { key: 1, text: mlMessage('pages.common.use') },
                { key: 0, text: mlMessage('pages.common.unuse') },
              ]}
              onChange={(e, o) => setReduxValues({ _path: 'noticeDetail', isPopUp: o.key })}
            />
          </div>
        ),
      },
      {
        title: <GridTitle titleMessage="pages.noticeMng.noticePopUpEndDate" isNecessary />,
        child: (
          <div className="pl-2 p-0">
            <DatePicker
              value={popUpEndDate}
              style
              onChange={date => setReduxValues({ _path: 'noticeDetail', popUpEndDate: yearMonthDay(date) })}
            />
          </div>
        ),
      },
      {
        title: <GridTitle titleMessage="pages.noticeMng.isMailing" isNecessary />,
        child: (
          <div className="pl-2" style={{ width: '75%' }}>
            <Select
              placeholder={mlMessage('pages.common.use')}
              style={{ marginLeft: '-5px' }}
              isReadOnly
              selectedKey={isMailing}
              options={[
                { key: 1, text: mlMessage('pages.common.use') },
                { key: 0, text: mlMessage('pages.common.unuse') },
              ]}
              onChange={(e, o) => setReduxValues({ _path: 'noticeDetail', isMailing: o.key })}
            />
          </div>
        ),
      },
      {
        title: <GridTitle titleMessage="pages.noticeMng.noticeContents" isNecessary />,
        child: (
          <div className={classnames('pl-2')}>
            <EditorW
              value={noticeContents}
              handleChange={value => setReduxValues({ _path: 'noticeDetail', noticeContents: value })}
              myremoveButtons="Cut,Copy,Paste,PasteText,PasteFromWord,-,Undo,Redo,Scayt,Unlink,Anchor,HorizontalRule,SpecialChar,Maximize,Source,About"
            />
          </div>
        ),
      },
    ];

    const dataArray = gridContents.filter((value, index) => {
      if (index !== 3 || isPopUp) return value;
      return false;
    });

    return (
      <GridTable contents={dataArray} />
      // <div className="pt-3">
      //   <div style={{ marginBottom: '15px' }}>
      //     {/* <ContentCard
      //       title={mlMessage("pages.noticeMng.noticeCreate")}
      //       contents={[ */}
      //     <div>

      //     </div>
      //     {/* ]}
      //     /> */}
      //   </div>
      //   {/* <div style={{display:'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      //     <Button color="primary" size="large" mode="regular" onClick={()=>{checkInputData({noticeDetail})}}>
      //       <Box pl={5} pr={5}>
      //         {mlMessage("pages.common.button.save")}
      //       </Box>
      //     </Button>
      //     <Button
      //       color="inverted"
      //       size="large"
      //       mode="regular"
      //       onClick={()=>{
      //           setReduxValues({formMode:''})
      //           }
      //           }>
      //       <Box pl={5} pr={5}>
      //         {mlMessage("pages.common.button.cancel")}
      //       </Box>
      //     </Button>
      //   </div> */}
      // </div>
    );
  }
}

const mapStateToProps = ({ noticeMng }) => {
  const { formMode, noticeDetail } = noticeMng;
  return {
    formMode,
    noticeDetail,
  };
};
const mapDispatchToProps = {
  setReduxValues,
  checkInputData,
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NoticeForm));
