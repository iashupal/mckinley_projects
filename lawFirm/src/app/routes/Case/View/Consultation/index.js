import React, { Component } from 'react';
import ConsultationMng from 'app/routes/Consultation/View';

class Consultation extends Component {
  render() {
    const { selectedCase } = this.props;
    return <ConsultationMng bizCode={{ key: 'BIZCODE_B03-C06', value: '송무/상담' }} selectedCase={selectedCase} />;
  }
}

export default Consultation;
