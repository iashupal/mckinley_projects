import React from 'react';
import * as classnames from 'classnames';

export const GridRow = ({ title, children, center, redStar }) => {
  return (
    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
      <td className={classnames({ 'text-center': center })} style={{ wordBreak: 'keep-all' }}>
        {title}
        {redStar && <span className="text-danger">*</span>}
      </td>
      <td colSpan="5" className={classnames({ 'text-center': center })} style={{ wordBreak: 'break-all' }}>
        <div className="form-group">{children}</div>
      </td>
    </tr>
  );
};

const GridTable = ({ contents, center, children, colWidth1 = '20%', colWidth2 = '80%' }) => {
  return (
    <div className="tab1-form tab2-form task-table-form">
      <table className="table">
        <colgroup>
          <col width={colWidth1} />
          <col width={colWidth2} />
        </colgroup>
        <tbody>
          {/* children 방식으로 사용 권장 (component 관련 Array 가 1개만 사용됨) */}
          {children}
          {/* contents props 는 기존 사용 코드로 인해 미삭제 */}
          {contents &&
            contents.map((content, index) => (
              <tr style={{ borderBottom: '1px solid #dee2e6' }} key={index}>
                <td className={classnames({ 'text-center': center })}>{content.title}</td>
                <td colSpan="5" className={classnames({ 'text-center': center })}>
                  <div className="form-group">{content.child}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridTable;
