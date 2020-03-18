import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import { EditorW } from 'helpers/ui';
import { RU } from 'helpers/ramda';
import DatePicker from 'components/DatePicker';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import ContentCard from 'components/ContentCard';
import Accordian from 'components/Accordian';
import FieldRow from 'components/FieldRow';
import Select from 'components/Select';
import GridTable from 'components/GridTable';
import AlignBox from 'components/AlignBox';
import Form from 'components/Form';
import InputBox from 'components/InputBox';
import RadioButton from 'components/RadioButton';
import CheckBox from 'components/CheckBox';
import ConfirmDialog from 'components/ConfirmDialog';
import Fields, { FieldItem } from 'components/Fields';
import options from 'containers/CaseScreen/dummyData';
import classnames from 'classnames';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { setReduxValues, setDetailBindCreate, checkInputDataCreate, deleteCaseCreate } from '../../Redux/Action';
import CaseInfo from './CaseInfo';
import SupremeCourt from './SupremeCourt';
import Performer from './Performer';
import Party from './Party';

const { parseQueryStr, mlMessage, changeURL } = RU;

class Create extends Component {
  state = {
    mode: '',
    caseUUID: '',
    deleteOpen: false,
  };

  componentDidMount = async () => {
    const { queryString, setReduxValues, setDetailBindCreate, MyLFID } = this.props;
    const { caseType, mode, caseUUID } = queryString;

    const formMode = mode === '1' ? 'create' : 'mod';

    this.setState({
      ...this.state,
      mode: formMode,
      caseUUID,
    });

    await setReduxValues({ caseType });
    await setDetailBindCreate({ MyLFID, formMode, caseType, caseUUID });
  };

  componentWillUnmount = () => {
    const { setReduxValues } = this.props;

    setReduxValues({
      _path: 'create.caseInfo',
      managementNo: '',
      caseTitle: '',
      contractID: null,
      contractTitle: null,
      backgroundInfo: '',
      caseStatus: 'CASEST_001',
      caseCategory: null,
      courtLevel: 'COURTLV_001',
      adviceBigCategory: null,
      adviceCategory: null,
      retainedDate: new Date(),
      isTermContract: 0,
      isTCContract: 0,
      startDate: new Date(),
      endDate: new Date(),
      isUnfixedEndDate: 1,
      partner: '',
      fileRefID: null,
      files: [],
    });

    setReduxValues({
      _path: 'create.supremeCourt',
      courtOrg: '',
      caseYear: '',
      caseClass: '',
      caseNumber: '',
      caseName: '',
      phoneNumber: '',
      address: '',
      courtPanel: '',
      chiefJudge: '',
      faxNumber: '',
      opposingPartyName: '',
      opposingPartyStatus: '',
      courtLocation: '',
      responsibleJudge: '',
      remark: '',
      email: '',
      isElectronicLitigation: 0,
    });

    setReduxValues({
      _path: 'create.performer',
      type: 'AS',
      typeDesc: '보조',
      list: [],
      searchList: null,
    });
  };

  render() {
    const { classes, case_, setReduxValues, checkInputDataCreate, queryString, deleteCaseCreate, MyLFID } = this.props;
    const { mode } = queryString;
    const { caseType, create, common } = case_;
    const { caseID } = common.selectedCase;
    const { caseInfo } = create;
    return (
      <div className="app-wrapper">
        <div className={classes.initial}>
          {/* 사건 기본 정보 */}
          <CaseInfo />

          {/* 대법원 나의 사건 */}
          {caseType === 'L' && <SupremeCourt />}

          {/* 당사자 */}
          <Party />

          {/* 수행자 */}

          <Performer />

          <Box className="form-submisn-btns">
            <Box className="left">
              <ButtonN
                type="large"
                color="primary"
                label={mlMessage('pages.common.button.save')}
                onClick={() => {
                  checkInputDataCreate({
                    save: case_.create,
                    mode: this.state.mode,
                    caseUUID: this.state.caseUUID,
                    caseType,
                  });
                }}
              />
            </Box>
            <Box className={classes.subBtnMargin}>
              <ButtonN
                color="inverted"
                type="large"
                label={mlMessage('pages.common.button.cancel')}
                onClick={() => {
                  history.back();
                }}
              />
            </Box>

            {mode !== '1' && (
              <Box className="right">
                <ButtonN
                  color="danger"
                  type="large"
                  label={`${caseType === 'L' ? '송무' : '자문'} 삭제하기`}
                  onClick={e => {
                    this.setState({
                      ...this.state,
                      deleteOpen: true,
                    });
                  }}
                />
                <ConfirmDialog
                  title="삭제하시겠습니까?"
                  isOpen={this.state.deleteOpen}
                  handleOK={async e => {
                    await this.setState({
                      ...this.state,
                      deleteOpen: false,
                    });
                    await deleteCaseCreate({ MyLFID, caseID });
                  }}
                  handleNO={e => {
                    this.setState({
                      ...this.state,
                      deleteOpen: false,
                    });
                  }}
                />
              </Box>
            )}
          </Box>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  initial: {
    display: 'grid',
  },
  accordionFull: {
    width: '100%',
    flex: 1,
  },
  gridTable: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
      paddingRight: '7px',
    },
  },
  btnMargin: {
    marginRight: 5,
    display: 'inline-block',
  },
  subBtnMargin: {
    float: 'left',
    marginLeft: 10,
  },
  accordRight: {
    width: '90%',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      width: '84%',
    },
  },
  select: {
    width: '50%',
    display: 'inline-block',
  },
  radioSelectContainer: {
    display: 'inline-block',
    float: 'left',
    width: '30%',
    marginTop: 0,
    marginLeft: 'auto',
    marginBottom: 0,
    marginRight: '15px',
    [theme.breakpoints.down('md')]: {
      width: '27%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
  radioSelectTitle: {
    position: 'relative',
    top: '10px',
    display: 'inline-block',
    verticalAlign: 'top',
  },
});

const mapStateToProps = ({ auth, case_, router }) => {
  const { MyLFID } = auth.authUser;
  const queryString = parseQueryStr(router.location.search);
  return {
    MyLFID,
    case_,
    queryString,
  };
};

const mapDispatchToProps = {
  setDetailBindCreate,
  setReduxValues,
  checkInputDataCreate,
  deleteCaseCreate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Create));
