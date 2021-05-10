import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = (e) => {
    e.preventDefault();
    // prop contact
    deleteContact(contact.id);
    // Clear current user from current state
    clearCurrent();
  };

  const onEdit = (e) => {
    e.preventDefault();
    setCurrent(contact);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primart text-left">
        {contact.name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge" +
            (contact.type === "professional"
              ? " badge-success"
              : " badge-primary")
          }
        >
          {contact.type}
        </span>
      </h3>
      <ul className="list">
        {contact.email && (
          <li>
            <i className="fas fa-envelope-open">
              {"  "}
              {contact.email}
            </i>
          </li>
        )}
        {contact.phone && (
          <li>
            <i className="fas fa-phone">
              {"  "}
              {contact.phone}
            </i>
          </li>
        )}
      </ul>
      <button onClick={onEdit} className="btn btn-dark btn-sm">
        Edit
      </button>
      <button onClick={onDelete} className="btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
