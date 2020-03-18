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

class ValueOfRealProperty extends React.Component {
  state = {
    nowMode: '',
    isOpenDetail: false,
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
        customHeader={
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <h2>부동산 가액 산출</h2>
            <Button color="primary" mode="regular" onClick={() => {}}>
              <Box>소송비용: 소가/인지/송달료</Box>
            </Button>
          </div>
        }
        contents={[
          <div>
            <GridTable>
              <GridRow
                title={
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'a'}
                    label="일반"
                    value="a"
                    onChange={this.handleRadioValChange}
                  />
                }
              />
              <GridRow
                title={
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'b'}
                    label="공동주택가격 공시액"
                    value="b"
                    onChange={this.handleRadioValChange}
                  />
                }
              >
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="원"
                />
              </GridRow>
            </GridTable>
            <h3>건물</h3>
            <GridTable>
              <GridRow title="신축가격 기준액" center>
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="원"
                />
              </GridRow>
              <GridRow title="신축 년도" center>
                <InputBoxNumber
                  width="70px"
                  // value={moneyValue}
                  decimalScale={0}
                  maxLength={4}
                  onValueChange={obj => console.log(obj.value)}
                  unit="년"
                />
              </GridRow>
              <GridRow title="구조" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <InputBox width="200px" />
                </div>
              </GridRow>
              <GridRow title="용도" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <InputBox width="200px" />
                </div>
              </GridRow>
              <GridRow title="면적" center>
                <InputBoxNumber
                  width="70px"
                  // value={moneyValue}
                  decimalScale={0}
                  thousandSeparator
                  onValueChange={obj => console.log(obj.value)}
                  unit="㎡"
                />
              </GridRow>
              <GridRow title="부속토지가격 (개발공시지가)" center>
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="원/㎡"
                />
              </GridRow>
            </GridTable>
            <h3>토지</h3>
            <GridTable>
              <GridRow title="면적" center>
                <InputBoxNumber
                  width="70px"
                  // value={moneyValue}
                  decimalScale={0}
                  thousandSeparator
                  onValueChange={obj => console.log(obj.value)}
                  unit="㎡"
                />
              </GridRow>
              <GridRow title="개별공시지가" center>
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="원/㎡"
                />
              </GridRow>
            </GridTable>

            <h3>부동산 관련 소가산정</h3>
            <h6>(인지규칙 제9조 할인율 : 50/100)</h6>
            <GridTable>
              <GridRow title="소송형태" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'c'}
                    label="확인의 소"
                    value="c"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'd'}
                    label="인도.명도.방해해제"
                    value="d"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'e'}
                    label="상린관계"
                    value="e"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'f'}
                    label="공유물 분할"
                    value="f"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'g'}
                    label="등기 청구"
                    value="g"
                    onChange={this.handleRadioValChange}
                  />
                </div>
              </GridRow>
              <GridRow title="원고 지분" center>
                <div style={{ textAlign: 'left' }}>
                  <RadioButton
                    name="section3"
                    checked={this.state.section3 === 'h'}
                    label="100%"
                    value="h"
                    onChange={this.handleRadioValChange}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section3"
                    checked={this.state.section3 === 'i'}
                    value="i"
                    onChange={this.handleRadioValChange}
                  />
                  <InputBoxNumber
                    width="100px"
                    // value={moneyValue}
                    onValueChange={obj => console.log(obj.value)}
                    unit="%"
                  />
                </div>
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
          <h3>건축물 가액</h3>
          <Table
            rows={[
              { id: '1', label: '구분', noSort: true },
              { id: '2', label: '내용', noSort: true, align: 'right', type: 'number' },
              { id: '3', label: '지수', noSort: true, align: 'right', type: 'number' },
            ]}
            data={[
              {
                id: '1',
                1: '신축건물 기준가액',
                2: 7100000,
                3: 0,
              },
              {
                id: '2',
                1: '구조',
                2: '컨테이너',
                3: 30,
              },
              {
                id: '3',
                1: '용도',
                2: '주거시설',
                3: 110,
              },
              {
                id: '4',
                1: '개별공시지가 (위치)',
                2: 100000000,
                3: 110,
              },
              {
                id: '5',
                1: '신축년도 (잔가율)',
                2: 2016,
                3: 0.73,
              },
              {
                id: '6',
                1: 'm² 당 건축물 가액',
                2: 273000,
                3: 0,
              },
              {
                id: '7',
                1: '건축물 면적',
                2: 100,
                3: 0,
              },
              {
                id: '8',
                1: '건축물 가액',
                2: 273000000,
                3: 0,
                _style: { backgroundColor: 'pink', fontWeight: 'bold' },
              },
            ]}
            hidePagination
            hideFilter
          />

          <div style={{ marginTop: '15px' }}>
            <h3>토지 가액합</h3>
            <Table
              rows={[
                { id: '1', label: '구분', noSort: true },
                { id: '2', label: '내용', noSort: true, align: 'right', type: 'number' },
              ]}
              data={[
                {
                  id: '1',
                  1: 'm² 당 건축물 가액',
                  2: 1000000,
                },
                {
                  id: '2',
                  1: '토지면적',
                  2: 100,
                },
                {
                  id: '3',
                  1: '토지가액',
                  2: 1000000 * 100,
                  _style: { backgroundColor: 'pink', fontWeight: 'bold' },
                },
              ]}
              hidePagination
              hideFilter
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <h3>목적물 가액합</h3>
            <Table
              rows={[
                { id: '1', label: '구분', noSort: true },
                { id: '2', label: '내용', noSort: true, align: 'right', type: 'number' },
              ]}
              data={[
                {
                  id: '1',
                  1: '목적물 가액합',
                  2: 10027300000,
                },
                {
                  id: '2',
                  1: '인지규칙 제9조 할인율',
                  2: 50 / 100,
                },
                {
                  id: '3',
                  1: '목적물 가액합',
                  2: 10027300000 * (50 / 100),
                  _style: { backgroundColor: 'pink', fontWeight: 'bold' },
                },
              ]}
              hidePagination
              hideFilter
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <h3>소가/인지액</h3>
            <Table
              rows={[
                { id: '1', label: '구분', noSort: true },
                { id: '2', label: '내용', noSort: true, align: 'right', type: 'number' },
              ]}
              data={[
                {
                  id: '1',
                  1: '목적물 가액합',
                  2: 5013650000,
                },
                {
                  id: '2',
                  1: '지분',
                  2: 0,
                },
                {
                  id: '3',
                  1: '소송형태별 할인율',
                  2: 0,
                },
                {
                  id: '4',
                  1: '소가',
                  2: 0,
                },
                {
                  id: '5',
                  1: '인지액',
                  2: 0,
                },
              ]}
              hidePagination
              hideFilter
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <GridTable>
              <GridRow title="소송비용" center>
                <div style={{ textAlign: 'left' }}>
                  건축물 가액 <br />
                  <br />
                  ○ 건물신축기준가액 : 710,000원 <br />
                  ○ 구조 : 컨테이너건물 지수:30 <br />
                  ○ 용도 : 주거시설 지수:110 <br />
                  ○ 개별공시지가(위치) : 100,000,000 원/m² <br />
                  ○ 신축년도 : 2016 잔가율 : 0.73 <br />
                  ○ m²당 건축물 가액 : 273,000원 <br />
                  ○ 건축물 면적 : 100 m² <br />
                  ○ 건축물 가액 : 27,300,000원 <br />
                  <br />
                  ----------------------------------------------->
                  <br />
                  <br />
                  토지 가액
                  <br />
                  <br />
                  ○ m²당 개별공시지가 : 100,000,000원
                  <br />
                  ○ 토지 면적 : 100 m²
                  <br />
                  ○ 토지 가액 : 10,000,000,00원
                  <br />
                  <br />
                  ----------------------------------------------->
                  <br />
                  <br />
                  ○ 금 5,013,650,000원
                  <br />
                  (10,027,300,000원 X 50/100)
                </div>
              </GridRow>
            </GridTable>
          </div>
        </div>
      ) : null;

    const DetailComponentBtn =
      nowMode === 'detail' ? (
        <>
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
        </>
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

export default ValueOfRealProperty;
