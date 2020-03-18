import React, { Component } from 'react';
import EditTable from 'components/EditTable';

class Test extends Component {
  state = {
    data: [
      {
        id: '1',
        date: '2019-07-09',
        task: '우편test발송-1',
        numTest: 1000,
        admin: '0010',
      },
    ],
  };

  render() {
    const { data } = this.state;

    return (
      <div className="app-wrapper">
        <div>
          [EditTable sample]
          <br />
          <br />
        </div>
        <EditTable
          data={data}
          newRowDefault={{
            date: '2019-09-04',
            task: 'string',
            numTest: 0,
            admin: '0020',
          }}
          rows={[
            { id: 'date', type: 'date', label: '날짜', width: '170px', align: 'left' },
            { id: 'task', type: 'text', label: 'Task', align: 'left' },
            { id: 'numTest', type: 'number', label: 'Num', align: 'right', width: '100px' },
            {
              id: 'admin',
              type: 'code',
              label: '담당자',
              width: '140px',
              options: [
                { key: '0010', text: '테스트1' },
                { key: '0020', text: '테스트2' },
                { key: '0030', text: '테스트3' },
              ],
            },
          ]}
          setData={data => this.setState({ data })}
          saveData={data => {
            alert(JSON.stringify(data, null, 4));
          }}
        />
      </div>
    );
  }
}

export default Test;
