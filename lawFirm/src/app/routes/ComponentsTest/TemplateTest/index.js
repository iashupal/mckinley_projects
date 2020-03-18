import React, { Component } from 'react';
import Table from 'components/Table/EnhancedTable';
import { ConvertedComponent, MakeTemplate } from 'components/Template';

class Test extends Component {
  state = {
    templateValue: [],
  };

  render() {
    const { templateValue } = this.state;
    const style = { paddingTop: '20px' };

    return (
      <div className="app-wrapper">
        <div>-------------------- 템플릿 JSON 생성 UI --------------------</div>
        <MakeTemplate
          dataArr={templateValue}
          setDataArr={templateValue => {
            this.setState({ templateValue });
          }}
        />
        <div>1. Add 컴포넌트별, 세부 데이터정보 입력 Form 추가</div>
        <div>2. 입력된 컴포넌트 보여주고, "세부 데이터 수정 / 개별삭제 / Sort 기능"</div>
        <div>3. Sort 가능한 트리기능 (외부 라이브러리) 검토</div>
        <div style={style}>-------------------- 템플릿 JSON -> 컴포넌트 --------------------</div>
        <ConvertedComponent
          dataArr={templateValue}
          setDataArr={templateValue => {
            this.setState({ templateValue });
          }}
        />
        <div style={style}>-------------------- 템플릿 JSON 내부값 --------------------</div>
        <pre>{JSON.stringify(templateValue, null, 4)}</pre>
      </div>
    );
  }
}

export default Test;
