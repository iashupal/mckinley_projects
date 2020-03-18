import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ListDetailContainer from 'components/ListDetailContainer';
import ContentCard from 'components/ContentCard';
import Dialog from 'components/Dialog';
import GridTable, { GridRow } from 'components/GridTable';
import InputBox from 'components/InputBox';
import ButtonN from 'components/ButtonN';
import Table from 'components/Table/EnhancedTable';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import { RU } from 'helpers/ramda';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import InputBoxNumber from 'components/InputBoxNumber';
import Select from 'components/Select';

const { mlMessage } = RU;

class LawFirmCodeMng2 extends Component {
  state = {
    isOpenDetail: false,
    isOpenDialog: false,
    isCustom: false,
    useSystemCode: false,
    formMode: '',
  };

  render() {
    const { isOpenDetail, isOpenDialog, isCustom, useSystemCode, formMode } = this.state;
    const { handleCommonAlertConfirmSet } = this.props;
    const mngIcon = () => (
      <>
        <Button
          size="square"
          icon="border_color"
          color="success"
          onClick={() => {
            this.setState({
              ...this.state,
              isOpenDialog: true,
              formMode: 'mod',
            });
          }}
        />
        <Button size="square" icon="delete" color="danger" onClick={() => {}} />
      </>
    );
    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>그룹 코드 목록</h2>
          </div>
        }
        contents={[
          <Table
            // initOrder="desc"
            // initOrderBy=""
            rows={[
              { id: 'groupCode', label: '그룹코드', width: '15%' },
              { id: 'groupNameKOR', label: '코드명(KOR)' },
              { id: 'groupNameENG', label: '코드명(ENG)' },
              { id: 'remark', label: '비고', width: '20%' },
              { id: 'customizing', label: '커스텀' },
            ]}
            data={[
              {
                id: 1,
                groupCode: 'ABC',
                groupNameKOR: '그룹코드1',
                groupNameENG: 'GroupCode1',
                remark: '그룹코드1 설명',
                customizing: 'X',
              },
              {
                id: 2,
                groupCode: 'BCD',
                groupNameKOR: '그룹코드2',
                groupNameENG: 'GroupCode2',
                remark: '그룹코드2 설명',
                customizing: 'X',
              },
              {
                id: 3,
                groupCode: 'CDE',
                groupNameKOR: '그룹코드3',
                groupNameENG: 'GroupCode3',
                remark: '그룹코드3 설명',
                customizing: 'X',
              },
              {
                id: 4,
                groupCode: 'DEF',
                groupNameKOR: '그룹코드4',
                groupNameENG: 'GroupCode4',
                remark: '그룹코드4 설명',
                customizing: 'X',
              },
              {
                id: 5,
                groupCode: 'EFG',
                groupNameKOR: '그룹코드5',
                groupNameENG: 'GroupCode5',
                remark: '그룹코드5 설명',
                customizing: 'O',
              },
              {
                id: 6,
                groupCode: 'FGH',
                groupNameKOR: '그룹코드6',
                groupNameENG: 'GroupCode6',
                remark: '그룹코드6 설명',
                customizing: 'O',
              },
            ]}
            customColumn={[
              {
                field: 'groupCode',
                component: ({ row }) => (
                  <div
                    role="button"
                    tabIndex="0"
                    style={{ cursor: 'pointer', color: '#3F51B5', outline: 'none' }}
                    onClick={async () => {
                      this.setState({
                        ...this.state,
                        isOpenDetail: true,
                      });
                    }}
                  >
                    {row.groupCode}
                  </div>
                ),
              },
            ]}
          />,
        ]}
      />
    );

    const DetailComponent = (
      <Table
        rows={[
          { id: 'code', label: '코드', width: '15%' },
          { id: 'codeNameKOR', label: '코드명(KOR)' },
          { id: 'codeNameENG', label: '코드명(ENG)' },
          { id: 'remark', label: '비고', width: '20%' },
          // { id: 'customizing', label: '커스텀' },
        ]}
        data={
          isCustom && !useSystemCode
            ? []
            : [
                {
                  id: 1,
                  code: '01',
                  codeNameKOR: '코드1',
                  codeNameENG: 'Code1',
                  remark: '코드1 설명',
                },
                {
                  id: 2,
                  code: '02',
                  codeNameKOR: '코드2',
                  codeNameENG: 'Code2',
                  remark: '코드2 설명',
                },
                {
                  id: 3,
                  code: '03',
                  codeNameKOR: '코드3',
                  codeNameENG: 'Code3',
                  remark: '코드3 설명',
                },
                {
                  id: 4,
                  code: '04',
                  codeNameKOR: '코드4',
                  codeNameENG: 'Code4',
                  remark: '코드4 설명',
                },
                {
                  id: 5,
                  code: '05',
                  codeNameKOR: '코드5',
                  codeNameENG: 'Code5',
                  remark: '코드5 설명',
                },
                {
                  id: 6,
                  code: '06',
                  codeNameKOR: '코드6',
                  codeNameENG: 'Code6',
                  remark: '코드6 설명',
                },
              ]
        }
        mngIcons={isCustom && mngIcon}
        hideFilter
      />
    );

    const DetailComponentBtn = (
      <>
        <Button color="inverted" size="large" mode="regular" onClick={() => this.setState({ isOpenDetail: false })}>
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.close')}
          </Box>
        </Button>
      </>
    );

    return (
      <>
        <ListDetailContainer
          TableComponent={TableComponent}
          DetailComponent={DetailComponent}
          DetailComponentTitle="코드 목록"
          DetailComponentTitleButton={
            <div>
              {isCustom ? (
                <>
                  <ButtonN
                    type="icon"
                    icon="add_to_queue"
                    color="primary"
                    onClick={async () => {
                      console.log('시스템 코드 추가');
                      this.setState({
                        ...this.state,
                        useSystemCode: true,
                      });
                    }}
                    label="시스템 코드 불러오기"
                  />
                  <ButtonN
                    type="icon"
                    icon="add_to_queue"
                    color="primary"
                    onClick={async () => {
                      this.setState({
                        ...this.state,
                        // isCustom: true,
                        isOpenDialog: true,
                        formMode: 'create',
                      });
                    }}
                    label="신규 코드"
                  />
                </>
              ) : (
                <ButtonN
                  type="icon"
                  icon="add_to_queue"
                  color="primary"
                  onClick={async () => {
                    this.setState({
                      ...this.state,
                      isCustom: true,
                      // isOpenDialog: true,
                      // formMode: 'create',
                    });
                    // handleCommonAlertConfirmSet({
                    //   msgObj: {
                    //     title: '시스템 코드 사용',
                    //     contents: '시스템 코드를 불러오시겠습니까?',
                    //     isConfirm: true,
                    //   },
                    //   waitDatas: {
                    //     name: '',
                    //     value: {},
                    //   },
                    // });
                  }}
                  label="코드 커스텀"
                />
              )}
            </div>
          }
          DetailComponentBtn={DetailComponentBtn}
          isOpenDetail={isOpenDetail}
          handleDialogClose={() => console.log('close')}
        />
        <Dialog open={isOpenDialog} maxWidth="sm" fullWidth>
          <ContentCard
            noMargin
            title={formMode === 'create' ? '코드 등록' : '코드 수정'}
            contents={[
              <div>
                <GridTable colWidth1={100}>
                  <GridRow title="그룹 코드">
                    {/* <>그룹 코드</> */}
                    <div
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      }}
                    >
                      그룹코드
                    </div>
                  </GridRow>
                  <GridRow title="코드" redStar>
                    {/* <>
                      {formMode === 'mod' && isSystemCode === 1 ? (
                        <span className="d-inline-block font-weight-semibold">코드</span>
                      ) : (
                        <InputBox
                          value={code}
                          onChange={e => setReduxValues({ _path: 'CodeMng.detail', code: e.target.value })}
                        />
                      )}
                    </> */}
                    <InputBox />
                  </GridRow>
                  <GridRow title="코드명(KOR)" redStar>
                    {/* <>
                      {formMode === 'mod' && isSystemCode === 1 ? (
                        <span className="d-inline-block font-weight-semibold">코드명(KOR)</span>
                      ) : (
                        <InputBox
                          value={codeNameKOR}
                          onChange={e => setReduxValues({ _path: 'CodeMng.detail', codeNameKOR: e.target.value })}
                        />
                      )}
                    </> */}
                    <InputBox />
                  </GridRow>
                  <GridRow title="코드명(ENG)" redStar>
                    {/* <>
                      {formMode === 'mod' && isSystemCode === 1 ? (
                        <span className="d-inline-block font-weight-semibold">코드명(ENG)</span>
                      ) : (
                        <InputBox
                          value={codeNameENG}
                          onChange={e => setReduxValues({ _path: 'CodeMng.detail', codeNameENG: e.target.value })}
                        />
                      )}
                    </> */}
                    <InputBox />
                  </GridRow>
                  <GridRow title="비고" redStar>
                    {/* {formMode === 'mod' && isSystemCode === 1 ? (
                      <span className="d-inline-block font-weight-semibold">비고</span>
                    ) : (
                      <InputBox
                        rows="5"
                        multiline
                        value={remark}
                        onChange={e => setReduxValues({ _path: 'CodeMng.detail', remark: e.target.value })}
                      />
                    )} */}
                    <InputBox rows="5" multiline />
                  </GridRow>
                  {formMode === 'mod' && (
                    <GridRow title="사용여부" redStar>
                      <Select
                        style={{ marginLeft: '-5px' }}
                        placeholder="사용"
                        // selectedKey={isActive}
                        options={[{ key: 1, text: '사용' }, { key: 0, text: '미사용' }]}
                        // onChange={(e, o) => setReduxValues({ _path: 'CodeMng.detail', isActive: o })}
                      />
                    </GridRow>
                  )}
                  <GridRow title="정렬순서" redStar>
                    <InputBoxNumber
                      width="100px"
                      // value={sortOrder}
                      decimalScale={0}
                      // onValueChange={obj => setReduxValues({ _path: 'CodeMng.detail', sortOrder: obj.value })}
                    />
                  </GridRow>
                </GridTable>
                <div style={{ height: '10px' }}>&nbsp;</div>
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                  <>
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
                      color="inverted"
                      size="large"
                      mode="regular"
                      onClick={() => this.setState({ isOpenDialog: false })}
                    >
                      <Box pl={5} pr={5}>
                        {mlMessage('pages.common.button.close')}
                      </Box>
                    </Button>
                  </>
                </div>
              </div>,
            ]}
          />
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = () => {};
const mapDispatchToProps = {
  handleCommonAlertConfirmSet,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LawFirmCodeMng2);
