import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'

const Navbar = ({ title, icon }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} /> <Link to='/'>{title}</Link>
      </h1>
      <ul>
          <li>
              <Link to="/about">About</Link>
          </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Pektac-keeper",
  icon: "fas fa-id-card-alt",
};
export default Navbar;
