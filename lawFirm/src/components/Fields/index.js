import React, { Fragment } from 'react';

export const FieldItem = ({ title, children, redstar, isFull }) => {
  const fullRow = { gridColumnStart: 1, gridColumnEnd: 4 };
  return (
    <>
      {!isFull && (
        <>
          {/* 내부 수정 버전 */}
          {/* <div style={{ wordBreak: 'keep-all', display: 'flex', alignItems: 'center' }}>
            {title}
            {redstar && <span className="text-danger"> *</span>}
          </div>
          <div style={{ margin: '0px 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>:</div>
          <div style={{ wordBreak: 'keep-all' }}>{children}</div> */}

          {/* 맥킨리 수정 버전 */}
          <div style={{ wordBreak: 'keep-all', lineHeight: '2.5' }}>
            {title}
            {redstar && <span className="text-danger"> *</span>}
          </div>
          <div style={{ margin: '0px 5px', textAlign: 'center', lineHeight: '2.5' }}>:</div>
          <div style={{ wordBreak: 'keep-all', lineHeight: '2.5' }}>{children}</div>
        </>
      )}
      {isFull && <div style={{ wordBreak: 'keep-all', ...fullRow }}>{children}</div>}
    </>
  );
};

function Fields({ children, fullScreen }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: fullScreen ? '1.5fr 0.5fr 3fr' : '2.5fr 0.5fr 9fr',
        gridGap: '10px 15px',
        marginBottom: '15px',
      }}
    >
      {children}
    </div>
  );
}

export default Fields;
