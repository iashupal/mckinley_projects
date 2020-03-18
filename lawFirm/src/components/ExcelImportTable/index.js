import React, { Component, Fragment } from 'react';
import { Paper } from '@material-ui/core';
import ExcelImport from 'components/ExcelImport';
import Table from 'components/Table/EnhancedTable';
import Button from 'components/Button';
import { excelImportTable } from 'helpers/data_sample';
import Box from 'components/BoxOld';
import produce from 'immer';

class ExcelImportTable extends Component {
  render() {
    const {
      fieldColumn,
      sheetName,
      fileName,
      sampleData,
      tableRows,
      tableData,
      handleClickEdit,
      handleSave,
      handleImport,
      handleRemove,
      handleClear,
      multiKey,
    } = this.props;

    const headerText = tableRows.map(a => a.label);
    const importMapFunc = a => {
      const ids = tableRows.map(b => b.id);
      const returnValue = {};
      for (let i = 0; i < ids.length; i++) {
        returnValue[ids[i]] = a[i];
      }
      return returnValue;
    };
    return (
      <Paper className="p-3">
        <div style={{ textAlign: 'right' }}>
          <ExcelImport
            headerText={headerText}
            fieldColumn={fieldColumn}
            sheetName={sheetName}
            fileName={fileName}
            sampleData={sampleData}
            handleImport={e => handleImport(e.map(importMapFunc))}
          />
        </div>
        <Table
          rows={tableRows.map(a => ({ ...a, noSort: true }))}
          data={tableData}
          hidePagination
          hideFilter
          multiKey={multiKey}
          height="300px"
          mngIconsWidth="100px"
          mngIcons={(id, n, index) => (
            <>
              <Button size="square" icon="border_color" color="success" onClick={() => handleClickEdit(n, index)} />
              <Button size="square" icon="delete" color="danger" onClick={() => handleRemove(index)} />
            </>
          )}
        />
        <div style={{ textAlign: 'center', paddingTop: '15px' }}>
          <Button color="primary" size="large" mode="regular" onClick={handleSave}>
            <Box pl={5} pr={5}>
              업로드
            </Box>
          </Button>
          <Button color="inverted" size="large" mode="regular" onClick={handleClear}>
            <Box pl={3} pr={3}>
              전체 삭제
            </Box>
          </Button>
        </div>
      </Paper>
    );
  }
}

export default ExcelImportTable;
