import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import '../styles/navbar-menu-modal.css';

const items = ['About', 'Team', 'Careers', 'News', 'Contact'].map(title => (
  <Link href={`/${title.toLowerCase()}`}>
    <span className="navbar-menu-modal__item">{title}</span>
  </Link>
));

function NavbarMenuModal({ onExit }) {
  return (
    <div className="navbar-menu-modal">
      <button type="button" className="navbar-menu-modal__close-btn" onClick={onExit}>
        Close -
      </button>
      {items}
    </div>
  );
}

NavbarMenuModal.propTypes = {
  onExit: PropTypes.func.isRequired,
};

export default NavbarMenuModal;
