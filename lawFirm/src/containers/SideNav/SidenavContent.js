/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { R, RU } from 'helpers/ramda';
import IconButton from '@material-ui/core/IconButton';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { switchLanguage, changeSettingValues } from 'actions/Default/Setting';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import LanguageSwitcher from 'components/LanguageSwitcher/index';
import Avatar from '@material-ui/core/Avatar';
import { checkFakeAPI } from 'helpers/ajax';
import SearchBox from '../../components/SearchBox';
import UserInfo from '../../components/UserInfo';
import UserInfoPopup from '../../components/UserInfo/UserInfoPopup';

const { changeURL, parseQueryStr, mlMessage, getRoleAuth, validatePhone } = RU;
// import { withTheme } from '@material-ui/core/styles';
const RuleMC_Check = (myRoleArr, multiCompanyUser, roleList, multiCompanyHide, isMC_MyCompanyMode) => {
  // myRoleArr, multiCompanyUser -> 자신 정보
  // roleList, multiCompanyHide -> 메뉴 정보

  // 권한 체크
  const checkOneRole = roleStr => !roleList || R.includes(roleStr, roleList); // 리스트 자체가 없으면 OK
  const checkAllRole = R.map(checkOneRole, myRoleArr);
  const finalCheck = R.any(R.identity, checkAllRole); // 어느 하나라도 true 면 보임

  // MultiCompany Hide Rule
  const MC_Rule = multiCompanyUser && multiCompanyHide && !isMC_MyCompanyMode;
  return MC_Rule ? false : finalCheck;
};

const MenuLeaf = ({ label, url, icon, isTopMenu }) => {
  return (
    <li className={isTopMenu ? 'top-menu' : ''}>
      <NavLink className="prepend-icon" to={url || 'NoLink'}>
        <i className={`zmdi ${icon || 'zmdi-apps'} zmdi-hc-fw`} />
        {/* <i className="material-icons">people</i> */}
        <span className="nav-text text-transform-none">{label}</span>
      </NavLink>
    </li>
  );
};

const MenuFolder = ({ label, icon, children }) => {
  return (
    <li className="menu collapse-box">
      <Button>
        <i className={icon || `zmdi zmdi-folder zmdi-hc-fw`} />
        <span className="nav-text text-transform-none">{label}</span>
      </Button>
      <ul className="sub-menu">{children}</ul>
    </li>
  );
};

const Menu = ({ children }) => {
  return (
    <ul className="nav-menu">
      <li className="menu collapse-box">
        <ul>{children}</ul>
      </li>
    </ul>
  );
};

class SidenavContent extends Component {
  state = {
    userInfo: false,
    langSwitcher: false,
    searchBox: false,
  };

  componentDidMount() {
    this.handleRenderMenu();
  }

  componentDidUpdate() {
    this.handleRenderMenu(); // 권한이 뒤늦게 Redux 에서 Setting 됨, 관련된 Event 는 계속 호출되도록 함 (성능은 추후 고려).
  }

  onSearchBoxSelect = () => {
    this.setState({ searchBox: !this.state.searchBox });
  };

  onLangSwitcherSelect = event => {
    this.setState({ langSwitcher: !this.state.langSwitcher });
  };

  onUserInfoSelect = () => {
    this.setState({ userInfo: !this.state.userInfo });
  };

  updateSearchText = evt => {
    this.setState({ searchText: evt.target.value });
  };

  searchKeyPress = evt => {
    if (evt.key === 'Enter') {
      const searchText = evt.target.value;
      changeURL(`/elastic_search?q=${searchText}`);
      this.setState({ searchText: '' });
    }
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

  handleRenderMenu = e => {
    const that = this;

    const { pathname } = this.props.location; // '#' 없음 (1 time 과거)
    const pathname2 = window.location.hash; // '#' 포함 (현재)
    // console.log(pathname + ' || ' + pathname2);

    const currActivedElements = document.querySelectorAll('a.active');
    if (currActivedElements.length > 0) {
      R.map(a => a.classList.remove('active'), currActivedElements);
    }

    if (document.querySelector(`a[href="${pathname2}"]`)) {
      document.querySelector(`a[href="${pathname2}"]`).classList.add('active');
    }

    const subMenuLi = document.querySelectorAll('.sub-menu > li');
    for (let i = 0; i < subMenuLi.length; i++) {
      subMenuLi[i].onclick = function(event) {
        event.stopPropagation();
      };
    }

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        // Multi로 열리지 않게 하는 부분.
        // for (let j = 0; j < menuLi.length; j++) {
        //   const parentLi = that.closest(this, 'li');
        //   if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
        //     menuLi[j].classList.remove('open');
        //   }
        // }

        this.classList.toggle('open');
        event.stopPropagation();
      };
    }

    // 페이지 초기접속 시 해당하는 Folder 를 Open.
    try {
      const activeLi = document.querySelector(`a[href="${pathname2}"]`); // select current a element
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {
      //
    }
  };

  // eslint-disable-next-line class-methods-use-this
  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(
        fn,
      ) {
        if (typeof document.body[fn] === 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (error) {
      //
    }

    return null;
  }

  render() {
    // 시스템 관리자용 메뉴, 권한 처리
    const {
      myRoleArr,
      authUser,
      isMC_MyCompanyMode,
      switchLanguage,
      locale,
      settingIconHide,
      navigationStyle,
      sideMenuList,
      changeSettingValues,
    } = this.props;
    const { multiCompanyUser } = authUser;
    // const {light, contrastText} = this.props;
    const currMenuData = sideMenuList;
    // 미 호출시, 메인화면에서 (큰 아이콘) 직접 클릭시 -> 좌측 메뉴가 갱신되지 않음.
    this.handleRenderMenu();

    // console.log(currMenuData);
    const origMenu =
      !!currMenuData &&
      currMenuData.map(item1 => (
        <Menu key={item1.MenuName}>
          {item1.data.map(item2 => {
            if (item2.Link) {
              return <MenuLeaf key={item2.MenuName} label={item2.MenuName} url={item2.Link} isTopMenu />;
            }
            return (
              <MenuFolder icon={item2.Icon} label={item2.MenuName} key={item2.MenuName}>
                {item2.data.map(item3 => (
                  <MenuLeaf key={item3.MenuName} label={item3.MenuName} url={item3.Link} />
                ))}
              </MenuFolder>
            );
          })}
        </Menu>
      ));

    // 1Lv 메뉴 Sample (Client)
    const clientMenu = (
      <Menu>
        <MenuLeaf label="Dashboard" url="/app/main" isTopMenu />
        <MenuFolder label="Component 2차 잔여">
          <MenuLeaf label="Agenda" url="/app/ComponentsTest2/AgendaTest" />
          <MenuLeaf label="UserRating" url="/app/ComponentsTest2/UserRatingTest" />
          <MenuLeaf label="Etc" url="/app/ComponentsTest2/EtcTest" />
        </MenuFolder>
        <MenuLeaf label="자문 조회" url="/app/CaseList?caseType=A" isTopMenu />
        <MenuFolder label="Components">
          <MenuLeaf label="Table" url="/app/ComponentsTest/TableTest" />
          <MenuLeaf label="Etc" url="/app/ComponentsTest/EtcTest" />
        </MenuFolder>
      </Menu>
    );

    return (
      <CustomScrollbars className="scrollbar">
        <ul className="header-notifications list-inline" key="userInfo">
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
          {/* 아래 내용은 삭제 금지, Language 모두 적용될때 활성화 할 예정  */}
          {/* <li className="list-inline-item user-setting">
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
          </li> */}
          <li className="list-inline-item user-setting">
            <Dropdown className="quick-menu" toggle={() => changeSettingValues({ name: 'drawerStatus', value: true })}>
              <DropdownToggle className="d-inline-block" tag="span" data-toggle="dropdown">
                <div className="d-flex align-items-center pointer pt-1">
                  <i className="zmdi zmdi-settings zmdi-hc-fw" />
                </div>
              </DropdownToggle>
            </Dropdown>
          </li>
        </ul>
        {checkFakeAPI() ? clientMenu : origMenu}
        {/* 스크롤이 하단까지 내려가지 않는 이슈로 인해 비어있는 div 추가함. */}
        <div style={{ height: '100px' }}>&nbsp;</div>
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = ({ common, router, auth, settings }) => {
  const { locale, navigationStyle, settingIconHide } = settings;
  const { allCodes, myRoleArr, allErrorOn, isMC_MyCompanyMode, sideMenuList } = common;
  const { authUser } = auth;
  const { location } = router;
  return {
    allCodes,
    myRoleArr,
    allErrorOn,
    location,
    authUser,
    isMC_MyCompanyMode,
    locale,
    navigationStyle,
    settingIconHide,
    sideMenuList,
  };
};

export default connect(
  mapStateToProps,
  { switchLanguage, changeSettingValues },
)(withRouter(SidenavContent));
