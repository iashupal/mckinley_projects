import React from 'react';
import { R, RU } from 'helpers/ramda';
import Button from '../Button';

const { yearMonthDay } = RU;

export const IconButton = () => {
  return (
    <>
      <Button size="square" icon="access_time" color="warning" />
      <Button size="square" icon="border_color" color="success" />
      <Button size="square" icon="delete" color="danger" />
    </>
  );
};

export const StatusButton = props => {
  return props.open ? (
    <Button size="small" color="inverted">
      오픈
    </Button>
  ) : (
    <Button size="small" color="dark">
      완료
    </Button>
  );
};

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order, orderBy) => {
  const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

export const applyTableFilter = (data, filterList) => {
  let filteredData = data;
  filterList.forEach(filter => {
    const { type, field, condition, value } = filter;
    // field: "task", type: "text", condition: "3", value: "34"

    if (type === 'text') {
      filteredData = filteredData.filter(a => a[field] && a[field].indexOf(value) > -1);
    }
    if (type === 'date') {
      filteredData = filteredData.filter(a => {
        if (condition === '1') return a[field] > value;
        if (condition === '2') return a[field] < value;
        return yearMonthDay(a[field]) === value;
      });
    }
    if (type === 'number') {
      filteredData = filteredData.filter(a => {
        const num1 = parseInt(a[field], 10);
        const num2 = parseInt(value, 10);
        if (condition === '1') return num1 > num2;
        if (condition === '2') return num1 < num2;
        return num1 === num2;
      });
    }
    if (type === 'code') {
      filteredData = filteredData.filter(a => a[field] === value);
    }
  });
  return filteredData;
};

export const getShowFieldNum_RuleArr = (minWidth, maxWidth, minColumnCount, maxColumnCount) => {
  const stepCount = maxColumnCount - minColumnCount - 1;
  const stepWidth = (maxWidth - minWidth) / (stepCount + 1);

  const ArrayTemp1 = R.range(1, stepCount + 1);
  const ArrayTemp2 = R.map(a => a * stepWidth, ArrayTemp1);
  const ArrayTemp3 = [minWidth, ...ArrayTemp2, maxWidth];
  const ArrayTemp3_2 = R.dropLast(1, [0, ...ArrayTemp3]);
  const ArrayTemp4 = R.zip(ArrayTemp3, ArrayTemp3_2);
  const ArrayTemp5 = R.map(a => ({ max: a[0], min: a[1] }), ArrayTemp4);
  const ArrayTemp = R.addIndex(R.map)((a, i) => ({ ...a, count: minColumnCount + i }), ArrayTemp5);
  // [{max: 100, min: 0, count: 3}, {max: 366.66667, min: 100, count: 4}]

  return ArrayTemp;
};

export const getShowFieldNum = showFieldNum_RuleArr => {
  const width = window.innerWidth;
  const filteredArr = showFieldNum_RuleArr.filter(a => a.min <= width && width < a.max);
  if (filteredArr.length === 0) return -1;
  return filteredArr[0].count;
};

export const getMultiKey = (multiKey, data) => {
  if (multiKey.length > 0 && data.length > 0) {
    const multiKeyArr = data.map(a => R.props(multiKey, a).reduce((acc, a) => acc + (acc ? '_' : '') + a));
    const multiedKeyData = data.map((a, index) => ({ ...a, id: multiKeyArr[index] }));

    return multiedKeyData;
  }

  return data;
};

export const GetLS = (key, field, defaultValue, convertType) => {
  if (!key) return defaultValue;
  const newKey = `table_${key}`;

  const ls_Init = localStorage.getItem(newKey);
  if (!ls_Init) localStorage.setItem(newKey, JSON.stringify({}));
  try {
    const ls = JSON.parse(localStorage.getItem(newKey));
    const value = ls[field];
    if (value) return convertType === 'int' ? parseInt(value, 10) : value;
  } catch (e) {
    //
  }

  return defaultValue;
};

export const CheckLS = (key, field) => {
  if (!key) return false; // 설정된 table key 가 없음.
  const newKey = `table_${key}`;

  const ls_Init = localStorage.getItem(newKey);
  if (!ls_Init) return false; // table key 로 된 Localstorage 가 없음.

  try {
    const ls = JSON.parse(localStorage.getItem(newKey));
    return R.includes(field, Object.keys(ls));
  } catch (e) {
    //
  }

  return false;
};

export const SetLS = (key, field, value) => {
  if (!key) return;
  const newKey = `table_${key}`;

  const ls_Init = localStorage.getItem(newKey);
  if (!ls_Init) localStorage.setItem(newKey, JSON.stringify({}));

  const ls = JSON.parse(localStorage.getItem(newKey));
  localStorage.setItem(newKey, JSON.stringify({ ...ls, [field]: value }));
};

// 새롭게 보여줘야 할 필드 리스트를 계산
//
// [처리 우선순위]
// 1. 사용자가 클릭하여 제거한 필드
// 2. 개발자가 우선순위 높게 한 필드들
// 3. 기타 전체 앞에서 추가 및 뒤에서 제거
//
// [참고 : 동작 관련]
// 1. 사용자가 안보이도록 수동 설정한 필드가 최우선이고, 한번 설정한 내용은 Local storage 로 유지됨.
// 2. 브라우저 크기가 줄어들면 개발자의 우선순위별로 필드가 감춰지고, 늘어나면 추가되지만, 수동으로 감취놓은 필드는 이와 관계없이 보이지 않음.
// 3. 개발자가 초기에 특정 필드들을 사용자가 눌러서 감춘것처럼 설정 가능함.
//
export const NewFields = ({
  showFieldList, // 현재 보여지는 필드
  showPriorityArr, // 보여지게 되는 우선순위 설정값
  allField, // 전체 필드들
  noShowField, // 사용자가 직접 해제한 필드 리스트 (NoShow 처리, 우선순위 높음)
  count, // 추가(+) 또는 삭제(-) 되어야 할 필드 갯수
}) => {
  const filteredAllField = R.without(noShowField, allField); // NoShow 필드는 제외한, allField 필드
  const filteredShowPriorityArr = R.without(noShowField, showPriorityArr); // NoShow 필드는 제외한, showPriorityArr 필드

  const currShowFieldList = R.clone(showFieldList);
  const isPlus = count > 0;

  for (let repCount = Math.abs(count); repCount > 0; repCount--) {
    if (isPlus) {
      let AddFieldName = '';
      // 1. filteredShowPriorityArr 를 반복하면서, 현재 없는것이 발견되면 1건 추가.
      for (let i = 0; i < filteredShowPriorityArr.length; i++) {
        const isExists = R.includes(filteredShowPriorityArr[i], currShowFieldList);
        if (!isExists) {
          AddFieldName = filteredShowPriorityArr[i];
          break;
        }
      }
      // 2. filteredAllField 를 반복하면서, 현재 없는것이 발견되면 1건 추가.
      if (!AddFieldName) {
        for (let i = 0; i < filteredAllField.length; i++) {
          const isExists = R.includes(filteredAllField[i], currShowFieldList);
          if (!isExists) {
            AddFieldName = filteredAllField[i];
            break;
          }
        }
      }
      currShowFieldList.push(AddFieldName);
    } else {
      let removeIndex = null;
      const tempArr1 = R.without(showPriorityArr, currShowFieldList);
      if (tempArr1.length > 0) {
        // 우선순위에 아예 없는 필드들이 있는 상황 -> 이 필드 중 마지막 1건을 삭제!
        const lastField = R.takeLast(1, tempArr1)[0];
        removeIndex = currShowFieldList.findIndex(a => a === lastField);
      } else {
        const R_showPriorityArr = R.reverse(showPriorityArr);
        // 우선순위 필드들만 남은 상황 -> 우선순위 중 뒤에부터 조사해서 매칭되는 최초 1건을 삭제!
        for (let i = 0; i < R_showPriorityArr.length; i++) {
          const isExists = R.includes(R_showPriorityArr[i], currShowFieldList);
          if (isExists) {
            removeIndex = currShowFieldList.findIndex(a => a === R_showPriorityArr[i]);
            break;
          }
        }
      }
      currShowFieldList.splice(removeIndex, 1);
    }
  }

  return currShowFieldList;
};
