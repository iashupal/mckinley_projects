import React from 'react';
import ContentCard from 'components/ContentCard';
import ListDetailContainer from 'components/ListDetailContainer';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import NumberFormat from 'react-number-format';
import InputBox from 'components/InputBox';
import GridTable, { GridRow } from 'components/GridTable';
import RadioButton from 'components/RadioButton';
import Table from 'components/Table/EnhancedTable';
import InputBoxNumber from 'components/InputBoxNumber';

class SequestrationCost extends React.Component {
  state = {
    nowMode: '',
    isOpenDetail: false,
    section0: '',
    section1: '',
    section2: '',
    section3: '',
  };

  handleRadioValChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { nowMode, isOpenDetail } = this.state;

    const TableComponent = (
      <ContentCard
        title=""
        customHeader={<h2>가압류 비용산출</h2>}
        contents={[
          <div>
            <GridTable>
              <GridRow title="가압류 여부" center>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <RadioButton
                    name="section0"
                    checked={this.state.section0 === 'a'}
                    label="예"
                    value="a"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section0"
                    checked={this.state.section0 === 'b'}
                    label="아니오"
                    value="b"
                    onChange={this.handleRadioValChange}
                  />
                </div>
              </GridRow>
              <GridRow title="청구 금액" center>
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="원"
                />
              </GridRow>
              <GridRow title="담당자 수" center>
                <InputBoxNumber
                  width="70px"
                  // value={moneyValue}
                  decimalScale={0}
                  onValueChange={obj => console.log(obj.value)}
                  unit="명"
                />
              </GridRow>
              <GridRow title="신청인 지위" center>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'a'}
                    label="개인, 일반법인, 기타"
                    value="a"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'b'}
                    label="상장법인, 비상장 우량A업체"
                    value="b"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'c'}
                    label="금융기관, 국가, 지자체, 정부 투자기관"
                    value="c"
                    onChange={this.handleRadioValChange}
                  />
                </div>
              </GridRow>
            </GridTable>
            <GridTable>
              <GridRow
                title={
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'd'}
                    label="부동산"
                    value="d"
                    onChange={this.handleRadioValChange}
                  />
                }
              >
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="필지"
                />
              </GridRow>
              <GridRow
                title={
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'f'}
                    label="유체동산"
                    value="f"
                    onChange={this.handleRadioValChange}
                  />
                }
              />
              <GridRow
                title={
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'g'}
                    label="채권"
                    value="g"
                    onChange={this.handleRadioValChange}
                  />
                }
              >
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <RadioButton
                    name="section3"
                    checked={this.state.section3 === 'h'}
                    label="일반"
                    value="h"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section3"
                    checked={this.state.section3 === 'i'}
                    label="임금, 영업자예금채권"
                    value="i"
                    onChange={this.handleRadioValChange}
                  />
                </div>
              </GridRow>
              <GridRow
                title={
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'j'}
                    label="중기"
                    value="j"
                    onChange={this.handleRadioValChange}
                  />
                }
              >
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="대"
                />
              </GridRow>
              <GridRow
                title={
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'k'}
                    label="자동차"
                    value="k"
                    onChange={this.handleRadioValChange}
                  />
                }
              >
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="대"
                />
              </GridRow>
            </GridTable>
            <div style={{ textAlign: 'center' }}>
              <Button
                color="primary"
                onClick={() => {
                  this.setState({ ...this.state, isOpenDetail: true, nowMode: 'detail' });
                }}
              >
                <Box>계산</Box>
              </Button>
              <Button color="inverted" onClick={() => {}}>
                <Box>리셋</Box>
              </Button>
            </div>
          </div>,
        ]}
      />
    );
    const DetailComponent =
      nowMode === 'detail' ? (
        <div>
          <Table
            rows={[
              { id: '1', label: '구분', noSort: true },
              { id: '2', label: '전액현금공탁', noSort: true, align: 'right', sum: true },
              { id: '3', label: '전액보증보험공탁', noSort: true, align: 'right', sum: true },
              { id: '4', label: '일반적인경우', noSort: true, align: 'right', sum: true },
            ]}
            data={[
              {
                id: '1',
                1: '인지액',
                2: 10000,
                3: 10000,
                4: 10000,
              },
              {
                id: '2',
                1: '송달료',
                2: 28200,
                3: 28200,
                4: 28200,
              },
              {
                id: '3',
                1: '공탁금액(담보액)',
                2: 10000000,
                3: 0,
                4: 0,
              },
              {
                id: '4',
                1: '보증보험료',
                2: 0,
                3: 15100,
                4: 15100,
              },
              {
                id: '5',
                1: '등록세',
                2: 200000,
                3: 200000,
                4: 200000,
              },
              {
                id: '6',
                1: '교육세',
                2: 40000,
                3: 40000,
                4: 40000,
              },
              {
                id: '7',
                1: '수입증지',
                2: 0,
                3: 0,
                4: 0,
              },
            ]}
            hidePagination
            hideFilter
            totalSumRow
          />
          <div style={{ marginTop: '10px' }}>
            <GridTable>
              <GridRow title="전액현금공탁" center>
                <div style={{ textAlign: 'left' }}>
                  인지액 : 금 10,000원 <br />
                  송달료 : 금 28,200원 (2인x4,700x3회분) <br />
                  담보액: 금 10,000,000원 (100,000,000 x 1/10) <br />
                  등록세 : 금 200,000원 (100,000,000 x 2/1000) <br />
                  교육세 : 금 40,000원 (200,000 x 1/5) <br />
                  합계 : 금 10,278,200원 (10,000 + 28,200 + 10,000,000 + 200,000 + 400,000)
                </div>
              </GridRow>
              <GridRow title="전액보증보험공탁" center>
                <div style={{ textAlign: 'left' }}>
                  인지액 : 금 10,000원 <br />
                  송달료 : 금 28,200원 (2인x4,700x3회분) <br />
                  담보액: 금 10,000,000원 (100,000,000 x 1/10) <br />
                  등록세 : 금 200,000원 (100,000,000 x 2/1000) <br />
                  교육세 : 금 40,000원 (200,000 x 1/5) <br />
                  합계 : 금 10,278,200원 (10,000 + 28,200 + 10,000,000 + 200,000 + 400,000)
                </div>
              </GridRow>
              <GridRow title="일반적인경우" center>
                <div style={{ textAlign: 'left' }}>
                  인지액 : 금 10,000원 <br />
                  송달료 : 금 28,200원 (2인x4,700x3회분) <br />
                  담보액: 금 10,000,000원 (100,000,000 x 1/10) <br />
                  등록세 : 금 200,000원 (100,000,000 x 2/1000) <br />
                  교육세 : 금 40,000원 (200,000 x 1/5) <br />
                  합계 : 금 10,278,200원 (10,000 + 28,200 + 10,000,000 + 200,000 + 400,000)
                </div>
              </GridRow>
            </GridTable>
          </div>
        </div>
      ) : null;

    const DetailComponentBtn =
      nowMode === 'detail' ? (
        <Button
          color="inverted"
          size="large"
          mode="regular"
          onClick={() => {
            this.setState({ ...this.state, isOpenDetail: false });
          }}
        >
          <Box pl={5} pr={5}>
            닫기
          </Box>
        </Button>
      ) : null;

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={nowMode === 'detail' ? '산출결과 확인' : ''}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
        dialogBoxMaxWidth="lg"
        dialogfullWidth={false}
        DetailComponentWidth="600px"
      />
    );
  }
}

export default SequestrationCost;
