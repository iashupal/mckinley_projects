import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Select from 'components/Select';
import DatePicker from 'components/DatePicker';
import InputBox from 'components/InputBox';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { R, RU } from 'helpers/ramda';
import Button from 'components/Button';
import InputBoxNumber from 'components/InputBoxNumber';

const { yearMonthDay } = RU;

const FilterOneRow = ({ display, id, handleRemove }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2px',
        borderBottom: 'solid',
        borderBottomWidth: 0.6,
        marginBottom: '12px',
      }}
    >
      <i className="material-icons icon-color" style={{ color: '#FB8C00' }}>
        filter_list
      </i>
      <span>{display}</span>
      <Button
        size="small"
        icon="cancel"
        onClick={() => {
          handleRemove(id);
        }}
      />
    </div>
  );
};

const ToggleDiv = ({ value, setValue }) => {
  return (
    <div style={{ paddingLeft: '5px', width: '149px' }}>
      <ToggleButtonGroup
        size="small"
        value={value}
        exclusive
        onChange={(event, value) => {
          setValue(value);
        }}
      >
        <ToggleButton value="1">&gt;</ToggleButton>
        <ToggleButton value="2">&lt;</ToggleButton>
        <ToggleButton value="3">=</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

const getCompareText = strNum => {
  if (strNum === '1') return '>';
  if (strNum === '2') return '<';
  return '=';
};

class Filter extends Component {
  state = {
    selectedFieldKey: '',
    selectedFieldText: '',
    selectedType: '',
    selectedCompore: '3',
    inputDate: yearMonthDay(new Date()),
    inputText: '',
    inputNumber: '',
    inputSelect: '',
  };

  render() {
    const {
      filterList,
      filterRemove,
      filterAvailFields,
      allFieldInfo,
      originalData,
      handleAdd,
      handleReset,
      handleClose,
    } = this.props;
    const {
      selectedFieldKey,
      selectedFieldText,
      selectedType,
      selectedCompore,
      inputDate,
      inputText,
      inputNumber,
      inputSelect,
    } = this.state;

    const checkTypeDate = Boolean(selectedCompore);
    const checkTypeText = Boolean(inputText);
    const checkTypeNumber = Boolean(selectedCompore) && inputNumber !== '';
    const checkTypeCode = Boolean(inputSelect.text);

    const isAddButtonHide =
      !selectedFieldKey ||
      (selectedType === 'date' && !checkTypeDate) ||
      (selectedType === 'text' && !checkTypeText) ||
      (selectedType === 'number' && !checkTypeNumber) ||
      (selectedType === 'code' && !checkTypeCode);

    const currentCodeList_Temp = R.uniq(R.pluck(selectedFieldKey, originalData));
    const currentCodeList = R.map(a => ({ key: a, text: a }), currentCodeList_Temp);

    return (
      <div>
        <div
          // className="tableScroll"
          style={{
            padding: '10px',
            width: '300px',
            // height: '400px'
          }}
        >
          <div>
            {filterList.map(item => {
              const { id, display } = item;
              return <FilterOneRow key={id} id={id} display={display} handleRemove={filterRemove} />;
            })}
          </div>
          {filterList.length > 0 && (
            <>
              <div style={{ paddingBottom: '5px' }} />
              <div style={{ textAlign: 'right' }}>
                <Button size="square" color="warning" onClick={handleReset}>
                  <span style={{ paddingLeft: '5px', paddingRight: '5px' }}>RESET</span>
                </Button>
              </div>
              <div style={{ paddingBottom: '30px' }} />
            </>
          )}
          <Paper>
            <div style={{ textAlign: 'center', padding: '5px' }}>필터 추가</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
              <div>
                <div style={{ paddingBottom: '4px' }}>
                  <Select
                    placeholder="컬럼 선택"
                    options={filterAvailFields}
                    onChange={(event, option, index) => {
                      const { key, text } = option;
                      const selectedType = allFieldInfo.filter(a => a.id === key)[0].type;
                      this.setState({
                        selectedFieldKey: key,
                        selectedFieldText: text,
                        selectedType: selectedType || 'text',
                      });
                    }}
                    styles={{ dropdown: { width: 160 } }}
                  />
                </div>
                {selectedType === 'date' && (
                  <>
                    <div style={{ paddingLeft: '5px', overflow: 'visible' }}>
                      <DatePicker
                        style={{ width: '150px' }}
                        value={inputDate}
                        onChange={date => {
                          this.setState({ inputDate: yearMonthDay(date) });
                        }}
                      />
                    </div>
                    <ToggleDiv
                      value={selectedCompore}
                      setValue={v => {
                        this.setState({ ...this.state, selectedCompore: v });
                      }}
                    />
                  </>
                )}
                {selectedType === 'code' && (
                  <>
                    <Select
                      placeholder="필터값"
                      options={currentCodeList}
                      onChange={(event, option) => {
                        this.setState({ ...this.state, inputSelect: option });
                      }}
                      styles={{ dropdown: { width: 160 } }}
                    />
                  </>
                )}
                {selectedType === 'text' && (
                  <div style={{ paddingLeft: '5px' }}>
                    <InputBox
                      placeholder="text 타입"
                      value={inputText}
                      onChange={e => {
                        this.setState({ ...this.state, inputText: e.target.value });
                      }}
                      styles={{ fieldGroup: { width: 150 } }}
                    />
                  </div>
                )}
                {selectedType === 'number' && (
                  <>
                    <div style={{ paddingLeft: '5px', paddingBottom: '4px' }}>
                      <InputBoxNumber
                        placeholder="number 타입"
                        width={150}
                        value={inputNumber}
                        decimalScale={0}
                        onValueChange={obj => this.setState({ ...this.state, inputNumber: obj.value })}
                      />
                    </div>
                    <ToggleDiv
                      value={selectedCompore}
                      setValue={v => {
                        this.setState({ ...this.state, selectedCompore: v });
                      }}
                    />
                  </>
                )}
              </div>
              <div style={{ display: isAddButtonHide ? 'none' : 'flex', flexDirection: 'column-reverse' }}>
                <Button
                  size="square"
                  color="success"
                  onClick={() => {
                    if (selectedFieldKey) {
                      let display = `${selectedFieldText} `;
                      if (selectedType === 'date') display += `${getCompareText(selectedCompore)} ${inputDate}`;
                      if (selectedType === 'text') display += `like ${inputText}`;
                      if (selectedType === 'number') display += `${getCompareText(selectedCompore)} ${inputNumber}`;
                      if (selectedType === 'code') display += `= ${inputSelect.text}`;

                      let value = '';
                      if (selectedType === 'date') value = inputDate;
                      if (selectedType === 'text') value = inputText;
                      if (selectedType === 'number') value = inputNumber;
                      if (selectedType === 'code') value = inputSelect.text;

                      handleAdd({
                        display,
                        field: selectedFieldKey,
                        type: selectedType,
                        condition: selectedCompore,
                        value,
                      });
                    }
                  }}
                >
                  <span style={{ paddingLeft: '5px', paddingRight: '5px' }}>ADD</span>
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Filter;
