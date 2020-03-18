import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import { ABOVE_THE_HEADER, BELOW_THE_HEADER, HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import ColorOption from 'containers/Customizer/ColorOption';
import { isIOS, isMobile } from 'react-device-detect';
import TopNav from 'components/TopNav';
import { handleGetAllCodes } from 'actions/Default/Common';
import { changeSettingValues } from 'actions/Default/Setting';
import { NotificationContainer } from 'react-notifications';
import AlertDialog from 'components/AlertDialog';
import ErrorBoundary from 'components/ErrorBoundary';
import Moment from 'moment';
import UrlMapping from './UrlMapping';

Moment.locale('ko');

class App extends React.Component {
  componentDidMount() {
    const { handleGetAllCodes } = this.props;
    handleGetAllCodes();
  }

  render() {
    const { match, navigationStyle, horizontalNavPosition, drawerStatus, changeSettingValues } = this.props;

    // set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height');
    } else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height');
    }

    return (
      <div className="app-container permanent">
        <Sidebar />
        <div className="app-main-container">
          <div className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER && (
              <TopNav styleName="app-top-header" />
            )}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>
          <main className="app-main-content-wrapper">
            <div className="app-main-content" style={{ backgroundColor: '#F5F5F5' }}>
              <ErrorBoundary>
                <UrlMapping match={match} />
              </ErrorBoundary>
            </div>
            <Footer />
          </main>
        </div>
        <NotificationContainer />
        <AlertDialog />
        <ColorOption
          drawerStatus={drawerStatus}
          changeDrawerStatus={val => changeSettingValues({ name: 'drawerStatus', value: val })}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { navigationStyle, horizontalNavPosition, drawerStatus } = settings;
  return {
    navigationStyle,
    horizontalNavPosition,
    drawerStatus,
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { handleGetAllCodes, changeSettingValues },
  )(App),
);
