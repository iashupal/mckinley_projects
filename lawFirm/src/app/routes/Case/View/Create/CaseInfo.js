import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { EditorW, BlankSpan } from 'helpers/ui';
import { RU } from 'helpers/ramda';
import CheckBox from 'components/CheckBox';
import ContentCard from 'components/ContentCard';
import Fields, { FieldItem } from 'components/Fields';
import DialogInfoForm from 'components/DialogInfoForm';
import DatePicker from 'components/DatePicker';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import Box from 'components/BoxOld';
import DragDropPopUp from 'components/FileUpload';
import Button from 'components/Button';
import Select from 'components/Select';
import ButtonN from 'components/ButtonN';
import classnames from 'classnames';
import { setReduxValues, setDetailBindCreate, setContractList, deleteFileCreate } from '../../Redux/Action';

const { parseQueryStr, mlMessage, changeURL, yearMonthDay } = RU;

class CaseInfo extends Component {
  state = {
    isOpen: false,
    contractSearchValue: '',
    // adviceBigCategory: null,
  };

  setDialogTrue = async () => {
    const { setContractList } = this.props;
    const { contractSearchValue } = this.state;
    setContractList({ searchValue: contractSearchValue });
    this.setState({
      isOpen: true,
    });
  };

  handleFileAdd = target => {
    const { setReduxValues, case_ } = this.props;
    const { files } = case_.create.caseInfo;
    const result = files.concat(target);
    setReduxValues({ _path: 'create.caseInfo', files: result });
  };

  handleFileRemove = target => {
    const { setReduxValues, case_, deleteFileCreate } = this.props;
    const { files, fileRefID } = case_.create.caseInfo;
    const result = files.filter(file => file.key !== target);
    setReduxValues({ _path: 'create.caseInfo', files: result });
    deleteFileCreate({
      key: target,
      fileRefID,
    });
  };

  handleFileDivisionAdd = (fileKey, fileDivision) => {
    const { case_, setReduxValues } = this.props;
    const { files } = case_.create.caseInfo;
    const result = files.map(file => {
      if (fileKey === file.key) {
        return { ...file, division: fileDivision };
      }
      return { ...file };
    });
    setReduxValues({ _path: 'create.caseInfo', files: result });
  };

  componentWillUnmount = () => {
    const { setReduxValues } = this.props;

    setReduxValues({
      _path: 'create.caseInfo',
      caseCategoryL1: null,
      caseCategoryL2: null,
    });
  };

  render() {
    const { classes, case_, setReduxValues, allCodes, LastName, FirstName, MyLFID, setContractList } = this.props;
    const { caseType, create, common } = case_;
    const { contractList } = common;
    const { caseInfo } = create;
    const { contractSearchValue } = this.state;

    if (Object.keys(allCodes).length !== 0 && caseInfo.caseCategoryL1 === null && caseInfo.caseCategoryL2 === null) {
      const { ADCTL1_SELECT, ADCTL2_SELECT, LTCTL1_SELECT, LTCTL2_SELECT } = allCodes;

      setReduxValues({
        _path: 'create.caseInfo',
        caseCategoryL1: caseType === 'L' ? LTCTL1_SELECT[0].key : ADCTL1_SELECT[0].key,
        caseCategoryL2:
          caseType === 'L'
            ? LTCTL2_SELECT.filter(item => item.parentFullCode === LTCTL1_SELECT[0].key)[0].key
            : ADCTL2_SELECT.filter(item => item.parentFullCode === ADCTL1_SELECT[0].key)[0].key,
      });
    }

    return (
      <>
        <ContentCard
          title={`${caseType === 'L' ? '송무' : '자문'} 기본 정보`}
          contents={[
            <div className="row">
              <div className={classnames(classes.caseDetailsContainer, 'col-xs-12 col-md-6 pl-4')}>
                <Fields>
                  <FieldItem title="고유 번호" redstar>
                    {caseInfo.managementNo !== null ? (
                      caseInfo.managementNo
                    ) : (
                      <InputBox value="" placeholder="사건 고유 번호" maxLength={20} />
                    )}
                  </FieldItem>
                  <FieldItem title={`${caseType === 'L' ? '송무' : '자문'} 제목`} redstar>
                    <InputBox
                      value={caseInfo.caseTitle}
                      placeholder={`${caseType === 'L' ? '송무' : '자문'} 제목`}
                      maxLength={255}
                      onChange={e => {
                        setReduxValues({ _path: 'create.caseInfo', caseTitle: e.target.value });
                      }}
                    />
                  </FieldItem>
                  <FieldItem title="계약서">
                    <div className="d-flex align-items-baseline">
                      <div>{caseInfo.contractTitle === null ? '[없음]' : `[${caseInfo.contractTitle}]`}</div>
                      <ButtonN
                        color="inverted"
                        label={mlMessage('pages.consultation.choiceContract')}
                        onClick={e => {
                          this.setDialogTrue();
                        }}
                      />
                    </div>
                  </FieldItem>
                  <FieldItem title="설명" redstar />
                  <FieldItem isFull>
                    <EditorW
                      value={caseInfo.backgroundInfo}
                      handleChange={value => setReduxValues({ _path: 'create.caseInfo', backgroundInfo: value })}
                      myremoveButtons="Cut,Copy,Paste,PasteText,PasteFromWord,-,Undo,Redo,Scayt,Unlink,Anchor,HorizontalRule,SpecialChar,Maximize,Source,About"
                    />
                  </FieldItem>
                </Fields>
              </div>

              <div className="col-xs-12 col-md-6 pl-4">
                <Fields>
                  <FieldItem title="상태" redstar>
                    <Select
                      selectedKey={caseInfo.caseStatus}
                      style={{ marginLeft: '-5px' }}
                      options={allCodes.CASEST_SELECT && allCodes.CASEST_SELECT}
                      onChange={(e, o) => setReduxValues({ _path: 'create.caseInfo', caseStatus: o.key })}
                    />
                  </FieldItem>

                  <FieldItem title="대분류" redstar>
                    <Select
                      selectedKey={caseInfo.caseCategoryL1}
                      style={{ marginLeft: '-5px' }}
                      options={caseType === 'L' ? allCodes.LTCTL1_SELECT : allCodes.ADCTL1_SELECT}
                      onChange={async (e, o) => {
                        await setReduxValues({
                          _path: 'create.caseInfo',
                          caseCategoryL1: o.key,
                          caseCategoryL2:
                            caseType === 'L'
                              ? allCodes.LTCTL2_SELECT.filter(item => item.parentFullCode === o.key)[0].key
                              : allCodes.ADCTL2_SELECT.filter(item => item.parentFullCode === o.key)[0].key,
                        });
                      }}
                    />
                  </FieldItem>
                  <FieldItem title="소분류" redstar>
                    <Select
                      selectedKey={caseInfo.caseCategoryL2}
                      style={{ marginLeft: '-5px' }}
                      options={
                        caseType === 'L'
                          ? allCodes.LTCTL2_SELECT &&
                            allCodes.LTCTL2_SELECT.filter(item => item.parentFullCode === caseInfo.caseCategoryL1)
                          : allCodes.ADCTL2_SELECT &&
                            allCodes.ADCTL2_SELECT.filter(item => item.parentFullCode === caseInfo.caseCategoryL1)
                      }
                      onChange={(e, o) => setReduxValues({ _path: 'create.caseInfo', caseCategoryL2: o.key })}
                    />
                  </FieldItem>

                  {caseType === 'L' && (
                    <>
                      <FieldItem title="심급" redstar>
                        <Select
                          selectedKey={caseInfo.courtLevel}
                          style={{ marginLeft: '-5px' }}
                          options={allCodes.COURTLV_SELECT && allCodes.COURTLV_SELECT}
                          onChange={(e, o) => setReduxValues({ _path: 'create.caseInfo', courtLevel: o.key })}
                        />
                      </FieldItem>
                    </>
                  )}

                  <FieldItem title="수임일" redstar>
                    <DatePicker
                      value={caseInfo.retainedDate}
                      onChange={date => {
                        setReduxValues({ _path: 'create.caseInfo', retainedDate: date });
                      }}
                    />
                  </FieldItem>
                  <FieldItem title="자문/TC">
                    <CheckBox
                      label="계약기간"
                      checked={Boolean(caseInfo.isTermContract)}
                      onChange={(event, checked) =>
                        setReduxValues({ _path: 'create.caseInfo', isTermContract: checked })
                      }
                    />
                    <CheckBox
                      label="TC계약"
                      checked={Boolean(caseInfo.isTCContract)}
                      onChange={(event, checked) => setReduxValues({ _path: 'create.caseInfo', isTCContract: checked })}
                    />
                  </FieldItem>
                  <FieldItem title="개시" redstar>
                    <DatePicker
                      value={caseInfo.startDate}
                      onChange={date => {
                        setReduxValues({ _path: 'create.caseInfo', startDate: date });
                      }}
                    />
                  </FieldItem>
                  <FieldItem title="종료">
                    <div className="d-flex flex-wrap">
                      {!caseInfo.isUnfixedEndDate && (
                        <div className="mr-2">
                          <DatePicker
                            value={caseInfo.endDate}
                            onChange={date => {
                              setReduxValues({ _path: 'create.caseInfo', endDate: date });
                            }}
                          />
                        </div>
                      )}

                      <CheckBox
                        label="종료일 미정"
                        checked={Boolean(caseInfo.isUnfixedEndDate)}
                        onChange={(event, checked) =>
                          setReduxValues({ _path: 'create.caseInfo', isUnfixedEndDate: checked })
                        }
                      />
                    </div>
                  </FieldItem>
                  {caseType === 'A' && (
                    <FieldItem title="파트너">
                      <InputBox
                        value={caseInfo.partner}
                        placeholder="파트너"
                        maxLength={100}
                        onChange={e => {
                          setReduxValues({ _path: 'create.caseInfo', partner: e.target.value });
                        }}
                      />
                    </FieldItem>
                  )}
                  <FieldItem title="관련 파일">
                    <DragDropPopUp
                      files={create.caseInfo.files || []}
                      handleFileAdd={target => this.handleFileAdd(target)}
                      handleFileRemove={target => this.handleFileRemove(target)}
                      handleFileDivisionAdd={this.handleFileDivisionAdd}
                      fileChart={allCodes.FILECAT_SELECT || []}
                      LFID={MyLFID}
                      showDownloadList
                      isHideInfluxSelectBoxAndInputBox
                      existingFileID={create.caseInfo.fileRefID}
                    />
                  </FieldItem>
                </Fields>
              </div>
            </div>,
          ]}
        />

        {/* 계약 선택 Dialog */}
        <DialogInfoForm
          title={mlMessage('pages.consultation.choiceContract')}
          open={this.state.isOpen}
          actions={
            <ButtonN
              color="inverted"
              type="large"
              onClick={() => this.setState({ isOpen: false })}
              label={mlMessage('pages.common.button.close')}
            />
          }
          fullWidth
          maxWidth="md"
        >
          <Table
            initRowsPerPage={5}
            initOrder="desc"
            initOrderBy="ContractDate"
            multiKey={['ContractUUID']}
            rows={[
              { id: 'clientName', label: '의뢰인' },
              { id: 'managerName', label: '담당자' },
              { id: 'Title', label: mlMessage('pages.contract.title'), align: 'left' },
              { id: 'ContractDate', label: mlMessage('pages.contract.contractDate') },
            ]}
            data={contractList || []}
            mngIcons={(id, rows) => (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  setReduxValues({ _path: 'create.caseInfo', contractID: rows.ContractID, contractTitle: rows.Title });
                  this.setState({ ...this.state, isOpen: false });
                }}
              >
                <Box>{mlMessage('pages.common.button.choice')}</Box>
              </Button>
            )}
            condComponents={
              <>
                <div style={{ marginLeft: '5px' }}>
                  <InputBox
                    placeholder={mlMessage('pages.contract.searchPlaceholder')}
                    iconName="Search"
                    value={contractSearchValue}
                    onChange={e => {
                      this.setState({
                        ...this.state,
                        contractSearchValue: e.target.value,
                      });
                    }}
                    handleSubmit={e => {
                      setContractList({ searchValue: contractSearchValue });
                    }}
                  />
                </div>
              </>
            }
            mngIconsWidth="80px"
          />
        </DialogInfoForm>
      </>
    );
  }
}

const styles = theme => ({
  caseDetailsContainer: {
    borderRight: '1px solid lightgray',
    '@media screen and (max-width: 767px)': {
      borderRight: '0',
    },
  },
});

const mapStateToProps = ({ auth, case_, common }) => {
  const { MyLFID } = auth.authUser;
  const { FirstName, LastName } = auth.authUser.MyLFIDInfo;
  const { allCodes } = common;
  return {
    FirstName,
    LastName,
    allCodes,
    MyLFID,
    case_,
  };
};

const mapDispatchToProps = {
  setDetailBindCreate,
  setContractList,
  setReduxValues,
  deleteFileCreate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CaseInfo));
