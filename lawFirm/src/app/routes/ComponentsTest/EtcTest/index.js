import React, { Component } from 'react';
import ButtonN from 'components/ButtonN';
import CheckBox from 'components/CheckBox';
import Loader from 'components/Loader';
import Avatar from 'components/Avatar';
import PageTitle from 'components/PageTitle';
import TimeButton from 'components/Timebutton';
import ActivityItem from 'components/ActivityItem';
import Information from 'components/Information';
import DatePicker from 'components/DatePicker';
import TreeView from 'components/TreeView';
import Toggle from 'components/Toggle';
import ic_main_19 from 'assets/images/icons/ic_main_19.png';

import { RU } from 'helpers/ramda';

const { excelExport } = RU;

const OneItem = ({ children, title }) => {
  return (
    <>
      {title} : <br />
      {children}
      <br />
      <br />
    </>
  );
};

const alertTest = msg => () => alert(msg);

class Test extends Component {
  state = {
    checkA: true,
    checkB: true,
  };

  render() {
    const treeView = (
      <TreeView
        data={[
          {
            id: '1',
            label: 'Applications',
            children: [{ id: '2', label: 'Calendar' }, { id: '3', label: 'Chrome' }, { id: '4', label: 'Webstorm' }],
          },
          {
            id: '5',
            label: 'Documents',
            children: [
              {
                id: '6',
                label: 'Material-UI',
                children: [
                  {
                    id: '7',
                    label: 'src',
                    children: [{ id: '8', label: 'index.js' }, { id: '9', label: 'tree-view.js' }],
                  },
                ],
              },
            ],
          },
        ]}
        handleGroupToggle={(id, onOff) => {
          console.log(id, onOff);
        }}
        handleItemClick={id => {
          console.log(id);
        }}
      />
    );

    const buttons = (
      <>
        <div>-> 일반적인 버튼 (type : x) : </div>
        <ButtonN color="primary" onClick={alertTest('1-1')} label="대법원 사건매치" />
        <ButtonN color="dark" onClick={alertTest('1-2')} label="관련자 연결하기" />
        <ButtonN color="warning" onClick={alertTest('1-3')} label="호출입력" />
        <ButtonN color="inverted" onClick={alertTest('1-4')} label="호출입력" />
        <ButtonN color="danger" onClick={alertTest('1-5')} label="호출입력" />
        <ButtonN color="danger" onClick={alertTest('1-5')} label="호출입력" />
        <ButtonN color="danger" onClick={alertTest('1-5')} label="호출입력_Test2" />
        <br />
        <br />
        <div>-> Icon Type (type : 'icon') : </div>
        <ButtonN type="icon" icon="add_to_queue" color="primary" onClick={alertTest('2-1')} label="사건 수정하기" />
        <ButtonN type="icon" icon="queue" color="dark" onClick={alertTest('2-2')} label="팝업으로 보기" />
        <br />
        <br />
        <div>-> Dialog 및 Table 하단에 들어가는 버튼 (type : 'large') : </div>
        <ButtonN type="large" color="primary" onClick={alertTest('3-1')} label="저장" />
        <ButtonN type="large" color="inverted" onClick={alertTest('3-2')} label="취소" />
      </>
    );

    const checkboxTest = (
      <>
        <CheckBox label="유재석1" onChange={(event, checked) => console.log(event, checked)} />
        <CheckBox label="윤종신2" onChange={(event, checked) => console.log(event, checked)} />
        <CheckBox label="유재석3" checked onChange={(event, checked) => console.log(event, checked)} />
        <CheckBox label="윤종신4" onChange={(event, checked) => console.log(event, checked)} />
        <CheckBox label="유재석5" checked onChange={(event, checked) => console.log(event, checked)} />
        <CheckBox label="윤종신6" onChange={(event, checked) => console.log(event, checked)} />
      </>
    );

    const pageTitleTest = (
      <>
        <PageTitle icon="star">
          <span>Page Title 1</span>
        </PageTitle>
        <PageTitle
          color="primary"
          icon="star"
          classes={{
            heading: 'text-primary',
          }}
        >
          <span>Page Title 2</span>
        </PageTitle>
      </>
    );

    const loadingTest = (
      <>
        <Loader title="Loader-Title-1" color="primary" />
        <div style={{ marginLeft: '200px' }}>
          <Loader title="Loader-Title-2" color="secondary" />
        </div>
      </>
    );

    const datepickerTest = (
      <div className="d-flex">
        <DatePicker />
        &nbsp;
        <DatePicker style={{ width: '300px' }} />
      </div>
    );

    const avatarTest = (
      <div className="app-wrapper">
        <Avatar color="red">A</Avatar>
      </div>
    );

    const timeButtonTest = (
      <>
        <div style={{ width: '160px' }}>
          <TimeButton
            classes={{
              timerInr: 'bg-black',
              heading: 'text-red',
            }}
            handleReset={time => alert(time)}
            saveID="aeijgoasiejgosei2309j203r"
          />
        </div>
        설명 : handleReset (Reset 버튼을 누른 경우) 을 alert으로 사용한 경우, time 단위 (천단위)는 추후 변경 가능.
      </>
    );

    const excelExportTest = (
      <ButtonN
        color="primary"
        onClick={() => {
          const excelHeaderText = ['Header-1', 'Header-2', 'Header-3', 'Header-4'];
          const allExcelData = [[1, 2, 3, 4], [5, 6, 7, 8]];
          excelExport(excelHeaderText, allExcelData, 'SheetJS', 'abc.xlsx');
        }}
        label="Excel Download"
      />
    );

    const activityItemTest = (
      <Information
        contents={[
          {
            title: '2018-03-30 (목)',
            child: (
              <div>
                <ActivityItem icon="account_circle" name="박정필-변호사" addedItem="타임시트" time="3:32PM" />
                <ActivityItem icon="message" name="박정필-변호사" addedItem="메시지" time="3:32PM" />
              </div>
            ),
          },
          {
            title: '2018-03-30 (화)',
            child: (
              <div>
                <ActivityItem icon="restore_from_trash" name="박정필-변호사" addedItem="사건메모" time="3:32PM" />
                <ActivityItem icon="photo" name="박정필-변호사" addedItem="사진" time="3:32PM" />
              </div>
            ),
          },
        ]}
      />
    );

    const ThemeTest = (
      <>
        <CheckBox label="유재석1" onChange={(event, checked) => console.log(event, checked)} />
        <CheckBox label="윤종신2" onChange={(event, checked) => console.log(event, checked)} />
        <Toggle
          checked={this.state.checkA}
          onChange={e => {
            this.setState({
              checkA: !e.target.checked,
            });
          }}
          value="checkA"
        />
        <Toggle
          checked={this.state.checkB}
          onChange={e => {
            this.setState({
              checkB: !e.target.checked,
            });
          }}
          value="checkB"
        />
      </>
    );

    const MenuIconTest = (
      <>
        <i className="material-icons">dashboard</i>
        <i className="material-icons">people</i>
        <i className="material-icons">assignment_ind</i>
        <i className="material-icons">assignment</i>
        <i className="material-icons">book</i>
        <i className="material-icons">supervised_user_circle</i>
        <i className="material-icons">computer</i>
        <i className="material-icons">description</i>
        <i className="material-icons">add_to_photos</i>
        <i className="material-icons">credit_card</i>
        <i className="material-icons">view_module</i>
        <i className="material-icons">event</i>
        <img src={ic_main_19} alt="Invoice" />
      </>
    );

    return (
      <div className="app-wrapper">
        <OneItem title="TreeView">{treeView}</OneItem>
        <OneItem title="ButtonN">{buttons}</OneItem>
        <OneItem title="CheckBox">{checkboxTest}</OneItem>
        <OneItem title="PageTitle">{pageTitleTest}</OneItem>
        <OneItem title="Loader">{loadingTest}</OneItem>
        <OneItem title="DatePicker">{datepickerTest}</OneItem>
        <OneItem title="Avatar">{avatarTest}</OneItem>
        <OneItem title="TimeButton">{timeButtonTest}</OneItem>
        <OneItem title="ExcelExport">{excelExportTest}</OneItem>
        <OneItem title="ActivityItem">{activityItemTest}</OneItem>
        <OneItem title="ThemeTest">{ThemeTest}</OneItem>
        <OneItem title="MenuIconTest">{MenuIconTest}</OneItem>
      </div>
    );
  }
}

export default Test;
