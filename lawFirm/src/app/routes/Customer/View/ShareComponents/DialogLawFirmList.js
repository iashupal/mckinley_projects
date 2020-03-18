import React from 'react';
import { R, RU } from 'helpers/ramda';
import { connect } from 'react-redux';
import DialogInfoForm from 'components/DialogInfoForm';
import ButtonN from 'components/ButtonN';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import { setReduxValues, checkInpuatDataCompany, setListFetchCommonCompany } from 'app/routes/Customer/Redux/Action';

class DialogLawFirmList extends React.Component {
  corRegNumberFormat = data => {
    const result = `${data.substr(0, 3)}-${data.substr(3, 2)}-${data.substr(5, 5)}`;

    return result;
  };

  render() {
    const { title, toggleDialog, setListFetchCommonCompany, setReduxValues, customerMng } = this.props;
    const { company } = customerMng;
    const { commonList, commonSearch } = company.list;
    const { searchValue } = commonSearch;

    return (
      <div className="mt-1" style={{ marginLeft: '-4px' }}>
        <ButtonN
          color="primary"
          onClick={async e => {
            await toggleDialog();
            await setListFetchCommonCompany({ searchValue: '' });
          }}
          label={title}
        />
        <DialogInfoForm
          title="단체/회사 공용 DB에서 조회"
          open={this.props.open}
          maxWidth="md"
          actions={
            <div className="mb-3">
              <ButtonN
                color="inverted"
                label="닫기"
                type="large"
                onClick={async e => {
                  await toggleDialog();
                  await setReduxValues({ _path: 'company.list.commonSearch', searchValue: '' });
                }}
              />
            </div>
          }
        >
          <div>
            <Table
              hideFilter
              initOrder="asc"
              initOrderBy="CorporationName"
              multiKey={['CorporationMasterID']}
              condComponents={
                <InputBox
                  type="text"
                  value={searchValue}
                  width="25%"
                  placeholder="단체.회사명/사업자번호"
                  iconName="Search"
                  onChange={e => {
                    setReduxValues({ _path: 'company.list.commonSearch', searchValue: e.target.value });
                  }}
                  handleSubmit={() => {
                    setListFetchCommonCompany({ searchValue });
                  }}
                />
              }
              rows={[
                { id: 'CorporationName', label: '회사명' },
                { id: 'CorRegNumber', label: '사업자 번호' },
                { id: 'RepresentativeName', label: '대표 이름' },
                { id: 'Address', label: '주소', align: 'left', width: '50%' },
              ]}
              data={commonList}
              customColumn={[
                {
                  field: 'CorporationName',
                  component: ({ row }) => (
                    <div
                      role="button"
                      tabIndex="0"
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={async e => {
                        await setReduxValues({
                          _path: 'company.save',
                          name: row.CorporationName,
                          representativeName: row.RepresentativeName,
                          email: row.Email,
                          corRegNumber: row.CorRegNumber,
                          phone: row.PhoneNumber,
                          zipCode: row.ZipCode,
                          address: row.Address,
                          detailAddress: row.Address2,
                          corporationMasterID: row.CorporationMasterID,
                        });
                        await toggleDialog();
                        await setReduxValues({ _path: 'company.list.commonSearch', searchValue: '' });
                      }}
                    >
                      {row.CorporationName}
                    </div>
                  ),
                },
                {
                  field: 'CorRegNumber',
                  component: ({ row }) => <div>{this.corRegNumberFormat(row.CorRegNumber)}</div>,
                },
                {
                  field: 'Address',
                  component: ({ row }) => (
                    <div>
                      {`
                      (${row.ZipCode === null ? '-' : row.ZipCode}) ${row.Address === null ? '' : row.Address} ${
                        row.Address2 === null ? '' : row.Address2
                      }
                      `}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </DialogInfoForm>
      </div>
    );
  }
}

const mapStateToProps = ({ customerMng }) => {
  return { customerMng };
};

const mapDispatchToProps = {
  setReduxValues,
  checkInpuatDataCompany,
  setListFetchCommonCompany,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialogLawFirmList);
