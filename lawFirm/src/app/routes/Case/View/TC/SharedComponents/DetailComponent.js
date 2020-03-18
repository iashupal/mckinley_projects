import React, { Component } from 'react';
import GridTable, { GridRow } from 'components/GridTable';
import InputBoxNumber from 'components/InputBoxNumber';
import InputBox from 'components/InputBox';
import { RU } from 'helpers/ramda';

const { mlMessage } = RU;

class DetailComponent extends Component {
  render() {
    const { formMode, TCDetail, setReduxValues } = this.props;

    const DetailComponent = (
      <GridTable>
        <GridRow title={mlMessage('pages.case.TC.performerName')} center>
          <div style={{ textAlign: 'left' }}>{TCDetail.name}</div>
        </GridRow>
        <GridRow title={mlMessage('pages.case.TC.employeeType')} center>
          <div style={{ textAlign: 'left' }}>{TCDetail.empType}</div>
        </GridRow>
        <GridRow title={mlMessage('pages.case.TC.unitPrice')} center redStar={formMode !== 'detail'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              value={TCDetail.timeCharge}
              onValueChange={obj => setReduxValues({ _path: 'TC.TCDetail', timeCharge: obj.value })}
              unit="원"
              readOnly={formMode === 'detail'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.case.TC.runningTime')} center>
          <div style={{ textAlign: 'left' }}>{TCDetail.formattedRunningTime}</div>
        </GridRow>
        <GridRow title={mlMessage('pages.case.TC.amount')} center>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber width="200px" thousandSeparator value={TCDetail.billingAmount} unit="원" readOnly />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.remark')} center>
          {formMode === 'detail' ? (
            <div style={{ textAlign: 'left', whiteSpace: 'pre' }}>{TCDetail.remark}</div>
          ) : (
            <InputBox
              multiline
              value={TCDetail.remark}
              onChange={e => setReduxValues({ _path: 'TC.TCDetail', remark: e.target.value })}
              width="400px"
            />
          )}
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.runDate')} center>
          <div style={{ textAlign: 'left' }}>{TCDetail.runDate}</div>
        </GridRow>
        <GridRow title={mlMessage('pages.common.updateDate')} center>
          <div style={{ textAlign: 'left' }}>{TCDetail.updateDate}</div>
        </GridRow>
        <GridRow title={mlMessage('pages.common.createDate')} center>
          <div style={{ textAlign: 'left' }}>{TCDetail.createDate}</div>
        </GridRow>
      </GridTable>
    );

    return <>{DetailComponent}</>;
  }
}

export default DetailComponent;
