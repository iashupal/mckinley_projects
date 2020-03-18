import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import '../styles/navbar.css';
import CompanyLogo from './CompanyLogo';
import NavbarItem from './NavbarItem';
import FlatAction from './FlatAction';
import NavbarMenuModal from './NavbarMenuModal';

class Navbar extends Component {
  static menuItems = ['About', 'Team', 'Careers', 'News', 'Contact'].map(
    (title, i) => ({ id: i, title, href: title.toLowerCase() }),
  )

  constructor(props) {
    super(props);
    this.state = {
      showMenuModal: false,
    };

    this.openMenuModal = this.openMenuModal.bind(this);
    this.closeMenuModal = this.closeMenuModal.bind(this);
  }

  openMenuModal() {
    this.setState({ showMenuModal: true });
  }

  closeMenuModal() {
    this.setState({ showMenuModal: false });
  }

  render() {
    const { showMenuModal } = this.state;
    const { transparent, noContact } = this.props;
    return (
      <Fragment>
        <CompanyLogo />
        <div className={`navbar ${transparent ? 'navbar--transparent' : ''}`}>
          <div className="navbar__item-container">
            {Navbar.menuItems.map(({ id, title, href }) => (
              <NavbarItem key={id} title={title} href={`/${href}`} />
            ))}
          </div>
          {!noContact ? (
            <div className="navbar__contact">
              Want to learn more?{' '}
              <Link href="/contact">
                <FlatAction primary>Let&apos;s Talk</FlatAction>
              </Link>
            </div>
          ) : (
            ''
          )}
          <button
            type="button"
            className="navbar__menu"
            onClick={this.openMenuModal}
          >
            Menu +
          </button>
        </div>
        {showMenuModal ? (
          <NavbarMenuModal onExit={this.closeMenuModal} />
        ) : (
          ''
        )}
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  transparent: PropTypes.bool,
  noContact: PropTypes.bool,
};

Navbar.defaultProps = {
  transparent: false,
  noContact: false,
};

export default Navbar;
