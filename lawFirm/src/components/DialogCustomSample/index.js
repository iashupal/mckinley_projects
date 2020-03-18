import React from 'react';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import InputBox from 'components/InputBox';

class DialogCustomSample extends React.Component {
  state = { isOpen: false, textValue: '', textValue2: '' };

  render() {
    const { isOpen, textValue, textValue2 } = this.state;
    const { handleOK } = this.props;

    return (
      <div>
        <Button size="small" color="primary" onClick={() => this.setState({ isOpen: true })}>
          DialogCustomSample
        </Button>
        <Dialog title="공통 Dialog Sample" open={isOpen}>
          <div>
            <InputBox
              value={textValue}
              onChange={e => this.setState({ textValue: e.target.value })}
              maxLength={10}
              width="200px"
            />
            <InputBox
              value={textValue2}
              onChange={e => this.setState({ textValue2: e.target.value })}
              maxLength={10}
              width="200px"
            />
          </div>
          <Button
            size="small"
            color="dark"
            onClick={() => {
              if (handleOK) handleOK({ textValue, textValue2 });
              this.setState({ isOpen: false, textValue: '', textValue2: '' });
            }}
          >
            OK
          </Button>
          <Button
            size="small"
            color="dark"
            onClick={() => this.setState({ isOpen: false, textValue: '', textValue2: '' })}
          >
            Close
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default DialogCustomSample;
