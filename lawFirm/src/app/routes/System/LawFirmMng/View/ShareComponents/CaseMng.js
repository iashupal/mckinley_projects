import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import ContentCard from 'components/ContentCard';
import ConfirmDialog from 'components/ConfirmDialog';
import InputBox from 'components/InputBox';
import FieldRow from 'components/FieldRow';
import Fields, { FieldItem } from 'components/Fields';
import { BlankSpan, DialogBtnBox } from 'helpers/ui';
import AlignBox from 'components/AlignBox';
import File from 'components/File';
import Select from 'components/Select';
import { RU } from 'helpers/ramda';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PostCode from 'components/PostCode';
import { caseMngFetchValues, setReduxValues, caseMnghandleSaveDraft } from '../../Redux/Action';

const { imageURL_prefix, mlMessage } = RU;

class CaseMng extends Component {
  state = {
    isOpen: false,
  };

  componentDidMount = () => {
    const { caseMngFetchValues } = this.props;
    caseMngFetchValues();
  };

  render() {
    const { classes, managementNoFormat, setReduxValues, caseMnghandleSaveDraft, lawfirmMng, MyLFID } = this.props;
    const { isOpen } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'no-wrap' }}>
        <div className={classes.initial} style={{ width: '100%' }}>
          <div>
            <ContentCard
              title="사건 관리"
              contents={[
                <div className="row">
                  <div className="col-md-10">
                    <Fields fullScreen>
                      <FieldItem title="고유 번호 형식 선택">
                        <Select
                          selectedKey={managementNoFormat}
                          style={{ width: '180px', marginTop: '-5px' }}
                          options={[
                            { key: 'D', text: '000001' },
                            { key: 'Y', text: 'YYYY-0001' },
                            { key: 'M', text: '직접입력-20자리' },
                          ]}
                          onChange={(e, o) => {
                            setReduxValues({ _path: 'CaseMng', managementNoFormat: o.key });
                          }}
                        />
                      </FieldItem>
                    </Fields>
                  </div>
                </div>,
              ]}
            />
          </div>
          <div className={classes.submitButtonContainer}>
            <ButtonN
              type="large"
              color="primary"
              onClick={e => {
                this.setState({
                  ...this.state,
                  isOpen: true,
                });
              }}
              label={mlMessage('pages.common.button.save')}
            />
            <ConfirmDialog
              title="저장 하시겠습니까?"
              isOpen={isOpen}
              handleOK={e => {
                this.setState({
                  ...this.state,
                  isOpen: false,
                });
                caseMnghandleSaveDraft({ save: lawfirmMng.CaseMng, MyLFID });
              }}
              handleNO={e => {
                this.setState({
                  ...this.state,
                  isOpen: false,
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  initial: {
    display: 'grid',
  },
  btnMargin: {
    marginRight: 5,
    display: 'inline-block',
  },
  subBtnMargin: {
    float: 'left',
    marginLeft: 10,
  },
  select: {
    width: '50%',
    display: 'inline-block',
  },
  submitButtonContainer: {
    marginTop: '10px',
    width: '100%',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ lawfirmMng, auth }) => {
  const { MyLFID } = auth.authUser;
  const { managementNoFormat } = lawfirmMng.CaseMng;
  return {
    MyLFID,
    lawfirmMng,
    managementNoFormat,
  };
};

const mapDispatchToProps = {
  caseMngFetchValues,
  setReduxValues,
  caseMnghandleSaveDraft,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CaseMng));
