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

class DueDateForm extends Component {
  render() {
    const { classes, handleCommonAlertConfirmSet, setReduxValues, formMode } = this.props;
    const style = {
      color: 'rgba(0, 0, 0, 0.7)',
      fontSize: '0.875rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1',
    };
    const isDetail = formMode === 'detail';
    const isCreate = formMode === 'create';
    const cardTitle = () => {
      if (isDetail) return '기일 상세';
      if (isCreate) return '기일 등록';
      return '기일 수정';
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
        title: '기일',
        child: (
          <div>
            {!isDetail && <DatePicker value={yearMonthDay(new Date())} />}
            {isDetail && (
              <div className="p-1" style={{ ...style, wordBreak: 'break-all' }}>
                ㅇㅇ
              </div>
            )}
          </div>
        ),
      },
      {
        title: '기일 명',
        child: (
          <div>
            {!isDetail && <InputBox onChange={e => setReduxValues({ content: e.target.value })} />}
            {isDetail && (
              <div className="p-1" style={{ ...style, wordBreak: 'break-all' }}>
                ㅇㅇ
              </div>
            )}
          </div>
        ),
      },
      {
        title: '특이사항',
        child: (
          <div>
            {!isDetail && <InputBox onChange={e => setReduxValues({ content: e.target.value })} />}
            {isDetail && (
              <div className="p-1" style={{ ...style, wordBreak: 'break-all' }}>
                ㅇㅇ
              </div>
            )}
          </div>
        ),
      },
      {
        title: '기일 종류',
        child: (
          <div>
            {!isDetail && (
              <Select
                style={{ width: '25%', minWidth: '100px', marginLeft: '-5px' }}
                placeholder="불변"
                //  selectedKey={status}
                options={[
                  { key: 'open', text: '오픈' },
                  { key: 'progress', text: '진행' },
                  { key: 'finish', text: '완료' },
                ]}
                onChange={(e, o) => setReduxValues({ status: o })}
              />
            )}
            {isDetail && <div>불변</div>
            // <Button size="small" color="inverted">
            // 오픈
            // </Button>

            // <div className={`badge text-white bg-${R.filter(a => a.value === status, statusList)[0].color}`} style={{ marginLeft: "5px", height: "60%", fontSize: "13px", borderRadius: "5px" }}>
            //   {R.filter(a => a.value === status, statusList)[0].name}
            // </div>
            }
          </div>
        ),
      },
      {
        title: '기관',
        child: (
          <div>
            {!isDetail && <InputBox onChange={e => setReduxValues({ content: e.target.value })} />}
            {isDetail && (
              <div className="p-1" style={{ ...style, wordBreak: 'break-all' }}>
                ㅇㅇ
              </div>
            )}
          </div>
        ),
      },
      {
        title: '출석',
        child: (
          <Box>
            {!isDetail && (
              <div className="form-group left">
                <InputBox value="담당자" onChange={e => setReduxValues({ owner: e.target.value })} />
              </div>
            )}
            {isDetail && (
              <div className="form-group left pt-2" style={{ ...style, height: '30px' }}>
                담당자
              </div>
            )}
          </Box>
        ),
      },
      {
        title: '담당자',
        child: (
          <Box>
            {!isDetail && (
              <div className="form-group left">
                <InputBox value="담당자" onChange={e => setReduxValues({ owner: e.target.value })} />
              </div>
            )}
            {isDetail && (
              <div className="form-group left pt-2" style={{ ...style, height: '30px' }}>
                담당자
              </div>
            )}
          </Box>
        ),
      },
      {
        title: '공유',
        child: (
          <Box>
            {!isDetail && (
              <React.Fragment>
                <div style={{ marginBottom: '5px' }}>
                  <Select style={{ width: '25%', minWidth: '120px', marginLeft: '-5px' }} placeholder="전체공개" />
                </div>
                <div className="form-group left">
                  <InputBox value="담당자" onChange={e => setReduxValues({ owner: e.target.value })} />
                </div>
              </React.Fragment>
            )}
            {isDetail && (
              <React.Fragment>
                <div>전체공개</div>
                <div className="form-group left pt-2" style={{ ...style, height: '30px' }}>
                  담당자
                </div>
              </React.Fragment>
            )}
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
                {!isDetail && (
                  <React.Fragment>
                    <Button
                      size="large"
                      mode="regular"
                      color="primary"
                      onClick={() =>
                        handleCommonAlertConfirmSet({
                          msgObj: {
                            title: mlMessage('alertDialog.save'),
                            contents: '',
                            isConfirm: true,
                          },
                          waitDatas: {
                            name: '',
                            value: {},
                          },
                        })
                      }
                    >
                      <Box pl={5} pr={5}>
                        {mlMessage('pages.common.button.save')}
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
                            name: '',
                            value: {},
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
)(withStyles(styles)(DueDateForm));
