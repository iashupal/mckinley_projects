import React, { Component, Fragment } from 'react';
import CheckBox from 'components/CheckBox';
import Toggle from 'components/Toggle';
import Button from 'components/Button';
import ic_main_19 from 'assets/images/icons/ic_main_19.png';

const alertTest = msg => () => alert(msg);

class Test extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <br /> == 요청사항 == <br />
        1. Button : 아래 Disable 옵션을 보시면, Title 색상만 변경되기 떄문에 사용자 입장에서 Disable 이 확실하지
        않습니다. material ui 버튼에서는 3차원 효과가 제거되어 인식되는데, 이 디자인에서 이와 유사하게 가능하다면 수정
        부탁드립니다. (테마색에 따라 아예 글씨가 보이지 않음..)
        <br />
        2. UserRating : 로딩된 후에 스크롤이 동작하지 않다가, 본문 영역을 클릭 후 스크롤 하면 '대법원'이 아닌 'Test2'가
        갑자기 활성화 됩니다. 그리고 다시 스크롤이 동작하지 않습니다. 기능에 문제가 없는지 다시 확인 부탁 드리며, 의도한
        동작이라면 설명 부탁드립니다.
        <br />
        3. Agenda : Day/Week/Month/Event 에서 영역 선택시 Event 이름을 넣는 창이 나오지만 이름 입력시 동작하지 않고
        (개발자 도구)warning 이 뜨는것 같습니다. 입력 가능한 Sample 까지는 완료 부탁드립니다.
        <br />
        =========================================================
        <br />
        <br /> (button disabled) <br />
        <Button color="primary" onClick={alertTest('1-1')} disabled>
          대법원 사건매치
        </Button>
        <Button color="dark" onClick={alertTest('1-2')} disabled>
          관련자 연결하기
        </Button>
      </div>
    );
  }
}

export default Test;
