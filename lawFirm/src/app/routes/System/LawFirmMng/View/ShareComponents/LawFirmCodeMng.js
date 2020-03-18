import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListDetailContainer from 'components/ListDetailContainer';
import ContentCard from 'components/ContentCard';
import ButtonN from 'components/ButtonN';
import { BlankSpan } from 'helpers/ui';
import Table from 'components/Table/EnhancedTable';
import Button from 'components/Button';
import { RU } from 'helpers/ramda';
import InputBox from 'components/InputBox';
import GridTable, { GridRow } from 'components/GridTable';
import Box from 'components/BoxOld';
import Select from 'components/Select';
import InputBoxNumber from 'components/InputBoxNumber';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import {
  handleFetchGroupCodeList,
  setReduxValues,
  handleFetchCodeList,
  setSelectLawFirmCodeMng,
  checkInputValues,
} from '../../Redux/Action';

const { mlMessage } = RU;

class LawFirmCodeMng extends Component {
  componentDidMount = () => {
    const { handleFetchGroupCodeList } = this.props;
    handleFetchGroupCodeList();
  };

  render() {
    const { setReduxValues, setSelectLawFirmCodeMng, handleFetchCodeList, checkInputValues, CodeMng } = this.props;
    const { isLoading, formMode, groupCodeList, groupCode, codeList, search, detail } = CodeMng;
    const { searchIsActive } = search;
    const { code, codeNameKOR, codeNameENG, remark, sortOrder, isActive, isSystemCode, parentFullCode } = detail;

    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{mlMessage('pages.lawFirmMng.codeMng.title')}</h2>
            <div>
              <ButtonN
                type="icon"
                icon="add_to_queue"
                color="primary"
                onClick={async () => {
                  setReduxValues({ _path: 'CodeMng', formMode: 'create' });
                  setReduxValues({
                    _path: 'CodeMng.detail',
                    code: '',
                    codeNameKOR: '',
                    codeNameENG: '',
                    parentFullCode: '',
                    remark: '',
                    sortOrder: 0,
                    isActive: 1,
                  });
                }}
                label={mlMessage('pages.lawFirmMng.codeMng.createCodeButton')}
              />
            </div>
          </div>
        }
        contents={[
          <Table
            isLoading={isLoading}
            initOrder="asc"
            initOrderBy="sortOrder"
            rows={[
              { id: 'code', type: 'code', label: mlMessage('pages.lawFirmMng.codeMng.code'), width: '15%' },
              {
                id: 'codeNameKOR',
                type: 'text',
                label: mlMessage('pages.lawFirmMng.codeMng.codeNameKOR'),
                align: 'left',
              },
              {
                id: 'codeNameENG',
                type: 'text',
                label: mlMessage('pages.lawFirmMng.codeMng.codeNameENG'),
                align: 'left',
              },
              {
                id: 'parentFullCode',
                type: 'text',
                label: mlMessage('pages.lawFirmMng.codeMng.parentFullCode'),
              },
              {
                id: 'sortOrder',
                type: 'number',
                label: mlMessage('pages.lawFirmMng.codeMng.sortOrder'),
                width: '120px',
              },
              {
                id: 'isActiveString',
                type: 'code',
                label: mlMessage('pages.lawFirmMng.codeMng.isActive'),
                width: '100px',
              },
            ]}
            data={codeList}
            // customColumn={[
            //   {
            //     field: 'isActive',
            //     component: ({ row }) => (
            //       <>{row.isActive ? mlMessage('pages.common.use') : mlMessage('pages.common.unuse')}</>
            //     ),
            //   },
            // ]}
            showPriority={['code', 'codeNameKOR', 'codeNameENG', 'isActive']}
            mngIcons={(id, o) => (
              <>
                <Button
                  size="square"
                  icon="border_color"
                  color="success"
                  onClick={() => {
                    setReduxValues({
                      _path: 'CodeMng.detail',
                      code: o.code,
                      codeNameKOR: o.codeNameKOR,
                      codeNameENG: o.codeNameENG,
                      parentFullCode: o.parentFullCode,
                      remark: o.remark,
                      sortOrder: o.sortOrder,
                      isActive: o.isActive,
                    });
                    setReduxValues({ _path: 'CodeMng', formMode: 'mod' });
                  }}
                />
              </>
            )}
            mngIconsWidth="80px"
            condComponents={
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Select
                  style={{ width: '150px' }}
                  selectedKey={groupCode.key}
                  options={[
                    {
                      key: '',
                      text: mlMessage('pages.lawFirmMng.codeMng.groupCode'),
                      itemType: DropdownMenuItemType.Header,
                    },
                    ...groupCodeList,
                  ]}
                  onChange={(e, option) => {
                    setReduxValues({ _path: 'CodeMng', groupCode: option });
                    handleFetchCodeList({ groupCode: option, isActive: searchIsActive });
                  }}
                />
                <Select
                  style={{ marginLeft: '-5px', width: 130 }}
                  multiSelect
                  placeholder={mlMessage('pages.lawFirmMng.codeMng.isActive')}
                  options={[
                    {
                      key: '',
                      text: mlMessage('pages.lawFirmMng.codeMng.isActive'),
                      itemType: DropdownMenuItemType.Header,
                    },
                    { key: 1, text: mlMessage('pages.common.use') },
                    { key: 0, text: mlMessage('pages.common.unuse') },
                  ]}
                  onChange={async (e, o) => {
                    await setSelectLawFirmCodeMng({
                      list: 'searchIsActive',
                      o,
                    });
                  }}
                />
                <BlankSpan num="2" />
                <span
                  className="d-inline-block font-weight-semibold text-primary"
                  style={{ wordBreak: 'keep-all', padding: '10px 0px' }}
                >
                  {groupCode.remark}
                </span>
              </div>
            }
          />,
        ]}
      />
    );

    const DetailComponent = (
      <GridTable colWidth1={100}>
        <GridRow title={mlMessage('pages.lawFirmMng.codeMng.groupCode')}>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 'bold',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            {groupCode.key}
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.lawFirmMng.codeMng.code')} redStar>
          <>
            {formMode === 'mod' ? (
              <span className="d-inline-block font-weight-semibold">{code}</span>
            ) : (
              <InputBox
                value={code}
                maxLength={6}
                onChange={e => setReduxValues({ _path: 'CodeMng.detail', code: e.target.value })}
              />
            )}
          </>
        </GridRow>
        <GridRow title={mlMessage('pages.lawFirmMng.codeMng.codeNameKOR')} redStar>
          <>
            <InputBox
              value={codeNameKOR}
              maxLength={50}
              onChange={e => setReduxValues({ _path: 'CodeMng.detail', codeNameKOR: e.target.value })}
            />
          </>
        </GridRow>
        <GridRow title={mlMessage('pages.lawFirmMng.codeMng.codeNameENG')} redStar>
          <>
            <InputBox
              value={codeNameENG}
              maxLength={100}
              onChange={e => setReduxValues({ _path: 'CodeMng.detail', codeNameENG: e.target.value })}
            />
          </>
        </GridRow>
        <GridRow title={mlMessage('pages.lawFirmMng.codeMng.parentFullCode')}>
          <>
            <InputBox
              value={parentFullCode}
              maxLength={100}
              onChange={e => setReduxValues({ _path: 'CodeMng.detail', parentFullCode: e.target.value })}
            />
          </>
        </GridRow>
        <GridRow title={mlMessage('pages.lawFirmMng.codeMng.remark')} redStar>
          <InputBox
            rows="5"
            multiline
            value={remark}
            maxLength={200}
            onChange={e => setReduxValues({ _path: 'CodeMng.detail', remark: e.target.value })}
          />
        </GridRow>
        {formMode === 'mod' && (
          <GridRow title={mlMessage('pages.lawFirmMng.codeMng.isActive')} redStar>
            <Select
              style={{ marginLeft: '-5px' }}
              placeholder={mlMessage('pages.common.use')}
              selectedKey={isActive}
              options={[
                { key: 1, text: mlMessage('pages.common.use') },
                { key: 0, text: mlMessage('pages.common.unuse') },
              ]}
              onChange={(e, o) => setReduxValues({ _path: 'CodeMng.detail', isActive: o.key })}
            />
          </GridRow>
        )}
        <GridRow title={mlMessage('pages.lawFirmMng.codeMng.sortOrder')} redStar>
          <InputBoxNumber
            width="100px"
            value={sortOrder}
            maxLength={5}
            onValueChange={obj => setReduxValues({ _path: 'CodeMng.detail', sortOrder: obj.value })}
          />
        </GridRow>
      </GridTable>
    );

    const DetailComponentBtn = (
      <>
        <Button
          size="large"
          mode="regular"
          color="primary"
          onClick={() =>
            checkInputValues({
              detail,
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
          onClick={() => setReduxValues({ _path: 'CodeMng', formMode: '' })}
        >
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.close')}
          </Box>
        </Button>
      </>
    );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={
          formMode === 'create'
            ? mlMessage('pages.lawFirmMng.codeMng.createCode')
            : mlMessage('pages.lawFirmMng.codeMng.modifyCode')
        }
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={formMode !== ''}
        handleDialogClose={() => console.log('close')}
      />
    );
  }
}

const mapStateToProps = ({ lawfirmMng }) => {
  const { CodeMng } = lawfirmMng;
  return {
    CodeMng,
  };
};
const mapDispatchToProps = {
  handleFetchGroupCodeList,
  handleFetchCodeList,
  setSelectLawFirmCodeMng,
  setReduxValues,
  checkInputValues,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LawFirmCodeMng);
