import React from 'react';
function hexToRgb(hex, alpha) {
  hex   = hex.replace('#', '');
  let r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
  let g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
  let b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
  if ( alpha ) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }
  else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

const NumInfoCard = ({data}) => {
  return (
    <div className="jr-card net-chart">
      <div className="jr-card-thumb"
           style={{
             backgroundColor: data.color,
             boxShadow: `0 6px 20px 0 ${hexToRgb(data.color, 0.19)},0 8px 17px 0 ${hexToRgb(data.color, 0.20)}`,
             fontSize: '20px',
             fontWeight: 'bold',
           }}>
        {/* <i className={`zmdi zmdi-${data.icon}`}/> */}
        {data.value}
      </div>
      <div className="jr-card-body br-break">
        <h2 className="mb-0"><strong>{data.title}</strong></h2>
        <p className="mb-0">{data.subTitle}</p>
      </div>
    </div>
  );
};

export default NumInfoCard;
NumInfoCard.defaultProps = {
  styleName: ''
};