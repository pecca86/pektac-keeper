import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 4,
        name: "lort",
        email: "lortakakka@k.com",
        phone: "222-222-222",
        type: "professional",
      },
    ],
    // in here we put the data of the contact we want to edit
    current: null,
    // for filtering contacts, here comes the array of the filtered contacts
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = (contact) => {
    contact.id = Math.floor(Math.random() * 1000);
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete contact
  const deleteContact = (contactId) => {
    dispatch({ type: DELETE_CONTACT, payload: contactId });
  };

  // Set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // filter contacts
  const filteredContacts = (filterText) => {
    dispatch({ type: FILTER_CONTACTS, payload: filterText });
  };

  // clear filters
  const clearFilters = () => {
    dispatch({type: CLEAR_FILTER})
  }

  // Return a provider in which we wrap our application inside of in app.js
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filteredContacts,
        clearFilters
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
