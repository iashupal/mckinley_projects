import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import Select from 'components/Select';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import { setReduxValues, groupSetSelect, groupListFetch, groupDetailBind } from '../../Redux/Action';

class GroupList extends Component {
  setListData = list => {
    return list.map(item => {
      return {
        id: item.id,
        GroupName: item.GroupName,
        GroupMember: item.GroupMember,
        IsActive: item.IsActive === 0 ? '미사용' : '사용',
      };
    });
  };

  render() {
    const { setReduxValues, groupSetSelect, groupListFetch, groupDetailBind, group } = this.props;
    const { groupList, search, formMode } = group;
    const { searchIsActive, searchValue } = search;
    return (
      <ContentCard
        withButton
        title="title"
        customHeader={
          <AlignBox>
            <AlignBox>
              <h2>그룹 목록</h2>
            </AlignBox>
            <AlignBox>
              <Button
                icon="add_to_queue"
                color="primary"
                onClick={() =>
                  // setReduxValues({ _path: 'group', isOpenDetail: true, formMode: 'create' })
                  groupDetailBind({ formMode: 'create' })
                }
              >
                <Box pr={1}>신규 그룹</Box>
              </Button>
            </AlignBox>
          </AlignBox>
        }
        contents={[
          <div className="paginatn-table left">
            <Table
              initOrder="desc"
              initOrderBy="GroupName"
              condComponents={
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Select
                    style={{ marginLeft: '-5px', width: 130 }}
                    multiSelect
                    placeholder="사용 여부"
                    options={[
                      { key: '', text: '사용 여부', itemType: DropdownMenuItemType.Header },
                      { key: 1, text: '사용' },
                      { key: 0, text: '미사용' },
                    ]}
                    onChange={async (e, o) => {
                      await groupSetSelect({
                        list: 'searchIsActive',
                        o,
                      });
                      await groupListFetch({
                        searchIsActive: this.props.searchIsActive,
                        searchValue,
                      });
                    }}
                  />
                  <InputBox
                    placeholder="이름/인원"
                    iconName="Search"
                    value={searchValue}
                    onChange={e => {
                      setReduxValues({ _path: 'group.search', searchValue: e.target.value });
                    }}
                    handleSubmit={() => {
                      groupListFetch({
                        searchIsActive,
                        searchValue,
                      });
                    }}
                  />
                </div>
              }
              rows={[
                { id: 'GroupName', label: '이름', align: 'left' },
                { id: 'GroupMember', label: '인원', align: 'left' },
                { id: 'IsActive', label: '사용여부' },
              ]}
              mngIcons={id => (
                <Button
                  size="square"
                  icon="border_color"
                  color="success"
                  onClick={() => groupDetailBind({ formMode: 'mod', GroupID: id })}
                />
              )}
              mngIconsWidth="100px"
              data={this.setListData(groupList)}
            />
          </div>,
        ]}
      />
    );
  }
}

const mapStateToProps = ({ userMng }) => {
  const { group } = userMng;
  return {
    group,
  };
};
const mapDispatchToProps = {
  groupSetSelect,
  setReduxValues,
  groupListFetch,
  groupDetailBind,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupList);
