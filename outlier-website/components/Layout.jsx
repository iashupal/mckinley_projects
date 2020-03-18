import React, { Fragment } from 'react';

// Import libraries
import PropTypes from 'prop-types';

// Import components
import Footer from './Footer';

import '../styles/global.css';
import Header from './Header';

function Layout({
  children,
}) {
  return (
    <Fragment>
      {/* <Navbar transparent={isTransparentNav} noContact={hasNoContact} />
      {!hideHero && <TextHero compact={isCompact}>{heroText}</TextHero>}
      {children} */}
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};



export default Layout;
