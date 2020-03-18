import React, { Component, Fragment } from 'react';
import Fields, { FieldItem } from 'components/Fields';
import { withStyles } from '@material-ui/core';

class FieldRowTest extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="row">
          <div className="col-md-6">
            <br />
            <div style={{ fontWeight: 'bold' }}>* FieldRow (X) => Fields 사용</div>
            <br />
            <Fields>
              <FieldItem title="장소 (재판장) 1">서울 지방청 1</FieldItem>
              <FieldItem title="장소 (재판장) 2">서울 지방청 2</FieldItem>
              <FieldItem title="장소 (재판장) 4" />
              <FieldItem isFull>
                서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울
                지방청서울 지방청
              </FieldItem>
            </Fields>
          </div>
          <div className="col-md-6">
            <br />
            <div style={{ fontWeight: 'bold' }}>* FieldRow (X) => Fields 사용</div>
            <br />
            <Fields>
              <FieldItem title="장소 (재판장) 1">서울 지방청 1</FieldItem>
              <FieldItem title="장소 (재판장) 2">서울 지방청 2</FieldItem>
              <FieldItem title="장소 (재판장) 4" />
              <FieldItem isFull>
                서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울
                지방청서울 지방청
              </FieldItem>
            </Fields>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <br />
            <div style={{ fontWeight: 'bold' }}>
              * FieldRow (X) => Fields 사용 / fullScreen 옵션 X (전체화면에서 fullScreen옵션 없이 사용한 경우)
            </div>
            <br />
            <Fields>
              <FieldItem title="장소 (재판장) 1">서울 지방청 1</FieldItem>
              <FieldItem title="장소 (재판장) 2">서울 지방청 2</FieldItem>
              <FieldItem title="장소 (재판장) 4" />
              <FieldItem isFull>
                서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울
                지방청서울 지방청
              </FieldItem>
            </Fields>
          </div>
          <div className="col-12">
            <br />
            <div style={{ fontWeight: 'bold' }}>* FieldRow (X) => Fields 사용 / fullScreen 옵션 O</div>
            <br />
            <Fields fullScreen>
              <FieldItem title="장소 (재판장) 1">서울 지방청 1</FieldItem>
              <FieldItem title="장소 (재판장) 2">서울 지방청 2</FieldItem>
              <FieldItem title="장소 (재판장) 4" />
              <FieldItem isFull>
                서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울 지방청서울
                지방청서울 지방청
              </FieldItem>
            </Fields>
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  caseDetailsRight: {
    position: 'relative',
    paddingLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      paddingLeft: 0,
    },
  },
});

export default withStyles(styles)(FieldRowTest);
