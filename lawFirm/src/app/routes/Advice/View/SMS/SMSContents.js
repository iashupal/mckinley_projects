import React, { Component } from 'react';
import { withStyles , Paper, Card } from '@material-ui/core';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import Select from 'components/Select';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import { setReduxValues } from '../../Redux/Action';

const { mlMessage, convertEditorText } = RU;

const styles = theme => ({
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
  },
});

class SMSContents extends Component {
  render(){
    const { classes, handleCommonAlertConfirmSet, setReduxValues, SMS } = this.props;
    const { formMode } = SMS;
    return(
      <React.Fragment>
        <Select
          placeholder="분류"
          options={[{key: '', text: '분류'}, {key: 0, text: '계약'}, {key: 1, text: '해지'}]}
          multiSelect
          style={{marginBottom: '16px', paddingLeft: 0, marginRight: '10px', width: '130px'}}
          onChange={(e, o)=>{console.log(o)}}
          />  
        <Paper>
          <div style={{padding: '20px'}}>
            <div>등록자 : 강변호사</div>
            <div style={{padding: '10px', paddingTop:'30px', wordBreak: 'break-all'}}>
              {formMode === 'mod' &&
              <InputBox rows="5" multiline value="안녕하세요. 법무법인 관리 시스템입니다. 다름이 아니오라 누차의 요청에도 귀하로부터 약정된 성공보수가 입금되지 않아 사무실 운영에 지장이 있습니다. 내일까지 입금 부탁 드립니다. 수고 하십시요." />
            }{formMode !== 'mod' &&
              <div dangerouslySetInnerHTML={{ __html: convertEditorText("안녕하세요. 법무법인 관리 시스템입니다. <br /> <br />다름이 아니오라 누차의 요청에도 귀하로부터 약정된 성공보수가 입금되지 않아 사무실 운영에 지장이 있습니다. <br /> <br />내일까지 입금 부탁 드립니다. <br /> <br /> 수고 하십시요.") }} />
            }
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              {formMode === 'mod' &&
              <Button 
                size="small"
                color="primary"
                onClick={()=>{setReduxValues({_path: 'SMS', formMode: ''})}}
                >
                <Box>
                저장
                </Box>
              </Button>
              }
              {formMode !== 'mod' &&
              <React.Fragment>
                <Button 
                  size="small"
                  color="primary"
              >
                  <Box>
              선택
                  </Box>
                </Button>
                <Button 
                  size="small"
                  color="primary"
                  onClick={()=>{setReduxValues({_path: 'SMS', formMode: 'mod'})}}
                >
                  <Box>
                수정
                  </Box>
                </Button>
              </React.Fragment>
              }
              <Button 
                size="small"
                color="inverted"
                onClick={()=>
                  handleCommonAlertConfirmSet({
                    msgObj: {
                      title: mlMessage('alertDialog.delete'),
                      contents: '',
                      isConfirm: true,
                    },
                    waitDatas: {
                      name: '',
                      value: {
                      },
                    },
                  })}>
                <Box>
                삭제
                </Box>
              </Button>
            </div>
          </div>
        </Paper>
        <br />
        <Paper>
          <div style={{padding: '20px'}}>
            <div>등록자 : 강변호사</div>
            <div style={{padding: '10px', paddingTop:'30px', wordBreak: 'break-all'}}>
              {formMode === 'mod' &&
              <InputBox rows="5" multiline value="안녕하세요. 법무법인 관리 시스템입니다. 다름이 아니오라 누차의 요청에도 귀하로부터 약정된 성공보수가 입금되지 않아 사무실 운영에 지장이 있습니다. 내일까지 입금 부탁 드립니다. 수고 하십시요." />
            }{formMode !== 'mod' &&
              <div dangerouslySetInnerHTML={{ __html: convertEditorText("안녕하세요. 법무법인 관리 시스템입니다. <br /> <br />다름이 아니오라 누차의 요청에도 귀하로부터 약정된 성공보수가 입금되지 않아 사무실 운영에 지장이 있습니다. <br /> <br />내일까지 입금 부탁 드립니다. <br /> <br /> 수고 하십시요.") }} />
            }
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              {formMode === 'mod' &&
              <Button 
                size="small"
                color="primary"
                onClick={()=>{setReduxValues({_path: 'SMS', formMode: ''})}}
                >
                <Box>
                저장
                </Box>
              </Button>
              }
              {formMode !== 'mod' &&
              <React.Fragment>
                <Button 
                  size="small"
                  color="primary"
              >
                  <Box>
              선택
                  </Box>
                </Button>
                <Button 
                  size="small"
                  color="primary"
                  onClick={()=>{setReduxValues({_path: 'SMS', formMode: 'mod'})}}
                >
                  <Box>
                수정
                  </Box>
                </Button>
              </React.Fragment>
              }
              <Button 
                size="small"
                color="inverted"
                onClick={()=>
                  handleCommonAlertConfirmSet({
                    msgObj: {
                      title: mlMessage('alertDialog.delete'),
                      contents: '',
                      isConfirm: true,
                    },
                    waitDatas: {
                      name: '',
                      value: {
                      },
                    },
                  })}>
                <Box>
                삭제
                </Box>
              </Button>
            </div>
          </div>
        </Paper>
        <br />
        <Paper>
          <div style={{padding: '20px'}}>
            <div>등록자 : 강변호사</div>
            <div style={{padding: '10px', paddingTop:'30px', wordBreak: 'break-all'}}>
              {formMode === 'mod' &&
              <InputBox rows="5" multiline value="안녕하세요. 법무법인 관리 시스템입니다. 다름이 아니오라 누차의 요청에도 귀하로부터 약정된 성공보수가 입금되지 않아 사무실 운영에 지장이 있습니다. 내일까지 입금 부탁 드립니다. 수고 하십시요." />
            }{formMode !== 'mod' &&
              <div dangerouslySetInnerHTML={{ __html: convertEditorText("안녕하세요. 법무법인 관리 시스템입니다. <br /> <br />다름이 아니오라 누차의 요청에도 귀하로부터 약정된 성공보수가 입금되지 않아 사무실 운영에 지장이 있습니다. <br /> <br />내일까지 입금 부탁 드립니다. <br /> <br /> 수고 하십시요.") }} />
            }
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              {formMode === 'mod' &&
              <Button 
                size="small"
                color="primary"
                onClick={()=>{setReduxValues({_path: 'SMS', formMode: ''})}}
                >
                <Box>
                저장
                </Box>
              </Button>
              }
              {formMode !== 'mod' &&
              <React.Fragment>
                <Button 
                  size="small"
                  color="primary"
              >
                  <Box>
              선택
                  </Box>
                </Button>
                <Button 
                  size="small"
                  color="primary"
                  onClick={()=>{setReduxValues({_path: 'SMS', formMode: 'mod'})}}
                >
                  <Box>
                수정
                  </Box>
                </Button>
              </React.Fragment>
              }
              <Button 
                size="small"
                color="inverted"
                onClick={()=>
                  handleCommonAlertConfirmSet({
                    msgObj: {
                      title: mlMessage('alertDialog.delete'),
                      contents: '',
                      isConfirm: true,
                    },
                    waitDatas: {
                      name: '',
                      value: {
                      },
                    },
                  })}>
                <Box>
                삭제
                </Box>
              </Button>
            </div>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({case_}) => {
const { SMS } = case_;
return{
  SMS,
}
};
const mapDispatchToProps = {
  setReduxValues,
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SMSContents));