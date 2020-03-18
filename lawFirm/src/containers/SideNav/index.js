import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { toggleCollapsedNav, updateWindowWidth } from 'actions/Default/Setting';
import { handleProfileDialogOpen } from 'actions/Default/Common';
import { LoadingBox } from 'helpers/ui';
import SidenavContent from './SidenavContent';
import ProfileDialog from './ProfileDialog';

class SideNav extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth(window.innerWidth);
    });
  }

  onToggleCollapsedNav = e => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  render() {
    const {
      navCollapsed,
      drawerType,
      width,
      navigationStyle,
      isProfileOpen,
      isLoading,
      handleProfileDialogOpen,
    } = this.props;

    const drawerStyleTemp = drawerType.includes(COLLAPSED_DRAWER) ? '' : 'd-flex';
    let drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-xl-flex' : drawerStyleTemp;
    let type = 'permanent';
    if (drawerType.includes(COLLAPSED_DRAWER) || (drawerType.includes(FIXED_DRAWER) && width < 1200)) {
      type = 'temporary';
    }

    if (navigationStyle === HORIZONTAL_NAVIGATION) {
      drawerStyle = '';
      type = 'temporary';
    }
    // type = 'permanent';

    return (
      <div className={`app-sidebar d-none ${drawerStyle}`}>
        <Drawer
          className="app-sidebar-content"
          variant={type}
          open={type.includes('temporary') ? navCollapsed : true}
          onClose={this.onToggleCollapsedNav}
          classes={{
            paper: 'side-nav',
          }}
        >
          <SidenavContent />
        </Drawer>
        <LoadingBox isLoading={isLoading} />
        <ProfileDialog isOpen={isProfileOpen} handleClose={e => handleProfileDialogOpen(false)} />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, common }) => {
  const { navCollapsed, drawerType, width, navigationStyle } = settings;
  const { isLoading, isProfileOpen } = common;

  return {
    navCollapsed,
    drawerType,
    width,
    navigationStyle,
    isLoading,
    isProfileOpen,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      toggleCollapsedNav,
      updateWindowWidth,
      handleProfileDialogOpen,
    },
  )(SideNav),
);
