import React from "react";
import { HomeLeftDiv, HomePageMain, HomeRightDiv } from "../styles/Container";
import ContactAddForm from "../components/contact/ContactForm";
import AllContacts from "../components/contacts/AllContacts";
import { useSelector } from "react-redux";
import LoginWarn from "../components/LoginWarning/LoginWarn";
import AddContact from "../components/AddContact/AddContact";

function HomePage() {
  const user = useSelector((state) => state.user.user);
  return (
    <HomePageMain>
      <HomeLeftDiv>
        <ContactAddForm />
      </HomeLeftDiv>
      <HomeRightDiv id='allContacts'>
        {user ? <AllContacts /> : <LoginWarn />}
      </HomeRightDiv>

      <AddContact />
    </HomePageMain>
  );
}

export default HomePage;
