import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { withStyles } from '@material-ui/core';

class InputBox extends React.Component {
  state = {
    placeholderFlag: true,
  };

  validateMaxLength = (currentLength, maxLength) => {
    const isPreventInput_Length = currentLength < maxLength;
    return isPreventInput_Length;
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
    const {
      maxLength,
      iconName,
      handleSubmit,
      width,
      placeholder,
      backgroundColor,
      borderRadius,
      padding,
      position,
      readOnly,
      value,
    } = this.props;
    const { placeholderFlag } = this.state;

    if (readOnly) {
      return <div style={{ textAlign: 'left', whiteSpace: 'pre' }}>{value}</div>;
    }

    let icon = null;
    if (iconName) {
      icon = {
        iconName,
        style: {
          display: 'inline-block',
          fontStyle: 'normal',
          fontWeight: 'normal',
          speak: 'none',
          fontFamily: 'FabricMDL2Icons',
          pointerEvents: 'auto',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '-1px',
          right: '0px',
          top: 'auto',
          fontSize: '16px',
          lineHeight: '41px',
          width: '26px',
          height: '39px',
        },
        onClick: handleSubmit,
      };
    }

    const passProps = {
      ...this.props,
      // background: backgroundColor,
      iconProps: icon,
      placeholder: placeholderFlag ? placeholder : '',
    };
    return (
      <div style={{ width }}>
        <TextField
          {...passProps}
          style={{ backgroundColor, borderRadius, padding, position }}
          onKeyPress={e => {
            const { key, target } = e;
            const { value } = target;
            if (key === 'Enter' && !this.props.multiline) {
              handleSubmit();
            } else if (maxLength && !this.validateMaxLength(value.length, maxLength)) {
              e.preventDefault();
            }
          }}
          onFocus={this.focustIn}
          onBlur={this.focusOut}
          className="fabric-input-box"
        />
      </div>
    );
  }
}
const styles = theme => ({});
export default withStyles(styles)(InputBox);
