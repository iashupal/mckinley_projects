import React from 'react';
import '../../styles/ui/_popupbtn.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import TaskForm from '../screen/TaskForm';

class PopupBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="dialog-form">
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open dialog
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-wrapper"
          maxWidth="lg"
        >
          <DialogTitle id="customized-dialog-title">
            Dialog
            {/* <Button onClick={this.handleClose} className="cross-btn">
                                <CloseIcon />
                        </Button> */}
            {/* <div className="wrap-tab1-left wrap-tab1-right left">
                            <div className="tab1-heading">
                                <h2 className="h2-fontwght">CaseTab2</h2>
                                <div className="case-btn case-tab-btn tab2-form-rght-btn">
                                    <Button variant="contained" className="btn btnStyle btn-color">Case Form
                                        <i className="material-icons icon">
                                            queue
                                        </i>
                                    </Button>
                                </div>
                            </div>
                            
                            
                        </div> */}
          </DialogTitle>
          <DialogContent className="dialog-content">
            <p>Dialog</p>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to Google, even when
              no apps are running.
              {/* <div className="task-form left">
                                <TaskForm/>
                            </div> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {/* className="cross-btn" */}
              {/* <CloseIcon /> */}
              DisAgree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PopupBtn;
