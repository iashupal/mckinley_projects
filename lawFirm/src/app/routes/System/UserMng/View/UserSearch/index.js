import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import produce from 'immer';
import { R, RU } from 'helpers/ramda';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import AlignBox from 'components/AlignBox';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import Select from 'components/Select';
import Table from 'components/Table/EnhancedTable';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { setReduxValues, setListFetch, setDetailBind, setSelect } from '../../Redux/Action';

const { changeURL, mlMessage } = RU;

class UserSearch extends Component {
  componentDidMount = async () => {
    const { setListFetch, userMng, setReduxValues } = this.props;
    const { workingStatus, roleCode, keyword, employeeType } = userMng.search;

    if (userMng.nowMode === 'create' || userMng.nowMode === 'mod') {
      await setReduxValues({
        nowMode: 'list',
      });
    }

    await setListFetch({
      workingStatus,
      roleCode,
      employeeType,
      keyword,
    });
  };

  AddComma = data => {
    return Number(data).toLocaleString('en');
  };

  setListData = list => {
    return list.map(item => {
      return {
        id: item.UserID,
        FullName: item.FullName,
        Email: item.Email,
        employeeType: item.EmployeeType,
        OfficeMobilePhoneNumber: item.OfficeMobilePhoneNumber,
        TimeCharge: item.TimeCharge,
        WorkingStatus: item.WorkingStatus,
        CreateDate: item.CreateDate,
      };
    });
  };

  render() {
    const {
      classes,
      common,
      settings,
      setReduxValues,
      setListFetch,
      setDetailBind,
      userMng,
      setSelect,
      searchRoleList,
    } = this.props;
    const { roleList, allCodes } = common;
    const { workingStatus, roleCode, employeeType, keyword } = userMng.search;

    return (
      <div>
        {userMng.nowMode === 'list' && (
          <ContentCard
            title={mlMessage('pages.UserMng')}
            customHeader={
              <AlignBox>
                <AlignBox />
                <AlignBox>
                  <Button
                    icon="add_to_queue"
                    color="primary"
                    onClick={() => {
                      setReduxValues({
                        nowMode: 'create',
                      });
                      setDetailBind({});
                      changeURL('/UserMng/save');
                    }}
                  >
                    <Box pr={1}>{mlMessage('pages.UserMng.createBtn')}</Box>
                  </Button>
                </AlignBox>
              </AlignBox>
            }
            contents={[
              <div>
                <div className="paginatn-table">
                  <Table
                    condComponents={
                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                        <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                          <Select
                            placeholder={mlMessage('pages.UserMng.isRole')}
                            multiSelect
                            selectedKeys={roleCode}
                            options={
                              (settings.locale.locale === 'ko' &&
                                R.prepend(
                                  {
                                    key: '',
                                    text: mlMessage('pages.UserMng.isRole'),
                                    itemType: DropdownMenuItemType.Header,
                                  },
                                  roleList.map(list => ({
                                    key: list.RoleCode,
                                    text: list.RoleNameKor,
                                  })),
                                )) ||
                              (settings.locale.locale === 'en' &&
                                R.prepend(
                                  {
                                    key: '',
                                    text: mlMessage('pages.UserMng.isRole'),
                                    itemType: DropdownMenuItemType.Header,
                                  },
                                  roleList.map(list => ({
                                    key: list.RoleCode,
                                    text: list.RoleNameEng,
                                  })),
                                ))
                            }
                            onChange={async (e, o) => {
                              await setSelect({
                                list: 'roleCode',
                                name: 'search',
                                o,
                              });

                              await setListFetch({
                                workingStatus,
                                roleCode: this.props.searchRoleList,
                                employeeType,
                                keyword,
                              });
                            }}
                          />
                        </div>

                        <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                          <Select
                            placeholder={mlMessage('pages.UserMng.selectType')}
                            multiSelect
                            selectedKeys={employeeType}
                            options={
                              allCodes.EMPTYPE &&
                              R.prepend(
                                {
                                  key: '',
                                  text: mlMessage('pages.UserMng.selectType'),
                                  itemType: DropdownMenuItemType.Header,
                                },
                                allCodes.EMPTYPE.map(list => ({
                                  key: list.FullCode,
                                  text: list.CodeName,
                                })),
                              )
                            }
                            onChange={async (e, o) => {
                              await setSelect({
                                list: 'employeeType',
                                name: 'search',
                                o,
                              });

                              await setListFetch({
                                workingStatus,
                                roleCode,
                                employeeType: this.props.searchEmployeeType,
                                keyword,
                              });
                            }}
                          />
                        </div>

                        <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                          <Select
                            placeholder={mlMessage('pages.UserMng.isWorking')}
                            multiSelect
                            selectedKeys={workingStatus}
                            options={
                              allCodes.WORKST &&
                              R.prepend(
                                {
                                  key: '',
                                  text: mlMessage('pages.UserMng.isWorking'),
                                  itemType: DropdownMenuItemType.Header,
                                },
                                allCodes.WORKST.map(list => ({
                                  key: list.FullCode,
                                  text: list.CodeName,
                                })),
                              )
                            }
                            onChange={async (e, o) => {
                              await setSelect({
                                list: 'workingStatus',
                                name: 'search',
                                o,
                              });

                              await setListFetch({
                                workingStatus: this.props.searchWorkingList,
                                roleCode,
                                employeeType,
                                keyword,
                              });
                            }}
                          />
                        </div>
                        <div style={{ flexGorw: 1 }}>
                          <InputBox
                            type="text"
                            placeholder={mlMessage('pages.UserMng.searchKeyword')}
                            iconName="Search"
                            onChange={text =>
                              setReduxValues({
                                _path: 'search',
                                keyword: text.target.value,
                              })
                            }
                            handleSubmit={() =>
                              setListFetch({
                                workingStatus,
                                roleCode,
                                employeeType,
                                keyword,
                              })
                            }
                          />
                        </div>
                      </div>
                    }
                    mngIconsWidth="50px"
                    mngIcons={id => (
                      <>
                        {
                          // 상세 페이지 삭제로 인해서 버튼 삭제
                          /* <Button
                                size="square"
                                icon="description"
                                color="success"
                                onClick={() =>{
                                  
                              setReduxValues({
                                nowMode : 'detail'
                              })
                              setDetailBind({
                                EmployeeUserID : id
                              })
                            }} /> */
                        }
                        <Button
                          size="square"
                          icon="border_color"
                          color="success"
                          onClick={() => {
                            setReduxValues({
                              nowMode: 'mod',
                            });
                            setDetailBind({
                              EmployeeUserID: id,
                            });
                            changeURL('/UserMng/save');
                          }}
                        />
                      </>
                    )}
                    initOrder="desc"
                    initOrderBy="FullName"
                    isLoading={userMng.loading}
                    rows={[
                      {
                        id: 'FullName',
                        numeric: false,
                        disablePadding: true,
                        label: mlMessage('pages.common.name'),
                        width: '15%',
                      },
                      {
                        id: 'Email',
                        numeric: false,
                        disablePadding: true,
                        label: mlMessage('pages.common.email'),
                        width: '20%',
                      },
                      {
                        id: 'employeeType',
                        numeric: false,
                        disablePadding: true,
                        label: mlMessage('pages.common.employeeType'),
                        width: '10%',
                      },
                      {
                        id: 'OfficeMobilePhoneNumber',
                        numeric: false,
                        disablePadding: true,
                        label: mlMessage('user.profile.name.phone'),
                        width: '15%',
                      },
                      {
                        id: 'TimeCharge',
                        numeric: false,
                        disablePadding: true,
                        label: mlMessage('pages.common.timeCharge'),
                        width: '20%',
                        align: 'right',
                      },
                      {
                        id: 'WorkingStatus',
                        numeric: false,
                        disablePadding: true,
                        label: mlMessage('pages.common.workingStatus'),
                        width: '10%',
                      },
                      {
                        id: 'CreateDate',
                        numeric: false,
                        disablePadding: true,
                        label: mlMessage('pages.common.createDate'),
                        width: '25%',
                      },
                    ]}
                    data={this.setListData(userMng.list)}
                  />
                </div>
              </div>,
            ]}
          />
        )}

        {/* 
              // 상세 페이지 삭제로 인해서 삭제
            {
              userMng.nowMode === 'detail' && (
                <div>
                  <UserSearchDetail 
                    title='사용자 상세 조회'
                />
                
                  <AlignBox style={{
                    marginTop:'15px',
                  }}>
                    <AlignBox 
                      style={{
                      margin : '0px auto'
                    }}>
                      <Box className="center">
                        <Button
                          color="primary"
                          size="large"
                          onClick={() => {
                            setReduxValues({
                              nowMode: 'mod',
                            })
                            changeURL('/UserMng/save');
                    }}>
                          <Box pl={5} pr={5}>
                            {mlMessage('pages.common.button.mod')}
                          </Box>
                        </Button>
                      </Box>
                      <Box className="center">
                        <Button
                          color="inverted"
                          size="large"
                          onClick={() => {
                            setReduxValues({
                              nowMode: 'list',
                            })
              }}>
                          <Box pl={5} pr={5}>
                            {mlMessage('pages.common.button.cancel')}
                          </Box>
                        </Button>
                      </Box>
                    </AlignBox>
                  </AlignBox>
                </div>
              )
            } */}
      </div>
    );
  }
}

const styles = theme => ({});

const mapStateToProps = ({ userMng, common, settings }) => {
  return { userMng, common, settings };
};

const mapDispatchToProps = {
  setReduxValues,
  setListFetch,
  setDetailBind,
  setSelect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserSearch));
