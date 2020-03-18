import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import ContentCard from 'components/ContentCard';
import ButtonN from 'components/ButtonN';
import Button from 'components/Button';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import GridTable, { GridRow } from 'components/GridTable';
import ListDetailContainer from 'components/ListDetailContainer';
import InputBoxNumber from 'components/InputBoxNumber';
import RadioButton from 'components/RadioButton';

const { mlMessage } = RU;

class CategoryManagement extends Component {
  state = {
    formMode: '',
    isOpenDetail: false,
    chargeType: '',
    standardExceed: '',
    VAT: '',
  };

  componentDidMount = () => {};

  render() {
    const { formMode, isOpenDetail, chargeType, standardExceed, VAT } = this.state;

    const fixedMonthUI = (
      <>
        <GridRow title="월" center>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              // value={contractDetail.litigationTimeCharge.advanceFee}
              onValueChange={obj => {}}
              unit="원"
            />
          </div>
        </GridRow>
      </>
    );

    const calculationUI = (
      <>
        <GridRow title="시간당" center>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              // value={contractDetail.litigationTimeCharge.advanceFee}
              onValueChange={obj => {}}
              unit="원"
            />
          </div>
        </GridRow>
      </>
    );

    const hybridUI = (
      <>
        <GridRow title="월 기본액" center>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              // value={contractDetail.litigationTimeCharge.advanceFee}
              onValueChange={obj => {}}
              unit="원"
            />
          </div>
        </GridRow>
        <GridRow title="월 상한액" center>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              // value={contractDetail.litigationTimeCharge.advanceFee}
              onValueChange={obj => {}}
              unit="원"
            />
          </div>
        </GridRow>
        <GridRow title="초과시 시간당" center>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              // value={contractDetail.litigationTimeCharge.advanceFee}
              onValueChange={obj => {}}
              unit="원"
            />
          </div>
        </GridRow>
        <GridRow title="기준 초과시" center>
          <div style={{ textAlign: 'left' }}>
            <RadioButton
              checked={standardExceed === '1'}
              label="상향 (낮은 -> 높은)"
              value="1"
              onChange={e => {
                this.setState({ standardExceed: e.target.value });
              }}
            />
            <RadioButton
              checked={standardExceed === '2'}
              label="하향(높은 -> 낮은)"
              value="2"
              onChange={e => {
                this.setState({ standardExceed: e.target.value });
              }}
            />
            <RadioButton
              checked={standardExceed === '3'}
              label="수행순서순"
              value="3"
              onChange={e => {
                this.setState({ standardExceed: e.target.value });
              }}
            />
          </div>
        </GridRow>
      </>
    );

    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <h2>타임시트 분류 항목 목록</h2>
            <ButtonN
              type="icon"
              icon="add_to_queue"
              color="primary"
              onClick={() => {
                this.setState({ isOpenDetail: true, formMode: 'create' });
                // this.setDetail('create');
              }}
              label="신규 분류"
            />
          </div>
        }
        contents={[
          <Table
            initOrder="desc"
            initOrderBy="contractDate"
            rows={[
              { id: '1', label: '항목 코드', width: '10%' },
              { id: '2', label: '항목 분류', align: 'left', width: '10%' },
              { id: '3', label: '설명', align: 'left', width: '35%' },
              { id: '4', label: '사용 권한', align: 'left', width: '15%' },
              { id: '5', label: '청구 요율', width: '10%' },
              { id: '6', label: '청구 종류', width: '10%' },
            ]}
            data={[
              { '1': 'M001', '2': '사건메모', '3': '법률활동메모', '4': '전체 사용가능', '5': '50/h', '6': '시간당' },
            ]}
            mngIcons={id => (
              <>
                <Button
                  size="square"
                  icon="border_color"
                  color="success"
                  onClick={() => {
                    this.setState({ isOpenDetail: true, formMode: 'mod' });
                  }}
                />
                <Button size="square" icon="delete" color="danger" onClick={() => {}} />
              </>
            )}
            mngIconsWidth="10%"
            // multiKey={['LFID', 'contractID']}
            // isLoading={isLoading}
          />,
        ]}
      />
    );

    const DetailComponent = (
      <GridTable>
        <GridRow title="항목 코드" center>
          <div style={{ textAlign: 'left' }}>
            <InputBox
              // value={contractDetail.common.contents}
              onChange={e => {}}
              handleSubmit={e => {
                //   this.handleSubmit();
              }}
              width="200px"
            />
          </div>
        </GridRow>
        <GridRow title="항목 분류명" center>
          <div style={{ textAlign: 'left' }}>
            <InputBox
              // value={contractDetail.common.contents}
              onChange={e => {}}
              handleSubmit={e => {
                //   this.handleSubmit();
              }}
              width="200px"
            />
          </div>
        </GridRow>
        <GridRow title="사용권한" center>
          <div style={{ displey: 'flex', flexWrap: 'wrap', textAlign: 'left', marginLeft: '-5px' }}>
            <ButtonN color="inverted" onClick={e => {}} label="권한 선택" />
          </div>
        </GridRow>
        <GridRow title="청구 유형" center>
          <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
            <RadioButton
              checked={chargeType === 'fixedMonth'}
              label="월고정"
              value="fixedMonth"
              onChange={e => {
                this.setState({ chargeType: e.target.value });
              }}
            />
            <RadioButton
              checked={chargeType === 'calculation'}
              label="실계산"
              value="calculation"
              onChange={e => {
                this.setState({ chargeType: e.target.value });
              }}
            />
            <RadioButton
              checked={chargeType === 'hybrid'}
              label="기본+추가"
              value="hybrid"
              onChange={e => {
                this.setState({ chargeType: e.target.value });
              }}
            />
          </div>
        </GridRow>
        {chargeType === 'fixedMonth' && fixedMonthUI}
        {chargeType === 'calculation' && calculationUI}
        {chargeType === 'hybrid' && hybridUI}
        <GridRow title="VAT 약정" center>
          <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
            <RadioButton
              checked={VAT === 'include'}
              label="VAT 포함"
              value="include"
              onChange={e => {
                this.setState({ VAT: e.target.value });
              }}
            />
            <RadioButton
              checked={VAT === 'exclude'}
              label="VAT 제외"
              value="exclude"
              onChange={e => {
                this.setState({ VAT: e.target.value });
              }}
            />
            <RadioButton
              checked={VAT === 'no'}
              label="VAT 없음"
              value="no"
              onChange={e => {
                this.setState({ VAT: e.target.value });
              }}
            />
          </div>
        </GridRow>
      </GridTable>
    );

    const DetailComponentBtn = (
      <>
        <ButtonN type="large" color="primary" onClick={e => {}} label="저장" />
        <ButtonN
          type="large"
          color="inverted"
          onClick={e => {
            this.setState({ isOpenDetail: false });
          }}
          label="취소"
        />
      </>
    );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={formMode === 'create' ? '타임시트 분류항목 저장' : '타임시트 분류항목 수정'}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => {}}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { MyLFID } = auth.authUser;
  return {
    MyLFID,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryManagement);
