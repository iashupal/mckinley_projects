import React, { Component } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { R, RU } from 'helpers/ramda';
import Loader from 'components/Loader';
import NumberFormat from 'react-number-format';
import InputBox from 'components/InputBox';
import DatePicker from 'components/DatePicker';
import InputBoxNumber from 'components/InputBoxNumber';
import Select from 'components/Select';
import AutoComplete from 'components/AutoComplete';
import TimePicker from 'components/TimePicker';

const { yearMonthDay } = RU;

const LoadingComponent = ({ colSpanCount }) => {
  return (
    <TableBody>
      <TableRow style={{ height: '50px' }}>
        <TableCell colSpan={colSpanCount} style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px', paddingBottom: '15px' }}>
            <Loader color="primary" />
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

const NoDataComponent = ({ colSpanCount }) => {
  return (
    <TableBody>
      <TableRow style={{ height: '50px' }}>
        <TableCell colSpan={colSpanCount} style={{ textAlign: 'center' }}>
          검색 결과가 없습니다.
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

const CheckBoxCell = ({ useCheckBox, checkboxValues, id, onChange }) => {
  const isCheckedTemp = checkboxValues.filter(a => a.id === id)[0];
  const isChecked = isCheckedTemp ? isCheckedTemp.value : false;
  if (!useCheckBox) return null;
  return (
    <TableCell padding="checkbox" className="table-cell" role="checkbox" align="center" style={{ width: '40px' }}>
      <Checkbox checked={isChecked} onChange={onChange} />
    </TableCell>
  );
};

class ETableBody extends Component {
  render() {
    const {
      currentViewedRows,
      rows,
      checkboxValues,
      useCheckBox,
      showFieldList,
      mngIconsWidth,
      mngIcons,
      handleOneCheckBoxChanged,
      customColumn,
      isLoading,
      subSumRows,
      totalSumRow,
      editMode,
      editHandler,
    } = this.props;

    let colSpanCount = rows.length;
    if (mngIcons) colSpanCount++;
    if (useCheckBox) colSpanCount++;

    if (isLoading) return <LoadingComponent colSpanCount={colSpanCount} />;
    if (!currentViewedRows.length) return <NoDataComponent colSpanCount={colSpanCount} />;

    const columns = Object.keys(rows);
    let currentViewedRowsAndSubsum = currentViewedRows;
    if (subSumRows) {
      const sumFieldList = columns
        .map(a => rows[a])
        .filter(a => a.sum)
        .map(a => a.id);

      const uniqValues = R.uniq(currentViewedRows.map(a => a[subSumRows]));
      const groupAndData = uniqValues.map((group, index) => {
        const filteredData = currentViewedRows.filter(a => a[subSumRows] === group);

        const arrarr = sumFieldList.map(fieldName => {
          const subSumValue = filteredData.reduce((a, b) => a + b[fieldName], 0);
          return [fieldName, subSumValue];
        });

        return [...filteredData, { ...R.fromPairs(arrarr), id: `_subSumRow_${index}`, [subSumRows]: group }];
      });
      currentViewedRowsAndSubsum = groupAndData.reduce((a, b) => [...a, ...b]);
    }

    return (
      <TableBody>
        {currentViewedRowsAndSubsum.map((n, nindex) => {
          return (
            <TableRow hover tabIndex={-1} key={n.id} index={n.id} style={{ height: '50px' }}>
              <CheckBoxCell
                useCheckBox={useCheckBox}
                checkboxValues={checkboxValues}
                id={n.id}
                onChange={e => handleOneCheckBoxChanged(e, n.id)}
              />
              {columns.map((row, index) => {
                const { id, width, sum, type, style, options } = rows[row];
                if (!R.includes(id, showFieldList)) return null;
                const isSubSumRow = n.id && n.id.indexOf && n.id.indexOf('_subSumRow_') > -1; // 중간 SubSumRow

                // [참고] n.id --> Row Key (1, 2, 3, 4..)
                // [참고] id --> Column Name Key ('task', 'status'..)
                const filteredCustomData = customColumn && customColumn.filter(obj => obj.field === id);
                let CustomComponent = null;
                if (filteredCustomData && filteredCustomData.length > 0) {
                  CustomComponent = filteredCustomData[0].component;
                }
                const { align } = rows.filter(a => a.id === id)[0];

                let rowStyle = {};
                if (useCheckBox || index > 0) rowStyle.borderLeft = '1px solid lightgray';
                if (isSubSumRow) rowStyle.backgroundColor = '#FFF9C4';
                if (style) rowStyle = { ...rowStyle, ...style }; // Column 단위 스타일
                if (n._style) rowStyle = { ...rowStyle, ...n._style }; // Row 단위 스타일

                let displayComponent = n[id];
                if (CustomComponent) displayComponent = <CustomComponent row={n} />;
                if (sum || type === 'number') {
                  displayComponent = <NumberFormat value={n[id]} displayType="text" thousandSeparator />;
                  if (typeof n[id] === 'string') displayComponent = n[id];
                }

                if (editMode && id !== '_changed') {
                  if (type === 'date') {
                    displayComponent = (
                      <DatePicker
                        value={n[id]}
                        onChange={date => {
                          editHandler(n.id, id, yearMonthDay(date));
                        }}
                      />
                    );
                  } else if (type === 'number') {
                    displayComponent = (
                      <InputBoxNumber
                        width={150}
                        value={n[id]}
                        decimalScale={0}
                        onValueChange={obj => {
                          editHandler(n.id, id, obj.value);
                        }}
                      />
                    );
                  } else if (type === 'money') {
                    displayComponent = (
                      <InputBoxNumber
                        width={150}
                        value={n[id]}
                        decimalScale={0}
                        thousandSeparator
                        onValueChange={obj => {
                          editHandler(n.id, id, obj.value);
                        }}
                      />
                    );
                  } else if (type === 'code') {
                    displayComponent = (
                      <Select
                        options={options}
                        selectedKey={n[id]}
                        onChange={(event, option) => {
                          editHandler(n.id, id, option.key);
                        }}
                        styles={{ dropdown: { width: 160 } }}
                      />
                    );
                  } else if (type === 'autoComplete') {
                    displayComponent = (
                      <AutoComplete
                        options={options}
                        selectedOption={{}}
                        handleChange={selectedOption => {
                          editHandler(n.id, id, selectedOption.value);
                        }}
                        width="100%"
                      />
                    );
                  } else if (type === 'timePicker') {
                    displayComponent = (
                      <TimePicker
                        use12Hours={false}
                        value={n[id]}
                        onChange={val => {
                          editHandler(n.id, id, val);
                        }}
                        format="H:mm"
                        showSecond={false}
                      />
                    );
                  } else {
                    displayComponent = (
                      <InputBox
                        value={n[id]}
                        onChange={e => {
                          editHandler(n.id, id, e.target.value);
                        }}
                      />
                    );
                  }
                }
                if (editMode && id === '_changed') {
                  displayComponent = (
                    <Checkbox
                      checked={n[id]}
                      onChange={() => {
                        editHandler(n.id, '_changed', !n[id]);
                      }}
                    />
                  );
                }

                return (
                  <TableCell
                    className="table-cell"
                    align={align || 'center'}
                    width={width || ''}
                    style={rowStyle}
                    key={index}
                  >
                    {displayComponent}
                  </TableCell>
                );
              })}
              {mngIcons && (
                <TableCell
                  align="center"
                  className="table-cell"
                  style={{ borderLeft: '1px solid lightgray', width: mngIconsWidth }}
                >
                  {mngIcons(n.id, n, nindex)}
                </TableCell>
              )}
            </TableRow>
          );
        })}
        {totalSumRow && (
          <TableRow hover tabIndex={-1} key="_totalSumRow" style={{ height: '50px' }}>
            {useCheckBox && (
              <TableCell
                padding="checkbox"
                className="table-cell"
                role="checkbox"
                align="center"
                style={{ width: '40px' }}
              >
                &nbsp;
              </TableCell>
            )}
            {columns.map((row, index) => {
              const { id, width, sum } = rows[row];
              if (!R.includes(id, showFieldList)) return null;
              const { align } = rows.filter(a => a.id === id)[0];

              const rowStyle = { backgroundColor: '#ffcdd2' };
              if (useCheckBox || index > 0) rowStyle.borderLeft = '1px solid lightgray';

              return (
                <TableCell
                  className="table-cell"
                  align={align || 'center'}
                  width={width || ''}
                  style={rowStyle}
                  key={index}
                >
                  {index === 0 && <span style={{ fontWeight: 'bold' }}>합계</span>}
                  {index !== 0 && sum && (
                    <span style={{ fontWeight: 'bold' }}>
                      <NumberFormat
                        value={currentViewedRows.map(a => a[id]).reduce((a, b) => a + b)}
                        displayType="text"
                        thousandSeparator
                      />
                    </span>
                  )}
                </TableCell>
              );
            })}
            {mngIcons && (
              <TableCell
                align="center"
                className="table-cell"
                style={{ borderLeft: '1px solid lightgray', width: mngIconsWidth }}
              >
                &nbsp;
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    );
  }
}

export default ETableBody;
