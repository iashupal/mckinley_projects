import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import produce from 'immer';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import { R } from 'helpers/ramda';
import Header from './Header';
import TopComponents from './TopComponents';
import ETableBody from './ETableBody';
import {
  applyTableFilter,
  getSorting,
  stableSort,
  getShowFieldNum_RuleArr,
  getShowFieldNum,
  IconButton as IconButton2,
  StatusButton as StatusButton2,
  getMultiKey,
  GetLS,
  SetLS,
  CheckLS,
  NewFields,
} from './TableUtils';

export const IconButton = IconButton2; // 미사용, 외부참조가 있어 미삭제
export const StatusButton = StatusButton2; // 미사용, 외부참조가 있어 미삭제

export class EnhancedTable extends Component {
  showHideFunc = null; // Show/Hide resize 이벤트, unmount 해제를 위한 변수

  constructor(props) {
    super(props);
    const { initOrder, initOrderBy, tableID, initRowsPerPage, noShowField } = props;

    // 기존에 키가 한번도 설정되어 있지 않은 상황에서만 noShowField 를 기본값으로.
    const isExists = CheckLS(tableID, 'noShowField');
    if (tableID && noShowField && !isExists) {
      SetLS(tableID, 'noShowField', noShowField);
    }

    this.state = {
      order: initOrder,
      orderBy: initOrderBy,
      isInitOrder: true, // 첫 로드 후 한번도 Sort 를 변경한적 없는 상태.
      page: GetLS(tableID, 'page', 0, 'int'),
      rowsPerPage: GetLS(tableID, 'rowsPerPage', initRowsPerPage, 'int'),
      allCheckBoxChecked: false,
      checkboxValues: [], // [{ id:'zzz1', value: true }, { id:'zzz2', value: false }]
      filterList: GetLS(tableID, 'filterList', [], ''), // [{ id: 1, display: '날짜 > 2019-01-01' }]
      showFieldList: [], // 현재 보여지는 필드
      allField: [], // 전체 필드
      showFieldNum_RuleArr: [],
      showPriorityArr: [],
    };
  }

  componentDidMount() {
    const { rows, showPriority, tableID } = this.props;
    const allField = rows.map(a => a.id);
    let showFieldList = rows.map(a => a.id);

    const noShowField = GetLS(tableID, 'noShowField', [], '');
    if (noShowField) showFieldList = R.without(noShowField, allField);

    this.setState({
      ...this.state,
      showFieldList,
      allField,
      showFieldNum_RuleArr: getShowFieldNum_RuleArr(1, 1280, 0, 8),
      showPriorityArr: showPriority && showPriority.length > 0 ? showPriority : [], // 우선순위 정의
    });

    const appFunc = fp.throttle(300, this.setFieldAutoHide);
    setTimeout(appFunc, 100);
    this.showHideFunc = appFunc;
    window.addEventListener('resize', appFunc);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.showHideFunc);
  }

  setFieldAutoHide = () => {
    const { showFieldList, allField, showPriorityArr, showFieldNum_RuleArr } = this.state;
    const tobeCount = getShowFieldNum(showFieldNum_RuleArr); // 화면 사이즈에 맞게, 현재 보여줘야 하는 필드 갯수
    const noShowField = GetLS(this.props.tableID, 'noShowField', [], '');

    const diffTobeCount = (tobeCount === -1 ? allField.length : tobeCount) - showFieldList.length;
    if (diffTobeCount !== 0) {
      this.setState({
        ...this.state,
        showFieldList: NewFields({ showFieldList, showPriorityArr, allField, noShowField, count: diffTobeCount }),
      });
    }
  };

  render() {
    const {
      order,
      orderBy,
      rowsPerPage,
      page,
      allCheckBoxChecked,
      checkboxValues,
      filterList,
      showFieldList,
      isInitOrder,
    } = this.state;

    const {
      rows,
      data,
      useCheckBox,
      condComponents,
      height,
      mngIcons,
      mngIconsWidth,
      mngIconsBatch,
      hidePagination,
      hideFilter,
      customColumn,
      isLoading,
      excelExport,
      subSumRows,
      totalSumRow,
      multiKey,
      initOrder,
      initOrderBy,
      tableID,
      editMode,
      editHandler,
      boxShadow,
    } = this.props;

    const allFields = rows.map(a => ({ key: a.id, text: a.label }));

    const multiedKeyData = getMultiKey(multiKey, data);
    const filteredData = applyTableFilter(multiedKeyData, filterList);
    const isNoChangeOrder = initOrder && initOrderBy && isInitOrder;
    const sortedData = isNoChangeOrder ? filteredData : stableSort(filteredData, getSorting(order, orderBy));

    const currentViewedRows = hidePagination
      ? sortedData
      : sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const checkedIDs = checkboxValues.filter(a => a.value).map(a => a.id);

    const HeaderComponent = (
      <Header
        order={order}
        orderBy={orderBy}
        onRequestSort={(event, property) => {
          const { orderBy, order } = this.state;
          const newOrder = orderBy === property && order === 'desc' ? 'asc' : 'desc';
          this.setState({ order: newOrder, orderBy: property, isInitOrder: false });
        }}
        rowCount={data.length}
        rows={rows}
        useCheckBox={useCheckBox}
        mngIcons={mngIcons}
        mngIconsWidth={mngIconsWidth}
        allCheckboxChecked={allCheckBoxChecked}
        allCheckboxHandle={e => {
          const allCheckBoxChecked = e.target.checked;
          const currentViewedIDs = currentViewedRows.map(a => a.id);
          const newCheckboxValues = currentViewedIDs.map(id => ({ id, value: allCheckBoxChecked }));
          this.setState({ ...this.state, checkboxValues: newCheckboxValues, allCheckBoxChecked });
        }}
        showFieldList={showFieldList}
      />
    );

    const BodyComponent = (
      <ETableBody
        currentViewedRows={currentViewedRows}
        rows={rows}
        checkboxValues={checkboxValues}
        useCheckBox={useCheckBox}
        showFieldList={showFieldList}
        mngIconsWidth={mngIconsWidth}
        mngIcons={mngIcons}
        handleOneCheckBoxChanged={(e, rowId) => {
          const newCheckboxValues = checkboxValues;

          const removeIndex = newCheckboxValues.findIndex(a => a.id === rowId);
          if (removeIndex !== -1) newCheckboxValues.splice(removeIndex, 1);

          newCheckboxValues.push({ id: rowId, value: e.target.checked });
          this.setState({ ...this.state, checkboxValues: newCheckboxValues });
        }}
        customColumn={customColumn}
        isLoading={isLoading}
        subSumRows={subSumRows}
        totalSumRow={totalSumRow}
        multiKey={multiKey}
        editMode={editMode}
        editHandler={editHandler}
      />
    );

    const TopComponent = (
      <TopComponents
        condComponents={condComponents}
        useCheckBox={useCheckBox}
        checkedIDs={checkedIDs}
        allFields={allFields}
        showFieldList={showFieldList}
        filterList={filterList}
        rows={rows}
        data={data}
        handleShowHideChange={(event, option, index) => {
          const { key, selected } = option;

          // noShowField Add or Remove (Local Storage)
          const currentNoShowField = GetLS(tableID, 'noShowField', [], '');
          if (!selected) {
            currentNoShowField.push(key);
            SetLS(tableID, 'noShowField', currentNoShowField);
          } else {
            const removeIndex = currentNoShowField.findIndex(a => a === key);
            if (removeIndex !== -1) currentNoShowField.splice(removeIndex, 1);
            SetLS(tableID, 'noShowField', currentNoShowField);
          }

          this.setState(
            produce(this.state, draft => {
              if (selected) {
                draft.showFieldList.push(key);
              } else {
                const removeIndex = draft.showFieldList.findIndex(a => a === key);
                if (removeIndex !== -1) draft.showFieldList.splice(removeIndex, 1);
              }
            }),
          );
        }}
        handleFilterRemove={id => {
          this.setState(
            produce(this.state, draft => {
              const removeIndex = draft.filterList.findIndex(a => a.id === id);
              if (removeIndex !== -1) draft.filterList.splice(removeIndex, 1);
              SetLS(tableID, 'filterList', draft.filterList);
            }),
          );
        }}
        handleFilterAdd={obj => {
          const { display, value, field, type, condition } = obj;
          this.setState(
            produce(this.state, draft => {
              draft.filterList.push({
                id: draft.filterList.length,
                display,
                field,
                condition,
                value,
                type,
              });
              SetLS(tableID, 'filterList', draft.filterList);
            }),
          );
        }}
        handleFilterReset={e => {
          SetLS(tableID, 'filterList', []);
          this.setState({ ...this.state, filterList: [] });
        }}
        hideFilter={hideFilter}
        mngIconsBatch={mngIconsBatch}
        excelExport={excelExport}
      />
    );

    const PaginationComponent = (
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 100]}
        labelRowsPerPage="페이지당 항목 개수"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{ 'aria-label': '이전 페이지' }}
        nextIconButtonProps={{ 'aria-label': '다음 페이지' }}
        onChangePage={(e, page) => {
          SetLS(tableID, 'page', page);
          this.setState({ page, checkboxValues: [], allCheckBoxChecked: false });
        }}
        onChangeRowsPerPage={e => {
          const rowsPerPage = e.target.value;
          SetLS(tableID, 'rowsPerPage', rowsPerPage);
          this.setState({ rowsPerPage, checkboxValues: [], allCheckBoxChecked: false });
        }}
      />
    );

    return (
      <>
        {TopComponent}
        <Paper style={{ boxShadow }}>
          {!height && (
            <Table aria-labelledby="tableTitle">
              {HeaderComponent}
              {BodyComponent}
            </Table>
          )}
          {height && (
            <>
              <Table aria-labelledby="tableTitle">{HeaderComponent}</Table>
              <div className="tableScroll" style={height ? { height } : {}}>
                <Table aria-labelledby="tableTitle">{BodyComponent}</Table>
              </div>
            </>
          )}
          {!hidePagination && PaginationComponent}
        </Paper>
      </>
    );
  }
}

export default EnhancedTable;

EnhancedTable.propTypes = {
  initOrder: PropTypes.string, // 초기 정렬 순서 -> 'desc', 'asc'
  initOrderBy: PropTypes.string, // 초기 정렬 필드명, [주의] 초기 정렬 필드/순서를 사용한 경우, 서버에서 초기 값은 정렬되어 있어야 함. -> 'date', 'task'
  showPriority: PropTypes.arrayOf(PropTypes.string), // Size 작은 상황에서 자동 줄이기, 표기-우선순위 -> ['usage', 'representativeUser', 'cinfirmDate', 'joinDate']
  rows: PropTypes.arrayOf(PropTypes.object), // 필드 정의 -> [{ id: 'joinDate', label: '가입일' },{ id: 'representativeEmail', label: '대표이메일' }]
  data: PropTypes.arrayOf(PropTypes.object), // ID 가 포함된 실제 데이터 -> [{id: '1', date: '2019-07-09'}]
  useCheckBox: PropTypes.bool, // Row-체크박스 사용 여부 -> true
  condComponents: PropTypes.element, // Custom 조건 컴포넌트 (상단 좌측 표기, 서버 조건) -> <>DropDown</>
  height: PropTypes.string, // 고정 Height 설정 (내부 스크롤, 필드 정의시 1값을 제외하고는 고정 width 가 필요함) -> "150px"
  mngIcons: PropTypes.func, // 관리필드의 각 Row 에 표기될 Component 를 리턴하는 Func -> (id, rows, index) => (<>{id}</>)
  mngIconsWidth: PropTypes.string, // 관리필드의 Width 설정 -> "180px"
  mngIconsBatch: PropTypes.func, // Row 체크박스 선택시 상단에 동적으로 표기될 전체 Action 컴포넌트 Func -> arr => (<>{arr}</>)
  hidePagination: PropTypes.bool, // 페이징 영역 감춤 -> true
  hideFilter: PropTypes.bool, // 오른쪽 상단 [필터, 필드숨기기, 엑셀Export] 영역 감춤 -> true
  customColumn: PropTypes.arrayOf(PropTypes.object), // 특정 Column 의 실데이터를 formatting -> [{ field: 'task', component: ({ row }) => <a href={`/test/${row.id}`}>{row.task}</a> }]
  isLoading: PropTypes.bool, // 테이블 실제 내용영역에 로딩중 표기 -> true
  excelExport: PropTypes.bool, // 테이블 내용을 엑셀로 Export 버튼 -> true
  subSumRows: PropTypes.string, // 중간 그룹 (1-depth) 별 Sub-Sum Rows 추가 :: Gruping 필드명 -> 'field1'
  totalSumRow: PropTypes.bool, // 전체 Table Sum-Row 추가 -> true
  multiKey: PropTypes.arrayOf(PropTypes.string), // 데이터에 id값이 없을 시 id 값 생성 -> multiKey=["CardID"] => {CardID:1, id:1} , multiKey=["MemberID","CoporationID"] => {MemberID : 1, CorporationID : 2, id : 1_2}
  tableID: PropTypes.string, // App 전체에서 Uniq 하게 구별할 수 있는 테이블 ID -> 필터 및 페이징 유지용도
  initRowsPerPage: PropTypes.number, // 초기 rowsPerPage 설정
  editMode: PropTypes.bool, // 수정 Mode
  editHandler: PropTypes.func, // 수정 Mode : handler
  boxShadow: PropTypes.string,
  noShowField: PropTypes.arrayOf(PropTypes.string), // 초기 기본으로 보여지지 않아야 할 필드 목록 (우선순위 높음)
};

EnhancedTable.defaultProps = {
  initOrder: '',
  initOrderBy: '',
  showPriority: [],
  rows: [],
  data: [],
  useCheckBox: false,
  condComponents: null,
  height: '',
  boxShadow: '',
  mngIcons: null,
  mngIconsWidth: '',
  mngIconsBatch: null,
  hidePagination: false,
  hideFilter: false,
  customColumn: null,
  isLoading: false,
  excelExport: false,
  subSumRows: '',
  totalSumRow: false,
  multiKey: [],
  tableID: '',
  initRowsPerPage: 10,
  editMode: false,
  editHandler: () => {},
  noShowField: [],
};
