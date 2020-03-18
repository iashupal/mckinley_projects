import React, { Component } from 'react';
import { RU } from 'helpers/ramda';
import { BlankSpan } from 'helpers/ui';
import Button from 'components/Button';
import NumberFormat from 'react-number-format';
import Select from 'components/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const { readFile, convertFileSize } = RU;

class FileTable extends Component {
  render() {
    const { files, removeFile, fileChart, handleFileDivisionAdd } = this.props;
    return (
      <div>
        <Paper>
          <Table>
            <TableHead mt={10}>
              <TableRow className="table-row" style={{ height: '50px' }}>
                <TableCell className="table-cell" align="center" style={{ width: '55%' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>파일이름</span>
                </TableCell>
                <TableCell className="table-cell" align="center" style={{ width: '15%' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>구분</span>
                </TableCell>
                <TableCell className="table-cell" align="center" style={{ width: '15%' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>삭제</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files &&
                files.map(n => {
                  const convertedSizeInfo = convertFileSize(n.size);
                  return (
                    <TableRow hover key={n.key} style={{ height: '50px' }}>
                      <TableCell
                        className="table-cell"
                        align="left"
                        style={{ borderLeft: '1px solid lightgray', cursor: 'pointer', width: '55%' }}
                        onClick={e => readFile(n.key, n.name)}
                      >
                        {n.name}
                        <BlankSpan num={1} />
                        {'('}
                        <NumberFormat
                          value={convertedSizeInfo.value}
                          displayType="text"
                          thousandSeparator
                          suffix={convertedSizeInfo.unit}
                        />
                        {')'}
                      </TableCell>

                      <TableCell
                        className="table-cell"
                        align="center"
                        style={{ borderLeft: '1px solid lightgray', width: '15%' }}
                      >
                        <Select
                          placeholder="문서구분"
                          options={fileChart || []}
                          selectedKey={n.division}
                          onChange={(event, selectedOption) => handleFileDivisionAdd(n.key, selectedOption.key)}
                        />
                      </TableCell>
                      <TableCell
                        className="table-cell"
                        align="center"
                        style={{ borderLeft: '1px solid lightgray', width: '15%' }}
                      >
                        <Button
                          size="square"
                          icon="delete"
                          color="danger"
                          onClick={e => removeFile(n.fileID, n.key, n.flag)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default FileTable;
