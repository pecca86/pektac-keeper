import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  // ALERT STATE
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // AUTH STATE
  const authContext = useContext(AuthContext);
  const {
    error,
    clearErrors,
    isAuthenticated,
    loadUser,
    loginUser,
  } = authContext;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    } else if (isAuthenticated) {
      setAlert(`Welcome back, ${user.email}`, "success", 5000);
      // redirect to user homepage
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  // const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })
  const onChange = (e) => {
    return setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(user)
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
