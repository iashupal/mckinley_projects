import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import ContentCard from 'components/ContentCard';
import Table from 'components/Table/EnhancedTable';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import { LoadingBox } from 'helpers/ui';
import PageTitle from 'components/PageTitle';
import xlsx from 'xlsx';
import ReactDataSheet from 'react-datasheet';
import Dropzone from 'react-dropzone';
import { R, RU } from 'helpers/ramda';
import { setReduxValues } from '../../Redux/Action';

const { getLastNumber, mlMessage } = RU;
const fieldColumn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']; // GET 대상 (엑셀)열, 정의. A,B,C,...
// DB 컬럼명 fix 되면 수정 해야함.
const fixFieldName = [
  'CaseName',
  'ManagementNo',
  'CaseCategory',
  'CourtLevel',
  'BackgroundInfo',
  'Court',
  'EndDate',
  'RepresentativeName',
  'Lawyer',
  'Performer',
  'Assistant',
  'CaseStatus',
]; // 실제 Server 요청, 필드명

const fixFieldDisplay = [
  {
    name: '송무',
    star: false,
  },
  {
    name: '송무번호',
    star: false,
  },
  {
    name: '송무분류',
    star: false,
  },
  {
    name: '심급',
    star: false,
  },
  {
    name: '송무설명',
    star: false,
  },
  {
    name: '계속기관',
    star: false,
  },
  {
    name: '기일(잔여일)',
    star: false,
  },
  {
    name: '의뢰인',
    star: false,
  },
  {
    name: '수임자',
    star: false,
  },
  {
    name: '수행자',
    star: false,
  },
  {
    name: '보조자',
    star: false,
  },
  {
    name: '상태',
    star: false,
  },
]; // 사용자 표기용 필드

class ExcelUpload extends React.Component {
  state = {
    data: [],
    dataResult: [],
    isLoading: false,
  };

  convertExcelDate = excelDate => {
    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  render() {
    const { classes } = this.props;
    let dropzoneRef;
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
          <PageTitle icon="class">{mlMessage('pages.litigation.excelUpload.title')}</PageTitle>
        </Box>
        <div className={classes.content}>
          <ContentCard
            title=""
            customHeader={
              <AlignBox justifyContent="flex-end">
                <a href="/file/Sample_CaseList.xlsx" download>
                  <Button icon="archive" color="primary" onClick={e => {}}>
                    <Box pr={2}>{mlMessage('pages.litigation.excelUpload.templateDownload')}</Box>
                  </Button>
                </a>
                <Button
                  icon="unarchive"
                  color="primary"
                  onClick={e => {
                    dropzoneRef.open();
                  }}
                >
                  <Box pr={2}>{mlMessage('pages.litigation.excelUpload.upload')}</Box>
                </Button>
              </AlignBox>
            }
            contents={[
              <div className="row">
                <div className="col-md-12">
                  <ReactDataSheet
                    data={this.state.data}
                    valueRenderer={i => i.value}
                    sheetRenderer={props => {
                      const fullData = props.children;
                      const body = [];
                      fullData.forEach(record => {
                        const row = {};
                        row.id = record.key;
                        record.props.cells.forEach((cell, idx) => {
                          if (idx === 6) {
                            row[idx] = this.convertExcelDate(cell.value);
                          } else if (idx === 11) {
                            const color =
                              cell.value === '진행중' ? 'badge text-white bg-green' : 'badge text-white bg-black';
                            row[idx] = (
                              <div style={{ width: '70px' }} className={color}>
                                {cell.value}
                              </div>
                            );
                          } else {
                            row[idx] = cell.value;
                          }
                        });
                        body.push(row);
                      });
                      return (
                        <Table
                          hidePagination
                          hideFilter
                          rows={fixFieldDisplay.map((col, index) => {
                            const culumnName = col.name;
                            let align = 'center';
                            if (index === 0 || index === 4) align = 'left';
                            return { id: index, numeric: false, disablePadding: false, label: culumnName, align };
                          })}
                          data={body}
                          useCheckBox
                          mngIconsBatch={arr => (
                            <Button
                              size="square"
                              icon="delete"
                              color="danger"
                              onClick={() => {
                                alert(`time|${arr}`);
                              }}
                            />
                          )}
                        />
                      );
                    }}
                    cellRenderer={props => (
                      <td style={{ textAlign: 'center', borderStyle: 'solid', borderWidth: '1px' }}>
                        {props.children}
                      </td>
                    )}
                    onCellsChanged={changes => {
                      const data = this.state.data.map(row => [...row]);
                      changes.forEach(({ cell, row, col, value }) => {
                        data[row][col] = { ...data[row][col], value };
                      });
                      this.setState({
                        ...this.state,
                        data,
                      });
                    }}
                  />
                </div>
              </div>,
            ]}
          />
          <div className={classes.submitButtonContainer}>
            <Button color="primary" size="large" mode="regular" onClick={e => {}}>
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.save')}
              </Box>
            </Button>
            <Button
              color="inverted"
              size="large"
              mode="regular"
              onClick={e => {
                this.setState({
                  ...this.state,
                  data: [],
                });
              }}
            >
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.reset')}
              </Box>
            </Button>
          </div>
          <Dropzone
            ref={node => {
              dropzoneRef = node;
            }}
            style={{ display: 'none' }}
            onDrop={async (accepted, rejected) => {
              this.setState(
                {
                  ...this.state,
                  isLoading: true,
                },
                () => {
                  const file = accepted[0];
                  const reader = new FileReader();
                  reader.onload = e => {
                    const data = e.target.result;
                    const workbook = xlsx.read(data, { type: 'binary' });
                    const table = workbook.Sheets.Sheet1;

                    let currRow = 1;
                    // const fieldNames = R.map(a => table[a + currRow].v, fieldColumn);

                    const rangeArr = table['!ref'].split(':');
                    // const startCell = rangeArr[0];
                    const endCell = rangeArr[1];
                    const lastNumber = getLastNumber(endCell);

                    const tableJSON = [];
                    while (currRow++ < lastNumber) {
                      const newRow = R.map(a => {
                        const value = table[a + currRow] ? table[a + currRow].v : null;
                        return { value };
                      }, fieldColumn);
                      tableJSON.push(newRow);
                    }

                    this.setState({
                      ...this.state,
                      data: tableJSON,
                      isLoading: false,
                    });
                  };
                  reader.readAsBinaryString(file);
                },
              );
            }}
          />
          <LoadingBox isLoading={this.state.isLoading} />
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
  submitButtonContainer: {
    marginTop: '10px',
    width: '100%',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ case_ }) => {
  const { excelUpload } = case_;
  const { caseList } = excelUpload;
  return {
    caseList,
  };
};

const mapDispatchToProps = {
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ExcelUpload));
