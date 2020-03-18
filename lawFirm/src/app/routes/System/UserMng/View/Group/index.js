import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListDetailContainer from 'components/ListDetailContainer';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import GroupList from './GroupList';
import GroupForm from './GroupForm';
import { setReduxValues, groupCheckInputData } from '../../Redux/Action';

class Group extends Component {
  render() {
    const { group, setReduxValues, groupCheckInputData, searchIsActive } = this.props;
    const { formMode, save } = group;
    const { isOpenDetail } = group;
    const TableComponent = <GroupList searchIsActive={searchIsActive} />;
    const DetailComponent = <GroupForm />;
    const DetailComponentBtn = (
      <>
        <Button
          
          size="large"
          mode="regular"
          color="primary"
          onClick={() => groupCheckInputData({ formMode, save })}
        >
          <Box pl={5} pr={5}>
            저장
          </Box>
        </Button>
        <Button
          color="inverted"
          size="large"
          mode="regular"
          onClick={() => setReduxValues({ _path: 'group', isOpenDetail: false })}
        >
          <Box pl={5} pr={5}>
            닫기
          </Box>
        </Button>
      </>
    );
    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={formMode === 'create' ? '그룹 등록' : '그룹 수정'}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => setReduxValues({ _path: 'group', isOpenDetail: false })}
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
  setReduxValues,
  groupCheckInputData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Group);
