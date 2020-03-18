import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import { EditorW } from 'helpers/ui';
import DatePicker from 'components/DatePicker';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import Accordian from 'components/Accordian';
import FieldRow from 'components/FieldRow';
import Select from 'components/Select';
import { R, RU } from 'helpers/ramda';
import GridTable from 'components/GridTable';
import AlignBox from 'components/AlignBox';
import Form from 'components/Form';
import InputBox from 'components/InputBox';
import RadioButton from 'components/RadioButton';
import CheckBox from 'components/CheckBox';
import Fields, { FieldItem } from 'components/Fields';
import PageTitle from 'components/PageTitle';
import options from 'containers/CaseScreen/dummyData';
import classnames from 'classnames';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

const { mlMessage, changeURL } = RU;

class AdviceCreate extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Box
          mb={1}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <PageTitle icon="class">자문</PageTitle>
        </Box>
        <div className={classes.initial}>
          <ContentCard
            title="자문 기본 정보"
            contents={[
              <div className="row">
                <div className={classnames(classes.caseDetailsContainer, 'col-xs-12 col-md-6 pl-4')}>
                  <Fields>
                    <FieldItem title="고유 번호">0001</FieldItem>
                    <FieldItem title="계약서">[계약서 링크]</FieldItem>
                    <FieldItem title="설명" />
                    <FieldItem isFull>
                      <EditorW />
                    </FieldItem>
                  </Fields>
                </div>

                <div className="col-xs-12 col-md-6 pl-4">
                  <Fields>
                    <FieldItem title="상태">
                      <Select
                        placeholder="진행중"
                        options={[
                          { key: 'status', text: '자문 상태', itemType: DropdownMenuItemType.Header },
                          { key: 'progress', text: '진행중' },
                          { key: 'finish', text: '종결' },
                        ]}
                        onChange={() => console.log('Changed')}
                      />
                    </FieldItem>
                    <FieldItem title="분류">
                      <Select
                        placeholder="민사 본안"
                        options={[
                          { key: 'status', text: '자문 분류', itemType: DropdownMenuItemType.Header },
                          { key: 'progress', text: '가단' },
                          { key: 'finish', text: '가소' },
                        ]}
                        onChange={() => console.log('Changed')}
                      />
                    </FieldItem>
                    <FieldItem title="심급">
                      <Select
                        placeholder="1심"
                        options={[
                          { key: 'status', text: '심급', itemType: DropdownMenuItemType.Header },
                          { key: 'progress', text: '1심' },
                          { key: 'finish', text: '2심' },
                        ]}
                        onChange={() => console.log('Changed')}
                      />
                    </FieldItem>
                  </Fields>
                </div>
              </div>,
            ]}
          />
          <Accordian
            title="대법원 나의 자문"
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
                        title: '자문명',
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
                        title: '자문번호',
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
              <Button color="inverted" size="large" mode="regular" onClick={() => changeURL('/adviceList')}>
                <Box pl={5} pr={5}>
                  취소
                </Box>
              </Button>
            </Box>
            <Box className="right">
              <Button color="danger" size="large" mode="regular">
                <Box pl={5} pr={5}>
                  자문 삭제하기
                </Box>
              </Button>
            </Box>
          </Box>
        </div>
      </div>
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
  initial: {
    display: 'grid',
  },
  caseDetailsContainer: {
    // position: 'relative',
    // width: '100%',
    // borderRight: '1px solid lightgray',
    // [theme.breakpoints.down('sm')]: {
    //   borderRight: '0',
    // },
    borderRight: '1px solid lightgray',
    '@media screen and (max-width: 767px)': {
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

export default withStyles(styles)(AdviceCreate);
