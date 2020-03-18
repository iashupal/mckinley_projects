import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import DatePicker from '../../components/DatePicker';
import Button from '../../components/Button';
import ContentCard from '../../components/ContentCard';
import Accordian from '../../components/Accordian';
import FieldRow from '../../components/FieldRow';
import Select from '../../components/Select';
import GridTable from '../../components/GridTable';
import AlignBox from '../../components/AlignBox';
import Form from '../../components/Form';
import InputBox from '../../components/InputBox';
import RadioButton from '../../components/RadioButton';
import CheckBox from '../../components/CheckBox';
import options from './dummyData';

class EditCaseTab extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.initial}>
        <ContentCard
          title="사건 기본 정보"
          contents={[
            <div className={classes.caseDetailsContainer}>
              <FieldRow rowTitle="사건 고유 번호">0001</FieldRow>
              <FieldRow rowTitle="사건 계약서">[계약서 링크]</FieldRow>
              <FieldRow rowTitle="사건 설명" />
              <Box mb={3} style={{ padding: 10, width: '95%', backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                <Box mb={1} display="flex" flexDirection="row">
                  <Select placeholder="Font" options={options} onChange={value => console.log(value)} />
                  <Box
                    p={1}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      border: '30px',
                      boxShadow: '3px 3px 3px 0px #e8e8e8',
                    }}
                    display="inline-block"
                    flexDirection="row"
                  >
                    <Button size="small" icon="format_bold" />
                    <Button size="small" icon="format_italic" />
                    <Button size="small" icon="format_underlined" />
                    <Button size="small" icon="format_strikethrough" />
                  </Box>
                  <Box
                    p={1}
                    ml={2}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      border: '30px',
                      boxShadow: '3px 3px 3px 0px #e8e8e8',
                    }}
                    display="inline-block"
                    flexDirection="row"
                  >
                    <Button size="small" icon="format_align_left" />
                    <Button size="small" icon="format_align_center" />
                    <Button size="small" icon="format_align_right" />
                    <Button size="small" icon="format_align_justify" />
                  </Box>
                </Box>
                <Box ml={0.5} style={{ width: '95%' }}>
                  <InputBox multiline rows="5" placeholder="주주권 확인 사건..." onChange={text => console.log(text)} />
                </Box>
              </Box>

              <div />
            </div>,
            <div className={classes.caseDetailsRight}>
              <FieldRow rowTitle="사건 상태">
                <Select placeholder="진행중" options={options} onChange={option => console.log(option)} />
              </FieldRow>
              <FieldRow rowTitle="사건 분류">
                <Select placeholder="진행중" options={options} onChange={option => console.log(option)} />
              </FieldRow>
              <FieldRow rowTitle="심급">
                <Select placeholder="진행중" options={options} onChange={option => console.log(option)} />
              </FieldRow>
              <FieldRow rowTitle="사건 상태">
                <DatePicker
                  selected={new Date()}
                  onChange={option => console.log(option)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </FieldRow>
              <FieldRow rowTitle="등록일">2019/03/31</FieldRow>
              <FieldRow rowTitle="등록인">신철호</FieldRow>
              <FieldRow rowTitle="자문/TC">
                <Box>
                  <CheckBox
                    isCrossed
                    label="계약기간"
                    onChange={(event, checked) => console.log(event, checked, 'Checkbox Toggled')}
                  />
                  <CheckBox
                    label="TC계약"
                    onChange={(event, checked) => console.log(event, checked, 'Checkbox Toggled')}
                  />
                </Box>
              </FieldRow>
              <FieldRow>
                <Box>
                  <Box>
                    <Button size="medium" color="inverted" mode="regular">
                      개시
                    </Button>
                    <DatePicker
                      selected={new Date()}
                      onChange={value => console.log(value)}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </Box>
                  <Box>
                    <Button size="medium" color="dark" mode="regular">
                      종료
                    </Button>
                    <DatePicker
                      selected={new Date()}
                      onChange={value => console.log(value)}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                    <CheckBox
                      label="종료일 미정"
                      onChange={(event, checked) => console.log(event, checked, 'Checkbox Toggled')}
                    />
                  </Box>
                </Box>
              </FieldRow>
            </div>,
          ]}
        />
        <Accordian
          title="대법원 나의 사건"
          className=""
          contents={[
            <div className={classes.accordionFull}>
              <Box mb={2}>
                <Button color="primary">대법원 진행정보 등록</Button>
              </Box>
              <div className={classes.gridTable}>
                <GridTable
                  contents={[
                    {
                      title: '법원(기관',
                      child: '서울중앙지방법원',
                    },
                    {
                      title: '사건명',
                      child: '손해배상(기)',
                    },
                    {
                      title: '재판부/기타',
                      child: '제15민사부(디)',
                    },
                    {
                      title: '전화',
                      child: '010-0000-0000',
                    },
                    {
                      title: '위치',
                      child: '',
                    },
                    {
                      title: '비고',
                      child: '',
                    },
                    {
                      title: '상대방명',
                      child: '',
                    },
                  ]}
                />
                <GridTable
                  contents={[
                    {
                      title: '사건번호',
                      child: '2019AB123456',
                    },
                    {
                      title: '재판장/기타',
                      child: '',
                    },
                    {
                      title: '팩스',
                      child: '',
                    },
                    {
                      title: '상대방 지위',
                      child: '',
                    },
                    {
                      title: '.',
                      child: '',
                    },
                    {
                      title: '.',
                      child: '',
                    },
                    {
                      title: '.',
                      child: '',
                    },
                  ]}
                />
                <GridTable
                  contents={[
                    {
                      title: '장소(재판정)',
                      child: '.',
                    },
                    {
                      title: '주심/담당',
                      child: '.',
                    },
                    {
                      title: '이메일',
                      child: 'email-user@email.com',
                    },
                    {
                      title: '.',
                      child: '',
                    },
                    {
                      title: '.',
                      child: '',
                    },
                    {
                      title: '.',
                      child: '',
                    },
                    {
                      title: '.',
                      child: '',
                    },
                  ]}
                />
              </div>
            </div>,
          ]}
        />
        <Accordian
          title="당사자"
          contents={[
            <div className={classes.accordionFull}>
              <Box mb={2} display="flex" flexDirection="row" alignItems="center">
                <p className={classes.radioSelectTitle}>당사자 종류</p>
                <Box mr={2}>:</Box>
                <div className={classes.accordRight}>
                  <div className={classes.radioSelectContainer}>
                    <AlignBox>
                      <RadioButton
                        label="의뢰인"
                        value="a"
                        onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                      />
                      <div className={classes.select}>
                        <Select
                          placeholder="원고"
                          options={options}
                          onChange={(event, option) => console.log(event, option, 'Selected')}
                        />
                      </div>
                    </AlignBox>
                  </div>
                  <div className={classes.radioSelectContainer}>
                    <AlignBox>
                      <RadioButton
                        label="상대방"
                        value="b"
                        onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                      />
                      <div className={classes.select}>
                        <Select
                          placeholder="피고"
                          options={options}
                          onChange={(event, option) => console.log(event, option, 'Selected')}
                        />
                      </div>
                    </AlignBox>
                  </div>
                  <div className={classes.radioSelectContainer}>
                    <AlignBox>
                      <RadioButton
                        label="제3자(관계인)"
                        value="3"
                        onChange={(event, checked) => console.log(event, checked, 'Radio Toggled')}
                      />
                      <div className={classes.select}>
                        <Select
                          placeholder="지위"
                          options={options}
                          onChange={(event, option) => console.log(event, option, 'Selected')}
                        />
                      </div>
                    </AlignBox>
                  </div>
                </div>
              </Box>
              <div className={classes.gridTable}>
                <GridTable
                  contents={[
                    {
                      title: '의뢰인명',
                      child: '홍길동 외 3명',
                    },
                    {
                      title: '내부관계인',
                      child: (
                        <Select
                          placeholder="선택"
                          options={options}
                          onChange={(event, option) => console.log(event, option, 'Selected')}
                        />
                      ),
                    },
                    {
                      title: '대표자명',
                      child: '홍길동 외 3명',
                    },
                    {
                      title: '이동전화',
                      child: '',
                    },
                    {
                      title: '전화',
                      child: '',
                    },
                    {
                      title: '비고',
                      child: '',
                    },
                  ]}
                />
                <GridTable
                  contents={[
                    {
                      title: '의뢰인 추가',
                      child: <Button color="warning">호출입력/중복체크</Button>,
                    },
                    {
                      title: '유형',
                      child: '',
                    },
                    {
                      title: '이메일',
                      child: '',
                    },
                    {
                      title: '팩스',
                      child: '',
                    },
                  ]}
                />
                <Form title="표시 의뢰인">
                  <AlignBox>
                    <div className="form-group">
                      <InputBox
                        type="text"
                        placeholder="홍길동"
                        onChange={event => console.log('Text:', event.target.value)}
                      />
                    </div>
                    <span className={classes.formSpanPadding}> 외</span>
                    <div className="form-group">
                      <InputBox
                        type="text"
                        placeholder="3명"
                        onChange={event => console.log('Text:', event.target.value)}
                      />
                    </div>
                  </AlignBox>
                  <div className="accord2-rght">
                    <h3 className="h2-fontwght">의뢰인 리스트</h3>
                    <div className="table-inr-btns table-rght-btns">
                      <div className={classes.btnMargin}>
                        <Button size="small" color="success">
                          공동추가
                        </Button>
                      </div>
                      <Button size="small" color="dark">
                        제외
                      </Button>
                    </div>
                  </div>
                  <div style={{ width: '100%' }}>
                    <InputBox
                      multiline
                      // className="form-control z-depth-1"
                      rows="5"
                      placeholder="의뢰인 리스트..."
                      onChange={event => console.log(event.target.value)}
                    />
                  </div>
                </Form>
              </div>
            </div>,
          ]}
        />
        <Accordian
          title="수행자"
          contents={[
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Form title="수임">
                <AlignBox mb={1} ml={-0.5}>
                  <Select
                    placeholder="Select an Option"
                    options={options}
                    onChange={(event, option) => console.log(event, option, 'Selected')}
                  />
                  <Box display="inline-block" pl={8}>
                    <Button size="small" color="inverted">
                      펼침
                    </Button>
                    <Button size="small" color="dark">
                      제외
                    </Button>
                  </Box>
                </AlignBox>
                <div className="font-InputBox">
                  <div className={classes.execCheckbox}>
                    <Box display="flex" flexDirection="column">
                      <CheckBox
                        label="유재석"
                        onChange={(event, checked) => console.log(event, checked, 'Check Box Toggled')}
                      />
                      <CheckBox
                        label="윤종신"
                        onChange={(event, checked) => console.log(event, checked, 'Check Box Toggled')}
                      />
                    </Box>
                  </div>
                </div>
              </Form>
              <Form title="수행">
                <AlignBox mb={1} ml={-0.5}>
                  <Select
                    placeholder="Select an Option"
                    options={options}
                    onChange={(event, option) => console.log(event, option, 'Selected')}
                  />
                  <Box display="inline-block" pl={4}>
                    <Button size="small" color="inverted">
                      펼침
                    </Button>
                    <Button size="small" color="dark">
                      제외
                    </Button>
                    <Button size="small" color="dark">
                      삭제
                    </Button>
                  </Box>
                </AlignBox>
                <div className="font-InputBox">
                  <div className={classes.execCheckbox}>
                    <Box display="flex" flexDirection="column">
                      <CheckBox
                        label="유재석"
                        onChange={(event, checked) => console.log(event, checked, 'Check Box Toggled')}
                      />
                      <CheckBox
                        label="윤종신"
                        onChange={(event, checked) => console.log(event, checked, 'Check Box Toggled')}
                      />
                    </Box>
                  </div>
                </div>
              </Form>
              <Form title="보조">
                <AlignBox mb={1} ml={-0.5}>
                  <Select
                    placeholder="Select an Option"
                    options={options}
                    onChange={(event, option) => console.log(event, option, 'Selected')}
                  />
                  <Box display="inline-block" pl={4}>
                    <Button size="small" color="inverted">
                      펼침
                    </Button>
                    <Button size="small" color="dark">
                      제외
                    </Button>
                  </Box>
                </AlignBox>
                <div className="font-InputBox">
                  <div className={classes.execCheckbox}>
                    <Box display="flex" flexDirection="column">
                      <CheckBox
                        label="유재석"
                        onChange={(event, checked) => console.log(event, checked, 'Check Box Toggled')}
                      />
                      <CheckBox
                        label="윤종신"
                        onChange={(event, checked) => console.log(event, checked, 'Check Box Toggled')}
                      />
                    </Box>
                  </div>
                </div>
              </Form>
            </Box>,
          ]}
        />
        <Box className="form-submisn-btns">
          <Box className="left">
            <Button color="primary" size="large" mode="regular">
              <Box pl={5} pr={5}>
                저장
              </Box>
            </Button>
          </Box>
          <Box className={classes.subBtnMargin}>
            <Button color="inverted" size="large" mode="regular">
              <Box pl={5} pr={5}>
                취소
              </Box>
            </Button>
          </Box>
          <Box className="right">
            <Button color="danger" size="large" mode="regular">
              <Box pl={5} pr={5}>
                사건 삭제하기
              </Box>
            </Button>
          </Box>
        </Box>
      </div>
    );
  }
}

const styles = theme => ({
  initial: {
    display: 'grid',
  },
  caseDetailsContainer: {
    position: 'relative',
    width: '100%',
    borderRight: '1px solid lightgray',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0',
    },
  },
  caseDetailsRight: {
    position: 'relative',
    paddingLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      paddingLeft: 0,
    },
  },
  accordionFull: {
    width: '100%',
    flex: 1,
  },
  gridTable: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
      paddingRight: '7px',
    },
  },
  btnMargin: {
    marginRight: 5,
    display: 'inline-block',
  },
  subBtnMargin: {
    float: 'left',
    marginLeft: 10,
  },
  accordRight: {
    width: '90%',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      width: '84%',
    },
  },
  select: {
    width: '50%',
    display: 'inline-block',
  },
  radioSelectContainer: {
    display: 'inline-block',
    float: 'left',
    width: '30%',
    marginTop: 0,
    marginLeft: 'auto',
    marginBottom: 0,
    marginRight: '15px',
    [theme.breakpoints.down('md')]: {
      width: '27%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
  radioSelectTitle: {
    position: 'relative',
    top: '10px',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  execCheckbox: {
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    border: '1px solid lightgray',
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '10px 15px',
    height: '120px',
  },
  accordianCheckDiv: {
    width: '100%',
    textAlign: 'left',
  },
});

export default withStyles(styles)(EditCaseTab);
