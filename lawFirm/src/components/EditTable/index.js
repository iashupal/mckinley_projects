import React, { Component } from 'react';
import Table from 'components/Table/EnhancedTable';
import ButtonN from 'components/ButtonN';
import { R } from 'helpers/ramda';

const { clone } = R;

class EditTable extends Component {
  state = {
    newRowID: 1,
  };

  render() {
    const { data, rows, setData, saveData, newRowDefault } = this.props;

    // 필드 정의, 추가
    const sortAddedRows = rows.map(a => ({ ...a, noSort: true }));
    const nRows = [...sortAddedRows, { id: '_changed', type: 'text', label: '변경', width: '80px', noSort: true }];

    // New 데이터 형식, 추가
    const newRowDefault2 = { ...newRowDefault, id: `new-${this.state.newRowID}`, _changed: true };

    // 기존 데이터, (필드자체가 없으면) _changed 추가
    const changedAddedData = data.map(a => ({ ...a, _changed: !!a._changed }));

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <ButtonN
            color="dark"
            onClick={() => {
              const filteredData = data
                .filter(a => a._changed)
                .map(a => {
                  const newObj = clone(a);
                  delete newObj._changed;
                  return newObj;
                });
              saveData(filteredData);
            }}
          >
            <i className="material-icons icon-color">save</i>
          </ButtonN>
          <ButtonN
            color="danger"
            onClick={() => {
              const new_tableData = clone(data);
              if (new_tableData.length > 1) {
                new_tableData.pop();
                setData(new_tableData);
              }
            }}
          >
            <i className="material-icons icon-color">remove_circle_outline</i>
          </ButtonN>
          <ButtonN
            color="primary"
            onClick={() => {
              const new_tableData = clone(data);
              new_tableData.push(newRowDefault2);
              this.setState({ ...this.state, newRowID: this.state.newRowID + 1 });
              setData(new_tableData);
            }}
          >
            <i className="material-icons icon-color">add_circle_outline</i>
          </ButtonN>
        </div>
        <Table
          rows={nRows}
          hidePagination
          hideFilter
          data={changedAddedData}
          editMode
          editHandler={(id, field, value) => {
            const new_tableData = clone(data);
            const new_tableData2 = new_tableData.map(a => {
              if (a.id === id) {
                a[field] = value;
                if (field !== '_changed') {
                  a._changed = true;
                }
              }
              return a;
            });

            setData(new_tableData2);
          }}
        />
      </>
    );
  }
}

export default EditTable;
