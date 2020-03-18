import React, { Component } from 'react';
import InputBox from 'components/InputBox';
import Search from 'components/Search/Search';
import InputBoxNumber from 'components/InputBoxNumber';

class InputTest extends Component {
  state = {
    textValue: '',
    moneyValue: '',
    percentValue: '',
  };

  onChange = async e => {
    await this.setState({
      textValue: e.target.value,
    });
  };

  onMoneyValueChange = value => {
    this.setState({
      moneyValue: value,
    });
  };

  onPercentValueChange = e => {
    this.setState({
      percentValue: e.target.value,
    });
  };

  handleSubmit = () => {
    const { textValue } = this.state;
    alert(`검색 입력값 : ${textValue}`);
  };

  render() {
    const { textValue, moneyValue, percentValue } = this.state;

    return (
      <div className="app-wrapper">
        InputBox Test (일반 : 검색 아이콘 X) : <br />
        <InputBox
          label="Label"
          placeholder="placeholder 입니다."
          value={textValue}
          onChange={this.onChange}
          maxLength={10}
          handleSubmit={e => {
            this.handleSubmit();
          }}
          width="200px"
        />
        InputBox Test (일반 : 검색 아이콘 O) : <br />
        <InputBox
          label="Label"
          placeholder="placeholder 입니다."
          value={textValue}
          onChange={this.onChange}
          maxLength={10}
          iconName="Search"
          handleSubmit={e => {
            this.handleSubmit();
          }}
          width="200px"
        />
        <br />
        <br />
        InputBox Test (넓이) : <br />
        <InputBox
          label="Label"
          placeholder="placeholder 입니다."
          value={textValue}
          onChange={this.onChange}
          maxLength={10}
          iconName="Search"
          handleSubmit={e => {
            this.handleSubmit();
          }}
          width="50%"
        />
        <br />
        <br />
        InputBox Test (넓이 : width 안넣었을 때) : <br />
        <InputBox
          label="Label"
          placeholder="placeholder 입니다."
          value={textValue}
          onChange={this.onChange}
          maxLength={10}
          iconName="Search"
          handleSubmit={e => {
            this.handleSubmit();
          }}
        />
        <br />
        <br />
        InputBoxNumber Test : <br />
        <InputBoxNumber
          label="기본(정수)"
          width="200px"
          value={moneyValue}
          decimalScale={0}
          onValueChange={obj => this.onMoneyValueChange(obj.value)}
        />
        <InputBoxNumber
          label="기본(소수점 두자리)"
          width="200px"
          value={moneyValue}
          onValueChange={obj => this.onMoneyValueChange(obj.value)}
        />
        <InputBoxNumber
          label="thousandSeparator"
          thousandSeparator
          width="200px"
          value={moneyValue}
          onValueChange={obj => this.onMoneyValueChange(obj.value)}
        />
        <InputBoxNumber
          label="unit(원)"
          width="200px"
          thousandSeparator
          value={moneyValue}
          onValueChange={obj => this.onMoneyValueChange(obj.value)}
          unit="원"
        />
        <InputBoxNumber
          label="unit(%)"
          width="100px"
          value={moneyValue}
          onValueChange={obj => this.onMoneyValueChange(obj.value)}
          unit="%"
        />
        <br />
        <br />
        InputBox MultiLine Test4 : <br />
        <InputBox
          label="Label"
          multiline
          value={textValue}
          onChange={this.onChange}
          maxLength={10}
          width="30%"
          placeholder="placeholder 입니다."
        />
        <br />
        <br />
        상단 헤더 검색 창 : Search leftIcon
        <Search
          stylename="d-none d-lg-block"
          value={textValue}
          onChange={this.onChange}
          handleSubmit={this.handleSubmit}
        />
        <br />
        <br />
        상단 헤더 검색 창 : Search leftIcon
        <Search
          // stylename="d-none d-lg-block"
          value={textValue}
          onChange={this.onChange}
          handleSubmit={this.handleSubmit}
          leftIcon
        />
        <br />
      </div>
    );
  }
}

export default InputTest;
