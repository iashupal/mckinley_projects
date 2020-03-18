import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { EditorW, BlankSpan } from 'helpers/ui';
import { RU } from 'helpers/ramda';
import produce from 'immer';
import ContentCard from 'components/ContentCard';
import Fields, { FieldItem } from 'components/Fields';
import DialogInfoForm from 'components/DialogInfoForm';
import DatePicker from 'components/DatePicker';
import Form from 'components/Form';
import Accordian from 'components/Accordian';
import Table from 'components/Table/EnhancedTable';
import { SetLS } from 'components/Table/TableUtils';
import InputBox from 'components/InputBox';
import AlignBox from 'components/AlignBox';
import GridTable, { GridRow } from 'components/GridTable';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import Select from 'components/Select';
import ButtonN from 'components/ButtonN';
import classnames from 'classnames';
import AutoComplete, { AutoCompleteMultiLabel } from 'components/AutoComplete';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { setReduxValues, setDetailBindCreate, setContractList, handlePerformer } from '../../Redux/Action';

class Performer extends Component {
  state = {
    selectedOption: {},
    searchText: '',
    searchType: [],
  };

  handleChange = name => async selected => {
    const { handlePerformer, case_ } = this.props;
    const { searchText, searchType } = this.state;
    const { type, typeDesc, list } = case_.create.performer;

    await handlePerformer({ type, typeDesc, selected });
    this.handleSearchText(this.props.case_.create.performer.list, searchText, searchType);
  };

  handleSearchText = (list, searchText, searchType) => {
    const { setReduxValues } = this.props;
    let searchListResult;

    if (!searchText && searchType.length === 0) {
      searchListResult = null;
    } else {
      searchListResult = list.filter(e => e.name.includes(searchText) && searchType.indexOf(e.type) !== -1);
    }

    setReduxValues({
      _path: 'create.performer',
      searchList: searchListResult,
    });
  };

  componentWillUnmount = () => {
    const { setReduxValues } = this.props;

    setReduxValues({
      _path: 'create.performer',
      searchList: null,
      type: 'AS',
      typeDesc: '보조',
    });
  };

  render() {
    const { selectedOption, searchText, searchType } = this.state;

    const { classes, case_, setReduxValues, autoComplete, handlePerformer } = this.props;
    const { caseType, create, common } = case_;
    const { performer } = create;
    const { list, searchList } = performer;

    return (
      <Accordian
        title="수행자"
        contents={[
          <div className="d-flex" style={{ width: '100%' }}>
            <div className="ml-5 mr-5" style={{ flexGrow: 3 }}>
              <div className="paginatn-table left">
                <Table
                  hideFilter
                  tableID="hehehehehehehehehe"
                  initOrder="asc"
                  initOrderBy="typeDesc"
                  condComponents={
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                      <AlignBox>
                        <div>
                          <Select
                            style={{ marginLeft: '-5px', width: 130 }}
                            multiSelect
                            selectedKeys={searchType}
                            placeholder="타입 선택"
                            options={[
                              { key: '', text: '타입 선택', itemType: DropdownMenuItemType.Header },
                              { key: 'AS', text: '보조' },
                              { key: 'RL', text: '수임' },
                              { key: 'RS', text: '수행' },
                            ]}
                            onChange={async (e, o) => {
                              const { key, text, selected } = o;

                              await this.setState(
                                produce(this.state, draft => {
                                  if (selected) {
                                    draft.searchType.push(key);
                                  } else {
                                    const removeIndex = draft.searchType.findIndex(a => a === key);
                                    if (removeIndex !== -1) draft.searchType.splice(removeIndex, 1);
                                  }
                                  this.handleSearchText(performer.list, searchText, draft.searchType);
                                }),
                              );
                            }}
                          />
                        </div>
                        <div>
                          <InputBox
                            placeholder="이름"
                            iconName="Search"
                            onChange={e =>
                              this.setState({
                                ...this.state,
                                searchText: e.target.value,
                              })
                            }
                            handleSubmit={e => {
                              this.handleSearchText(performer.list, searchText, searchType);
                            }}
                          />
                        </div>
                      </AlignBox>
                    </div>
                  }
                  rows={[{ id: 'typeDesc', label: '타입', width: '40%' }, { id: 'name', label: '이름', width: '40%' }]}
                  data={searchList || list}
                  mngIcons={(id, rows) => (
                    <>
                      <Button
                        size="square"
                        icon="delete"
                        color="danger"
                        onClick={() => {
                          handlePerformer({ mode: 'delete', selected: { value: id, label: rows.name } });
                        }}
                      />
                    </>
                  )}
                  mngIconsWidth="50px"
                />
              </div>
            </div>
            <div className="ml-3" style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', marginTop: '55px' }}>
                <Select
                  style={{ marginLeft: ' -5px' }}
                  selectedKey={performer.type}
                  options={[
                    { key: 'AS', text: '보조' },
                    { key: 'RL', text: '수임' },
                    { key: 'RS', text: '수행' },
                    { key: 'mainRS', text: '책임수행' },
                  ]}
                  onChange={(e, o) => {
                    setReduxValues({ _path: 'create.performer', type: o.key, typeDesc: o.text });
                  }}
                />
                <AutoComplete
                  options={autoComplete.lawFirmEmpList}
                  selectedOption={selectedOption}
                  handleChange={this.handleChange()}
                />
              </div>
            </div>
          </div>,
        ]}
      />
    );
  }
}

const styles = theme => ({});

const mapStateToProps = ({ auth, case_, common }) => {
  const { MyLFID } = auth.authUser;
  const { FirstName, LastName } = auth.authUser.MyLFIDInfo;
  const { allCodes, autoComplete } = common;
  return {
    FirstName,
    LastName,
    allCodes,
    autoComplete,
    MyLFID,
    case_,
  };
};

const mapDispatchToProps = {
  setDetailBindCreate,
  setContractList,
  setReduxValues,
  handlePerformer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Performer));
