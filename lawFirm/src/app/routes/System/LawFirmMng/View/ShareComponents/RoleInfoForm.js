import React, { Component } from 'react';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import InputBox from 'components/InputBox';
import ListDetailContainer from 'components/ListDetailContainer';
import AlignBox from 'components/AlignBox';
import Table from 'components/Table/EnhancedTable';
import GridTable from 'components/GridTable';
import classnames from 'classnames';

class RoleInfoForm extends Component {
  state = {
    isOpenDetail: false,
    nowMode: '',
  };

  render() {
    const { nowMode, isOpenDetail } = this.state;

    const TableComponent = (
      <ContentCard
        withButton
        title=""
        noMargin
        customHeader={
          <div className="customHeader-cotainer">
            <div className="customHeader-left">
              <div>
                <h2>역할 목록</h2>
              </div>
            </div>
            <div className="customHeader-right">
              <Button
                color="inverted"
                onClick={() => {
                  this.setState({ ...this.state, isOpenDetail: true, nowMode: 'create' });
                }}
              >
                역할 생성
              </Button>
            </div>
          </div>
        }
        contents={[
          <div>
            <div className={classnames('paginatn-table', 'left')}>
              <Table
                initOrder="desc"
                initOrderBy="createDate"
                condComponents={
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <AlignBox>
                      <InputBox type="text" placeholder="역할명" iconName="Search" onChange={(e, text) => {}} />
                    </AlignBox>
                  </div>
                }
                mngIconsWidth="100px"
                mngIcons={id => (
                  <>
                    <Button
                      size="square"
                      icon="description"
                      color="success"
                      onClick={() => {
                        this.setState({ ...this.state, isOpenDetail: true, nowMode: 'detail' });
                      }}
                    />
                    <Button size="square" icon="delete" color="danger" />
                  </>
                )}
                rows={[
                  { id: 'role', numeric: false, disablePadding: true, label: '역할', width: '20%' },
                  { id: 'alias', numeric: false, disablePadding: true, label: '별칭', width: '20%' },
                  { id: 'register', numeric: false, disablePadding: true, label: '등록자', width: '15%' },
                  { id: 'createDate', numeric: false, disablePadding: true, label: '등록일', width: '15%' },
                  { id: 'updateDate', numeric: false, disablePadding: true, label: '수정일', width: '15%' },
                ]}
                data={[
                  {
                    id: '1',
                    role: '회계',
                    alias: 'FI',
                    register: '김변호사',
                    createDate: '2019-01-01',
                    updateDate: '2019-02-01',
                  },
                  {
                    id: '2',
                    role: '일반변호사',
                    alias: 'GL',
                    register: '김변호사',
                    createDate: '2019-01-01',
                    updateDate: '2019-02-01',
                  },
                ]}
              />
            </div>
          </div>,
        ]}
      />
    );

    const DetailComponent =
      nowMode === 'create' ? (
        <GridTable
          contents={[
            {
              title: '역할 이름',
              child: <InputBox />,
            },
            {
              title: '별칭',
              child: <InputBox />,
            },
          ]}
        />
      ) : (
        <GridTable
          contents={[
            {
              title: '역할 이름',
              child: <div>회계</div>,
            },
            {
              title: '별칭',
              child: <div>FI</div>,
            },
          ]}
        />
      );

    const DetailComponentBtn =
      nowMode === 'create' ? (
        <>
          <Button size="large" mode="regular" color="primary">
            <Box pl={5} pr={5}>
              저장
            </Box>
          </Button>
          <Button
            color="inverted"
            size="large"
            mode="regular"
            onClick={() => this.setState({ ...this.state, isOpenDetail: false })}
          >
            <Box pl={5} pr={5}>
              닫기
            </Box>
          </Button>
        </>
      ) : (
        <>
          <Button
            size="large"
            mode="regular"
            color="primary"
            onClick={() => this.setState({ ...this.state, nowMode: 'create' })}
          >
            <Box pl={5} pr={5}>
              수정
            </Box>
          </Button>
          <Button
            color="inverted"
            size="large"
            mode="regular"
            onClick={() => this.setState({ ...this.state, isOpenDetail: false })}
          >
            <Box pl={5} pr={5}>
              닫기
            </Box>
          </Button>
        </>
      );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={nowMode === 'detail' ? '문서 템플릿 상세' : '문서 템플릿 등록'}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
      />
    );
  }
}

export default RoleInfoForm;
