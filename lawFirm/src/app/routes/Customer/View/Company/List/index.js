import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Paper } from '@material-ui/core';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import AlignBox from 'components/AlignBox';
import { R, RU } from 'helpers/ramda';
import DialogLawFirmInfo from 'app/routes/Customer/View/ShareComponents/DialogLawFirmInfo';
import { setListFetchCompany, setDetailBindCompany, setReduxValues } from 'app/routes/Customer/Redux/Action';

const { changeURL } = RU;

class List extends Component {
  componentDidMount() {
    const { setListFetchCompany, customerMng, setReduxValues } = this.props;

    setReduxValues({ _path: 'company.list.search', searchValue: '' });
    setListFetchCompany({ searchValue: '' });
  }

  corRegNumberFormat = data => {
    const result = `${data.substr(0, 3)}-${data.substr(3, 2)}-${data.substr(5, 5)}`;

    return result;
  };

  render() {
    const { classes, customerMng, setDetailBindCompany, setReduxValues, setListFetchCompany } = this.props;
    const { isLoading } = customerMng;
    const { nowMode, list } = customerMng.company;
    const { searchValue } = list.search;

    return (
      <ContentCard
        customHeader={
          <AlignBox justifyContent="flex-end">
            <DialogLawFirmInfo buttonTitle="신규 단체/회사" title="단체/회사" dialogMode="create" icon="add_to_queue" />
          </AlignBox>
        }
        contents={[
          <div className="row">
            <div className="col-md-12">
              <div className="paginatn-table left">
                <Table
                  isLoading={isLoading}
                  tableID="ioqjefwoeifjwioej"
                  initOrder="asc"
                  initOrderBy="Name"
                  condComponents={
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                      <div style={{ flexGorw: 1 }}>
                        <InputBox
                          type="text"
                          value={searchValue}
                          placeholder="단체/회사명"
                          iconName="Search"
                          onChange={e => {
                            setReduxValues({ _path: 'company.list.search', searchValue: e.target.value });
                          }}
                          handleSubmit={() => {
                            setListFetchCompany({ searchValue });
                          }}
                        />
                      </div>
                    </div>
                  }
                  multiKey={['CardID']}
                  mngIconsWidth="5%"
                  mngIcons={(id, n) => (
                    <>
                      <Button
                        size="square"
                        icon="description"
                        color="success"
                        onClick={async e => {
                          await setReduxValues({
                            _path: 'company',
                            nowMode: 'detail',
                          });

                          // await setDetailBindCompany({
                          //   cardID: n.CardID,
                          //   searchValue: '',
                          // });

                          changeURL(`/company/detail?cardID=${n.CardID}`);
                        }}
                      />
                    </>
                  )}
                  customColumn={[
                    {
                      field: 'CorRegNumber',
                      component: ({ row }) => <div>{this.corRegNumberFormat(row.CorRegNumber)}</div>,
                    },
                  ]}
                  rows={[
                    { id: 'Name', numeric: false, type: 'text', disablePadding: true, label: '회사명', width: '15%' },
                    {
                      id: 'RepresentativeName',
                      numeric: false,
                      type: 'text',
                      disablePadding: true,
                      label: '대표',
                      width: '10%',
                    },
                    {
                      id: 'PhoneNumber',
                      numeric: false,
                      type: 'text',
                      disablePadding: true,
                      label: '전화번호',
                    },
                    {
                      id: 'CorRegNumber',
                      numeric: false,
                      type: 'text',
                      disablePadding: true,
                      label: '사업자 등록 번호',
                    },
                    { id: 'FaxNumber', numeric: false, type: 'text', disablePadding: true, label: '팩스' },
                    { id: 'Email', numeric: false, type: 'text', disablePadding: true, label: '이메일', width: '15%' },
                    {
                      id: 'Address',
                      numeric: false,
                      type: 'text',
                      disablePadding: true,
                      align: 'left',
                      label: '주소',
                      width: '25%',
                    },
                  ]}
                  data={list.list}
                />
              </div>
            </div>
          </div>,
        ]}
      />
    );
  }
}

const styles = theme => ({
  container: {
    padding: 20,
    borderRadius: '8px',
  },
});

const mapStateToProps = ({ customerMng }) => {
  return { customerMng };
};

const mapDispatchToProps = {
  setListFetchCompany,
  setDetailBindCompany,
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(List));
