import React, { Component } from 'react';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import InputBox from 'components/InputBox';
import AlignBox from 'components/AlignBox';
import Table from 'components/Table/EnhancedTable';
import File from 'components/File';
import DragDropPopUp from 'components/FileUpload';
import GridTable from 'components/GridTable';
import ListDetailContainer from 'components/ListDetailContainer';
import classnames from 'classnames';

class DocumentTemplateInfoForm extends Component {
  state = {
    files: [],
    isOpenDetail: false,
    nowMode: '',
  };

  handleFileAdd = target => {
    const { files } = this.state;
    const result = files.concat(target);
    this.setState({ files: result });
  };

  handleFileRemove = target => {
    const { files } = this.state;
    const result = files.filter(file => file.key !== target);
    this.setState({ files: result });
  };

  render() {
    const { files, nowMode, isOpenDetail } = this.state;

    const TableComponent = (
      <ContentCard
        withButton
        title=""
        noMargin
        customHeader={
          <div className="customHeader-cotainer">
            <div className="customHeader-left">
              <div>
                <h2>문서 템플릿 목록</h2>
              </div>
            </div>
            <div className="customHeader-right">
              <Button
                color="inverted"
                onClick={() => {
                  this.setState({ ...this.state, isOpenDetail: true, nowMode: 'create' });
                }}
              >
                문서 템플릿 생성
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
                    templateName: '문서 1 양식',
                    register: '김변호사',
                    createDate: '2019-01-01',
                    updateDate: '2019-02-01',
                  },
                  {
                    id: '2',
                    templateName: '문서 2 양식',
                    register: '김변호사',
                    createDate: '2019-01-01',
                    updateDate: '2019-02-01',
                  },
                  {
                    id: '3',
                    templateName: '문서 3 양식',
                    register: '김변호사',
                    createDate: '2019-01-01',
                    updateDate: '2019-02-01',
                  },
                  {
                    id: '4',
                    templateName: '문서 4 양식',
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
              title: '템플릿 메모',
              child: (
                <InputBox
                  style={{ width: '19em' }}
                  //   value={textValue}
                  //   onChange={this.onChange}
                  multiline={5}
                  rows={5}
                  inputClassName="text-primary"
                />
              ),
            },
            {
              title: '양식',
              child: <File />,
            },
          ]}
        />
      ) : (
        <GridTable
          contents={[
            {
              title: '템플릿 이름',
              child: <div>문서 템플릿1</div>,
            },
            {
              title: '메모',
              child: <div>사건/메모 문서 템플릿 입니다.</div>,
            },
            {
              title: '양식',
              child: (
                <DragDropPopUp
                  files={files || null}
                  handleFileAdd={target => this.handleFileAdd(target)}
                  handleFileRemove={target => this.handleFileRemove(target)}
                  LFID={1}
                  showDownloadList
                  hideButton
                />
              ),
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

export default DocumentTemplateInfoForm;
