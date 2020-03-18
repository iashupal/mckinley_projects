import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

const data = [
  { key: 'status', text: '상태', itemType: DropdownMenuItemType.Header },
  { key: 'wip', text: '진행중' },
  { key: 'test', text: '시험' },
  { key: 'Disabled', text: 'Disabled', disabled: true },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
];

export default data;
