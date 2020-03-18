import React, { Component, Fragment } from 'react';
import ContentCard from 'components/ContentCard';
import ButtonN from 'components/ButtonN';
import Box from 'components/BoxOld';
import { RU } from 'helpers/ramda';
import Button from 'components/Button';
import DateRange from 'components/DateRange';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import DialogInfoForm from 'components/DialogInfoForm';
import ListDetailContainer from 'components/ListDetailContainer';
import DetailComponent from './SharedComponents/DetailComponent';

const { mlMessage } = RU;

class Consultation extends Component {
  state = {
    isOpenDetail: false,
    formMode: '',
    isCaseOpen: false,
    isContractOpen: false,
    contractSearchText: '',
  };

  setContractDialogTrue = () => {
    this.setState({
      ...this.state,
      isContractOpen: true,
    });
  };

  setCaseDialogTrue = () => {
    this.setState({
      ...this.state,
      isCaseOpen: true,
    });
  };

  clearContractSearchText = () => {
    this.setState({ contractSearchText: '' });
  };

  render() {
    const { isOpenDetail, formMode, isCaseOpen, isContractOpen, contractSearchText } = this.state;
    const {
      bizCode,
      LFID,
      isLoading,
      checkContract,
      checkCase,
      selectCase,
      caseList,
      contractList,
      clientList,
      managerList,
      relatedContract,
      relatedCase,
      startDate,
      endDate,
      searchValue,
      consultationList,
      client,
      managerRefID,
      owner,
      title,
      contents,
      date,
      time,
      spentMinute,
      files,
      fileRefID,
      chargeTypeCode,
      targetPrice,
      isPublic,
      fileChart,
      chargeType,
      saveKeyOfDivision,
      setRelatedList,
      handleSetRelation,
      handleChange,
      handleChangeDateRange,
      handleSubmit,
      handleKeyPress,
      handleFileAdd,
      handleFileRemove,
      handleFileDivisionAdd,
      handleDelete,
      handleSave,
      handleSetDetail,
      handleClearSaveData,
    } = this.props;

    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{bizCode ? mlMessage('pages.consultation.listTitle') : ''}</h2>
            <ButtonN
              type="icon"
              icon="add_to_queue"
              color="primary"
              onClick={async () => {
                await this.setState({
                  ...this.state,
                  isOpenDetail: true,
                  formMode: 'create',
                });
                await handleSetDetail('', 'create');
              }}
              label={mlMessage('pages.consultation.btn.add')}
            />
          </div>
        }
        contents={[
          <Table
            initOrder="desc"
            initOrderBy="consultingdate"
            isLoading={isLoading}
            rows={[
              { id: 'client', label: '의뢰인', width: '15%' },
              { id: 'managerNameStr', label: '담당자', width: '20%' },
              { id: 'title', label: mlMessage('pages.common.title'), align: 'left' },
              { id: 'consultingdate', label: mlMessage('pages.consultation.consultationDate'), width: '10%' },
            ]}
            data={consultationList}
            customColumn={[
              {
                field: 'managerNameStr',
                component: ({ row }) =>
                  row.managerNameStr === 'null ' ? mlMessage('pages.contract.undefined') : row.managerNameStr,
                // row.owner.map((owner, idx) => <span key={idx}>{`${!owner.label ? '미정' : owner.label} `}</span>),
              },
            ]}
            showPriority={['client', 'title', 'consultingdate', 'owner']}
            mngIcons={id => (
              <>
                <Button
                  size="square"
                  icon="description"
                  color="success"
                  onClick={() => {
                    this.setState({ ...this.state, isOpenDetail: true, formMode: 'detail' });
                    handleSetDetail(id, 'detail');
                  }}
                />
                <Button
                  size="square"
                  icon="border_color"
                  color="success"
                  onClick={() => {
                    this.setState({ ...this.state, isOpenDetail: true, formMode: 'mod' });
                    handleSetDetail(id, 'mod');
                  }}
                />
                <Button size="square" icon="delete" color="danger" onClick={() => handleDelete(id)} />
              </>
            )}
            mngIconsWidth="130px"
            condComponents={
              <>
                <DateRange
                  label={mlMessage('pages.consultation.consultationDate')}
                  startDate={startDate}
                  endDate={endDate}
                  handleChange={obj => {
                    handleChangeDateRange('search', obj);
                  }}
                  handleSubmit={(startDate, endDate) => handleSubmit(startDate, endDate)}
                />
                <div style={{ marginLeft: '5px' }}>
                  <InputBox
                    placeholder={mlMessage('pages.consultation.searchPlaceholder')}
                    iconName="Search"
                    name="searchValue"
                    value={searchValue}
                    onChange={e => handleChange('search', e.target.name, e.target.value)}
                    handleSubmit={() => handleKeyPress()}
                  />
                </div>
              </>
            }
          />,
        ]}
      />
    );
    const DetailComponentBtn = (
      <>
        <Button size="large" mode="regular" color="primary" onClick={() => handleSave(formMode)}>
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.save')}
          </Box>
        </Button>
        <Button color="inverted" size="large" mode="regular" onClick={() => this.setState({ isOpenDetail: false })}>
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.close')}
          </Box>
        </Button>
      </>
    );

    const DetailComponentTitle = formMode => {
      let title;
      if (formMode === 'create') title = mlMessage('pages.consultation.saveTitle');
      else if (formMode === 'mod') title = mlMessage('pages.consultation.modifyTitle');
      else title = '상담 상세';
      return title;
    };

    return (
      <>
        <ListDetailContainer
          TableComponent={TableComponent}
          DetailComponent={
            <DetailComponent
              formMode={formMode}
              bizCode={bizCode}
              checkContract={checkContract}
              relatedContract={relatedContract}
              checkCase={checkCase}
              selectCase={selectCase}
              relatedCase={relatedCase}
              clientList={clientList}
              client={client}
              managerList={managerList}
              owner={owner}
              title={title}
              contents={contents}
              chargeType={chargeType}
              chargeTypeCode={chargeTypeCode}
              targetPrice={targetPrice}
              date={date}
              time={time}
              spentMinute={spentMinute}
              isPublic={isPublic}
              files={files}
              fileRefID={fileRefID}
              LFID={LFID}
              fileChart={fileChart}
              handleFileDivisionAdd={handleFileDivisionAdd}
              saveKeyOfDivision={saveKeyOfDivision}
              handleChange={handleChange}
              setRelatedList={setRelatedList}
              setContractDialogTrue={this.setContractDialogTrue}
              setCaseDialogTrue={this.setCaseDialogTrue}
              clearContractSearchText={this.clearContractSearchText}
              handleClearSaveData={handleClearSaveData}
              handleFileAdd={handleFileAdd}
              handleFileRemove={handleFileRemove}
            />
          }
          DetailComponentTitle={DetailComponentTitle(formMode)}
          DetailComponentBtn={DetailComponentBtn}
          isOpenDetail={isOpenDetail}
          handleDialogClose={() => console.log('close')}
        />

        <DialogInfoForm
          title={mlMessage('pages.consultation.choiceContract')}
          open={isContractOpen}
          actions={
            <ButtonN
              color="inverted"
              type="large"
              onClick={() => this.setState({ ...this.state, isContractOpen: false })}
              label={mlMessage('pages.common.button.close')}
            />
          }
          fullWidth
          maxWidth="md"
        >
          <Table
            initRowsPerPage={5}
            rows={[
              { id: 'clientName', label: '의뢰인' },
              { id: 'managerName', label: '담당자' },
              { id: 'title', label: mlMessage('pages.contract.title'), align: 'left' },
              { id: 'contractDate', label: mlMessage('pages.contract.contractDate') },
            ]}
            data={contractList || []}
            customColumn={[
              {
                field: 'managerName',
                component: ({ row }) =>
                  row.managerName.map((manager, idx) => (
                    <span key={idx}>{`${!manager.label ? '미정' : manager.label} `}</span>
                  )),
              },
            ]}
            mngIcons={id => (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  handleSetRelation('save', 'relatedContract', {
                    ContractUUID: id,
                    Title: contractList.filter(a => a.id === id)[0].title,
                  });
                  this.setState({ ...this.state, isContractOpen: false });
                }}
              >
                <Box>{mlMessage('pages.common.button.choice')}</Box>
              </Button>
            )}
            mngIconsWidth="80px"
            condComponents={
              <>
                <div style={{ marginLeft: '5px' }}>
                  <InputBox
                    placeholder={mlMessage('pages.contract.searchPlaceholder')}
                    iconName="Search"
                    value={contractSearchText}
                    onChange={e => this.setState({ contractSearchText: e.target.value })}
                    handleSubmit={e => setRelatedList('contract', contractSearchText)}
                  />
                </div>
              </>
            }
          />
        </DialogInfoForm>

        <DialogInfoForm
          title={selectCase === 1 ? '송무 선택' : '자문 선택'}
          open={isCaseOpen}
          actions={
            <ButtonN
              type="large"
              color="inverted"
              label="닫기"
              onClick={() => this.setState({ ...this.state, isCaseOpen: false })}
            />
          }
          fullWidth
          maxWidth="md"
        >
          <Table
            initRowsPerPage={5}
            rows={
              selectCase === 1
                ? [
                    {
                      id: 'title',
                      numeric: false,
                      disablePadding: false,
                      label: mlMessage('pages.legalLaw'),
                      align: 'left',
                      width: '25%',
                    },
                    { id: 'managementNo', numeric: false, disablePadding: false, label: '송무번호', width: '10%' },
                    {
                      id: 'caseCategory',
                      type: 'text',
                      numeric: false,
                      disablePadding: false,
                      label: '분류',
                      width: '10%',
                    },
                    { id: 'court', numeric: false, disablePadding: false, label: '계속기관', width: '10%' },
                    { id: 'dueDate', numeric: false, disablePadding: false, label: '기일(잔여일)', width: '15%' },
                    { id: 'client', numeric: false, disablePadding: false, label: '의뢰인', width: '10%' },
                    { id: 'lawer', numeric: false, disablePadding: false, label: '수임자', width: '10%' },
                  ]
                : [
                    { id: 'title', numeric: false, disablePadding: false, label: '자문', align: 'left', width: '25%' },
                    { id: 'managementNo', numeric: false, disablePadding: false, label: ' 자문번호', width: '15%' },
                    {
                      id: 'adviceCategory',
                      type: 'text',
                      numeric: false,
                      disablePadding: false,
                      label: `분류`,
                      width: '20%',
                    },
                    { id: 'client', numeric: false, disablePadding: false, label: '의뢰인', width: '10%' },
                    { id: 'lawer', numeric: false, disablePadding: false, label: '수임자', width: '20%' },
                  ]
            }
            data={caseList || []}
            mngIcons={id => (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  handleSetRelation('save', 'relatedCase', {
                    CaseUUID: id,
                    Title: caseList.filter(a => a.id === id)[0].title,
                  });
                  this.setState({ ...this.state, isCaseOpen: false });
                }}
              >
                <Box>{mlMessage('pages.common.button.choice')}</Box>
              </Button>
            )}
            mngIconsWidth="80px"
          />
        </DialogInfoForm>
      </>
    );
  }
}

export default Consultation;
