import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { R, RU, CurrentUser } from 'helpers/ramda';
import classNames from 'classnames';
import { BlankSpan, ButtonW, DialogBtnBox } from 'helpers/ui';
import moment from 'moment';
import { PostCall } from 'helpers/ajax';

const { shortenStr, yearMonthDay, convertEditorText, fileReadFunc } = RU;

class EmailDetail extends Component {
  state = {
    isDialogOpen: false,
  };

  render() {
    const { isDialogOpen } = this.state;
    const { item, files } = this.props;
    return (
      <React.Fragment>
        <React.Fragment>
          <br />
          <Button
            color="primary"
            onClick={e => {
              this.setState({ ...this.state, isDialogOpen: true });
            }}
          >
            <i className="zmdi zmdi-email zmdi-hc-2x" />
          </Button>
          <BlankSpan num={1} />
          {files &&
            files.length > 0 &&
            files.map((f, index) => (
              <React.Fragment key={index}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={async e => {
                    // const fileBuffer = f.content.data;
                    // const mimeType = f.contentType;
                    // const fileName = f.filename;
                    // fileReadFunc(fileBuffer, mimeType, fileName);

                    const result = await PostCall('/ext/mail_attach_file_read', {
                      Bucket: f.Bucket,
                      FilePath: f.FilePath,
                      Filename: f.filename,
                      Checksum: f.checksum,
                    });

                    const { msg } = result.data;
                    if (msg) {
                      alert(msg);
                    } else {
                      const { fileBuffer, mimeType, fileName } = result.data.result;
                      fileReadFunc(fileBuffer.data, mimeType, fileName);
                    }
                  }}
                >
                  {f.filename}
                </Button>
                <BlankSpan num={1} />
              </React.Fragment>
            ))}
        </React.Fragment>
        <Dialog open={isDialogOpen} maxWidth={false}>
          <DialogTitle>Mail Detail</DialogTitle>
          <DialogContent className="pt-1">{item && <div dangerouslySetInnerHTML={{ __html: item }} />}</DialogContent>
          <DialogBtnBox>
            <ButtonW name="Close" handleClick={e => this.setState({ ...this.state, isDialogOpen: false })} option="2" />
          </DialogBtnBox>
        </Dialog>
      </React.Fragment>
    );
  }
}

export class Email extends Component {
  state = {
    isDialogOpen: false,
    hideArr: [],
  };

  handleDate = val => {
    return moment(val).format('YYYY-MM-DD hh:mm:ss');
  };

  render() {
    const { isDialogOpen, hideArr } = this.state;
    const { mails } = this.props;

    return (
      <React.Fragment>
        <React.Fragment>
          <ButtonW
            handleClick={e => {
              this.setState({ ...this.state, isDialogOpen: true });
            }}
            option="1"
            toolTipMsg=""
          >
            <i className="zmdi zmdi-email-open zmdi-hc-fw" />
            {mails.length}
          </ButtonW>
        </React.Fragment>
        <Dialog open={isDialogOpen} maxWidth={false}>
          <DialogTitle>Mail List</DialogTitle>
          <DialogContent className="pt-1">
            <div
              className={classNames({
                'timeline-section': true,
                'timeline-center': false,
                clearfix: true,
                animated: true,
                slideInUpTiny: true,
                'animation-duration-3': true,
              })}
            >
              {mails && mails.length === 0 && (
                <div
                  className={classNames({
                    'timeline-item': true,
                    'timeline-inverted': false,
                  })}
                >
                  <div className="timeline-badge timeline-img">
                    <img src="assets/images/pentagon_1.png" alt="Pentagon" title="Pentagon" />
                  </div>
                  <div className="timeline-panel ">
                    <div className="timeline-panel-header">
                      <div className="timeline-heading">No Data found</div>
                    </div>
                  </div>
                </div>
              )}
              {mails &&
                mails.map(n => (
                  <div
                    key={n.Row}
                    className={classNames({
                      'timeline-item': true,
                      'timeline-inverted': false,
                    })}
                  >
                    <div className="timeline-badge timeline-img">
                      <img src="assets/images/pentagon_1.png" alt="Pentagon" title="Pentagon" />
                    </div>
                    <div className="timeline-panel ">
                      <div className="timeline-panel-header">
                        <div className="timeline-heading">
                          <h5>{this.handleDate(n.Date.substring(0, n.Date.length - 5))}</h5>
                          <h3 className="timeline-title">Subject : {n.Subject}</h3>
                          <h5 className="timeline-title">From : {n.From}</h5>
                          <h5 className="timeline-title">To : {n.To}</h5>
                        </div>
                      </div>
                      <div className="timeline-body">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: hideArr[n.Row]
                              ? convertEditorText(shortenStr(shortenStrLen, n.Contents))
                              : convertEditorText(n.Contents),
                          }}
                        />
                        <EmailDetail item={n.Detail} files={n.Attachments} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {/* <List> 
                            {mails && mails.map(mail => 
                                <ListItem button key={mail.Row}>
                                    <Avatar src={mail.FromPhotoURL} />
                                </ListItem>
                            )}

                        </List> */}
          </DialogContent>
          <DialogBtnBox>
            <ButtonW name="Close" handleClick={e => this.setState({ ...this.state, isDialogOpen: false })} option="2" />
          </DialogBtnBox>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default Email;
