import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import ContentCard from 'components/ContentCard';
import AlignBox from 'components/AlignBox';
import CheckBox from 'components/CheckBox';
import Select from 'components/Select';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import { R, RU } from 'helpers/ramda';
import Button from 'components/Button';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { statusList } from 'helpers/data';
import { setReduxValues } from '../../Redux/Action';

const { mlMessage, yearMDHM } = RU;

class MemoList extends Component {
  setListData = list => {
    return list.map(item => {
      const priority = (
        // <Button size="small" color={R.filter(a => a.value === item.status, authList)[0].color}>
        //   {R.filter(a => a.value === item.status, authList)[0].name}
        // </Button>
        <div
          className={`badge text-${R.filter(a => a.value === item.priority, statusList)[0].fontColor} bg-${
            R.filter(a => a.value === item.priority, statusList)[0].color
          }`}
          style={{ height: '60%', fontSize: '13px', borderRadius: '5px' }}
        >
          {R.filter(a => a.value === item.priority, statusList)[0].name}
        </div>
      );

      return {
        id: item.id,
        date: item.date,
        content: item.content,
        priority,
        admin: item.admin,
      };
    });
  };

  render() {
    const { handleCommonAlertConfirmSet, setReduxValues, memo } = this.props;
    const { memoList } = memo;

    return (
      <ContentCard
        title="타이틀"
        customHeader={
          <AlignBox>
            <AlignBox>
              <h2>자문 메모 목록</h2>
            </AlignBox>
            <AlignBox>
              <CheckBox label="나의 메모" onChange={(e, value) => setReduxValues({ myMemo: value })} />
              <Button color="inverted" onClick={() => setReduxValues({ formMode: 'create' })}>
                메모 생성
              </Button>
            </AlignBox>
          </AlignBox>
        }
        contents={[
          <div className="paginatn-table left">
            <Table
              initOrder="desc"
              initOrderBy="date"
              rows={[
                { id: 'date', label: '등록일', width: '10%' },
                { id: 'content', label: '내용', align: 'left' },
                { id: 'priority', label: '중요도', width: '10%' },
                { id: 'admin', label: '담당자', width: '10%' },
              ]}
              data={this.setListData(memoList)}
              mngIcons={id => (
                <React.Fragment>
                  <Button size="square" icon="attach_file" color="blue" />
                  <Button
                    size="square"
                    icon="description"
                    color="success"
                    onClick={() => setReduxValues({ formMode: 'detail' })}
                  />
                  <Button
                    size="square"
                    icon="delete"
                    color="danger"
                    onClick={value => {
                      handleCommonAlertConfirmSet({
                        msgObj: {
                          title: mlMessage('alertDialog.delete'),
                          contents: '',
                          isConfirm: true,
                        },
                        waitDatas: {
                          name: '',
                          value: {},
                        },
                      });
                    }}
                  />
                </React.Fragment>
              )}
              mngIconsWidth="180px"
              condComponents={
                // <Box mb={1}>
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                  <AlignBox>
                    <Select
                      multiSelect
                      style={{ marginLeft: '-5px', width: '130px' }}
                      placeholder="중요도 선택"
                      options={[
                        { key: '', text: '중요도 선택', itemType: DropdownMenuItemType.Header },
                        { key: 'open', text: '높음' },
                        { key: 'progress', text: '보통' },
                        { key: 'finish', text: '낮음' },
                      ]}
                      onChange={(e, o) => console.log(o)}
                    />
                    <InputBox
                      type="text"
                      placeholder="내용/담당자..."
                      iconName="Search"
                      onChange={(e, text) => console.log('검색:', text)}
                    />
                  </AlignBox>
                  {/* </Box> */}
                </div>
              }
            />
          </div>,
        ]}
      />
    );
  }
}

const mapStateToProps = ({ case_ }) => {
  const { memo } = case_;
  return {
    memo,
  };
};
const mapDispatchToProps = {
  setReduxValues,
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemoList);
