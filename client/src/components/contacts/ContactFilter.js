import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  // form created with react useRef
  const filterText = useRef('');


  useEffect(() => {
    if (filtered === null) {
      filterText.current.value = "";
    }
  });

  const onChange = (e) => {
    e.preventDefault();
    // get the value of input field with useRef
    if (filterText.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  const onClear = (e) => {
    e.preventDefault();
    clearFilter();
    filterText.current.value = "";
  };

  return (
    <form>
      <input
        onChange={onChange}
        ref={filterText}
        type="text"
        placeholder="Filter contacts by name / email..."
      />
      {filterText.current.value && (
        <button onClick={onClear} className="btn btn-light">
          Clear
        </button>
      )}
    </form>
  );
};

export default ContactFilter;
