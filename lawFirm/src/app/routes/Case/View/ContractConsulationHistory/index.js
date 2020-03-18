import React, { Component } from 'react';
import Box from 'components/BoxOld';
import DatePicker from 'components/DatePicker';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import classnames from 'classnames';
import GridTable from 'components/GridTable';
import ListDetailContainer from 'components/ListDetailContainer';
import InputBox from 'components/InputBox';
import Tab from 'components/Tab';
import DragDrop from 'components/FileUpload';
import ContentCard from 'components/ContentCard';
import Select from 'components/Select';
import Table from 'components/Table/EnhancedTable';
import { R, RU } from 'helpers/ramda';

const { mlMessage, yearMonthDay } = RU;

class ContractConsulationHistory extends Component {
  state = {
    tab: 0,
    isOpenDetail: false,
    files: [],
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

  changeTab(tab) {
    this.setState({ tab, isOpenDetail: false });
  }

  render() {
    const { classes } = this.props;
    const { tab, files, isOpenDetail } = this.state;

    const TableComponent = () => (
      <ContentCard
        withButton
        noMargin
        customHeader={
          <div className="customHeader-cotainer">
            <div className="customHeader-left">
              <div>
                <Box display="flex" flexDirection="row">
                  <Tab selected={tab === 0} text="상담이력" onClick={() => this.changeTab(0)} />
                  <Tab selected={tab === 1} text="계약이력" onClick={() => this.changeTab(1)} />
                </Box>
              </div>
            </div>
          </div>
        }
        contents={[
          (tab === 0 && (
            <div>
              <div className={classnames('paginatn-table', 'left')}>
                <Table
                  condComponents={
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                      }}
                    >
                      <div className="pt-2">상담일 :</div>

                      <div className="pt-1">
                        <Button size="small" color="inverted">
                          &lt;
                        </Button>
                        <Button size="small" color="inverted">
                          금주
                        </Button>
                        <Button size="small" color="inverted">
                          &gt;&gt;
                        </Button>
                      </div>

                      <div className="pt-1">
                        <Button size="small" color="inverted">
                          &lt;
                        </Button>
                        <Button size="small" color="inverted">
                          금월
                        </Button>
                        <Button size="small" color="inverted">
                          &gt;&gt;
                        </Button>
                      </div>

                      <AlignBox>
                        <DatePicker value={yearMonthDay(new Date())} clearable />

                        <div className="font-weight-bold pl-2 pr-4">-</div>
                        <AlignBox>
                          <DatePicker value={yearMonthDay(new Date())} clearable />
                        </AlignBox>
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
                          this.setState({ ...this.state, isOpenDetail: true });
                        }}
                      />
                      <Button size="square" icon="delete" color="danger" />
                    </>
                  )}
                  rows={[
                    { id: 'admin', numeric: true, disablePadding: false, label: '담당자' },
                    { id: 'task', numeric: false, disablePadding: true, label: '제목' },
                    { id: 'date', numeric: false, disablePadding: true, label: '상담일' },
                  ]}
                  data={[
                    { id: '1', admin: '홍길동', task: '변호사 선임 비용 문의', date: '2019-01-04' },
                    { id: '2', admin: '홍길수', task: '첨부파일 관련 문의', date: '2019-05-13' },
                    { id: '3', admin: '김철수', task: '변호사 선임 비용 문의', date: '2019-03-15' },
                    { id: '4', admin: '홍아무개', task: '첨부파일 관련 문의', date: '2019-02-09' },
                    { id: '5', admin: '홍길수', task: '변호사 선임 비용 문의', date: '2019-06-16' },
                    { id: '6', admin: '홍길동', task: '변호사 선임 비용 문의', date: '2019-04-14' },
                    { id: '7', admin: '김철수', task: '첨부파일 관련 문의', date: '2019-02-31' },
                    { id: '8', admin: '홍길동', task: '변호사 선임 비용 문의', date: '2019-03-23' },
                    { id: '9', admin: '김아무개', task: '첨부파일 관련 문의', date: '2019-02-14' },
                    { id: '10', admin: '홍길동', task: '변호사 선임 비용 문의', date: '2019-01-06' },
                  ]}
                />
              </div>
            </div>
          )) ||
            (tab === 1 && (
              <div>
                <div className={classnames('paginatn-table', 'left')}>
                  <Table
                    condComponents={
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                        }}
                      >
                        <div className="pt-2">계약일 :</div>

                        <div className="pt-1">
                          <Button size="small" color="inverted">
                            &lt;
                          </Button>
                          <Button size="small" color="inverted">
                            금주
                          </Button>
                          <Button size="small" color="inverted">
                            &gt;&gt;
                          </Button>
                        </div>

                        <div className="pt-1">
                          <Button size="small" color="inverted">
                            &lt;
                          </Button>
                          <Button size="small" color="inverted">
                            금월
                          </Button>
                          <Button size="small" color="inverted">
                            &gt;&gt;
                          </Button>
                        </div>

                        <AlignBox>
                          <DatePicker value={yearMonthDay(new Date())} clearable />

                          <div className="font-weight-bold pl-2 pr-4">-</div>
                          <AlignBox>
                            <DatePicker value={yearMonthDay(new Date())} clearable />
                          </AlignBox>
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
                            this.setState({ ...this.state, isOpenDetail: true });
                          }}
                        />
                        <Button size="square" icon="delete" color="danger" />
                      </>
                    )}
                    rows={[
                      { id: 'admin', numeric: true, disablePadding: false, label: '담당자' },
                      { id: 'task', numeric: false, disablePadding: true, label: '계약명' },
                      { id: 'date', numeric: false, disablePadding: true, label: '계약일' },
                    ]}
                    data={[
                      { id: '1', admin: '홍아무개', task: '2019년 법률 자문 계약', date: '2019-01-04' },
                      { id: '2', admin: '김철수', task: '법률 자문 계약', date: '2019-05-13' },
                      { id: '3', admin: '김철수', task: '서비스 위탁 계약', date: '2019-03-15' },
                      { id: '4', admin: '홍아무개', task: '특허/기불 개발', date: '2019-02-09' },
                      { id: '5', admin: '홍길동', task: '이관 점검', date: '2019-06-16' },
                      { id: '6', admin: '홍아무개', task: '협력/제휴 계약', date: '2019-04-14' },
                    ]}
                  />
                </div>
              </div>
            )),
        ]}
      />
    );

    const DetailComponent = () => (
      <GridTable
        contents={
          (tab === 0 && [
            {
              title: '등록일',
              child: <div className="form-group left">2018-12-07</div>,
            },
            {
              title: '담당자',
              child: <InputBox placeholder="담당자" name="text2" value="홍길동" />,
            },
            {
              title: '제목',
              child: <div>변호사 선임 비용 문의</div>,
            },
            {
              title: '내용',
              child: <InputBox placeholder="내용" rows="5" multiline value="사건 메모 내용을 정리합니다." />,
            },
            {
              title: '일시',
              child: <div className="form-group left">2019-01-01 오전 11:00</div>,
            },
            {
              title: '관련파일',
              child: (
                <AlignBox>
                  <DragDrop
                    files={files || null}
                    handleFileAdd={target => this.handleFileAdd(target)}
                    handleFileRemove={target => this.handleFileRemove(target)}
                    LFID={1}
                    showDownloadList
                  />
                </AlignBox>
              ),
            },
          ]) ||
          (tab === 1 && [
            {
              title: '등록일',
              child: <div className="form-group left">2018-12-07</div>,
            },
            {
              title: '담당자',
              child: <InputBox placeholder="담당자" name="text2" value="홍길동" />,
            },
            {
              title: '제목',
              child: <div>2019년 법률 자문 계약</div>,
            },
            {
              title: '내용',
              child: (
                <InputBox placeholder="내용" rows="5" multiline value="2019년 법률 자문 계약에 대한 내용입니다." />
              ),
            },
            {
              title: '계약체결 일시',
              child: <div className="form-group left">2019-01-01 오전 11:00</div>,
            },
            {
              title: '관련파일',
              child: (
                <AlignBox>
                  <DragDrop
                    files={files || null}
                    handleFileAdd={target => this.handleFileAdd(target)}
                    handleFileRemove={target => this.handleFileRemove(target)}
                    LFID={1}
                    showDownloadList
                  />
                </AlignBox>
              ),
            },
          ])
        }
      />
    );

    const DetailComponentBtn = () => (
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
    );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle="내용 상세"
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
      />
    );
  }
}

export default ContractConsulationHistory;
