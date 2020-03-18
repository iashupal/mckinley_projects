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
import RadioButton from 'components/RadioButton';
import InputBox from 'components/InputBox';
import AlignBox from 'components/AlignBox';
import GridTable, { GridRow } from 'components/GridTable';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import Select from 'components/Select';
import ButtonN from 'components/ButtonN';
import classnames from 'classnames';
import MultiLabel from 'components/AutoComplete/MultiLabel';
import AutoComplete, { AutoCompleteMultiLabel } from 'components/AutoComplete';
import DialogLawFirmInfo from 'app/routes/Customer/View/ShareComponents/DialogLawFirmInfo';
import DialogUserInfo from 'app/routes/Customer/View/ShareComponents/DialogUserInfo';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { setReduxValues, handleParty } from '../../Redux/Action';

class Party extends Component {
  state = { selectedValue: '' };

  handleChange = name => selected => {
    const { handleParty } = this.props;

    console.log(selected);

    handleParty({ selected });
  };

  render() {
    const { classes, autoComplete, case_, setReduxValues, MyLFID } = this.props;
    const { clientList } = autoComplete;
    const { selectedValue } = this.state;

    const { party } = case_.create;

    return (
      <Accordian
        title="당사자"
        contents={[
          <div className={classes.accordionFull}>
            <div className={classes.gridTable}>
              <GridTable>
                <GridRow title="지위">
                  <Select
                    selectedKey={0}
                    options={[
                      { key: 0, text: '고소인' },
                      { key: 1, text: '고시인(피해자)' },
                      { key: 2, text: '신청인' },
                      { key: 3, text: '원고' },
                      { key: 4, text: '채권자' },
                      { key: 5, text: '채무자' },
                      { key: 6, text: '피고' },
                    ]}
                    onChange={(event, option) => console.log(event, option, 'Selected')}
                  />
                </GridRow>
                <GridRow title="당사자 종류">
                  <RadioButton
                    checked={selectedValue === 'C'}
                    label="법인"
                    value="C"
                    name="customerGroup"
                    onChange={(event, checked) => {
                      this.setState({ selectedValue: 'C' });
                    }}
                  />
                  <RadioButton
                    checked={selectedValue === 'I'}
                    label="자연인"
                    value="I"
                    name="customerGroup"
                    onChange={(event, checked) => {
                      this.setState({ selectedValue: 'I' });
                    }}
                  />
                </GridRow>
                <GridRow title="당사자명">
                  <div className="d-flex">
                    <AutoComplete
                      serverAPI="/lawFirm/common/searchClientListForAutoCompleteServer"
                      serverParam={key => ({ LFID: MyLFID, CardType: selectedValue })}
                      //   options={clientList.filter(list => list.cardType === selectedValue)}
                      selectedOptions={party.clientList}
                      handleChange={this.handleChange()}
                    />
                    {selectedValue === 'C' && (
                      <DialogLawFirmInfo buttonTitle="신규 법인" title="법인" dialogMode="create" icon="add_to_queue" />
                    )}
                    {selectedValue === 'I' && (
                      <DialogUserInfo
                        buttonTitle="신규 자연인"
                        title="자연인"
                        dialogMode="create"
                        type="icon"
                        icon="add_to_queue"
                      />
                    )}
                  </div>
                </GridRow>
                <GridRow title="대리인">
                  <InputBox
                    value=""
                    placeholder="대리인"
                    maxLength={255}
                    onChange={e => {
                      console.log(e.target.value);
                    }}
                  />
                </GridRow>
                <GridRow title="대리인 연락처">
                  <InputBox
                    value=""
                    placeholder="대리인 연락처"
                    maxLength={255}
                    onChange={e => {
                      console.log(e.target.value);
                    }}
                  />
                </GridRow>
              </GridTable>

              <Form title="표시 의뢰인">
                <AlignBox>
                  <div className="d-flex align-items-center">
                    <InputBox
                      value={party.partyDesc}
                      width="300px"
                      maxLength={255}
                      onChange={e => {
                        setReduxValues({ _path: 'create.party', partyDesc: e.target.value });
                      }}
                    />
                    외 {party.clientList.length > 1 && party.clientList.length - 1}
                  </div>
                </AlignBox>
                <div className="accord2-rght">
                  <h3 className="">의뢰인 리스트</h3>
                </div>
                {/* <div
                  style={{
                    width: '100%',
                    padding: '5px 5px',
                    backgroundColor: 'white',
                    border: '1px solid #D3D3D3',
                    borderRadius: '5px',
                    overflow: 'overlay',
                    height: '145px',
                  }}
                > */}
                {/* <MultiLabel selectedOptions={party.clientList} handleRemove={this.handleChange({ mode: 'delete' })} /> */}
                <div style={{ width: '100%' }}>
                  <Table
                    height="260px"
                    hideFilter
                    tableID="qiojfiojf1029jfowiefj"
                    initOrder="asc"
                    initOrderBy="typeDesc"
                    // condComponents={
                    //   <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                    //     <AlignBox>
                    //       <div>
                    //         <Select
                    //           style={{ marginLeft: '-5px', width: 130 }}
                    //           multiSelect
                    //           selectedKeys={searchType}
                    //           placeholder="타입 선택"
                    //           options={[
                    //             { key: '', text: '타입 선택', itemType: DropdownMenuItemType.Header },
                    //             { key: 'AS', text: '보조' },
                    //             { key: 'RL', text: '수임' },
                    //             { key: 'RS', text: '수행' },
                    //           ]}
                    //           onChange={async (e, o) => {
                    //             const { key, text, selected } = o;

                    //             await this.setState(
                    //               produce(this.state, draft => {
                    //                 if (selected) {
                    //                   draft.searchType.push(key);
                    //                 } else {
                    //                   const removeIndex = draft.searchType.findIndex(a => a === key);
                    //                   if (removeIndex !== -1) draft.searchType.splice(removeIndex, 1);
                    //                 }
                    //                 this.handleSearchText(performer.list, searchText, draft.searchType);
                    //               }),
                    //             );
                    //           }}
                    //         />
                    //       </div>
                    //       <div>
                    //         <InputBox
                    //           placeholder="이름"
                    //           iconName="Search"
                    //           onChange={e =>
                    //             this.setState({
                    //               ...this.state,
                    //               searchText: e.target.value,
                    //             })
                    //           }
                    //           handleSubmit={e => {
                    //             this.handleSearchText(performer.list, searchText, searchType);
                    //           }}
                    //         />
                    //       </div>
                    //     </AlignBox>
                    //   </div>
                    // }
                    rows={[
                      { id: 'label', label: '의뢰인명', width: '70%' },
                      { id: 'cardType', label: '의뢰인 종류', width: '20%' },
                    ]}
                    data={party.clientList}
                    mngIcons={(id, rows) => (
                      <>
                        <Button
                          size="square"
                          icon="delete"
                          color="danger"
                          onClick={() => {
                            // handlePerformer({ mode: 'delete', selected: { value: id, label: rows.name } });
                          }}
                        />
                      </>
                    )}
                    mngIconsWidth="50px"
                  />
                </div>
                {/* </div> */}
              </Form>
            </div>
          </div>,
        ]}
      />
    );
  }
}

const styles = theme => ({
  initial: {
    display: 'grid',
  },
  accordionFull: {
    width: '100%',
    flex: 1,
  },
  gridTable: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
      paddingRight: '7px',
    },
  },
  btnMargin: {
    marginRight: 5,
    display: 'inline-block',
  },
  subBtnMargin: {
    float: 'left',
    marginLeft: 10,
  },
  accordRight: {
    width: '90%',
    marginLeft: '5px',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      width: '84%',
    },
  },
  select: {
    width: '50%',
    display: 'inline-block',
  },
  radioSelectContainer: {
    display: 'inline-block',
    float: 'left',
    width: '30%',
    marginTop: 0,
    marginLeft: 'auto',
    marginBottom: 0,
    marginRight: '15px',
    [theme.breakpoints.down('md')]: {
      width: '27%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
  radioSelectTitle: {
    position: 'relative',
    top: '10px',
    display: 'inline-block',
    verticalAlign: 'top',
    left: '5px',
  },
});

const mapStateToProps = ({ auth, case_, common }) => {
  const { MyLFID } = auth.authUser;
  const { allCodes, autoComplete } = common;
  return {
    allCodes,
    autoComplete,
    MyLFID,
    case_,
  };
};

const mapDispatchToProps = {
  handleParty,
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Party));
