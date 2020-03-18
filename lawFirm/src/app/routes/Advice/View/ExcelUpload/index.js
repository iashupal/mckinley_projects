import React, { Component } from 'react';
import { withStyles, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import InputBox from 'components/InputBox';
import PostCode from 'components/PostCode';
import GridTable, { GridRow } from 'components/GridTable';
import ExcelImportTable from 'components/ExcelImportTable';
import Dialog from '@material-ui/core/Dialog';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import ListDetailContainer from 'components/ListDetailContainer';
import Box from 'components/BoxOld';
import { DialogBtnBox } from 'helpers/ui';
import PageTitle from 'components/PageTitle';
import { NotificationManager } from 'react-notifications';
import { R, RU } from 'helpers/ramda';
import produce from 'immer';

// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// 송무 - 엑셀 업로드는 향후 개발!!!!!!
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

class ExcelUpload extends Component {
  render() {

    return (
      <div className={classes.container}>
          향후 개발
      </div>
    );
  }
}

const styles = theme => ({
  },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ExcelUpload));
