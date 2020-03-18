/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SwitchNew from 'components/Toggle';
import { changeDirection, setDarkTheme, setThemeColor, changeSettingValues } from 'actions/Default/Setting';
import {
  AMBER,
  BLUE,
  CYAN,
  DARK_AMBER,
  DARK_BLUE,
  DARK_CYAN,
  DARK_DEEP_ORANGE,
  DARK_DEEP_PURPLE,
  DARK_GREEN,
  DARK_INDIGO,
  DARK_PINK,
  DEEP_ORANGE,
  DEEP_PURPLE,
  GREEN,
  INDIGO,
  PINK,
} from 'constants/ThemeColors';
import { setReduxValues } from 'actions/Default/Common';

const switchStyle = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
};

class ColorOption extends React.Component {
  componentDidMount() {
    document.body.classList.add(this.props.themeColor);
  }

  toggleCustomizer = () => {
    this.props.changeDrawerStatus(!this.props.drawerStatus);
  };

  closeCustomizer = () => {
    this.props.changeDrawerStatus(false);
  };

  handleThemeColor = colorCode => {
    this.props.setThemeColor(colorCode);
    const body = document.body.classList;
    body.remove(this.props.themeColor);
    body.remove('dark-theme');
    body.add(colorCode);
  };

  handleDarkTheme = () => {
    this.props.setDarkTheme();
    const body = document.body.classList;
    body.toggle(this.props.themeColor);
    body.toggle('dark-theme');
  };

  render() {
    const { themeColor, changeSettingValues, drawerStatus, appDialogMode } = this.props;
    return (
      <div className="theme-option">
        <Drawer
          className="app-sidebar-content left-sidebar"
          anchor="left"
          open={drawerStatus}
          onClose={this.closeCustomizer.bind(this)}
        >
          <div className="color-theme">
            <div className="color-theme-header">
              <h3 className="color-theme-title">Setting Style </h3>
              <IconButton className="size-30" onClick={this.closeCustomizer}>
                <i className="zmdi zmdi-close text-white" />
              </IconButton>
            </div>
            <div className="color-theme-body">
              <h3>Light Sidenav</h3>
              <ul className="color-option">
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, INDIGO)}
                    className={`bg-indigo ${themeColor === INDIGO && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, CYAN)}
                    className={`bg-cyan ${themeColor === CYAN && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, AMBER)}
                    className={`bg-amber ${themeColor === AMBER && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DEEP_ORANGE)}
                    className={`bg-deep-orange ${themeColor === DEEP_ORANGE && 'active'}`}
                  />
                </li>

                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, PINK)}
                    className={`bg-pink ${themeColor === PINK && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, BLUE)}
                    className={`bg-blue ${themeColor === BLUE && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DEEP_PURPLE)}
                    className={`bg-deep-purple ${themeColor === DEEP_PURPLE && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, GREEN)}
                    className={`bg-green ${themeColor === GREEN && 'active'}`}
                  />
                </li>
              </ul>
              <h3>Dark Sidenav</h3>
              <ul className="color-option cr-op-dark-sidebar">
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_INDIGO)}
                    className={`bg-indigo ${themeColor === DARK_INDIGO && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_CYAN)}
                    className={`bg-cyan ${themeColor === DARK_CYAN && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_AMBER)}
                    className={`bg-amber ${themeColor === DARK_AMBER && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_DEEP_ORANGE)}
                    className={`bg-deep-orange ${themeColor === DARK_DEEP_ORANGE && 'active'}`}
                  />
                </li>

                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_PINK)}
                    className={`bg-pink ${themeColor === DARK_PINK && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_BLUE)}
                    className={`bg-blue ${themeColor === DARK_BLUE && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_DEEP_PURPLE)}
                    className={`bg-deep-purple ${themeColor === DARK_DEEP_PURPLE && 'active'}`}
                  />
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleThemeColor.bind(this, DARK_GREEN)}
                    className={`bg-green ${themeColor === DARK_GREEN && 'active'}`}
                  />
                </li>
              </ul>
              <h3 style={{ marginBottom: '10px' }}>
                <div style={{ paddingBottom: '10px' }}>상세화면 Display Mode</div>
                <div style={{ fontSize: '14px' }}>
                  <div style={switchStyle}>
                    <span style={{ flexGrow: 1 }}>- 자동</span>
                    <SwitchNew
                      checked={appDialogMode === 'auto'}
                      onChange={e => {
                        const { checked } = e.target;
                        changeSettingValues({ name: 'appDialogMode', value: checked ? 'default' : 'auto' });
                      }}
                    />
                    <span style={{ width: '120px' }}>&nbsp;</span>
                  </div>
                  {appDialogMode !== 'auto' && (
                    <div style={switchStyle}>
                      <span style={{ flexGrow: 1 }}>- 팝업 여부</span>
                      <SwitchNew
                        checked={appDialogMode === 'popup'}
                        onChange={e => {
                          const { checked } = e.target;
                          changeSettingValues({ name: 'appDialogMode', value: checked ? 'default' : 'popup' });
                        }}
                      />
                      <span style={{ width: '120px' }}>&nbsp;</span>
                    </div>
                  )}
                </div>
              </h3>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth, common }) => {
  const { themeColor, darkTheme, isDirectionRTL, listUItype, appDialogMode } = settings;
  const { isMC_MyCompanyMode } = common;
  const { authUser } = auth;
  return {
    themeColor,
    darkTheme,
    isDirectionRTL,
    listUItype,
    authUser,
    isMC_MyCompanyMode,
    appDialogMode,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setThemeColor, setDarkTheme, changeDirection, changeSettingValues, setReduxValues },
  )(ColorOption),
);
