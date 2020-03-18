import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

const basicStyle = {
  width: '100%',
  fontSize: '14px',
  fontWeight: '400',
  boxShadow: 'none',
  marginTop: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  paddingTop: '0px',
  paddingRight: '12px',
  paddingBottom: '0px',
  paddingLeft: '12px',
  boxSizing: 'border-box',
  color: 'rgb(51, 51, 51)',
  minWidth: '0px',
  textOverflow: 'ellipsis',
  borderRadius: '5px',
  borderWidth: 'initial',
  borderStyle: 'none',
  borderColor: 'lightgray',
  borderImage: 'initial',
  background: 'none transparent',
  lineHeight: '36px',
  textAlign: 'right',
  outlineStyle: 'none',
};

const rootStyle = {
  fontFamily: `'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'sans-seri', '-webkit-font-smoothing: antialiased'`,
  fontSize: '14px',
  fontWeight: 400,
  boxShadow: 'none',
  marginTop: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  paddingTop: '0px',
  paddingRight: '0px',
  paddingBottom: '0px',
  paddingLeft: '0px',
  boxSizing: 'border-box',
  position: 'relative',
};

const fieldGroupStyle = {
  borderColor: 'hsl(0, 0%, 80%)',
  borderRadius: '4px',
  borderStyle: 'solid',
  borderWidth: '1px',
  boxShadow: 'none',
  height: '100%',
  lineHeight: '36px',
  background: 'rgb(255, 255, 255)',
};

class InputBoxNumber extends Component {
  state = {
    placeholderFlag: true,
  };

  focustIn = () => {
    this.setState({
      placeholderFlag: false,
    });
  };

  focusOut = () => {
    this.setState({
      placeholderFlag: true,
    });
  };

  render() {
    const { placeholderFlag } = this.state;
    const { value, onValueChange, width, label, thousandSeparator, unit, placeholder, readOnly } = this.props;
    const customWidth = width || '100%';
    const passProps = { ...this.props, placeholder: placeholderFlag ? placeholder : '' };

    if (readOnly) {
      if (thousandSeparator)
        return (
          <div style={{ display: 'flex' }}>
            <div>
              <NumberFormat value={value} displayType="text" thousandSeparator />
            </div>
            &nbsp;
            {unit}
          </div>
        );
      return <div>{`${value} ${unit}`}</div>;
    }

    return (
      <div>
        {/* <div className="ms-TextField fabric-input-box root-38"> */}
        <div style={rootStyle}>
          <div>
            {label && (
              <label htmlFor="TextField3" id="TextFieldLabel5" className="ms-Label root-47">
                {label}
              </label>
            )}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {/* <div className="ms-TextField-fieldGroup fieldGroup-40"> */}
              <div style={fieldGroupStyle}>
                <div style={{ width: customWidth }}>
                  <NumberFormat
                    style={basicStyle}
                    thousandSeparator={thousandSeparator}
                    decimalScale={2}
                    maxLength={19}
                    value={value}
                    onValueChange={onValueChange}
                    onFocus={this.focustIn}
                    onBlur={this.focusOut}
                    {...passProps}
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  padding: '10px',
                }}
              >
                {unit}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputBoxNumber;
