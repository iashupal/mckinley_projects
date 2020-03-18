import React, { Fragment } from 'react';
import InputBox from 'components/InputBox';
import Select from 'components/Select';
import ButtonN from 'components/ButtonN';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { R } from 'helpers/ramda';

const { clone } = R;

const dataLabel = { type: 'label', value: 'new label : ' };
const dataInput = { type: 'input', value: 'new input component' };
const dataSelect = {
  type: 'select',
  label: '선택',
  value: '1',
  list: [{ key: '1', text: '테스트-1' }, { key: '2', text: '테스트-2' }, { key: '3', text: '테스트-3' }],
};
const dataButton = { type: 'button', label: '저장' };
const dataBr = { type: 'br' };
const dataDiv = {
  type: 'div',
  child: [
    {
      type: 'div',
      child: [{ type: 'input', value: 'new input component' }, { type: 'input', value: 'new input component' }],
    },
    { type: 'button', label: '저장' },
  ],
};
const dataTable = {
  type: 'table',
  child: [
    {
      type: 'tableHead',
      child: [
        {
          type: 'tableCell',
          child: [{ type: 'label', value: 'Input-1' }],
        },
        {
          type: 'tableCell',
          child: [{ type: 'label', value: 'Input-2' }],
        },
        {
          type: 'tableCell',
          child: [{ type: 'label', value: 'Input-3' }],
        },
      ],
    },
    {
      type: 'tableBody',
      child: [
        {
          type: 'tableRow',
          child: [
            {
              type: 'tableCell',
              child: [{ type: 'input', value: '' }],
            },
            {
              type: 'tableCell',
              child: [{ type: 'input', value: '' }],
            },
            {
              type: 'tableCell',
              child: [{ type: 'input', value: '' }],
            },
          ],
        },
        // {
        //   type: 'tableRow',
        //   child: [
        //     {
        //       type: 'tableCell',
        //       child: [{ type: 'input', value: '' }],
        //     },
        //     {
        //       type: 'tableCell',
        //       child: [{ type: 'input', value: '' }],
        //     },
        //     {
        //       type: 'tableCell',
        //       child: [{ type: 'input', value: '' }],
        //     },
        //   ],
        // },
      ],
    },
  ],
};

export const MakeTemplate = ({ dataArr, setDataArr }) => {
  const addDataArr = item => setDataArr([...dataArr, item]);

  return (
    <Fragment>
      <ButtonN
        color="primary"
        onClick={() => {
          addDataArr(dataLabel);
        }}
        label="Label"
      />
      <ButtonN
        color="primary"
        onClick={() => {
          addDataArr(dataInput);
        }}
        label="Input"
      />
      <ButtonN
        color="primary"
        onClick={() => {
          addDataArr(dataSelect);
        }}
        label="Select"
      />
      <ButtonN
        color="primary"
        onClick={() => {
          addDataArr(dataButton);
        }}
        label="Button"
      />
      {/* <ButtonN
        color="primary"
        onClick={() => {
          addDataArr(dataDiv);
        }}
        label="div"
      /> */}
      <ButtonN
        color="dark"
        onClick={() => {
          addDataArr(dataTable);
        }}
        label="dataTable"
      />
      <ButtonN
        color="dark"
        onClick={() => {
          const newDataArr = clone(dataArr);
          newDataArr[0].child[1].child.push({
            type: 'tableRow',
            child: [
              {
                type: 'tableCell',
                child: [{ type: 'input', value: '' }],
              },
              {
                type: 'tableCell',
                child: [{ type: 'input', value: '' }],
              },
              {
                type: 'tableCell',
                child: [{ type: 'input', value: '' }],
              },
            ],
          });
          setDataArr(newDataArr);
        }}
        label="add TableRow (dataTable 1개만 있을떄 동작)"
      />
      <ButtonN
        color="warning"
        onClick={() => {
          alert(JSON.stringify(dataArr));
        }}
        label="ALL-DATA"
      />
      <ButtonN
        color="danger"
        onClick={() => {
          setDataArr([]);
        }}
        label="Remove All"
      />
    </Fragment>
  );
};

const CompLabel = ({ data }) => {
  const { value } = data;

  return <span>{value}</span>;
};

const CompBr = () => {
  return <span style={{ width: '100%' }}>&nbsp;</span>;
};

const CompInputBox = ({ data, setData }) => {
  const { value } = data;

  return (
    <InputBox
      value={value}
      // width="200px"
      onChange={e => {
        const newData = clone(data);
        newData.value = e.target.value;
        setData(newData);
      }}
    />
  );
};

const CompSelect = ({ data, setData }) => {
  const { label, list, value } = data;

  return (
    <Select
      placeholder={label}
      options={list}
      onChange={(event, option, i) => {
        const newData = clone(data);
        newData.value = option.key;
        setData(newData);
      }}
      selectedKey={value}
    />
  );
};

const CompButtonN = ({ data, handleClick }) => {
  const { label } = data;

  return <ButtonN color="primary" onClick={handleClick} label={label} />;
};

const CompDiv = ({ data, setData }) => {
  const { child } = data;

  return (
    <div className="CompDiv">
      <ConvertedComponent
        dataArr={child}
        setDataArr={newItem => {
          const newData = clone(data);
          newData.child = newItem;
          setData(newData);
        }}
      />
    </div>
  );
};

const CompTable = ({ data, setData }) => {
  const { child } = data;

  return (
    <Table aria-labelledby="tableTitle">
      <ConvertedComponent
        dataArr={child}
        setDataArr={newItem => {
          const newData = clone(data);
          newData.child = newItem;
          setData(newData);
        }}
      />
    </Table>
  );
};

const CompTableHead = ({ data, setData }) => {
  const { child } = data;

  return (
    <TableHead>
      <TableRow className="table-row">
        <ConvertedComponent
          dataArr={child}
          setDataArr={newItem => {
            const newData = clone(data);
            newData.child = newItem;
            setData(newData);
          }}
        />
      </TableRow>
    </TableHead>
  );
};

const CompTableBody = ({ data, setData }) => {
  const { child } = data;

  return (
    <TableBody>
      <ConvertedComponent
        dataArr={child}
        setDataArr={newItem => {
          const newData = clone(data);
          newData.child = newItem;
          setData(newData);
        }}
      />
    </TableBody>
  );
};

const CompTableRow = ({ data, setData }) => {
  const { child } = data;

  return (
    <TableRow>
      <ConvertedComponent
        dataArr={child}
        setDataArr={newItem => {
          const newData = clone(data);
          newData.child = newItem;
          setData(newData);
        }}
      />
    </TableRow>
  );
};

const CompTableCell = ({ data, setData }) => {
  const { child } = data;

  return (
    <TableCell style={{ textAlign: 'center' }}>
      <ConvertedComponent
        dataArr={child}
        setDataArr={newItem => {
          const newData = clone(data);
          newData.child = newItem;
          setData(newData);
        }}
      />
    </TableCell>
  );
};

export const ConvertedComponent = ({ dataArr, setDataArr }) => {
  return (
    <Fragment>
      {/* style={{ display: 'flex', flexWrap: 'wrap' }} */}
      {dataArr &&
        dataArr.map((a, index) => {
          const { type } = a;

          if (type === 'label') return <CompLabel key={index} data={a} />;
          if (type === 'br') return <CompBr key={index} />;
          if (type === 'button')
            return <CompButtonN key={index} data={a} handleClick={() => alert(JSON.stringify(dataArr))} />;
          if (type === 'input') {
            return (
              <CompInputBox
                key={index}
                data={a}
                setData={newData => {
                  const newTemplateValue = clone(dataArr);
                  newTemplateValue[index] = newData;
                  setDataArr(newTemplateValue);
                }}
              />
            );
          }
          if (type === 'select') {
            return (
              <CompSelect
                key={index}
                data={a}
                setData={newData => {
                  const newTemplateValue = clone(dataArr);
                  newTemplateValue[index] = newData;
                  setDataArr(newTemplateValue);
                }}
              />
            );
          }
          if (type === 'div') {
            return (
              <CompDiv
                key={index}
                data={a}
                setData={newData => {
                  const newTemplateValue = clone(dataArr);
                  newTemplateValue[index] = newData;
                  setDataArr(newTemplateValue);
                }}
              />
            );
          }
          if (type === 'table') {
            return (
              <CompTable
                key={index}
                data={a}
                setData={newData => {
                  const newTemplateValue = clone(dataArr);
                  newTemplateValue[index] = newData;
                  setDataArr(newTemplateValue);
                }}
              />
            );
          }
          if (type === 'tableHead') {
            return (
              <CompTableHead
                key={index}
                data={a}
                setData={newData => {
                  const newTemplateValue = clone(dataArr);
                  newTemplateValue[index] = newData;
                  setDataArr(newTemplateValue);
                }}
              />
            );
          }
          if (type === 'tableBody') {
            return (
              <CompTableBody
                key={index}
                data={a}
                setData={newData => {
                  const newTemplateValue = clone(dataArr);
                  newTemplateValue[index] = newData;
                  setDataArr(newTemplateValue);
                }}
              />
            );
          }
          if (type === 'tableRow') {
            return (
              <CompTableRow
                key={index}
                data={a}
                setData={newData => {
                  const newTemplateValue = clone(dataArr);
                  newTemplateValue[index] = newData;
                  setDataArr(newTemplateValue);
                }}
              />
            );
          }
          if (type === 'tableCell') {
            return (
              <CompTableCell
                key={index}
                data={a}
                setData={newData => {
                  const newTemplateValue = clone(dataArr);
                  newTemplateValue[index] = newData;
                  setDataArr(newTemplateValue);
                }}
              />
            );
          }
          return null;
        })}
    </Fragment>
  );
};
