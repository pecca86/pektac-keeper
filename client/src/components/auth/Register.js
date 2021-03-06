import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  // ALERT STATE
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // AUTH STATE
  const authContext = useContext(AuthContext);
  const { registerUser, error, clearErrors, isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    if (error === "Key / field value already taken.") {
      setAlert("Email already registered!", "danger");
      clearErrors();
    } else if (isAuthenticated) {
      setAlert("Registered successfully!", "success", 5000);
      // redirect to user homepage
      props.history.push('/')
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  // const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })
  const onChange = (e) => {
    return setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (checkIfPasswordMaches()) {
      registerUser(user);
      loadUser()
    } else {
      setAlert("Please check password", "danger");
    }
  };

  // Checks if password is confirmed correctly
  const checkIfPasswordMaches = () => {
    if (password !== password2) {
      return false;
    }
    return true;
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="5"
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
