import React, { Component } from 'react';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import InputBox from 'components/InputBox';
import { EditorW } from 'helpers/ui';
import AlignBox from 'components/AlignBox';
import Table from 'components/Table/EnhancedTable';
import GridTable from 'components/GridTable';
import ListDetailContainer from 'components/ListDetailContainer';
import classnames from 'classnames';
// import Editor from 'components/Editor';

class EmailTemplateInfo extends Component {
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
                <h2>이메일템플릿 목록</h2>
              </div>
            </div>
            <div className="customHeader-right">
              <Button
                color="inverted"
                onClick={() => {
                  this.setState({ ...this.state, isOpenDetail: true, nowMode: 'create' });
                }}
              >
                이메일 템플릿 생성
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
                      <InputBox type="text" placeholder="템플릿명" iconName="Search" onChange={(e, text) => {}} />
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
                  {
                    id: 'templateName',
                    numeric: false,
                    disablePadding: true,
                    label: '템플릿 이름',
                    width: '40%',
                    align: 'left',
                  },
                  { id: 'register', numeric: false, disablePadding: true, label: '등록자', width: '15%' },
                  { id: 'createDate', numeric: false, disablePadding: true, label: '등록일', width: '15%' },
                  { id: 'updateDate', numeric: false, disablePadding: true, label: '수정일', width: '15%' },
                ]}
                data={[
                  {
                    id: '1',
                    templateName: '이메일 1 양식',
                    register: '김변호사',
                    createDate: '2019-01-01',
                    updateDate: '2019-02-01',
                  },
                  {
                    id: '2',
                    templateName: '이메일 2 양식',
                    register: '김변호사',
                    createDate: '2019-01-01',
                    updateDate: '2019-02-01',
                  },
                  {
                    id: '3',
                    templateName: '이메일 3 양식',
                    register: '김변호사',
                    createDate: '2019-01-01',
                    updateDate: '2019-02-01',
                  },
                  {
                    id: '4',
                    templateName: '이메일 4 양식',
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
              title: '템플릿 이름',
              child: <InputBox />,
            },
            {
              title: '보내는 사람',
              child: <InputBox />,
            },
            {
              title: '받는 사람',
              child: <InputBox />,
            },
            {
              title: '참조',
              child: <InputBox />,
            },
            {
              title: '양식',
              child: <EditorW />,
            },
          ]}
        />
      ) : (
        <GridTable
          contents={[
            {
              title: '템플릿 이름',
              child: <div>이메일 템플릿1</div>,
            },
            {
              title: '보내는 사람',
              child: <div>김변호사(aaa@gmail.com)</div>,
            },
            {
              title: '받는 사람',
              child: <div>홍길동(bbb@gmail.com)</div>,
            },
            {
              title: '참조',
              child: <div>김철수(ccc@gmail.com), 김장미(ddd@gmail.com)</div>,
            },
            {
              title: '양식',
              child: <EditorW />,
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
        DetailComponentTitle={nowMode === 'detail' ? '이메일 템플릿 상세' : '이메일 템플릿 등록'}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
      />
    );
  }
}

export default EmailTemplateInfo;
