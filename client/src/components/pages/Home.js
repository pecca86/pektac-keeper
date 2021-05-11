import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  // we need to call load user in order for the user to stay inside the app state
  const authContext = useContext(AuthContext);
  const { loadUser, token } = authContext;

  // make this run as soon as the component loads
  useEffect(() => {
    if (token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []); // empty bracket makes this run just once

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
