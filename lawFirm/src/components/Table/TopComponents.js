import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from 'components/BoxOld';
import Select from 'components/Select';
import Popover from 'components/Popover';
import Button from 'components/Button';
import { RU } from 'helpers/ramda';
import Filter from './Filter';

const { excelExport: excelExportFunc } = RU;

class TopComponents extends Component {
  state = {
    anchorEl: null,
  };

  render() {
    const {
      condComponents,
      useCheckBox,
      checkedIDs,
      allFields,
      showFieldList,
      filterList,
      rows,
      data,
      hideFilter,
      mngIconsBatch,
      excelExport,
    } = this.props;
    const { anchorEl } = this.state;

    // noFilter 가 들어간 부분은, 필터선택 Select 대상에서 제거함.
    const filterAvailFields = rows.filter(a => !a.noFilter).map(a => ({ key: a.id, text: a.label }));

    return (
      <Box mb={1}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex' }}>{condComponents && condComponents}</div>
          </div>
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            {useCheckBox && checkedIDs.length > 0 && mngIconsBatch(checkedIDs)}
            {!hideFilter && (
              <>
                {excelExport && (
                  <Button
                    variant="contained"
                    onClick={e => {
                      const excelFields = rows.filter(a => !a.noExcel).map(a => ({ key: a.id, text: a.label }));

                      const excelHeaderText = excelFields.map(a => a.text);
                      const excelHeaderKey = excelFields.map(a => a.key);
                      const makeOneRow = row => excelHeaderKey.map(field => row[field]);
                      const allExcelData = data.map(makeOneRow);

                      excelExportFunc(excelHeaderText, allExcelData, 'SheetJS', 'ExcelExport.xlsx');
                    }}
                  >
                    <i className="ri-file-excel-2-fill ri-xl" />
                  </Button>
                )}
                <Select
                  placeholder="컬럼 선택"
                  options={allFields}
                  selectedKeys={showFieldList}
                  multiSelect
                  onChange={this.props.handleShowHideChange}
                />
                <Button
                  variant="contained"
                  onClick={e => {
                    this.setState({ anchorEl: anchorEl ? null : e.currentTarget });
                  }}
                >
                  <i className="material-icons icon-color" style={filterList.length > 0 ? { color: '#FB8C00' } : {}}>
                    filter_list
                  </i>
                </Button>
                <Popover
                  id="table-popover"
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  handleClose={e => {
                    this.setState({ anchorEl: null });
                  }}
                >
                  <Paper>
                    <Filter
                      filterList={filterList}
                      filterRemove={this.props.handleFilterRemove}
                      filterAvailFields={filterAvailFields}
                      allFieldInfo={rows}
                      originalData={data}
                      handleAdd={this.props.handleFilterAdd}
                      handleReset={this.props.handleFilterReset}
                      handleClose={e => {
                        this.setState({ anchorEl: null });
                      }}
                    />
                  </Paper>
                </Popover>
              </>
            )}
          </div>
        </div>
      </Box>
    );
  }
}

export default TopComponents;
