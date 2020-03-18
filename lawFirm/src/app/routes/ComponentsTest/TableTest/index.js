import React, { Component } from 'react';
import Table from 'components/Table/EnhancedTable';
import Select from 'components/Select';
import Button from 'components/Button';
import { tableData2 } from 'helpers/data_sample';
import { tableData } from './data';

class TableTest extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Table
          tableID="w04hgwe4hwe93tr"
          rows={[
            { id: 'date', type: 'date', label: '날짜', width: '120px' },
            { id: 'task', type: 'text', label: 'Task', align: 'left' },
            { id: 'numTest', type: 'number', label: 'Num', align: 'right', width: '60px' },
            { id: 'status', label: '상태', noSort: true, width: '100px', noFilter: true, noExcel: true },
            { id: 'admin', type: 'code', label: '담당자', width: '140px' },
          ]}
          initOrder="asc" // 초기 정렬 순서
          initOrderBy="task" // 초기 정렬 필드명
          customColumn={[{ field: 'task', component: ({ row }) => <a href={`/test/${row.id}`}>{row.task}</a> }]}
          data={tableData}
          useCheckBox
          // checkedItems={(arr, type) => alert(`checkedItems:${JSON.stringify(arr)}|${JSON.stringify(type)}`)}
          mngIcons={id => (
            <>
              <Button size="square" icon="access_time" color="warning" onClick={() => alert(`time|${id}`)} />
              <Button size="square" icon="description" color="success" onClick={() => alert(`detail|${id}`)} />
              <Button size="square" icon="border_color" color="success" onClick={() => alert(`edit|${id}`)} />
              <Button size="square" icon="delete" color="danger" onClick={() => alert(`delete|${id}`)} />
            </>
          )}
          mngIconsWidth="180px"
          mngIconsBatch={arr => (
            <>
              <Button
                size="square"
                icon="border_color"
                color="success"
                onClick={() => {
                  alert(`batchEdit|${arr}`);
                }}
              />
              <Button
                size="square"
                icon="delete"
                color="danger"
                onClick={() => {
                  alert(`batchDelete|${arr}`);
                }}
              />
            </>
          )}
          condComponents={
            <>
              <Select
                placeholder="Custom 조건1"
                options={[
                  { key: 'status', text: 'Custom 조건1' },
                  { key: '1', text: '가입일' },
                  { key: '2', text: '대표이메일' },
                ]}
                multiSelect
                onChange={() => console.log('Changed')}
              />
              <Select
                placeholder="Custom 조건2"
                options={[
                  { key: 'status', text: 'Custom 조건2' },
                  { key: '1', text: '가입일' },
                  { key: '2', text: '대표이메일' },
                ]}
                multiSelect
                onChange={() => console.log('Changed')}
              />
              <span>[개별조건-Component-위치]</span>
            </>
          }
          excelExport
        />
        <br />
        <Table
          rows={[
            { id: 'date', type: 'date', label: '날짜', width: '120px' },
            { id: 'task', type: 'text', label: 'Task', align: 'left' },
            { id: 'numTest', type: 'number', label: 'Num', align: 'right', width: '60px' },
            { id: 'status', label: '상태', noSort: true, width: '100px', noFilter: true },
            { id: 'admin', type: 'code', label: '담당자', width: '140px' },
          ]}
          data={tableData}
          useCheckBox
          // checkedItems={(arr, type) => alert(`checkedItems:${JSON.stringify(arr)}|${JSON.stringify(type)}`)}
          mngIcons={id => (
            <>
              <Button size="square" icon="access_time" color="warning" onClick={() => alert(`time|${id}`)} />
              <Button size="square" icon="description" color="success" onClick={() => alert(`detail|${id}`)} />
              <Button size="square" icon="border_color" color="success" onClick={() => alert(`edit|${id}`)} />
              <Button size="square" icon="delete" color="danger" onClick={() => alert(`delete|${id}`)} />
            </>
          )}
          mngIconsWidth="180px"
          mngIconsBatch={arr => (
            <>
              <Button
                size="square"
                icon="border_color"
                color="success"
                onClick={() => {
                  alert(`batchEdit|${arr}`);
                }}
              />
              <Button
                size="square"
                icon="delete"
                color="danger"
                onClick={() => {
                  alert(`batchDelete|${arr}`);
                }}
              />
            </>
          )}
          condComponents={
            <>
              <Select
                placeholder="Custom 조건1"
                options={[
                  { key: 'status', text: 'Custom 조건1' },
                  { key: '1', text: '가입일' },
                  { key: '2', text: '대표이메일' },
                ]}
                multiSelect
                onChange={() => console.log('Changed')}
              />
              <Select
                placeholder="Custom 조건2"
                options={[
                  { key: 'status', text: 'Custom 조건2' },
                  { key: '1', text: '가입일' },
                  { key: '2', text: '대표이메일' },
                ]}
                multiSelect
                onChange={() => console.log('Changed')}
              />
              <span>[개별조건-Component-위치]</span>
            </>
          }
          isLoading
        />
        <br />
        <Table
          tableID="aabb9929293049384209348sdf"
          noShowField={['joinStatus', 'usage']} // 초기에 미표기 필드목록
          rows={[
            { id: 'joinDate', label: '가입일' },
            { id: 'representativeEmail', label: '대표이메일', style: { backgroundColor: 'red' } },
            { id: 'joinStatus', label: '가입상태' },
            { id: 'cinfirmDate', label: '안내 메일 확인', style: { backgroundColor: 'green', fontWeight: 'bold' } },
            { id: 'lawFirmID', label: '법무법인 아이디(URL)' },
            { id: 'lawFirmName', label: '법무법인 명', style: { backgroundColor: 'yellow', color: 'blue' } },
            { id: 'representativeUser', label: '대표사용자' },
            { id: 'usage', label: '사용 현황' },
          ]}
          showPriority={['usage', 'representativeUser', 'cinfirmDate', 'joinDate']} // Size 작은 상황에서 자동 줄이기, 표기-우선순위
          data={tableData2}
          condComponents={<span>[개별조건-Component-위치]</span>}
        />
        <br />
        <Table
          rows={[
            { id: 'joinDate', label: '가입일' },
            { id: 'representativeEmail', label: '대표이메일' },
            { id: 'joinStatus', label: '가입상태' },
            { id: 'cinfirmDate', label: '안내 메일 확인' },
            { id: 'lawFirmID', label: '법무법인 아이디(URL)' },
            { id: 'lawFirmName', label: '법무법인 명' },
            { id: 'representativeUser', label: '대표사용자' },
            { id: 'usage', label: '사용 현황' },
          ]}
          data={[]}
          condComponents={<span>[개별조건-Component-위치]</span>}
        />
        <br />
        <div>
          * height 를 고정길이 없이 사용한 경우 (header/contents 의 width 깨짐의 예 -> !고정 길이를 주고 사용해야 함.)
        </div>
        <Table
          rows={[
            { id: 'joinDate', label: '가입일' },
            { id: 'representativeEmail', label: '대표이메일' },
            { id: 'joinStatus', label: '가입상태' },
            { id: 'cinfirmDate', label: '안내 메일 확인' },
            { id: 'lawFirmID', label: '법무법인 아이디(URL)' },
            { id: 'lawFirmName', label: '법무법인 명' },
            { id: 'representativeUser', label: '대표사용자' },
            { id: 'usage', label: '사용 현황' },
          ]}
          data={tableData2}
          height="150px"
          condComponents={<span>[개별조건-Component-위치]</span>}
        />
        <br />
        <div>* height 를 고정길이 준 경우 (1개 동적필드 제외)</div>
        <Table
          rows={[
            { id: 'joinDate', label: '가입일', width: '120px' },
            { id: 'representativeEmail', label: '대표이메일', width: '120px' },
            { id: 'joinStatus', label: '가입상태', width: '120px' },
            { id: 'cinfirmDate', label: '안내 메일 확인', width: '120px' },
            { id: 'lawFirmID', label: '법무법인 아이디(URL)', width: '120px' },
            { id: 'lawFirmName', label: '법무법인 명' },
            { id: 'representativeUser', label: '대표사용자', width: '120px' },
            { id: 'usage', label: '사용 현황', width: '120px' },
          ]}
          data={tableData2}
          height="150px"
          condComponents={<span>[개별조건-Component-위치]</span>}
          excelExport
        />
        <br />
        <div>* height 를 고정길이 준 경우 (1개 동적필드 제외 + hidePagination)</div>
        <Table
          rows={[
            { id: 'joinDate', label: '가입일', width: '120px' },
            { id: 'representativeEmail', label: '대표이메일', width: '120px' },
            { id: 'joinStatus', label: '가입상태', width: '120px' },
            { id: 'cinfirmDate', label: '안내 메일 확인', width: '120px' },
            { id: 'lawFirmID', label: '법무법인 아이디(URL)', width: '120px' },
            { id: 'lawFirmName', label: '법무법인 명' },
            { id: 'representativeUser', label: '대표사용자', width: '120px' },
            { id: 'usage', label: '사용 현황', width: '120px' },
          ]}
          data={tableData2}
          height="150px"
          hidePagination
          condComponents={<span>[개별조건-Component-위치]</span>}
        />
        <br />
        <div>* Pagenation, filter 숨기기, 체크박스 선택 시 삭제 버튼만 보이기</div>
        <Table
          rows={[
            { id: 'joinDate', label: '가입일', width: '120px' },
            { id: 'representativeEmail', label: '대표이메일', width: '120px' },
            { id: 'joinStatus', label: '가입상태', width: '120px' },
            { id: 'cinfirmDate', label: '안내 메일 확인', width: '120px' },
            { id: 'lawFirmID', label: '법무법인 아이디(URL)', width: '120px' },
            { id: 'lawFirmName', label: '법무법인 명' },
            { id: 'representativeUser', label: '대표사용자', width: '120px' },
            { id: 'usage', label: '사용 현황', width: '120px' },
          ]}
          useCheckBox
          mngIconsBatch={arr => (
            <>
              <Button
                size="square"
                icon="delete"
                color="danger"
                onClick={() => {
                  alert(`time|${arr}`);
                }}
              />
            </>
          )}
          data={tableData2}
          condComponents={<span>[개별조건-Component-위치]</span>}
          hidePagination
          hideFilter
        />
        <br />
      </div>
    );
  }
}

export default TableTest;
