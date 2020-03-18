import React from 'react';
import ButtonN from 'components/ButtonN';
import TimeButton from 'components/Timebutton';
import { SetLS } from 'components/Timebutton/Utils';

const TimeItem = ({ data, handleRemove, handleReset }) => {
  const { title, id } = data;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: 'solid 1px',
        borderColor: 'lightgray',
        paddingBottom: '5px',
        marginBottom: '5px',
      }}
    >
      <div style={{ marginRight: 'auto' }}>{title}</div>
      <div>:</div>
      <TimeButton
        classes={{
          timerInr: 'bg-black',
          heading: 'text-red',
        }}
        handleReset={handleReset}
        saveID={`header_${id}`}
      />
      <ButtonN
        color="danger"
        onClick={() => {
          handleRemove(id);
          SetLS(`header_${id}`, 0);
        }}
      >
        <i className="material-icons icon-color">remove</i>
      </ButtonN>
    </div>
  );
};

const TimeItems = ({ data, handleRemove, handleReset }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {data &&
        data.map((a, index) => {
          return <TimeItem data={a} key={index} handleRemove={handleRemove} handleReset={handleReset} />;
        })}
    </div>
  );
};

export default TimeItems;
