import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { R, RU } from 'helpers/ramda';

class Header extends Component {
  render() {
    const {
      order,
      orderBy,
      rows,
      useCheckBox,
      mngIcons,
      mngIconsWidth,
      onRequestSort,
      allCheckboxChecked,
      allCheckboxHandle,
      showFieldList,
    } = this.props;
    return (
      <TableHead mt={10}>
        <TableRow className="table-row" style={{ height: '50px' }}>
          {useCheckBox && (
            <TableCell
              padding="checkbox"
              className="table-cell"
              role="checkbox"
              align="center"
              aria-checked
              style={{ width: '40px' }}
            >
              <Checkbox checked={allCheckboxChecked} onChange={allCheckboxHandle} />
            </TableCell>
          )}
          {rows.map(row => {
            const { noSort, id, width, label } = row;

            if (!R.includes(id, showFieldList)) return null;
            if (noSort) {
              return (
                <TableCell
                  className="table-cell"
                  align="center"
                  width={width || ''}
                  key={id}
                  sortDirection={orderBy === id ? order : false}
                >
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{label}</span>
                </TableCell>
              );
            }
            return (
              <TableCell
                className="table-cell"
                align="center"
                width={width || ''}
                key={id}
                sortDirection={orderBy === id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === id}
                  direction={order || 'asc'}
                  onClick={event => onRequestSort(event, id)}
                  hideSortIcon
                >
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{label}</span>
                </TableSortLabel>
              </TableCell>
            );
          })}
          {mngIcons && (
            <TableCell className="table-cell" align="center" sortDirection={false} style={{ width: mngIconsWidth }}>
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>관리</span>
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  }
}

const styles = theme => ({
  icon: {
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    width: '15px',
    height: '15px',
    userSelect: 'none',
  },
});

export default withStyles(styles, { name: 'MuiTableSortLabel' })(Header);
