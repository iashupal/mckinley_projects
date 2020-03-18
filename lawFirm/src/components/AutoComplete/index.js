import React, { Component } from 'react';
import Select, { components } from 'react-select';
import SearchIcon from '@material-ui/icons/Search';
import fp from 'lodash/fp';
import { R } from 'helpers/ramda';
import { PostCall, getAjaxData } from 'helpers/ajax';
import PropTypes from 'prop-types';
import MultiLabel from './MultiLabel';
import MultiTable from './MultiTable';

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <div
        style={{
          color: '#2196f3',
          cursor: 'pointer',
        }}
      >
        <SearchIcon />
      </div>
    </components.DropdownIndicator>
  );
};

const Input = props => {
  const newProps = { ...props, isHidden: false };
  return <components.Input {...newProps} />;
};

class AutoComplete extends Component {
  state = { serverData: [] };

  // 빠른 키보드 입력시, 서버호출 관련 throttle 처리
  setServerData = fp.throttle(300, async e => {
    const { serverAPI, serverParam } = this.props;
    if (e) {
      const fetchedData = await PostCall(serverAPI, serverParam(e));
      const serverData = getAjaxData(fetchedData);
      await this.setState({ serverData });
    } else {
      await this.setState({ serverData: [] });
    }
  });

  render() {
    const { serverData } = this.state;
    const {
      selectedOption,
      selectedOptions,
      options,
      handleChange,
      isMulti,
      serverAPI,
      placeholder,
      chipRight,
      useTable,
      width,
      chipWidth,
      readOnly,
    } = this.props;

    let selectedOptionWithLable = null;

    if (!isMulti) {
      if (serverAPI) {
        selectedOptionWithLable = selectedOption;
      } else {
        selectedOptionWithLable = options.filter(item => selectedOption.value === item.value);
        if (readOnly)
          return (
            <span>
              {selectedOptionWithLable && selectedOptionWithLable.length > 0 ? selectedOptionWithLable[0].label : ''}
            </span>
          );
      }
    }

    if (isMulti && readOnly && useTable && (!selectedOptions || selectedOptions.length === 0)) {
      return <div style={{ marginRight: '3px', marginLeft: '3px' }}>미정</div>;
    }

    if (isMulti && selectedOptions && selectedOptions.length > 0 && useTable && readOnly) {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
          <MultiTable selectedOptions={selectedOptions} useTable={useTable} readOnly={readOnly} />
        </div>
      );
    }

    if (isMulti && readOnly && !useTable && (!selectedOptions || selectedOptions.length === 0)) {
      return <div style={{ marginRight: '3px', marginLeft: '3px' }}>미정</div>;
    }

    if (isMulti && selectedOptions && selectedOptions.length > 0 && !useTable && readOnly) {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
          <MultiTable selectedOptions={selectedOptions} useTable={useTable} readOnly={readOnly} />
        </div>
      );
    }

    return (
      <div
        style={
          chipRight
            ? { display: 'flex', alignItems: 'center' }
            : {
                maxWidth: chipWidth || 'min-content',
              }
        }
      >
        <div style={{ width: width || '300px' }}>
          <Select
            placeholder={placeholder || 'Auto complete'}
            styles={{
              option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? '#2196f3' : 'rgba(0, 0, 0, 0.54)',
                padding: 4,
                fontSize: 16,
              }),
              singleValue: (provided, state) => {
                const color = state.isSelected ? 'rgba(0, 0, 0, 0.54)' : '#2196f3';
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';
                return {
                  ...provided,
                  opacity,
                  transition,
                  color,
                };
              },
              menu: provided => ({
                ...provided,
                paddingLeft: 10,
                paddingTop: 0,
                paddingBottom: 0,
              }),
              menuList: provided => ({
                ...provided,
                width: '95%',
                marginTop: 10,
                marginBottom: 10,
              }),
              multiValue: (provided, state) => ({
                ...provided,
                color: state.isSelected ? 'rgba(0, 0, 0, 0.54)' : '#2196f3',
              }),
              placeholder: (provided, state) => ({
                ...provided,
                color: '#B0BEC5',
              }),
              indicatorsContainer: (provided, state) => ({
                ...provided,
                display: isMulti ? 'none' : 'inherit',
              }),
            }}
            value={isMulti ? '' : selectedOptionWithLable}
            onChange={e => {
              if (isMulti) {
                const { value } = e;
                // 중복 입력 불가
                const ids = selectedOptions.map(a => a.value);
                const isExistsValue = R.includes(value, ids);
                if (!isExistsValue) {
                  handleChange({ value: [...selectedOptions, e], useTable });
                }
              } else {
                handleChange(e);
              }
            }}
            onInputChange={
              serverAPI
                ? e => {
                    this.setServerData(e);
                  }
                : null
            }
            options={serverAPI ? serverData : options}
            theme={theme => ({
              ...theme,
              borderRadius: 4,
              height: 45,
              colors: {
                ...theme.colors,
                primary: '#9EC4F3',
              },
            })}
            components={{ DropdownIndicator, Input }}
            openMenuOnClick={false} // 처음 Component 클릭시, 전체를 보여주는지 여부.
          />
        </div>
        {isMulti && selectedOptions && selectedOptions.length > 0 && (
          <div style={chipRight ? {} : { paddingTop: '10px' }}>
            {useTable ? (
              <MultiTable
                selectedOptions={selectedOptions}
                handleRemove={handleChange}
                handleRadioChange={handleChange}
                useTable={useTable}
              />
            ) : (
              <MultiLabel selectedOptions={selectedOptions} handleRemove={handleChange} chipWidth={chipWidth} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AutoComplete;

AutoComplete.propTypes = {
  chipRight: PropTypes.bool, // Multi 선택시, 선택중 Chip 이 오른쪽에 위치
  isMulti: PropTypes.bool, // 여러개를 선택하는 옵션
  serverAPI: PropTypes.string, // 서버에서 데이터를 가저올때, Rest API 주소를 입력
  serverParam: PropTypes.func, // 서버 데이터로 가져올때, Param 처리 (기본으로 넘어오는 값은 입력중인 text)
  options: PropTypes.arrayOf(PropTypes.object), // 모든 선택가능한 데이터 (Client 전용)
  selectedOptions: PropTypes.arrayOf(PropTypes.object), // 선택중인 데이터 (Multi 선택)
  selectedOption: PropTypes.objectOf(PropTypes.any), // 선택중인 데이터 (Single 선택)
  placeholder: PropTypes.string, // placeholder 문자표기
  handleChange: PropTypes.func, // 추가/삭제 가 일어났을때, 변경될 상태의 전체 Arr 데이터
};

AutoComplete.defaultProps = {
  chipRight: false,
  isMulti: false,
  serverAPI: '',
  serverParam: key => ({ text: key }),
  options: [],
  selectedOptions: [],
  selectedOption: {},
  placeholder: '',
  handleChange: () => {},
};
