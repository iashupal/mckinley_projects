import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import { R, RU } from 'helpers/ramda';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import Table, { IconButton } from 'components/Table/EnhancedTable';
import AlignBox from 'components/AlignBox';
import CheckBox from 'components/CheckBox';
import Select from 'components/Select';
import InputBox from 'components/InputBox';
import options from 'containers/CaseScreen/dummyData';
import FieldRow from 'components/FieldRow';
import Tab from 'components/Tab';
import UserCrate from './UserCreate';
import UserSearch from './UserSearch';
import Group from './Group';
import { setReduxValues, groupListFetch } from '../Redux/Action';

const { mlMessage } = RU;

class UserMng extends Component {
  state = {
    tab: 0,
  };

  componentDidMount() {
    const { groupListFetch, group } = this.props;

    groupListFetch({
      searchIsActive: [],
      searchValue: '',
    });
  }

  changeTab = tab => {
    this.setState({
      tab,
    });
  };

  render() {
    const { classes, setReduxValues, userMng, auth } = this.props;
    const { tab } = this.state;
    const { workingStatus, roleCode, keyword, employeeType } = userMng.search;
    const { search } = userMng.group;
    const { searchIsActive } = search;

    return (
      <div className={classes.container}>
        <Box
          mb={1}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <PageTitle icon="class">
            [{auth.authUser.MyLFIDInfo.LawFirmBrand}]{userMng.nowMode === 'list' && mlMessage('pages.UserMng')}
            {userMng.nowMode === 'detail' && mlMessage('pages.UserMng.search')}
            {userMng.nowMode === '그룹 관리' && mlMessage('pages.groupMng')}
          </PageTitle>
        </Box>

        <Tab
          text={mlMessage('pages.UserMng.user')}
          onClick={e => {
            setReduxValues({
              nowMode: 'list',
            });
            this.changeTab(0);
          }}
          selected={tab === 0}
        />

        <Tab
          text={mlMessage('pages.common.group')}
          onClick={e => {
            setReduxValues({
              nowMode: '그룹 관리',
            });
            this.changeTab(1);
          }}
          selected={tab === 1}
        />

        {tab === 1 && <Group searchIsActive={searchIsActive} />}

        {tab === 0 && (
          <UserSearch searchRoleList={roleCode} searchWorkingList={workingStatus} searchEmployeeType={employeeType} />
        )}
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    gridTemplateColumns: '1fr',
    padding: 30,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
});

const mapStateToProps = ({ userMng, auth }) => {
  return { userMng, auth };
};

const mapDispatchToProps = {
  setReduxValues,
  groupListFetch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserMng));
