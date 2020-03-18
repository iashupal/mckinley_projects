import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userSignOut } from 'actions/Default/Auth';
import { handleProfileDialogOpen } from 'actions/Default/Common';
import { changeSettingValues } from 'actions/Default/Setting';
import IntlMessages from 'util/IntlMessages';
import { BlankSpan } from 'helpers/ui';
import { R, RU } from 'helpers/ramda';

class UserInfo extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        {!this.props.authUser.image && (
          <>
            <div className="bg-blue avatar rounded-circle size-40 text-white text-center" style={{ fontSize: 16 }}>
              {' '}
              {this.props.authUser.MyLFIDInfo.LastName && this.props.authUser.MyLFIDInfo.LastName.charAt(0)}
            </div>
            <BlankSpan num="1" />
          </>
        )}
        {this.props.authUser.image && <Avatar src={this.props.authUser.image} className="user-avatar" />}
        <div className="user-detail">
          <span
            className="user-name"
            onClick={this.handleClick}
            style={{ fontSize: '16px' }}
            role="button"
            tabIndex={-1}
          >
            {this.props.authUser.MyLFIDInfo.LastName + this.props.authUser.MyLFIDInfo.FirstName}
            <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
          </span>
        </div>
        <Menu
          className="user-info"
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              // width: 140,
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
        >
          <MenuItem
            onClick={e => {
              this.handleRequestClose();
              this.props.handleProfileDialogOpen(true);
            }}
          >
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.profile" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleRequestClose();
              this.props.userSignOut();
            }}
          >
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.logout" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { locale, settingIconHide } = settings;
  const { authUser } = auth;
  return { locale, authUser, settingIconHide };
};

export default connect(
  mapStateToProps,
  {
    userSignOut,
    handleProfileDialogOpen,
    changeSettingValues,
  },
)(UserInfo);
