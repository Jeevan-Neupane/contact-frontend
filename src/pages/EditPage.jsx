import React from "react";
import { useSelector } from "react-redux";
import { EditPageDiv } from "../styles/Container";
import ContactAddForm from "../components/contact/ContactForm";

function EditPage() {
  const editContact = useSelector((state) => {
    return state.contacts.edit_contacts;
  });

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 2);

  return (
    <EditPageDiv>
      <h1>Edit Form</h1>
      <ContactAddForm editContact={editContact} />
    </EditPageDiv>
  );
}

export default EditPage;
