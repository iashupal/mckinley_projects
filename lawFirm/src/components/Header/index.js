import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Box from 'components/BoxOld';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { BELOW_THE_HEADER, COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import SearchBox from 'components/SearchBox';
import { switchLanguage, toggleCollapsedNav } from 'actions/Default/Setting';
import LanguageSwitcher from 'components/LanguageSwitcher/index';
import UserInfoPopup from 'components/UserInfo/UserInfoPopup';
import UserInfo from 'components/UserInfo';
import { RU } from 'helpers/ramda';
import ManualDialog from 'components/Header/ManualDialog';
import DropdownElement from 'components/DropdownElement';
import TimeButton from 'components/Timebutton';
import Search from 'components/Search/Search';
import NotificationBadge from 'components/NotificationBadge';
import { notifications } from 'components/AppNotification/data';
import Select from 'components/Select';
import Button from 'components/Button';
import TimePopover from 'components/TimePopover';

const { changeURL, parseQueryStr } = RU;
const options = [
  { key: 'recent', text: '최근 사건/자문/고객' },
  { key: 'old', text: '고객 내역' },
  { key: 'now', text: '고객 관리 현황', disabled: true },
];

class Header extends React.Component {
  state = {
    searchBox: false,
    searchText: '',
    mailNotification: false,
    userInfo: false,
    langSwitcher: false,
    appNotification: false,
  };

  onAppNotificationSelect = () => {
    this.setState({ appNotification: !this.state.appNotification });
  };

  onMailNotificationSelect = () => {
    this.setState({ mailNotification: !this.state.mailNotification });
  };

  onLangSwitcherSelect = event => {
    this.setState({ langSwitcher: !this.state.langSwitcher });
  };

  onSearchBoxSelect = () => {
    this.setState({ searchBox: !this.state.searchBox });
  };

  onUserInfoSelect = () => {
    this.setState({ userInfo: !this.state.userInfo });
  };

  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false,
    });
  };

  onToggleCollapsedNav = e => {
    const { navCollapsed, toggleCollapsedNav } = this.props;
    toggleCollapsedNav(!navCollapsed);
  };

  updateSearchText = evt => {
    this.setState({ searchText: evt.target.value });
  };

  handleSubmit = () => {
    const { searchText } = this.state;
    alert(`검색 입력값 : ${searchText}`);

    // const searchText = evt.target.value;
    // changeURL(`/elastic_search?q=${searchText}`);
    // this.setState({ searchText: '' });
  };

  render() {
    const {
      drawerType,
      locale,
      navigationStyle,
      horizontalNavPosition,
      location,
      settingIconHide,
      switchLanguage,
      authUser,
    } = this.props;

    const drawerStyle2 = drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerStyle2;

    return (
      <AppBar
        className={`${
          navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER
            ? 'app-main-header-top'
            : ''
        }`}
      >
        <Toolbar className="app-toolbar" disableGutters={false}>
          {navigationStyle === HORIZONTAL_NAVIGATION ? (
            <div
              role="button"
              tabIndex={0}
              className="d-block d-md-none pointer mr-3"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="jr-menu-icon">
                <span className="menu-icon" />
              </span>
            </div>
          ) : (
            <IconButton
              className={`jr-menu-icon mr-3 ${drawerStyle}`}
              aria-label="Menu"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="menu-icon" />
            </IconButton>
          )}
          <Link className="app-logo mr-2 d-none d-sm-block" to="/app/main">
            <img src="assets/images/logo/CloudLaw_white.png" style={{ width: '200px' }} alt="logo" title="logo" />
          </Link>
          {!(location.pathname === '/app/elastic_search') && (
            // <SearchBox
            //   styleName="d-none d-lg-block"
            //   placeholder=""
            //   value={this.state.searchText}
            //   onChange={this.updateSearchText}
            //   onKeyPress={this.searchKeyPress}
            // />
            <Search
              stylename="d-none d-lg-block"
              value={this.state.searchText}
              onChange={this.updateSearchText}
              handleSubmit={this.handleSubmit}
              leftIcon
            />
          )}

          {/* <div className="right"> */}
          <div className="add-dialog ml-auto d-lg-block d-md-none d-none">
            <Button icon="add" variant="outlined" color="inherit">
              <Box pt={0.5} pb={0.5} pr={2}>
                신규 생성하기
              </Box>
            </Button>
          </div>
          {/* <div className="record-time d-md-block d-sm-none d-none">
            <TimeButton />
          </div> */}
          <TimePopover />
          <div className="notification-badge">
            <NotificationBadge count={notifications.length} />
          </div>
          <ManualDialog />

          {/* <ul className="header-notifications list-inline">
            <li className="d-inline-block d-lg-none list-inline-item">
              <Dropdown
                className="quick-menu nav-searchbox"
                isOpen={this.state.searchBox}
                toggle={this.onSearchBoxSelect.bind(this)}
              >
                <DropdownToggle className="d-inline-block" tag="span" data-toggle="dropdown">
                  <IconButton className="icon-btn size-30">
                    <i className="zmdi zmdi-search zmdi-hc-fw" />
                  </IconButton>
                </DropdownToggle>
                <DropdownMenu right className="p-0">
                  <SearchBox
                    styleName="search-dropdown"
                    placeholder=""
                    onChange={this.updateSearchText.bind(this)}
                    value={this.state.searchText}
                  />
                </DropdownMenu>
              </Dropdown>
            </li>
           
            
            {!settingIconHide && (
              <li className="list-inline-item">
                <Dropdown
                  className="quick-menu"
                  isOpen={this.state.langSwitcher}
                  toggle={this.onLangSwitcherSelect.bind(this)}
                >
                  <DropdownToggle className="d-inline-block" tag="span" data-toggle="dropdown">
                    <div className="d-flex align-items-center pointer pt-1">
                      {locale.icon === 'kr' && <img src="assets/images/flag_kr.png" alt="" />}
                      {locale.icon === 'us' && <img src="assets/images/flag_us.png" alt="" />}
                    </div>
                  </DropdownToggle>
                  <DropdownMenu right className="w-50">
                    <LanguageSwitcher
                      switchLanguage={switchLanguage}
                      handleRequestClose={this.handleRequestClose}
                      authUser={authUser}
                    />
                  </DropdownMenu>
                </Dropdown>
              </li>
            )}
            <li className="list-inline-item">
              <UserInfo />
            </li>
            {navigationStyle === HORIZONTAL_NAVIGATION && (
              <li className="list-inline-item user-nav">
                <Dropdown className="quick-menu" isOpen={this.state.userInfo} toggle={this.onUserInfoSelect.bind(this)}>
                  <DropdownToggle className="d-inline-block" tag="span" data-toggle="dropdown">
                    <IconButton className="icon-btn size-30">
                      <Avatar alt="..." src="http://via.placeholder.com/150x150" className="size-30" />
                    </IconButton>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <UserInfoPopup />
                  </DropdownMenu>
                </Dropdown>
              </li>
            )}
          </ul> */}
          {/* </div> */}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ settings, router, auth, common }) => {
  const { drawerType, locale, navigationStyle, horizontalNavPosition, settingIconHide } = settings;
  const { authUser } = auth;
  const queryString = parseQueryStr(router.location.search);
  const { location } = router;

  return {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition,
    queryString,
    location,
    settingIconHide,
    authUser,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { toggleCollapsedNav, switchLanguage },
  )(Header),
);
