import React from 'react';
import ContentCard from 'components/ContentCard';
import AlignBox from 'components/AlignBox';
import Table from 'components/Table/EnhancedTable';
import Button from 'components/Button';
import InputBox from 'components/InputBox';
import DragDrop from 'components/FileUpload/DropZone';
import Select from 'components/Select';
import ConfirmDialog from 'components/ConfirmDialog';
import { RU } from 'helpers/ramda';
import Box from 'components/BoxOld';
import ListDetailContainer from 'components/ListDetailContainer';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const { mlMessage, readFile, convertFileSize, removeFileOnS3 } = RU;
const FLAG_SEARCH_SELECT_BOX_DIVISION = 'FLAG_SEARCH_SELECT_BOX_DIVISION';
const FLAG_SEARCH_SELECT_BOX_INFLUX = 'FLAG_SEARCH_SELECT_BOX_INFLUX';
const FLAG_SEARCH_INPUT_BOX = 'FLAG_SEARCH_INPUT_BOX';
class Document extends React.Component {
  state = {
    nowMode: '',
    isOpenDetail: false,
    isOpenCreateConfirm: false,
  };

  render() {
    const { nowMode, isOpenDetail, isOpenCreateConfirm } = this.state;
    const {
      fetchFiles,
      files,
      rows,
      bizCode,
      fileChart,
      isLoading,
      initOrder,
      initOrderBy,
      isHideTitle,
      isHideProviderSelectBox,
      isHideInfluxSelectBoxAndInputBox,
      inputBoxPlaceHolder,
      searchKeysOfDivision,
      searchKeysOfInflux,
      saveKeyOfInflux,
      handleFileAdd,
      handleFileRemove,
      handleFileDivisionAdd,
      handleSave,
      handleDelete,
      handleChange,
      searchDocument,
      clearFileList,
      clearDialogData,
      checkValidation,
      existingFileIDOfSelectedCase,
    } = this.props;

    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <AlignBox>
            <h2>{isHideTitle ? mlMessage('pages.litigation.document.title') : ' '}</h2>
            <Button
              icon="add_to_queue"
              mode="rightIcon"
              color="primary"
              onClick={() => {
                this.setState({ ...this.state, isOpenDetail: true, nowMode: 'create' });
              }}
            >
              <Box pr={2}> {mlMessage('pages.document.addFile')}</Box>
            </Button>
          </AlignBox>
        }
        contents={[
          <div>
            <Table
              initOrder={initOrder}
              initOrderBy={initOrderBy}
              isLoading={isLoading}
              rows={rows}
              data={fetchFiles}
              multiKey={['fileID', 'key', 'caseTitle']}
              customColumn={[
                {
                  field: 'name',
                  component: ({ row }) => (
                    <div
                      role="button"
                      tabIndex="0"
                      style={{ cursor: 'pointer', color: '#3F51B5', outline: 'none' }}
                      onClick={async e => readFile(row.key, row.name)}
                    >
                      {row.name}
                    </div>
                  ),
                },
                {
                  field: 'size',
                  component: ({ row }) => {
                    const convertedSizeInfo = convertFileSize(row.size);
                    return (
                      <NumberFormat
                        value={convertedSizeInfo.value}
                        displayType="text"
                        thousandSeparator
                        suffix={convertedSizeInfo.unit}
                      />
                    );
                  },
                },
              ]}
              mngIcons={id => (
                <>
                  <Button size="square" icon="delete" color="danger" onClick={() => handleDelete(id)} />
                </>
              )}
              mngIconsWidth="12%"
              condComponents={
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                  <div>
                    <Select
                      multiSelect
                      style={{ marginLeft: '-5px' }}
                      placeholder={mlMessage('pages.document.fileChart')}
                      defaultSelectedKeys={searchKeysOfDivision}
                      options={[
                        { key: 0, text: mlMessage('pages.document.fileChart'), itemType: DropdownMenuItemType.Header },
                      ].concat(fileChart || [])}
                      onChange={async (event, selectedOption) => {
                        await handleChange(FLAG_SEARCH_SELECT_BOX_DIVISION, selectedOption.text, selectedOption.key);
                        await searchDocument();
                      }}
                    />
                  </div>
                  {!isHideProviderSelectBox && (
                    <div>
                      <Select
                        multiSelect
                        style={{ marginLeft: '-5px' }}
                        placeholder={mlMessage('pages.document.fileInflux')}
                        defaultSelectedKeys={searchKeysOfInflux}
                        options={[
                          {
                            key: 0,
                            text: mlMessage('pages.document.fileInflux'),
                            itemType: DropdownMenuItemType.Header,
                          },
                        ].concat(bizCode || [])}
                        onChange={async (event, selectedOption) => {
                          await handleChange(FLAG_SEARCH_SELECT_BOX_INFLUX, selectedOption.text, selectedOption.key);
                          await searchDocument();
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <InputBox
                      type="text"
                      placeholder={inputBoxPlaceHolder}
                      iconName="Search"
                      onChange={async (event, text) => {
                        await handleChange(FLAG_SEARCH_INPUT_BOX, text);
                      }}
                      handleSubmit={async e => {
                        await searchDocument();
                      }}
                    />
                  </div>
                </div>
              }
            />
          </div>,
        ]}
      />
    );

    const DetailComponent =
      nowMode === 'create' ? (
        <DragDrop
          files={files || null}
          handleFileAdd={target => handleFileAdd(target)}
          handleFileRemove={target => handleFileRemove(target)}
          handleFileDivisionAdd={handleFileDivisionAdd}
          handleChange={handleChange}
          saveKeyOfInflux={saveKeyOfInflux}
          bizCode={bizCode || []}
          fileChart={fileChart || []}
          LFID={1}
          isHideInfluxSelectBoxAndInputBox={isHideInfluxSelectBoxAndInputBox}
          existingFileIDOfSelectedCase={existingFileIDOfSelectedCase}
        />
      ) : null;

    const DetailComponentBtn =
      nowMode === 'create' ? (
        <>
          <Button
            size="large"
            mode="regular"
            color="primary"
            onClick={async () => {
              if (!(await checkValidation())) return;
              this.setState({ isOpenCreateConfirm: true });
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
            onClick={async () => {
              await this.setState({ ...this.state, isOpenDetail: false });
              if (files && files.length > 0) {
                for (const file of files) {
                  if (!file.flag || file.flag === 0) removeFileOnS3(file.key);
                }
              }
              clearFileList({});
              clearDialogData({});
            }}
          >
            <Box pl={5} pr={5}>
              {mlMessage('pages.common.button.close')}
            </Box>
          </Button>
          <>
            <ConfirmDialog
              message=""
              isOpen={isOpenCreateConfirm}
              handleOK={e => {
                this.setState({ isOpenCreateConfirm: false });
                handleSave();
                this.setState({ isOpenDetail: false });
              }}
              handleNO={e => {
                this.setState({ isOpenCreateConfirm: false });
              }}
              title={mlMessage('alertDialog.save')}
            />
          </>
        </>
      ) : null;

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={nowMode === 'detail' ? '' : mlMessage('pages.document.registerFile')}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
        dialogBoxMaxWidth="lg"
        dialogfullWidth={false}
      />
    );
  }
}

export default Document;

Document.propTypes = {
  fetchFiles: PropTypes.arrayOf(PropTypes.object), // 테이블 파일 데이터
  files: PropTypes.arrayOf(PropTypes.object), // 선택된 파일 데이터 or 해당 (상담, 계약, 사건, 기일 등)에서 가져온 파일 데이터
  rows: PropTypes.arrayOf(PropTypes.object), // 테이블 row 데이터
  bizCode: PropTypes.arrayOf(PropTypes.object), // 유입처 리스트 데이터 (Select)
  fileChart: PropTypes.arrayOf(PropTypes.object), // 파일 구분 리스트 데이터 (Select))
  initOrder: PropTypes.string, // 초기 정렬 순서 -> 'desc', 'asc'
  initOrderBy: PropTypes.string, // 초기 정렬 필드명, [주의] 초기 정렬 필드/순서를 사용한 경우, 서버에서 초기 값은 정렬되어 있어야 함. -> 'date', 'task'
  isLoading: PropTypes.bool, // 테이블 로딩 여부
  isHideTitle: PropTypes.bool, // 타이틀 숨김 여부
  isHideProviderSelectBox: PropTypes.bool, // 테이블 검색용 유입처 Select Box 숨김 여부
  isHideInfluxSelectBoxAndInputBox: PropTypes.bool, // DropZone 유입처 Select Box, 검색 InputBox 숨김 여부
  inputBoxPlaceHolder: PropTypes.string, // 검색 InputBox PlaceHolder
  searchKeysOfDivision: PropTypes.arrayOf(PropTypes.string), // 파일 구분 검색 (ex. 우리제출, 상대제출, 법원문건 등...)
  searchKeysOfInflux: PropTypes.arrayOf(PropTypes.string), // 유입처 검색 (ex. 계약, 상담, 송무, 자문, 송무/기일 등...)
  saveKeyOfInflux: PropTypes.string, // 파일 저장시 필요한 유입처 키값 (ex. 계약, 상담, 송무, 자문, 송무/기일 등...)
  handleFileAdd: PropTypes.func, // files 리스트에 파일 추가
  handleFileRemove: PropTypes.func, // files 리스트에 해당 파일 제거
  handleFileDivisionAdd: PropTypes.func, // files의 해당 파일에 구분 키 값 추가 (ex. 우리제출, 상대제출, 법원문건 등...)
  handleSave: PropTypes.func, // 파일 생성
  handleDelete: PropTypes.func, // 파일 삭제
  handleChange: PropTypes.func, // Store, documentMng state 변경
  searchDocument: PropTypes.func, // 파일 검색
  clearFileList: PropTypes.func, // 선택된 파일 데이터 or 해당 (상담, 계약, 사건, 기일 등)에서 가져온 파일 데이터 초기화
  clearDialogData: PropTypes.func, // 다이얼로그 관련 데이터 초기화
  checkValidation: PropTypes.func, // 저장시 값 유효성 체크 함수
};

Document.defaultProps = {
  fetchFiles: [],
  files: [],
  rows: [],
  bizCode: [],
  fileChart: [],
  isLoading: false,
  initOrder: '',
  initOrderBy: '',
  isHideTitle: false,
  isHideProviderSelectBox: false,
  isHideInfluxSelectBoxAndInputBox: false,
  inputBoxPlaceHolder: '',
  searchKeysOfDivision: [],
  searchKeysOfInflux: [],
  saveKeyOfInflux: '',
  handleFileAdd: null,
  handleFileRemove: null,
  handleFileDivisionAdd: null,
  handleSave: null,
  handleDelete: null,
  handleChange: null,
  searchDocument: null,
  clearFileList: null,
  clearDialogData: null,
  checkValidation: null,
};
