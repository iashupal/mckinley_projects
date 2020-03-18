import React from 'react';
import DaumPostcode from 'react-daum-postcode';

class Postcode extends React.Component {
  // 주소찾기 컴포넌트 
  render() {
    const { handleAddress, width, height, autoClose, style } = this.props;
    return <DaumPostcode onComplete={handleAddress} width={width} height={height} autoClose={autoClose} style={style} />;
  }
}

export default Postcode;
