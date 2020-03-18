import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ActivityItem from 'components/ActivityItem';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import FieldRow from 'components/FieldRow';
import Popper from '@material-ui/core/Popper';
import Select from 'components/Select';
import GridTable from 'components/GridTable';
import 'react-datepicker/dist/react-datepicker.css';
import Information from 'components/Information';
import Filter from 'components/Table/Filter';
import classnames from 'classnames';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import 'styles/ui/_datepicker.scss';
import 'styles/pages/_screen.scss';
import options from 'containers/CaseScreen/dummyData';
import Fields, { FieldItem } from 'components/Fields';

class Detail extends Component {
  state = {
    anchorEl: null,
  };

  // function Detail(props) {

  render() {
    const { classes } = this.props;

    const { anchorEl } = this.state;

    return (
      <div className={classes.mainContainer}>
        {/* Flex Column 1 */}
        <div>
          <div className="mb-3">
            <ContentCard
              title="자문 상세 정보"
              contents={[
                <div className="row">
                  <div className={classnames(classes.detailsSectionLeft, 'col-xs-12 col-md-6 pl-4')}>
                    <Fields>
                      <FieldItem title="고유 번호">0001</FieldItem>
                      <FieldItem title="계약서">[계약서 링크]</FieldItem>
                      <FieldItem title="설명" />
                      <FieldItem isFull>주주권 확인 자문입니다.</FieldItem>
                    </Fields>
                  </div>
                  <div className="col-xs-12 col-md-6 pl-4">
                    <Fields>
                      <FieldItem title="상태">진행중</FieldItem>
                      <FieldItem title="분류" redstar>
                        민사 본안
                      </FieldItem>
                      <FieldItem title="심급">1심</FieldItem>
                    </Fields>
                  </div>
                </div>,
              ]}
            />
          </div>
          <div className="mb-3">
            <ContentCard
              title="대법원 자문정보"
              actionButton={<Button color="primary">대법원 자문매치/업데이트</Button>}
              contents={[
                <div className="row">
                  <div className="col-md-5 pl-4">
                    <Fields>
                      <FieldItem title="법원 기관명">서울 지방청</FieldItem>
                      <FieldItem title="장소 (재판장)">서울 지방청</FieldItem>
                    </Fields>
                  </div>
                  <div className="col-md-7">
                    <GridTable
                      contents={[
                        {
                          title: '자문 번호',
                          child: '2018다248909',
                        },
                        {
                          title: '자문명',
                          child: '전원합의체 판결',
                        },
                        {
                          title: '전자소송 여부',
                          child: '미소송',
                        },
                        {
                          title: '재판부',
                          child: '대법원',
                        },
                        {
                          title: '재판부 연락처',
                          child: '010-7945-7954',
                        },
                      ]}
                    />
                  </div>
                </div>,
              ]}
            />
          </div>
          <div className="mb-3">
            <ContentCard
              title=""
              contents={[<div className={classes.timeSheetSection}>타임시트 (타임 항목과 청구 현황)</div>]}
            />
          </div>
        </div>
        {/* Flex Column 2 */}
        <div>
          <div className="mb-3">
            <ContentCard
              title="의뢰인/상대방 정보"
              actionButton={<Button color="dark">관련자 연결하기</Button>}
              contents={[
                <div className={classes.clientSectionLeft}>
                  <div className={classes.profileIconContainer}>
                    <i className="material-icons icon-color">account_circle</i>
                    <span className={classes.profileText}>박진만</span>
                  </div>
                  <Fields>
                    <FieldItem title="전화번호">010-000-000 (HP)</FieldItem>
                    <FieldItem title="이메일">email-user@naver.com</FieldItem>
                    <FieldItem title="주소">성남시 분당구 수내동</FieldItem>
                  </Fields>
                </div>,
                <div className={classes.clientSectionRight}>
                  <Fields>
                    <FieldItem title="상대방">김철수</FieldItem>
                    <FieldItem title="제 3자 (관계인)">박남희</FieldItem>
                  </Fields>
                </div>,
              ]}
            />
          </div>
          <div className="mb-3">
            <ContentCard
              title="자문 이력"
              actionButton={
                <div>
                  <Button
                    aria-describedby="simple-popper"
                    variant="contained"
                    onClick={e => {
                      this.setState({ anchorEl: anchorEl ? null : e.currentTarget });
                    }}
                  >
                    <i className="material-icons icon-color">filter_list</i>
                  </Button>
                  <Popper
                    id="simple-popper"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    transition
                    placement="bottom-end"
                    onClose={e => {
                      this.setState({ anchorEl: null });
                    }}
                  >
                    <Filter
                      filterList={
                        [
                          // { id: 'Name', numeric: false, disablePadding: true, label: '이름'},
                          // { id: 'Test', numeric: false, disablePadding: true, label: '직원 유형'},
                          // { id: 'Date', numeric: false, disablePadding: true, label: '날짜'},
                        ]
                      }
                      filterAvailFields={[
                        { key: 'Name', text: '이름', type: 'text' },
                        { key: 'Test', text: '직원 유형', type: 'text' },
                        { key: 'Date', text: '날짜', type: 'text' },
                      ]}
                      allFieldInfo={[
                        { id: 'Name', numeric: false, disablePadding: true, label: '이름', type: 'text' },
                        { id: 'Test', numeric: false, disablePadding: true, label: '직원 유형', type: 'text' },
                        { id: 'Date', numeric: false, disablePadding: true, label: '날짜', type: 'text' },
                      ]}
                      originalData={[{ id: 1, Name: '이희규', Test: '변호사', Date: '2019-07-22' }]}
                      // handleAdd={this.props.handleFilterAdd}
                      // handleReset={this.props.handleFilterReset}
                      handleClose={e => {
                        this.setState({ anchorEl: null });
                      }}
                    />
                  </Popper>
                </div>
              }
              contents={[
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Information
                    contents={[
                      {
                        title: '2018-03-30 (목)',
                        child: (
                          <div>
                            <br />
                            <ActivityItem name="박정필-변호사" addedItem="타임시트" time="3:32PM" />
                            <br />
                            <ActivityItem name="박정필-변호사" addedItem="메시지" time="3:32PM" />
                          </div>
                        ),
                      },
                      {
                        title: '2018-03-30 (화)',
                        child: (
                          <div>
                            <br />
                            <ActivityItem name="박정필-변호사" addedItem="자문메모" time="3:32PM" />
                            <br />
                            <ActivityItem name="박정필-변호사" addedItem="사진" time="3:32PM" />
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>,
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}
// }

const styles = theme => ({
  // 사건 상세 탭 그리드 컨테이너
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: '6fr 5fr',
    gridColumnGap: '15px',
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  // 사건 상세 정보 카드 섹션
  detailsSectionLeft: {
    borderRight: '1.5px dotted lightgray',
    '@media screen and (max-width: 767px)': {
      borderRight: '0',
    },
  },
  // 의뢰인/상대방 정보 카드 섹션
  clientSectionLeft: {
    padding: 10,
    position: 'relative',
    borderRight: '1.5px dotted lightgray',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0',
    },
  },
  clientSectionRight: {
    padding: 10,
    marginTop: 35,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 35,
    },
  },
  profileIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileText: {
    verticalAlign: 'middle',
    marginLeft: 10,
  },
  // 대법원 사건 정보 카드 섹션
  timeSheetSection: {
    marginTop: -50, // Header margin (15) + content padding  (35)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    color: '#e8e8e8',
  },
});

export default withStyles(styles)(Detail);
