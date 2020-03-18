import React from 'react';
import ListDetailContainer from 'components/ListDetailContainer';
import Box from 'components/BoxOld';
import DatePicker from 'components/DatePicker';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import GridTable from 'components/GridTable';
import InputBox from 'components/InputBox';
import Table from 'components/Table/EnhancedTable';
import DragDrop from 'components/FileUpload';
import { tableData } from '../TableTest/data';

class ListDetailContainerTest extends React.Component {
  state = { isOpenDetail: false, files: [] };

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
    const { isOpenDetail, files } = this.state;

    const TableComponent = (
      <ContentCard
        noMargin
        title="Task List"
        contents={[
          <div>
            <div className="paginatn-table left">
              <Table
                rows={[
                  { id: 'date', type: 'date', label: '날짜', width: '120px' },
                  { id: 'task', type: 'text', label: 'Task', align: 'left' },
                  { id: 'numTest', type: 'number', label: 'Num', align: 'right', width: '60px' },
                  { id: 'status', label: '상태', noSort: true, width: '100px', noFilter: true },
                  { id: 'admin', type: 'code', label: '담당자', width: '140px' },
                ]}
                mngIcons={id => (
                  <Button
                    size="square"
                    icon="description"
                    color="success"
                    onClick={() => {
                      console.log(`detail|${id}`);
                      this.setState({ ...this.state, isOpenDetail: true });
                    }}
                  />
                )}
                mngIconsWidth="80px"
                data={tableData}
              />
            </div>
          </div>,
        ]}
      />
    );

    const DetailComponent = (
      <GridTable
        contents={[
          {
            title: 'Task',
            child: <InputBox placeholder="우편발송" name="text2" />,
          },
          {
            title: '내용',
            child: <InputBox placeholder="우편 발송을 처리 하세요" rows="5" multiline />,
          },
          {
            title: 'Task 상태',
            child: (
              <Button size="small" color="inverted">
                오픈
              </Button>
            ),
          },
          {
            title: '담당자',
            child: (
              <Box>
                <div className="form-group left">
                  <InputBox placeholder="김변호사" />
                </div>
                <i className="material-icons icon-left-menu-color left">supervisor_account</i>
              </Box>
            ),
          },
          {
            title: '완료 예정일',
            child: (
              <DatePicker
                selected={new Date()}
                onChange={date => console.log('Date:', date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            ),
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
        ]}
      />
    );

    const DetailComponentBtn = (
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
      <div className="app-wrapper">
        <ListDetailContainer
          TableComponent={TableComponent}
          DetailComponent={DetailComponent}
          DetailComponentTitle="Task 상세"
          DetailComponentBtn={DetailComponentBtn}
          isOpenDetail={isOpenDetail}
          handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
        />
      </div>
    );
  }
}

export default ListDetailContainerTest;
