import React from 'react';
import { withStyles } from '@material-ui/core';
import ActivityItem from '../../components/ActivityItem';
import Button from '../../components/Button';
import ContentCard from '../../components/ContentCard';
import FieldRow from '../../components/FieldRow';
import Select from '../../components/Select';
import GridTable from '../../components/GridTable';
import Information from '../../components/Information';
import '../../styles/ui/_datepicker.scss';
import '../../styles/pages/_screen.scss';
import options from './dummyData';

function CaseDetailsTab(props) {
  const { classes } = props;

  return (
    <div className={classes.mainContainer}>
      {/* Flex Column 1 */}
      <div>
        <ContentCard
          title="사건 상세 정보"
          contents={[
            <div className={classes.detailsSectionLeft}>
              <FieldRow rowTitle="사건 고유 정보">0001</FieldRow>
              <FieldRow rowTitle="사건 계약서">[계약서 링크]</FieldRow>
              <FieldRow rowTitle="사건 설명">[사건 설명]</FieldRow>
              <FieldRow rowTitle="주주권 확인 사건">...</FieldRow>
            </div>,
            <div className={classes.detailsSectionRight}>
              <FieldRow rowTitle="사건 상태">
                <Select placeholder="진행중" options={options} onChange={() => console.log('Changed')} />
              </FieldRow>
              <FieldRow rowTitle="사건 분류">
                <Select placeholder="민사 본안" options={options} onChange={() => console.log('Changed')} />
              </FieldRow>
              <FieldRow rowTitle="심급">
                <Select placeholder="1심" options={options} onChange={() => console.log('Changed')} />
              </FieldRow>
              <FieldRow rowTitle="[커스텀 필드]">[커스텀 필드 값]</FieldRow>
            </div>,
          ]}
        />
        <ContentCard
          title="대법원 사건정보"
          actionButton={<Button color="primary">대법원 사건매치/업데이트</Button>}
          contents={[
            <div>
              <FieldRow rowTitle="법원 기관명">서울 지방청</FieldRow>
              <FieldRow rowTitle="장소 (재판장)">서울 지방청</FieldRow>
            </div>,
            <GridTable
              contents={[
                {
                  title: '사건 번호',
                  child: '[사건 번호]',
                },
                {
                  title: '사건명',
                  child: '[사건명]',
                },
                {
                  title: '전자소송 여부',
                  child: '[전자소송 여부]',
                },
                {
                  title: '재판부',
                  child: '[재판부]',
                },
                {
                  title: '재판부 연락처',
                  child: '[재판부 연락처]',
                },
              ]}
            />,
          ]}
        />
        <ContentCard contents={[<div className={classes.timeSheetSection}>타임시트 (타임 항목과 청구 현황)</div>]} />
      </div>
      {/* Flex Column 2 */}
      <div>
        <ContentCard
          title="의뢰인/상대방 정보"
          actionButton={<Button color="dark">관련자 연결하기</Button>}
          contents={[
            <div className={classes.clientSectionLeft}>
              <div className={classes.profileIconContainer}>
                <i className="material-icons icon-color">account_circle</i>
                <span className={classes.profileText}>박진만</span>
              </div>
              <FieldRow rowTitle="전화번호">010-000-000 (HP)</FieldRow>
              <FieldRow rowTitle="이메일">email-user@naver.com</FieldRow>
              <FieldRow rowTitle="주소">성남시 분당구 수내동</FieldRow>
            </div>,
            <div className={classes.clientSectionRight}>
              <FieldRow width="40%" rowTitle="상대방">
                김철수
              </FieldRow>
              <FieldRow width="40%" rowTitle="제3자(관계인)">
                박남희
              </FieldRow>
            </div>,
          ]}
        />
        <ContentCard
          title="사건 이력"
          actionButton={<Select placeholder="필터 조건" options={options} onChange={() => console.log('Changed')} />}
          contents={[
            <Information
              contents={[
                {
                  title: '2018-03-30 (목)',
                  child: (
                    <div>
                      <ActivityItem icon="account_circle" name="박정필-변호사" addedItem="타임시트" time="3:32PM" />
                      <ActivityItem icon="message" name="박정필-변호사" addedItem="메시지" time="3:32PM" />
                    </div>
                  ),
                },
                {
                  title: '2018-03-30 (화)',
                  child: (
                    <div>
                      <ActivityItem icon="restore_from_trash" name="박정필-변호사" addedItem="사건메모" time="3:32PM" />
                      <ActivityItem icon="photo" name="박정필-변호사" addedItem="사진" time="3:32PM" />
                    </div>
                  ),
                },
              ]}
            />,
          ]}
        />
      </div>
    </div>
  );
}

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
    width: '95%',
    height: '100%',
    position: 'relative',
    borderRight: '1px solid lightgray',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0',
    },
  },
  detailsSectionRight: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {},
  },
  // 의뢰인/상대방 정보 카드 섹션
  clientSectionLeft: {
    position: 'relative',
    borderRight: '1.5px dotted lightgray',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0',
    },
  },
  clientSectionRight: {
    marginTop: 35,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 0,
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

export default withStyles(styles)(CaseDetailsTab);
