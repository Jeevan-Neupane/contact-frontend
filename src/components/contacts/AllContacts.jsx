import React from "react";
import { AllContactsContainerDiv, AllContactsDiv, TopHeader } from "./style";
import { useSelector } from "react-redux";
import ContactInfo from "../contactInfo/ContactInfo";
import SearchBar from "../search/SearchBar";
import NoContacts from "../NoContacts/NoContacts";

function AllContacts() {
  const allContacts = useSelector((state) => {
    return state.contacts.filter_contacts;
  });
  const view = useSelector((state) => state.contacts.view);
  return (
    <AllContactsContainerDiv >
      <TopHeader>
        <h1>All Contacts</h1>
        <SearchBar />
      </TopHeader>
      {allContacts.length === 0 ? (
        <NoContacts />
      ) : (
        <AllContactsDiv view={view}>
          {allContacts?.map((contact) => {
            return (
              <ContactInfo
                key={contact._id.toString()}
                user={contact}
              />
            );
          })}
        </AllContactsDiv>
      )}
    </AllContactsContainerDiv>
  );
}

export default AllContacts;
