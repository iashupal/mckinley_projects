import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Paper } from '@material-ui/core';
import Select from 'components/Select';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import ContentCard from 'components/ContentCard';
import AlignBox from 'components/AlignBox';
import { R, RU } from 'helpers/ramda';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import DialogUserInfo from 'app/routes/Customer/View/ShareComponents/DialogUserInfo';
import {
  setListFetchIndividual,
  setDetailBindCompany,
  setReduxValues,
  handleDataIndividual,
} from 'app/routes/Customer/Redux/Action';

const { changeURL, mlMessage } = RU;

class List extends Component {
  componentDidMount() {
    const { setListFetchIndividual, customerMng, setReduxValues } = this.props;

    setReduxValues({ _path: 'individual.list.search', searchValue: '' });

    setListFetchIndividual({
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
    const { classes, customerMng, setReduxValues, setListFetchIndividual, handleDataIndividual } = this.props;
    const { isLoading } = customerMng;
    const { nowMode, list } = customerMng.individual;
    const { searchValue } = list.search;

    return (
      <ContentCard
        customHeader={
          <AlignBox justifyContent="flex-end">
            <DialogUserInfo buttonTitle="신규 고객" title="고객" dialogMode="create" type="icon" icon="add_to_queue" />
          </AlignBox>
        }
        contents={[
          <div className="row">
            <div className="col-md-12">
              <div className="paginatn-table left">
                <Table
                  isLoading={isLoading}
                  tableID="pqfjweofhwr"
                  initOrder="asc"
                  initOrderBy="Name"
                  condComponents={
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                      <div style={{ flexGorw: 1 }}>
                        <InputBox
                          type="text"
                          value={searchValue}
                          placeholder="소속 회사/고객명"
                          iconName="Search"
                          onChange={e => {
                            setReduxValues({ _path: 'individual.list.search', searchValue: e.target.value });
                          }}
                          handleSubmit={() => {
                            setListFetchIndividual({ searchValue });
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
                        icon="border_color"
                        color="success"
                        onClick={async e => {
                          await handleDataIndividual({ memberidID: n.Memberid, corporationID: n.Corporationid });
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
    padding: 20,
    borderRadius: '8px',
  },
});

const mapStateToProps = ({ customerMng }) => {
  return { customerMng };
};

const mapDispatchToProps = {
  setListFetchIndividual,
  setReduxValues,
  handleDataIndividual,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(List));
