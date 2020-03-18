import React, { Component, Fragment } from 'react';
import GridTable, { GridRow } from 'components/GridTable';
import InputBox from 'components/InputBox';

class GridTableTest extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div>GridTable Test1 (center, props) : </div>
        <GridTable
          contents={[
            {
              title: 'title1',
              child: <InputBox style={{ width: '300px' }} placeholder="InputBox Test" />,
            },
            { title: 'title2', child: <InputBox style={{ width: '300px' }} placeholder="InputBox Test" /> },
            {
              title: 'title3',
              child: (
                <div style={{ display: 'flex' }}>
                  <InputBox />
                  <InputBox />
                </div>
              ),
            },
          ]}
          center
        />
        <div>&nbsp;</div>
        <div>GridTable Test2 (center, children) : </div>
        <GridTable>
          <GridRow title="title1" center>
            <InputBox style={{ width: '300px' }} placeholder="InputBox Test" />
          </GridRow>
          <GridRow title="title2" center>
            <InputBox style={{ width: '300px' }} placeholder="InputBox Test" />
          </GridRow>
          <GridRow title="title3" center>
            <div style={{ display: 'flex' }}>
              <InputBox />
              <InputBox />
            </div>
          </GridRow>
        </GridTable>
        <div>&nbsp;</div>
        <div>GridTable Test3 (left, children) : </div>
        <GridTable>
          <GridRow title="title1">
            <InputBox style={{ width: '300px' }} placeholder="InputBox Test" />
          </GridRow>
          <GridRow title="title2">
            <InputBox style={{ width: '300px' }} placeholder="InputBox Test" />
          </GridRow>
        </GridTable>
      </div>
    );
  }
}

export default GridTableTest;
