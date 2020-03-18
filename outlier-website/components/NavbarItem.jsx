import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

function NavbarItem({ router, title, href }) {
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      className={`navbar__item ${router.pathname === href ? 'navbar__item--active' : ''}`}
      onClick={handleClick}
    >
      {title}
    </a>
  );
}

NavbarItem.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default withRouter(NavbarItem);
