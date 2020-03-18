import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import ContentCard from 'components/ContentCard';
import Table from 'components/Table/EnhancedTable';
import AlignBox from 'components/AlignBox';
import Select from 'components/Select';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { RU } from 'helpers/ramda';
import { setReduxValues, handleFetch, setDetailBindList } from '../../Redux/Action';
import LitigationList from './LitigationList';
import AdviceList from './AdviceList';

const { parseQueryStr, mlMessage, changeURL } = RU;

class CaseSearch extends React.Component {
  state = {};

  componentDidMount = async () => {
    const { queryString, handleFetch, MyLFID, setReduxValues, case_ } = this.props;
    const { caseType } = queryString;
    const { searchValue, searchRL, statusCode, searchClient } = case_.list.search;
    await setReduxValues({ caseType });
    await setReduxValues({
      _path: 'list.search',
      searchValue: this.handleSearchValue(case_.caseType, caseType) ? searchValue : '',
      statusCode: this.handleSearchValue(case_.caseType, caseType) ? statusCode : [],
      searchRL: this.handleSearchValue(case_.caseType, caseType) ? searchRL : [],
      searchClient: this.handleSearchValue(case_.caseType, caseType) ? searchClient : [],
    });
    await handleFetch({
      LFID: MyLFID,
      caseType,
      searchValue: this.handleSearchValue(case_.caseType, caseType) ? searchValue : '',
      statusCode: this.handleSearchValue(case_.caseType, caseType) ? statusCode : [],
      searchRL: this.handleSearchValue(case_.caseType, caseType) ? searchRL : [],
      searchClient: this.handleSearchValue(case_.caseType, caseType) ? searchClient : [],
    });
  };

  toggleEditTab = () => {
    this.setState({ isEditTab: !this.state.isEditTab });
  };

  // 송무 <-> 자문 페이지 이동 시 검색어 핸들링 함수
  handleSearchValue = (prevCaseType, nowCaseType) => {
    return prevCaseType === nowCaseType;
  };

  render() {
    const { classes, search, setReduxValues, handleFetch, list, setDetailBindList, case_, MyLFID } = this.props;
    const { caseType, isLoading } = case_;
    const { searchValue, statusCode, searchRL, searchClient } = case_.list.search;
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
          <PageTitle icon="class">{caseType === 'L' ? '송무 조회' : '자문 조회'}</PageTitle>
        </Box>

        {caseType === 'L' ? (
          <LitigationList statusCode={statusCode} searchRL={searchRL} searchClient={searchClient} />
        ) : (
          <AdviceList statusCode={statusCode} searchRL={searchRL} searchClient={searchClient} />
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

const mapStateToProps = ({ case_, auth, router }) => {
  const { list } = case_;
  const { MyLFID } = auth.authUser;
  const { search } = list;
  const queryString = parseQueryStr(router.location.search);
  return {
    case_,
    queryString,
    list,
    MyLFID,
    search,
  };
};

const mapDispatchToProps = {
  setReduxValues,
  handleFetch,
  setDetailBindList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CaseSearch));
