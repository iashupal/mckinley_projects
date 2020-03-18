import React, { Component } from 'react';
import Select from 'components/Select';
import AlignBox from 'components/AlignBox';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

const data = [
  { key: 'status', text: '상태', itemType: DropdownMenuItemType.Header },
  { key: 'wip', text: '진행중' },
  { key: 'test', text: '시험' },
  { key: 'Disabled', text: 'Disabled', disabled: true },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Disabled2', text: 'Disabled2', disabled: true },
];

const data2 = [{ key: 'option1', text: '옵션1' }, { key: 'option2', text: '옵션2' }];

const data3 = [
  { key: 'status', text: '상태', itemType: DropdownMenuItemType.Header },
  { key: 'option1', text: '옵션1' },
  { key: 'option2', text: '옵션2' },
];

const data4 = [
  { key: 'wip', text: '진행중' },
  { key: 'test', text: '시험' },
  { key: 'Disabled', text: 'Disabled', disabled: true },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Disabled2', text: 'Disabled2', disabled: true },
];

class SelectTest extends Component {
  render() {
    return (
      <div className="app-wrapper">
        * 사용 예
        <div style={{ display: 'flex' }}>
          <Select
            placeholder="> 담당자 선택"
            options={data}
            onChange={(event, option, index) => console.log('11:', option)}
          />
          <Select
            placeholder="> 상태 선택"
            options={data}
            onChange={(event, option, index) => console.log('22:', option)}
            selectedKey="test"
          />
          <Select
            placeholder="> 상태 선택"
            options={data}
            onChange={(event, option, index) => console.log('33:', option)}
            selectedKey="Disabled2"
          />
          <Select placeholder="담당자 선택" options={data} onChange={d => console.log('담당자:', d)} />
          <Select placeholder="컬럼 선택" options={data} onChange={d => console.log('컬럼:', d)} />
          <Select placeholder="상태 선택" options={data} onChange={d => console.log('상태:', d)} />
        </div>
        <br />* GroupHeader 없는 예
        <div style={{ display: 'flex' }}>
          <Select
            placeholder="> 담당자 선택"
            options={data4}
            onChange={(event, option, index) => console.log('11:', option)}
          />
          <Select
            placeholder="> 상태 선택"
            options={data4}
            onChange={(event, option, index) => console.log('22:', option)}
            selectedKey="test"
          />
          <Select
            placeholder="> 상태 선택"
            options={data4}
            onChange={(event, option, index) => console.log('33:', option)}
            selectedKey="Disabled2"
          />
          <Select placeholder="담당자 선택" options={data4} onChange={d => console.log('담당자:', d)} />
          <Select placeholder="컬럼 선택" options={data4} onChange={d => console.log('컬럼:', d)} />
          <Select placeholder="상태 선택" options={data4} onChange={d => console.log('상태:', d)} />
        </div>
        <br />
        * Multi 선택 옵션 테스트 (+Width)
        <Select
          placeholder="상태 선택"
          options={data}
          onChange={(e, o) => console.log('상태:', o)}
          multiSelect
          defaultSelectedKeys={['wip', 'test']}
          width={100}
          style={{
            width: 200,
          }}
        />
        <br />
        * useAll
        <Select
          placeholder="상태 선택"
          options={data2}
          onChange={(event, option, index) => console.log('11:', option)}
          width={100}
          style={{
            width: 200,
          }}
          isUseAll
        />
        <br />
        * useAll with status
        <Select
          placeholder="상태 선택"
          options={data3}
          onChange={(event, option, index) => console.log('11:', option)}
          width={100}
          style={{
            width: 200,
          }}
          isUseAll
        />
      </div>
    );
  }
}

export default SelectTest;
