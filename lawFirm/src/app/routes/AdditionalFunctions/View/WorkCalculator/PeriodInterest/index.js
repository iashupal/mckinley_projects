import React from 'react';
import ContentCard from 'components/ContentCard';
import ListDetailContainer from 'components/ListDetailContainer';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import InputBox from 'components/InputBox';
import GridTable, { GridRow } from 'components/GridTable';
import RadioButton from 'components/RadioButton';
import Table from 'components/Table/EnhancedTable';
import DatePicker from 'components/DatePicker';
import InputBoxNumber from 'components/InputBoxNumber';

class PeriodInterest extends React.Component {
  state = {
    nowMode: '',
    isOpenDetail: false,
    section1: '',
    section2: '',
    section3: '',
    section4: '',
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
        customHeader={<h2>기간, 이자 계산</h2>}
        contents={[
          <div>
            <h3>날짜로 계산</h3>
            <GridTable>
              <GridRow title="초월 산입 여부" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'a'}
                    label="예"
                    value="a"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'b'}
                    label="아니오"
                    value="b"
                    onChange={this.handleRadioValChange}
                  />
                </div>
              </GridRow>
              <GridRow title="시작일" center>
                <div style={{ textAlign: 'left' }}>
                  <DatePicker />
                </div>
              </GridRow>
              <GridRow title="종료일" center>
                <div style={{ textAlign: 'left' }}>
                  <DatePicker />
                </div>
              </GridRow>
            </GridTable>
            <h3>시작일 기준 날짜로 계산</h3>
            <GridTable>
              <GridRow title="초월 산입 여부" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section2"
                    checked={this.state.section1 === 'c'}
                    label="예"
                    value="c"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section2"
                    checked={this.state.section1 === 'd'}
                    label="아니오"
                    value="d"
                    onChange={this.handleRadioValChange}
                  />
                </div>
              </GridRow>
              <GridRow title="시작일" center>
                <div style={{ textAlign: 'left' }}>
                  <DatePicker />
                </div>
              </GridRow>
              <GridRow title="기간" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section3"
                    checked={this.state.section3 === 'e'}
                    value="e"
                    onChange={this.handleRadioValChange}
                    label={<b>총</b>}
                  />
                  <div style={{ marginTop: '4px' }}>
                    <InputBoxNumber
                      width="70px"
                      // value={moneyValue}
                      decimalScale={0}
                      maxLength={5}
                      onValueChange={obj => console.log(obj.value)}
                      unit="일"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section3"
                    checked={this.state.section3 === 'f'}
                    value="f"
                    onChange={this.handleRadioValChange}
                    label={<b>총</b>}
                  />
                  <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4px' }}>
                    <InputBoxNumber
                      width="70px"
                      // value={moneyValue}
                      decimalScale={0}
                      maxLength={5}
                      onValueChange={obj => console.log(obj.value)}
                      unit="주"
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '14px' }}>
                      <InputBoxNumber
                        width="70px"
                        // value={moneyValue}
                        decimalScale={0}
                        maxLength={5}
                        onValueChange={obj => console.log(obj.value)}
                        unit="일"
                      />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section3"
                    checked={this.state.section3 === 'g'}
                    value="g"
                    onChange={this.handleRadioValChange}
                    label={<b>총</b>}
                  />
                  <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4px' }}>
                    <InputBoxNumber
                      width="70px"
                      // value={moneyValue}
                      decimalScale={0}
                      maxLength={5}
                      onValueChange={obj => console.log(obj.value)}
                      unit="개월"
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <InputBoxNumber
                        width="70px"
                        // value={moneyValue}
                        decimalScale={0}
                        maxLength={5}
                        onValueChange={obj => console.log(obj.value)}
                        unit="일"
                      />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section3"
                    checked={this.state.section3 === 'h'}
                    value="h"
                    onChange={this.handleRadioValChange}
                    label={<b>총</b>}
                  />
                  <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4px' }}>
                    <InputBoxNumber
                      width="70px"
                      // value={moneyValue}
                      decimalScale={0}
                      maxLength={5}
                      onValueChange={obj => console.log(obj.value)}
                      unit="년"
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '14px' }}>
                      <InputBoxNumber
                        width="70px"
                        // value={moneyValue}
                        decimalScale={0}
                        maxLength={5}
                        onValueChange={obj => console.log(obj.value)}
                        unit="개월"
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '14px' }}>
                      <InputBoxNumber
                        width="70px"
                        // value={moneyValue}
                        decimalScale={0}
                        maxLength={5}
                        onValueChange={obj => console.log(obj.value)}
                        unit="일"
                      />
                    </div>
                  </div>
                </div>
              </GridRow>
            </GridTable>
            <h3>이자 계산</h3>
            <GridTable>
              <GridRow title="원금" center>
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="원"
                />
              </GridRow>
              <GridRow title="1차 이율 적용기간" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    시작일 :
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <DatePicker />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    종료일 :
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <DatePicker />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    이율 연 :
                  </div>
                  <InputBoxNumber
                    width="100px"
                    // value={moneyValue}
                    onValueChange={obj => console.log(obj.value)}
                    unit="%"
                  />
                </div>
              </GridRow>
              <GridRow title="2차 이율 적용기간" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    시작일 :
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <DatePicker />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    종료일 :
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <DatePicker />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    이율 연 :
                  </div>
                  <InputBoxNumber
                    width="100px"
                    // value={moneyValue}
                    onValueChange={obj => console.log(obj.value)}
                    unit="%"
                  />
                </div>
              </GridRow>
              <GridRow title="3차 이율 적용기간" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    시작일 :
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <DatePicker />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    종료일 :
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <DatePicker />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    이율 연 :
                  </div>
                  <InputBoxNumber
                    width="100px"
                    // value={moneyValue}
                    onValueChange={obj => console.log(obj.value)}
                    unit="%"
                  />
                </div>
              </GridRow>
              <GridRow title="4차 이율 적용기간" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    시작일 :
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <DatePicker />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    종료일 :
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <DatePicker />
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    이율 연 :
                  </div>
                  <InputBoxNumber
                    width="100px"
                    // value={moneyValue}
                    onValueChange={obj => console.log(obj.value)}
                    unit="%"
                  />
                </div>
              </GridRow>
              <GridRow title="소수점" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    name="section4"
                    checked={this.state.section4 === 'a'}
                    label="소수점 이하 버림"
                    value="a"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section4"
                    checked={this.state.section4 === 'b'}
                    label="소수점 이하 2자리 표시"
                    value="b"
                    onChange={this.handleRadioValChange}
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
          <div>
            <h3>기간</h3>
            <GridTable>
              <GridRow title="날짜" center>
                <div style={{ textAlign: 'left' }}>
                  총 365일 <br />
                  총 52주 1일 <br />
                  총 12개월 0일 <br />
                  총 1년 0개월 0일 <br />
                </div>
              </GridRow>
              <GridRow title="시작일 기준 날짜" center>
                <div style={{ textAlign: 'left' }}>종료일 : 2019년 8월 12일</div>
              </GridRow>
            </GridTable>
          </div>
          <div style={{ marginTop: '15px' }}>
            <h3>이자</h3>
            <Table
              rows={[
                { id: '1', label: '구분', noSort: true },
                { id: '2', label: '경과일', noSort: true, align: 'right', type: 'number', sum: true },
                { id: '3', label: '이자', noSort: true, align: 'right', type: 'number', sum: true },
              ]}
              data={[
                {
                  id: '1',
                  1: '1차',
                  2: 31,
                  3: 424.657,
                },
                {
                  id: '2',
                  1: '2차',
                  2: 28,
                  3: 767.123,
                },
                {
                  id: '3',
                  1: '3차',
                  2: 0,
                  3: 0,
                },
                {
                  id: '4',
                  1: '4차',
                  2: 0,
                  3: 0,
                },
              ]}
              hidePagination
              hideFilter
              totalSumRow
            />
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

export default PeriodInterest;
