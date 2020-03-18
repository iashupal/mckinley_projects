import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import GridTable from 'components/GridTable';
import Select from 'components/Select';
import InputBox from 'components/InputBox';
import File from 'components/File';
import { R, RU } from 'helpers/ramda';
import { statusList } from 'helpers/data';
import DatePicker from 'components/DatePicker';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import { setReduxValues } from '../../Redux/Action';

const { mlMessage, yearMonthDay } = RU;

const styles = theme => ({
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
  },
});

class MemoForm extends Component {
  render() {
    const { classes, handleCommonAlertConfirmSet, setReduxValues, formMode, memo } = this.props;
    const { memoDetail } = memo;
    const { id, content, status, owner, files, updateDate, createDate } = memoDetail;
    const style = {
      color: 'rgba(0, 0, 0, 0.7)',
      fontSize: '0.875rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1',
    };
    const isDetail = formMode === 'detail';
    const isCreate = formMode === 'create';
    const cardTitle = () => {
      if (isDetail) return '자문 메모 상세';
      if (isCreate) return '자문 메모 등록';
      return '자문 메모 수정';
    };

    const gridContents = [
      {
        title: '등록일',
        child: (
          <div>
            {!isDetail && (
              <div>
                <DatePicker value={yearMonthDay(new Date())} />
              </div>
            )}
            {isDetail && (
              <div className="p-1" style={style}>
                {yearMonthDay(new Date())}
              </div>
            )}
          </div>
        ),
      },
      {
        title: '자문 메모',
        child: (
          <div>
            {!isDetail && (
              <InputBox
                rows="5"
                multiline
                value={content}
                onChange={e => setReduxValues({ _path: 'memo.memoDetail', content: e.target.value })}
              />
            )}
            {isDetail && (
              <div className="p-1" style={{ ...style, wordBreak: 'break-all' }}>
                {content}
              </div>
            )}
          </div>
        ),
      },
      {
        title: '중요도',
        child: (
          <div>
            {!isDetail && (
              <Select
                style={{ width: '25%', minWidth: '100px', marginLeft: '-5px' }}
                placeholder="오픈"
                //  selectedKey={status}
                options={[
                  { key: 'open', text: '오픈' },
                  { key: 'progress', text: '진행' },
                  { key: 'finish', text: '완료' },
                ]}
                onChange={(e, o) => setReduxValues({ status: o })}
              />
            )}
            {isDetail && (
              // <Button size="small" color="inverted">
              // 오픈
              // </Button>
              <div
                className={`badge text-white bg-${R.filter(a => a.value === status, statusList)[0].color}`}
                style={{ marginLeft: '5px', height: '60%', fontSize: '13px', borderRadius: '5px' }}
              >
                {R.filter(a => a.value === status, statusList)[0].name}
              </div>
            )}
          </div>
        ),
      },
      {
        title: '담당자',
        child: (
          <Box>
            {!isDetail && (
              <div className="form-group left">
                <InputBox value={owner} onChange={e => setReduxValues({ owner: e.target.value })} />
              </div>
            )}
            {isDetail && (
              <div className="form-group left pt-2" style={{ ...style, height: '30px' }}>
                {owner}
              </div>
            )}
            <i className="material-icons icon-left-menu-color left">supervisor_account</i>
          </Box>
        ),
      },
      {
        title: '관련파일',
        child: (
          <AlignBox>
            {!isDetail && <File />}
            {isDetail && (
              <p className="left" style={{ ...style, marginLeft: '-12px' }}>
                <span>Task 관련 파일.pdf</span> &nbsp; | &nbsp; <span>Task 관련 파일.pdf</span>
              </p>
            )}
          </AlignBox>
        ),
      },
    ];

    const dataArray = gridContents.filter((value, index) => {
      if (index !== 0 || isDetail) return value;
    });

    return (
      <ContentCard
        noMargin
        title={cardTitle()}
        contents={[
          <div>
            <GridTable contents={dataArray} />
            <div className="task-form-para-btn">
              <div className={classes.submitButtonContainer}>
                <br />
                {!isDetail && (
                  <React.Fragment>
                    <Button
                      size="large"
                      mode="regular"
                      color="primary"
                      // onClick={() => {
                      //   checkInputData({
                      //     memoDetail,
                      //   });
                      // }}
                    >
                      <Box pl={5} pr={5}>
                        저장
                      </Box>
                    </Button>
                    <Button
                      size="large"
                      mode="regular"
                      color="inverted"
                      onClick={() => setReduxValues({ formMode: '' })}
                    >
                      <Box pl={5} pr={5}>
                        {mlMessage('pages.common.button.cancel')}
                      </Box>
                    </Button>
                  </React.Fragment>
                )}
                {isDetail && (
                  <React.Fragment>
                    <Button
                      color="primary"
                      size="large"
                      mode="regular"
                      onClick={() => {
                        setReduxValues({ formMode: 'mod' });
                      }}
                    >
                      <Box pl={5} pr={5}>
                        {mlMessage('pages.common.button.mod')}
                      </Box>
                    </Button>
                    <Button
                      color="inverted"
                      size="large"
                      mode="regular"
                      onClick={() => setReduxValues({ formMode: '' })}
                    >
                      <Box pl={5} pr={5}>
                        {mlMessage('pages.common.button.cancel')}
                      </Box>
                    </Button>
                    <Button
                      color="danger"
                      size="large"
                      mode="regular"
                      onClick={() =>
                        handleCommonAlertConfirmSet({
                          msgObj: {
                            title: mlMessage('alertDialog.delete'),
                            contents: '',
                            isConfirm: true,
                          },
                          waitDatas: {
                            name: 'memoDelete',
                            value: {
                              memoID,
                            },
                          },
                        })
                      }
                    >
                      <Box pl={5} pr={5}>
                        {mlMessage('pages.common.button.del')}
                      </Box>
                    </Button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>,
        ]}
      />
    );
  }
}

const mapStateToProps = ({ case_ }) => {
  const { formMode, memo } = case_;
  return {
    formMode,
    memo,
  };
};
const mapDispatchToProps = {
  setReduxValues,
  // checkInputData,
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MemoForm));
