import React, { Component, Fragment } from 'react';
import { R, RU } from 'helpers/ramda';
import Button from 'components/Button';
import Dropzone from 'react-dropzone';
import xlsx from 'xlsx';

const { excelExport, getLastNumber } = RU;

class ExcelImport extends Component {
  render() {
    let dropzoneRef;
    const { headerText, fieldColumn, sheetName, fileName, sampleData, handleImport } = this.props;

    return (
      <>
        <Button color="primary" icon="archive" onClick={() => excelExport(headerText, sampleData, sheetName, fileName)}>
          <span style={{ paddingRight: '4px' }}>Template Download</span>
        </Button>
        <Button
          color="primary"
          icon="unarchive"
          onClick={e => {
            dropzoneRef.open();
          }}
        >
          <span style={{ paddingRight: '4px' }}>Import</span>
        </Button>
        <Dropzone
          ref={node => {
            dropzoneRef = node;
          }}
          style={{ display: 'none' }}
          onDrop={async (accepted, rejected) => {
            const file = accepted[0];
            const reader = new FileReader();
            reader.onload = e => {
              const data = e.target.result;
              const workbook = xlsx.read(data, { type: 'binary' });
              const table = workbook.Sheets[sheetName];

              let currRow = 1;
              // const fieldNames = R.map(a => table[a + currRow].v, fieldColumn);

              const rangeArr = table['!ref'].split(':');
              // const startCell = rangeArr[0];
              const endCell = rangeArr[1];
              const lastNumber = getLastNumber(endCell);

              const tableJSON = [];
              while (currRow++ < lastNumber) {
                const newRow = R.map(a => (table[a + currRow] ? table[a + currRow].v : null), fieldColumn);
                tableJSON.push(newRow);
              }

              handleImport(tableJSON);
            };
            reader.readAsBinaryString(file);
          }}
        />
      </>
    );
  }
}

export default ExcelImport;
