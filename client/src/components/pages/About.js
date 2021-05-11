import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const About = () => {
  // we need to call load user in order for the user to stay inside the app state
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  return (
    <div className="container">
      <h1 className="my-1">About</h1>
      <h4>Pektac-keeper - keeps you connected.</h4>
      <p>&copy; Pekka Ranta-aho 2021</p>
      <p className="bg-light p my-1">
        <strong>Version: </strong> 1.0
      </p>
    </div>
  );
};

export default About;
