import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Paper } from '@material-ui/core';
import Select from 'components/Select';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import { R, RU } from 'helpers/ramda';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { setReduxValues, setListFetchCustomer, setDetailBindCustomer } from 'app/routes/Customer/Redux/Action';

const { changeURL } = RU;

class List extends Component {
  componentDidMount() {
    const { setListFetchCustomer, setReduxValues } = this.props;

    setReduxValues({ _path: 'customer.list.search', searchValue: '' });

    setListFetchCustomer({
      searchValue: '',
    });
  }

  setListData = list => {
    return list.map(item => {
      return {
        Memberid: item.MemberID,
        Corporationid: item.CorporationID,
        CardType: item.CardType,
        customerType: '기타',
        Company: item.Company,
        Name: item.Name,
        MobilePhoneNumber: item.MobilePhoneNumber,
        Email: item.Email,
        PhoneNumber: item.PhoneNumber,
        claim: '1건',
        request: '2건/6건',
        consulation: '3건',
        contract: '1건',
      };
    });
  };

  render() {
    const { classes, customerMng, setReduxValues, setDetailBindCustomer, setListFetchCustomer } = this.props;
    const { isLoading } = customerMng;
    const { list } = customerMng.customer;
    const { searchValue } = list.search;

    return (
      <ContentCard
        contents={[
          <div className="row">
            <div className="col-md-12">
              <div className="paginatn-table left">
                <Table
                  isLoading={isLoading}
                  tableID="oqjfoqfjoqfjoqfjo"
                  initOrder="asc"
                  initOrderBy="Name"
                  condComponents={
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                      <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                        <Select
                          placeholder="고객 종류"
                          multiSelect
                          options={[
                            { key: '', text: '고객 종류', itemType: DropdownMenuItemType.Header },
                            { key: '1', text: '상담' },
                            { key: '2', text: '계약' },
                            { key: '3', text: '기타' },
                          ]}
                          onChange={(event, option, index) => console.log('고객종류', option)}
                        />
                      </div>

                      <div style={{ flexGorw: 1 }}>
                        <InputBox
                          type="text"
                          placeholder="고객명/회사명"
                          iconName="Search"
                          onChange={e => {
                            setReduxValues({ _path: 'customer.list.search', searchValue: e.target.value });
                          }}
                          handleSubmit={() => {
                            setListFetchCustomer({ searchValue });
                          }}
                        />
                      </div>
                    </div>
                  }
                  multiKey={['Memberid', 'Corporationid']}
                  mngIconsWidth="5%"
                  mngIcons={(id, n) => (
                    <>
                      <Button
                        size="square"
                        icon="description"
                        color="success"
                        onClick={e => {
                          // setReduxValues({
                          //   _path: 'customer',
                          //   nowMode: 'detail',
                          // });

                          // changeURL(`/elastic_search?q=${searchText}`);
                          changeURL(
                            `/customer/detail?MemberID=${n.Memberid}&CoporationID=${n.Corporationid}&CardType=${n.CardType}`,
                          );

                          // setDetailBindCustomer({
                          //   MemberID: n.Memberid,
                          //   CoporationID: n.Corporationid,
                          //   CardType: n.CardType,
                          // });
                        }}
                      />
                    </>
                  )}
                  rows={[
                    { id: 'Company', numeric: false, disablePadding: true, label: '소속 회사', width: '12%' },
                    { id: 'customerType', numeric: false, disablePadding: true, label: '고객 종류', width: '10%' },
                    { id: 'Name', numeric: false, disablePadding: true, label: '고객명', width: '12%' },
                    { id: 'MobilePhoneNumber', numeric: false, disablePadding: true, label: '핸드폰', width: '10%' },
                    { id: 'Email', numeric: false, disablePadding: true, label: '이메일', width: '12%' },
                    { id: 'PhoneNumber', numeric: false, disablePadding: true, label: '전화번호', width: '10%' },
                    { id: 'claim', numeric: false, disablePadding: true, label: '청구 건수', width: '8%' },
                    { id: 'request', numeric: false, disablePadding: true, label: '의뢰 건수', width: '8%' },
                    { id: 'contract', numeric: false, disablePadding: true, label: '계약 건수', width: '8%' },
                    { id: 'consulation', numeric: false, disablePadding: true, label: '상담 건수', width: '8%' },
                  ]}
                  data={this.setListData(list.list)}
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
    gridTemplateColumns: '1fr',
    padding: 30,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
});

const mapStateToProps = ({ customerMng }) => {
  return { customerMng };
};

const mapDispatchToProps = {
  setListFetchCustomer,
  setDetailBindCustomer,
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(List));
