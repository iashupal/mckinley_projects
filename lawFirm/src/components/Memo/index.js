import React, { Component, Fragment } from 'react';
import ListDetailContainer from 'components/ListDetailContainer';
import ButtonN from 'components/ButtonN';
import Button from 'components/Button';
import { RU } from 'helpers/ramda';
import CheckBox from 'components/CheckBox';
import ContentCard from 'components/ContentCard';
import Table from 'components/Table/EnhancedTable';
import GridTable, { GridRow } from 'components/GridTable';
import Box from 'components/BoxOld';
import InputBox from 'components/InputBox';
import DateRange from 'components/DateRange';
import Select from 'components/Select';
import AutoComplete from 'components/AutoComplete';
import DragDropPopUp from 'components/FileUpload';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import DialogInfoForm from 'components/DialogInfoForm';

const { mlMessage } = RU;

class Memo extends Component {
  state = {
    isOpenDetail: false,
    formMode: '',
    selectCase: 1,
    checkCase: true,
    importance: 1,
    isCaseOpen: false,
  };

  render() {
    const { isOpenDetail, formMode, selectCase, checkCase, importance, isCaseOpen } = this.state;
    const { caseList } = this.props;
    const TableComponent = (
      <ContentCard
        customHeader={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonN
              type="icon"
              icon="add_to_queue"
              color="primary"
              onClick={async () => {
                this.setState({ isOpenDetail: true, formMode: 'create', checkCase: true });
              }}
              label="신규 메모"
            />
          </div>
        }
        contents={[
          <Table
            initOrder="desc"
            initOrderBy="updateDate"
            // isLoading={isLoading}
            rows={[
              { id: 'updateDate', label: '등록일', type: 'date', width: '130px' },
              { id: 'bizCode', label: '유입처', type: 'code', width: '100px' },
              { id: 'case', label: '송무/자문', type: 'code' },
              { id: 'content', label: '내용', type: 'text', align: 'left' },
              { id: 'importance', label: '중요도', type: 'code', width: '100px' },
              { id: 'owner', label: '담당자', type: 'code' },
            ]}
            data={[
              {
                id: 1,
                updateDate: '2019-07-11',
                bizCode: '송무',
                case: '테스트 송무',
                content: '메모 내용',
                importance: '높음',
                owner: '김아무개',
              },
              {
                id: 2,
                updateDate: '2019-07-11',
                bizCode: '자문',
                case: '테스트 자문',
                content: '메모 내용',
                importance: '보통',
                owner: '김아무개',
              },
              {
                id: 3,
                updateDate: '2019-07-11',
                bizCode: '자문',
                case: '테스트 자문',
                content: '메모 내용',
                importance: '낮음',
                owner: '김아무개',
              },
              {
                id: 4,
                updateDate: '2019-07-11',
                bizCode: '송무',
                case: '테스트 송무',
                content: '메모 내용',
                importance: '보통',
                owner: '김아무개',
              },
              {
                id: 5,
                updateDate: '2019-07-11',
                bizCode: '송무',
                case: '테스트 송무',
                content: '메모 내용',
                importance: '높음',
                owner: '김아무개',
              },
            ]}
            mngIcons={id => (
              <>
                <Button
                  size="square"
                  icon="description"
                  color="success"
                  onClick={() => {
                    this.setState({
                      formMode: 'detail',
                      isOpenDetail: true,
                    });
                  }}
                />
                <Button
                  size="square"
                  icon="border_color"
                  color="success"
                  onClick={() => {
                    this.setState({
                      formMode: 'mod',
                      isOpenDetail: true,
                    });
                  }}
                />
                <Button size="square" icon="delete" color="danger" onClick={() => {}} />
              </>
            )}
            mngIconsWidth="130px"
            condComponents={
              <>
                <DateRange
                  label="등록일"
                  // startDate={startDate}
                  // endDate={endDate}
                  handleChange={obj => {
                    // handleChangeDateRange('search', obj);
                  }}
                  handleSubmit={(startDate, endDate) => {
                    //  handleSubmit(startDate, endDate)
                  }}
                />
                <Select
                  multiSelect
                  placeholder="중요도"
                  options={[
                    { key: 0, text: '중요도', itemType: DropdownMenuItemType.Header },
                    { key: 1, text: '높음' },
                    { key: 2, text: '보통' },
                    { key: 3, text: '낮음' },
                  ]}
                  onChange={(e, o) => {}}
                />
                <div style={{ marginLeft: '5px' }}>
                  <InputBox
                    placeholder="내용/담당자"
                    iconName="Search"
                    name="searchValue"
                    // value={searchValue}
                    onChange={e => {
                      // handleChange('search', e.target.name, e.target.value)
                    }}
                    handleSubmit={() => {
                      // handleKeyPress()
                    }}
                  />
                </div>
              </>
            }
          />,
        ]}
      />
    );
    const DetailComponent = (
      <GridTable>
        <GridRow title="송무/자문 선택">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {formMode !== 'detail' && (
              <div style={{ marginRight: '-10px' }}>
                <CheckBox
                  checked={checkCase}
                  label={!checkCase ? '' : '선택하지 않음'}
                  onChange={(event, checked) => {
                    this.setState({
                      checkCase: checked,
                    });
                  }}
                />
              </div>
            )}
            {formMode !== 'detail' && !checkCase && (
              <>
                <Select
                  style={{ width: '130px', marginRight: '5px' }}
                  options={[{ key: 1, text: mlMessage('pages.legalLaw') }, { key: 2, text: '자문' }]}
                  selectedKey={selectCase}
                  onChange={(e, o) => {
                    // handleChange('save', 'selectCase', o.key);
                    // handleChange('save', 'relatedCase', { CaseUUID: '', Title: '' });
                    this.setState({
                      selectCase: o.key,
                    });
                  }}
                />
                <Button
                  size="square"
                  color="inverted"
                  onClick={() => {
                    // this.setState({ ...this.state, isCaseOpen: true });
                    // setCaseDialogTrue();
                    // setRelatedList('case');
                    this.setState({
                      isCaseOpen: true,
                    });
                  }}
                >
                  <Box>{selectCase === 1 ? '송무' : '자문'} 선택</Box>
                </Button>
              </>
            )}
            {formMode === 'detail' && <div classNames="d-inline-block font-weight-semibold">테스트 송무</div>}
          </div>
        </GridRow>
        <GridRow title="메모">
          <InputBox
            rows="5"
            multiline
            name="contents"
            // value={contents}
            maxLength={500}
            onChange={e => {
              // handleChange('save', e.target.name, e.target.value)
            }}
            handleSubmit={e => {
              //   this.handleSubmit();
            }}
          />
        </GridRow>
        <GridRow title="중요도">
          <Select
            style={{ width: '130px', marginLeft: '-5px' }}
            selectedKey={importance}
            options={[{ key: 1, text: '높음' }, { key: 2, text: '보통' }, { key: 3, text: '낮음' }]}
            onChange={(e, o) => {
              this.setState({
                importance: o.key,
              });
            }}
          />
        </GridRow>
        <GridRow title="담당자">
          <AutoComplete isMulti readOnly={formMode === 'detail'} />
        </GridRow>
        <GridRow title="관련 파일">
          <DragDropPopUp />
        </GridRow>
      </GridTable>
    );
    const DetailComponentBtn = (
      <>
        <Button
          size="large"
          mode="regular"
          color="primary"
          onClick={() => {
            // handleSave(formMode)
          }}
        >
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.save')}
          </Box>
        </Button>
        <Button
          color="inverted"
          size="large"
          mode="regular"
          onClick={() => {
            this.setState({ isOpenDetail: false });
          }}
        >
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.close')}
          </Box>
        </Button>
      </>
    );

    const DetailComponentTitle = formMode => {
      let title;
      if (formMode === 'create') title = '메모 등록';
      else if (formMode === 'mod') title = '메모 수정';
      else title = '메모 상세';
      return title;
    };

    return (
      <>
        <ListDetailContainer
          TableComponent={TableComponent}
          DetailComponent={DetailComponent}
          DetailComponentTitle={DetailComponentTitle(formMode)}
          DetailComponentBtn={DetailComponentBtn}
          isOpenDetail={isOpenDetail}
          handleDialogClose={() => console.log('close')}
        />
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
            // data={caseList || []}
            mngIcons={id => (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  // handleSetRelation('save', 'relatedCase', {
                  //   CaseUUID: id,
                  //   Title: caseList.filter(a => a.id === id)[0].title,
                  // });
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

export default Memo;
