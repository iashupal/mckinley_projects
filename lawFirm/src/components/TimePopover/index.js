import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import InputBox from 'components/InputBox';
import { R } from 'helpers/ramda';
import TimeItems from './TimeItems';

export const SetLS = value => {
  localStorage.setItem(`headerTimeList`, JSON.stringify(value));
};

export const GetLS = () => {
  try {
    const data = JSON.parse(localStorage.getItem(`headerTimeList`));
    return data || [];
  } catch (e) {
    return [];
  }
};

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [listData, setListData] = useState(GetLS()); // [{ id: 1, title: '[Sample] 항목 > [Sample] 항목' }]
  const [textInput1, setTextInput1] = useState('TEST-1');
  const [textInput2, setTextInput2] = useState('TEST-2');

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div>
        <Button
          aria-describedby={id}
          onClick={event => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <i className="material-icons" style={{ color: 'white' }}>
            timer
          </i>
        </Button>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ width: '460px', padding: '20px' }}>
          <TimeItems
            data={listData}
            handleRemove={id => {
              const newListData = listData.filter(a => a.id !== id);
              SetLS(newListData);
              setListData(newListData);
              setAnchorEl(null);
            }}
            handleReset={time => {
              alert(`측정 시간 : ${time} ms (TC 항목을 지정해서 입력 예정)`);
            }}
          />
          <div style={{ display: 'flex', paddingTop: '14px' }}>
            <InputBox
              value={textInput1}
              onChange={e => {
                setTextInput1(e.target.value);
              }}
              handleSubmit={() => {}}
              width="120px"
            />
            &nbsp;&nbsp;
            <InputBox
              value={textInput2}
              onChange={e => {
                setTextInput2(e.target.value);
              }}
              handleSubmit={() => {}}
              width="120px"
            />
            <ButtonN
              aria-describedby={id}
              color="primary"
              onClick={() => {
                const onlyIDs = listData.map(a => a.id);
                const newID = R.reduce(R.max, 0, onlyIDs) + 1;
                const newList = [...listData, { id: newID, title: `${textInput1} > ${textInput2}` }];
                SetLS(newList);
                setListData(newList);
                // setTextInput1(''); // await ??
                // setTextInput2(''); // await ??
              }}
            >
              <i className="material-icons icon-color">add</i>
            </ButtonN>
          </div>
        </div>
      </Popover>
    </>
  );
};
