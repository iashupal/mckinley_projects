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

class LawsuitCost extends React.Component {
  state = {
    nowMode: '',
    isOpenDetail: false,
    section1: '',
  };

  handleRadioValChange = event => {
    console.log(event.target.name);
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
            <h2>소송비용 계산</h2>
            <Button color="primary" mode="regular" onClick={() => {}}>
              <Box>소송비용: 소가/인지/송달료</Box>
            </Button>
          </div>
        }
        contents={[
          <div>
            <GridTable>
              <GridRow title="사건 구분" center>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'a'}
                    label="소송"
                    value="a"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'b'}
                    label="화해신청"
                    value="b"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section1"
                    checked={this.state.section1 === 'c'}
                    label="지급명령신청"
                    value="c"
                    onChange={this.handleRadioValChange}
                  />
                </div>
              </GridRow>
              <GridRow title="소가" center>
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  // value={moneyValue}
                  onValueChange={obj => console.log(obj.value)}
                  unit="원"
                />
              </GridRow>
              <GridRow title="심급" center>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'd'}
                    label="1심"
                    value="d"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'e'}
                    label="2심"
                    value="e"
                    onChange={this.handleRadioValChange}
                  />
                  <RadioButton
                    name="section2"
                    checked={this.state.section2 === 'f'}
                    label="3심"
                    value="f"
                    onChange={this.handleRadioValChange}
                  />
                </div>
              </GridRow>
              <GridRow title="담당자 수" center>
                <InputBoxNumber
                  width="200px"
                  // value={moneyValue}
                  decimalScale={0}
                  maxLength={5}
                  onValueChange={obj => console.log(obj.value)}
                  unit="명"
                />
              </GridRow>
              <GridRow title="사건종류 (송달료관련)" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <InputBox width="400px" />
                  <div style={{ marginLeft: '10px', marginTop: '2px' }}>
                    <Button color="primary" mode="regular" onClick={() => {}}>
                      찾아보기
                    </Button>
                  </div>
                </div>
              </GridRow>
              <GridRow title="변호사보수 약정액" center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <InputBoxNumber
                    width="200px"
                    thousandSeparator
                    // value={moneyValue}
                    onValueChange={obj => console.log(obj.value)}
                    unit="원"
                  />
                  <div style={{ marginLeft: '10px', marginTop: '2px' }}>
                    <Button color="primary" mode="regular" onClick={() => {}}>
                      변호사 보수표
                    </Button>
                  </div>
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
          <Table
            rows={[
              { id: '1', label: '구분', noSort: true },
              { id: '2', label: '비용', noSort: true, align: 'right', sum: true },
            ]}
            data={[
              {
                id: '1',
                1: '인지액',
                2: 4055000,
              },
              {
                id: '2',
                1: '송달료',
                2: 211500,
              },
              {
                id: '3',
                1: '변호사보수액',
                2: 10000000,
              },
            ]}
            hidePagination
            hideFilter
            totalSumRow
          />
          <div style={{ marginTop: '10px' }}>
            <GridTable>
              <GridRow title="소송비용" center>
                <div style={{ textAlign: 'left' }}>
                  소가 : 금 1,000,000,000 원 <br />
                  인지액 : 금 4,055,000원 [(1,000,000,000 x (35/10,000)} + 555,000원] x 1 x 1 <br />
                  송달료 : 금 211,500원 (3인 X 15회분 x 4,700) <br />
                  변호사 보수액 : 금 10,000,000원 <br />
                  소송비용 합계 : 금 14,266,500원 (4,055,000+211,500+10,000,000) <br />
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

export default LawsuitCost;
