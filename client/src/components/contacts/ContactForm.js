import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, updateContact, setCurrent, clearCurrent } = contactContext;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
    // when the contact context / current value is changed, this will trigger
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      // copy what's currently in the state
      ...contact,
      // Add changes according to the input's name attribute and the input value
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // ContactState method
    if (current) {
      updateContact(contact);
      setCurrent(contact);
    } else {
      addContact(contact);
      // empty form
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  };

  const clearAll = e => {
    e.preventDefault()
    clearCurrent()
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Update contact" : "Add contact"}
      </h2>
      <input
        type="text"
        name="name"
        id=""
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        id=""
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        id=""
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? "Update contact" : "Add contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button onClick={clearAll} className="btn btn-light btn-block">
            Finish editing
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
