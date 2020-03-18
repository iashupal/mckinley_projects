import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'components/BoxOld';
import ContentCard from 'components/ContentCard';
import AlignBox from 'components/AlignBox';
import Select from 'components/Select';
import InputBox from 'components/InputBox';
import DatePicker from 'components/DatePicker';
import Button from 'components/Button';
import Table, { IconButton } from 'components/Table/EnhancedTable';
import { RU } from 'helpers/ramda';
import DateRange from 'components/DateRange';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import { NotificationManager } from 'react-notifications';
import { setReduxValues, setListFetch, setDetailBind, setSelect } from '../Redux/Action';
import NoticeForm from './NoticeForm';

const { mlMessage, yearMonthDay } = RU;

class NoticeList extends Component {
  render() {
    const {
      classes,
      setReduxValues,
      handleCommonAlertConfirmSet,
      setListFetch,
      setDetailBind,
      formMode,
      noticeList,
      search,
      setSelect,
    } = this.props;
    const { searchIsPopUp, searchIsMailing, searchStartDate, searchEndDate, searchValue } = search;
    return (
      <ContentCard
        withButton
        title="타이틀"
        noMargin
        customHeader={
          <div style={{ textAlign: 'right' }}>
            <Button
              color="primary"
              icon="add_to_queue"
              onClick={() => {
                setReduxValues({ formMode: 'create', isOpenDetail: true });
                setDetailBind({ noticeID: '', formMode: 'create' });
              }}
            >
              <Box pr={2}>{mlMessage('pages.noticeMng.noticeCreateBtn')}</Box>
            </Button>
          </div>
        }
        contents={[
          <div>
            <div className="paginatn-table left">
              <Table
                initOrder="desc"
                initOrderBy="NoticeDate"
                mngIcons={id => (
                  <>
                    <Button
                      size="square"
                      icon="border_color"
                      color="success"
                      onClick={async () => {
                        await setReduxValues({ isOpenDetail: true });
                        await setDetailBind({ noticeID: id, formMode: 'mod' });
                      }}
                    />
                    <Button
                      size="square"
                      icon="delete"
                      color="danger"
                      onClick={() => {
                        handleCommonAlertConfirmSet({
                          msgObj: {
                            title: mlMessage('alertDialog.delete'),
                            contents: '',
                            isConfirm: true,
                          },
                          waitDatas: {
                            name: 'noticeDelete',
                            value: {
                              noticeID: id,
                            },
                          },
                        });
                      }}
                    />
                  </>
                )}
                mngIconsWidth="100px"
                condComponents={
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <AlignBox>
                      <DateRange
                        label="공지일"
                        startDate={searchStartDate}
                        endDate={searchEndDate}
                        handleChange={obj => {
                          const { startDate, endDate } = obj;
                          if (startDate) setReduxValues({ _path: 'search', searchStartDate: startDate });
                          if (endDate) setReduxValues({ _path: 'search', searchEndDate: endDate });
                        }}
                        handleSubmit={async (startDate, endDate) => {
                          await setListFetch({
                            searchIsPopUp,
                            searchIsMailing,
                            searchStartDate: yearMonthDay(startDate),
                            searchEndDate: yearMonthDay(endDate),
                            searchValue,
                          });
                        }}
                      />
                    </AlignBox>
                    <AlignBox>
                      <div style={{ minWidth: '150px', maxWidth: '150px', marginLeft: '-5px' }}>
                        <Select
                          style={{ width: '100%' }}
                          multiSelect
                          placeholder={mlMessage('pages.noticeMng.noticeIsPopUp')}
                          selectedKeys={searchIsPopUp}
                          options={[
                            {
                              key: '',
                              text: mlMessage('pages.noticeMng.noticeIsPopUp'),
                              itemType: DropdownMenuItemType.Header,
                            },
                            { key: 1, text: mlMessage('pages.common.use') },
                            { key: 0, text: mlMessage('pages.common.unuse') },
                          ]}
                          onChange={async (e, o) => {
                            await setSelect({ list: 'searchIsPopUp', o });
                            await setListFetch({
                              searchIsPopUp: this.props.searchIsPopUp,
                              searchIsMailing,
                              searchStartDate,
                              searchEndDate,
                              searchValue,
                            });
                          }}
                        />
                      </div>
                      <div className="pr-2" style={{ minWidth: '160px', maxWidth: '160px' }}>
                        <Select
                          style={{ width: '100%' }}
                          multiSelect
                          placeholder={mlMessage('pages.noticeMng.isMailing')}
                          selectedKeys={searchIsMailing}
                          options={[
                            {
                              key: '',
                              text: mlMessage('pages.noticeMng.isMailing'),
                              itemType: DropdownMenuItemType.Header,
                            },
                            { key: 1, text: mlMessage('pages.common.use') },
                            { key: 0, text: mlMessage('pages.common.unuse') },
                          ]}
                          onChange={async (e, o) => {
                            await setSelect({ list: 'searchIsMailing', o });
                            await setListFetch({
                              searchIsPopUp,
                              searchIsMailing: this.props.searchIsMailing,
                              searchStartDate,
                              searchEndDate,
                              searchValue,
                            });
                          }}
                        />
                      </div>
                    </AlignBox>
                    <AlignBox>
                      <div>
                        <InputBox
                          type="text"
                          placeholder={mlMessage('pages.noticeMng.noticeSearchField')}
                          iconName="Search"
                          onChange={text => {
                            setReduxValues({
                              _path: 'search',
                              searchValue: text.target.value,
                            });
                          }}
                          handleSubmit={() =>
                            setListFetch({
                              searchIsPopUp,
                              searchIsMailing,
                              searchStartDate,
                              searchEndDate,
                              searchValue,
                            })
                          }
                        />
                      </div>
                    </AlignBox>
                  </div>
                }
                rows={[
                  { id: 'Title', label: mlMessage('pages.noticeMng.noticeTitle'), align: 'left' },
                  { id: 'NoticeDate', label: mlMessage('pages.noticeMng.noticeDate'), width: '10%' },
                  { id: 'IsPopup', label: mlMessage('pages.noticeMng.noticeIsPopUp'), width: '10%' },
                  { id: 'IsMailing', label: mlMessage('pages.noticeMng.isMailing'), width: '10%' },
                  { id: 'UpdateUser', label: mlMessage('pages.common.updateUser'), width: '10%' },
                  { id: 'UpdateDate', label: mlMessage('pages.common.updateDate'), width: '10%' },
                ]}
                data={noticeList}
              />
            </div>
          </div>,
        ]}
      />
    );
  }
}
const mapStateToProps = ({ noticeMng }) => {
  const { formMode, noticeList, search } = noticeMng;
  return {
    formMode,
    noticeList,
    search,
  };
};
const mapDispatchToProps = {
  setReduxValues,
  setDetailBind,
  setListFetch,
  handleCommonAlertConfirmSet,
  setSelect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoticeList);
