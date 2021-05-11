import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser, user } = authContext;

  const onLogout = () => {
    logoutUser();
  };

  // Links that are displayed if a user is logged in
  const authLinks = (
    <Fragment>
      <h1>
        <i className={props.icon} /> <Link to="/">{props.title}</Link>
      </h1>
      <ul>
        <li>
          <a onClick={onLogout} href="#!">
            Logout ({user && user.user.name})
          </a>
        </li>
      </ul>
    </Fragment>
  );

  // Links that guests see
  const guestLinks = (
    <Fragment>
      <h1>
        <i className={props.icon} /> <Link to="/">{props.title}</Link>
      </h1>
      <ul>
        <li>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <nav className="navbar bg-primary">
      {isAuthenticated ? authLinks : guestLinks}
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
