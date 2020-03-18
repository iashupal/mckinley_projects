import React from 'react';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import Tab from 'components/Tab';
import { NotificationManager } from 'react-notifications';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import BrandInfoForm from './ShareComponents/BrandInfoForm';
import InterfaceInfoForm from './ShareComponents/InterfaceInfoForm';
import RoleInfoForm from './ShareComponents/RoleInfoForm';
import DocumentTemplateInfoForm from './ShareComponents/DocumentTemplateInfoForm';
import EmailTemplateInfo from './ShareComponents/EmailTemplateInfo';
import LawFirmCodeMng from './ShareComponents/LawFirmCodeMng';
import CaseMng from './ShareComponents/CaseMng';
import { setReduxValues, handleFetchByLawFirmID, handleLawFirmUpdate } from '../Redux/Action';

const { mlMessage, checkLawFirmData } = RU;

class LawFirmMangement extends React.Component {
  state = {
    tab: 0,
  };

  componentDidMount = () => {
    this.setLawFirmInfo();
  };

  changeTab = tab => {
    this.setState({ tab });
  };

  setLawFirmInfo = () => {
    const { MyLFID, handleFetchByLawFirmID, setReduxValues } = this.props;
    setReduxValues({ _path: 'LawFirmDetail', lawFirmID: MyLFID });
    handleFetchByLawFirmID({ lawFirmID: MyLFID });
  };

  checkInputValidation = () => {
    const { LawFirmDetail } = this.props;
    const alertMsg = checkLawFirmData(LawFirmDetail);
    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), mlMessage('pages.lawFirmMng.brandMng.notification'));
      return false;
    }
    return true;
  };

  handleLawFirmInfoSave = () => {
    const { LawFirmDetail, handleCommonAlertConfirmSet } = this.props;
    if (!this.checkInputValidation()) {
      return;
    }

    handleCommonAlertConfirmSet({
      msgObj: {
        title: mlMessage('alertDialog.save'),
        contents: '',
        isConfirm: true,
      },
      waitDatas: {
        name: 'lawFirmInfoModify',
        value: { lawFirmDetail: LawFirmDetail },
      },
    });
  };

  render() {
    const { classes, LawFirmDetail, setReduxValues } = this.props;
    const { tab } = this.state;
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
          <PageTitle icon="class">
            {`[${LawFirmDetail.lawFirmBrand || ''}] ${mlMessage('pages.lawFirmMng.title')}`}
          </PageTitle>
        </Box>
        <div className={classes.content}>
          <div>
            <Box display="flex" flexDirection="row">
              <Tab
                selected={tab === 0}
                text={mlMessage('pages.lawFirmMng.tabTitle.brandMng')}
                onClick={() => this.changeTab(0)}
              />
              <Tab
                selected={tab === 1}
                text={mlMessage('pages.lawFirmMng.tabTitle.roleMng')}
                onClick={() => this.changeTab(1)}
              />
              <Tab
                selected={tab === 2}
                text={mlMessage('pages.lawFirmMng.tabTitle.docTempleteMng')}
                onClick={() => this.changeTab(2)}
              />
              <Tab
                selected={tab === 3}
                text={mlMessage('pages.lawFirmMng.tabTitle.emailTempleteMng')}
                onClick={() => this.changeTab(3)}
              />
              <Tab
                selected={tab === 4}
                text={mlMessage('pages.lawFirmMng.tabTitle.interfaceMng')}
                onClick={() => this.changeTab(4)}
              />
              <Tab selected={tab === 5} text="코드 관리" onClick={() => this.changeTab(5)} />

              <Tab selected={tab === 6} text="사건 관리" onClick={() => this.changeTab(6)} />
            </Box>
            {tab === 0 && (
              <BrandInfoForm
                LawFirmDetail={LawFirmDetail}
                handleChange={setReduxValues}
                handleSave={this.handleLawFirmInfoSave}
                setLawFirmInfo={this.setLawFirmInfo}
              />
            )}
            {tab === 1 && <RoleInfoForm />}
            {tab === 2 && <DocumentTemplateInfoForm />}
            {tab === 3 && <EmailTemplateInfo />}
            {tab === 4 && <InterfaceInfoForm />}
            {tab === 5 && <LawFirmCodeMng />}
            {tab === 6 && <CaseMng />}
          </div>
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

const mapStateToProps = ({ lawfirmMng, auth }) => {
  const { LawFirmDetail } = lawfirmMng;
  const { MyLFID } = auth.authUser;
  return {
    LawFirmDetail,
    MyLFID,
  };
};

const mapDispatchToProps = {
  setReduxValues,
  handleFetchByLawFirmID,
  handleLawFirmUpdate,
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LawFirmMangement));
