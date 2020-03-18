import React, { Component } from 'react';
import { R } from 'helpers/ramda';
import AutoComplete from 'components/AutoComplete';
import MultiLabel from 'components/AutoComplete/MultiLabel';
import DatePicker from 'components/DatePicker';
import { NotificationManager } from 'react-notifications';

const options = [
  { value: '1', label: '법원경찰청' },
  { value: '2', label: '법원직무교육처' },
  { value: '3', label: '상황실' },
  { value: '4', label: '응급대처실' },
  { value: '5', label: '변호관' },
  { value: '6', label: '국선상담실' },
  { value: '7', label: '검찰청' },
  { value: '8', label: '재판소' },
  { value: '9', label: '재판소-2' },
  { value: '10', label: '재판소-3' },
  { value: '11', label: '재판소-4' },
  { value: '12', label: '재판소-5' },
  { value: '13', label: '재판소-6' },
  { value: '14', label: '재판소-7' },
];

const options2 = [
  { isMain: false, value: '1', label: '법원경찰청' },
  { isMain: false, value: '2', label: '법원직무교육처' },
  { isMain: false, value: '3', label: '상황실' },
  { isMain: false, value: '4', label: '응급대처실' },
  { isMain: false, value: '5', label: '변호관' },
  { isMain: false, value: '6', label: '국선상담실' },
  { isMain: false, value: '7', label: '검찰청' },
  { isMain: false, value: '8', label: '재판소' },
  { isMain: false, value: '9', label: '재판소-2' },
  { isMain: false, value: '10', label: '재판소-3' },
  { isMain: false, value: '11', label: '재판소-4' },
  { isMain: false, value: '12', label: '재판소-5' },
  { isMain: false, value: '13', label: '재판소-6' },
  { isMain: false, value: '14', label: '재판소-7' },
];

class Test extends Component {
  state = {
    selectedOption: {},
    selectedOptions: [],
    selectedOptionServer: {},
    selectedOptionsServer: [],
  };

  handleChange = name => selected => {
    NotificationManager.info(JSON.stringify(selected));
    this.setState({ [name]: selected });
  };

  handleChangeMulti = name => selected => {
    if (selected.useTable) {
      const checkArray = selected.value.filter(data => data.isMain === true);
      const newData = R.clone(selected.value);
      if (checkArray.length === 0 && newData.length > 0) {
        newData[0].isMain = true;
      }
      this.setState({ [name]: newData });
    } else {
      this.setState({ [name]: selected.value });
    }
  };

  render() {
    const { selectedOption, selectedOptions, selectedOptionServer, selectedOptionsServer } = this.state;
    return (
      <div className="app-wrapper">
        1) AutoComplete (Single, Client)
        <br />
        <AutoComplete
          options={options}
          selectedOption={selectedOption}
          handleChange={this.handleChange('selectedOption')}
        />
        <hr />
        2-1) AutoComplete (Multi, Client)
        <br />
        <AutoComplete
          isMulti
          options={options}
          selectedOptions={selectedOptions}
          //  handleChange={this.handleChange('selectedOptions')}
          handleChange={this.handleChangeMulti('selectedOptions')}
          placeholder="Multi, Client 자동완성"
        />
        <br />
        <DatePicker />
        <br />
        2-2) AutoComplete (Multi, Client, chipWidth)
        <br />
        <AutoComplete
          isMulti
          options={options}
          selectedOptions={selectedOptions}
          //  handleChange={this.handleChange('selectedOptions')}
          handleChange={this.handleChangeMulti('selectedOptions')}
          placeholder="Multi, Client 자동완성"
          chipWidth="500px"
        />
        <br />
        <DatePicker />
        <hr />
        3) AutoCompleteMultiLabel Sample (read only)
        <br />
        <MultiLabel
          selectedOptions={[
            { value: '2', label: '법원직무교육처' },
            { value: '1', label: '법원경찰청' },
            { value: '8', label: '재판소' },
          ]}
        />
        <hr />
        4) AutoComplete (Single, Server)
        <br />
        <AutoComplete
          serverAPI="/sample/selectAutoComplete" // API 결과 포맷 : [{ value: '1', label: '법원경찰청' }...]
          serverParam={key => ({ text: key })}
          selectedOption={selectedOptionServer}
          handleChange={this.handleChange('selectedOptionServer')}
        />
        <hr />
        5) AutoComplete (Multi, Server) (chipRight)
        <br />
        <AutoComplete
          isMulti
          serverAPI="/sample/selectAutoComplete" // API 결과 포맷 : [{ value: '1', label: '법원경찰청' }...]
          serverParam={key => ({ text: key })}
          selectedOptions={selectedOptionsServer}
          handleChange={this.handleChangeMulti('selectedOptionsServer')}
          chipRight
        />
        <hr />
        6) AutoComplete (Multi, Client, useTable)
        <br />
        <AutoComplete
          isMulti
          useTable
          serverAPI="/sample/selectAutoComplete" // API 결과 포맷 : [{ value: '1', label: '법원경찰청' }...]
          serverParam={key => ({ text: key })}
          options={options2}
          selectedOptions={selectedOptions}
          handleChange={this.handleChangeMulti('selectedOptions')}
          handleRadioChange={this.handleChangeMulti('selectedOptions')}
          placeholder="Multi, Client, Table 자동완성"
        />
      </div>
    );
  }
}

export default Test;
