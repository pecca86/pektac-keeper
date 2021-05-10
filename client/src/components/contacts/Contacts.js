import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import ContactFilter from "./ContactFilter";

const Contacts = () => {
  //initialize the context of this component
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;


  return (
    <Fragment>
      <ContactFilter />
      {filtered
        ? filtered.map((contact) => (
            <h4>
              <ContactItem key={contact.id} contact={contact} />
            </h4>
          ))
        : contacts.map((contact) => (
            <h4>
              <ContactItem key={contact.id} contact={contact} />
            </h4>
          ))}
    </Fragment>
  );
};

export default Contacts;
