import React, { Component } from 'react';
import Dialog from 'components/Dialog';
import DialogInfoForm from 'components/DialogInfoForm';
import DialogCustomSample from 'components/DialogCustomSample';
import Button from 'components/Button';
import Select from 'components/Select';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

const data = [
  { key: 'status', text: '상태', itemType: DropdownMenuItemType.Header },
  { key: 'wip', text: '진행중' },
  { key: 'test', text: '시험' },
  { key: 'Disabled', text: 'Disabled', disabled: true },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Disabled2', text: 'Disabled2', disabled: true },
];

class DialogTest extends Component {
  state = { isOpen: false, isOpen2: false };

  render() {
    return (
      <div className="app-wrapper">
        <Button size="small" color="primary" onClick={() => this.setState({ isOpen: true })}>
          Dialog Open
        </Button>
        <Dialog title="test" open={this.state.isOpen}>
          <Select
            placeholder="> 담당자 선택"
            options={data}
            onChange={(event, option, index) => console.log('11:', option)}
          />
          <span>test1</span>
          <div>test2</div>
          <span>test1</span>
          <div>test2</div>
          <span>test1</span>
          <div>test2</div>
          <Button size="small" color="dark" onClick={() => this.setState({ isOpen: false })}>
            Dialog Close
          </Button>
        </Dialog>
        <br />
        <br />
        <DialogCustomSample handleOK={e => alert(JSON.stringify(e))} />
        <br />
        <br />
        <Button size="small" color="primary" onClick={() => this.setState({ isOpen2: true })}>
          InfoDialog Open
        </Button>
        <span>Content 상,하단 구분선 적용, titile 밑에 서브메뉴 추가 가능(topContent)</span>
        <DialogInfoForm title="infoForm" open={this.state.isOpen2}>
          <Select
            placeholder="> 담당자 선택"
            options={data}
            onChange={(event, option, index) => console.log('11:', option)}
          />
          <span>test1</span>
          <div>test2</div>
          <span>test1</span>
          <div>test2</div>
          <span>test1</span>
          <div>test2</div>
          <Button size="small" color="dark" onClick={() => this.setState({ isOpen2: false })}>
            InfoDialog Close
          </Button>
        </DialogInfoForm>
      </div>
    );
  }
}

export default DialogTest;
