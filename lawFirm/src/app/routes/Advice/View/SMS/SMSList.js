import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import AlignBox from 'components/AlignBox';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import Fields from 'components/Fields';
import FieldRow from 'components/FieldRow';
import InputBox from 'components/InputBox';
import Select from 'components/Select';
import Button from 'components/Button';
import NumberFormat from 'react-number-format';
import { DropdownMenuItemType } from 'office-ui-fabric-react';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';

const { mlMessage } = RU;
class SMSList extends Component {
  render() {
    const { handleCommonAlertConfirmSet } = this.props;
    return (
      <div>
        <Table
          initOrder="desc"
          initOrderBy="name"
          rows={[{ id: 'name', label: '성명' }, { id: 'tel', label: '전화번호' }]}
          data={[
            { id: 1, name: '강대리', tel: '010-1111-2222' },
            { id: 2, name: '박변호', tel: '010-2222-3333' },
            { id: 3, name: '의뢰인', tel: '010-3333-4444' },
            { id: 4, name: '강대리', tel: '010-1111-2222' },
            { id: 5, name: '박변호', tel: '010-2222-3333' },
            { id: 6, name: '의뢰인', tel: '010-3333-4444' },
            { id: 7, name: '강대리', tel: '010-1111-2222' },
            { id: 8, name: '박변호', tel: '010-2222-3333' },
            { id: 9, name: '의뢰인', tel: '010-3333-4444' },
          ]}
          mngIcons={id => (
            <React.Fragment>
              <Button
                size="square"
                icon="delete"
                color="danger"
                onClick={() =>
                  handleCommonAlertConfirmSet({
                    msgObj: {
                      title: mlMessage('alertDialog.delete'),
                      contents: '',
                      isConfirm: true,
                    },
                    waitDatas: {
                      name: '',
                      value: {},
                    },
                  })
                }
              />
            </React.Fragment>
          )}
          mngIconsWidth="80px"
          condComponents={
            // <div style={{display: 'flex', flexGrow: 1,  alignItems: 'center', maxWidth: '500px'}}>
            <div style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
              <Select
                placeholder="유형 선택"
                options={[
                  { key: '', text: '유형 선택', itemType: DropdownMenuItemType.Header },
                  { key: 0, text: '변호사' },
                  { key: 1, text: '의뢰인' },
                ]}
                multiSelect
                style={{ paddingLeft: 0 }}
                onChange={(e, o) => {
                  console.log(o);
                }}
              />
              <Select
                placeholder="관련자 검색"
                options={[
                  { key: '', text: '관련자 검색', itemType: DropdownMenuItemType.Header },
                  { key: 0, text: '강대리' },
                  { key: 1, text: '박변호' },
                ]}
                multiSelect
                style={{ paddingLeft: 0, marginRight: '10px' }}
                onChange={(e, o) => {
                  console.log(o);
                }}
              />
              {/* <FieldRow rowTitle="수신 번호">
                <NumberFormat 
                  customInput={InputBox}
                  iconName="Add"
                  format="### #### ###"
                  onlyNumber
                  maxLength={13}
                    />
              </FieldRow> */}
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>수신 번호 :</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MaskedTextField
                    mask="***-****-****"
                    maskChar=""
                    maxLength="13"
                    iconProps={{ iconName: 'Add', style: { marginBottom: '5px' } }}
                  />
                </div>
              </div>
            </div>
          }
          hideFilter
        />
      </div>
    );
  }
}

const mapStateToProps = () => {};
const mapDispatchToProps = {
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SMSList);
