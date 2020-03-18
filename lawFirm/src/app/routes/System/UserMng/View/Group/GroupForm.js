import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputBox from 'components/InputBox';
import GridTable from 'components/GridTable';
import CheckBox from 'components/CheckBox';
import Select from 'components/Select';
import { setReduxValues } from '../../Redux/Action';

class GroupForm extends Component {
  render() {
    const { group, setReduxValues } = this.props;
    const { formMode, save } = group;
    const { groupName, isActive, groupMember } = save;
    const isCreate = formMode === 'create';
    const gridContents = [
      {
        title: '그룹명',
        child: (
          <InputBox
            value={groupName}
            onChange={e => {
              setReduxValues({ _path: 'group.save', groupName: e.target.value });
            }}
          />
        ),
      },
      {
        title: '인원',
        child: (
          <InputBox
            value={groupMember}
            onChange={e => {
              setReduxValues({
                _path: 'group.save',
                groupMember: e.target.value,
              });
            }}
          />
        ),
      },
      {
        title: '사용여부',
        child: (
          <Select
            placeholder="사용"
            selectedKey={groupMember}
            style={{ marginLeft: '-5px' }}
            options={[{ key: 0, text: '사용' }, { key: 1, text: '미사용' }]}
            onChange={(e, o) => console.log(o)}
          />
        ),
      },
      {
        title: '권한',
        child: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
            <CheckBox label="관리자" />
            <CheckBox label="사용자" />
            <CheckBox label="보고서" />
            <CheckBox label="청구" />
          </div>
        ),
      },
    ];

    const dataArray = gridContents.filter((value, index) => {
      if (index !== 2 || !isCreate) return value;
    });
    return <GridTable contents={dataArray} />;
  }
}

const mapStateToProps = ({ userMng }) => {
  const { group } = userMng;
  return {
    group,
  };
};
const mapDispatchToProps = {
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupForm);
