import React from 'react';
import Box from 'components/BoxOld';

function FieldRow(props) {
  return (
    // <Box mb={2} display="flex" flexDirection="row" alignItems="center">
    //   <Box width={props.width ? props.width : '30%'}>
    //     {props.rowTitle}
    //     {props.redstar && <span className="text-danger"> *</span>}
    //   </Box>
    //   <Box width="5%">:</Box>
    //   <Box>{props.children}</Box>
    // </Box>
    <div>미사용, "Fields" 사용</div>
    // <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
    //   {props.rowTitle}
    //   {props.redstar && <span className="text-danger"> *</span>}
    //   <span>:</span>
    //   {props.children}
    // </div>
  );
}

export default FieldRow;
