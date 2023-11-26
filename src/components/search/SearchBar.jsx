import React, { useState } from "react";
import {
  BarContainer,
  FilterDiv,
  IconButton,
  Options,
  Search,
  SearchBarDiv,
  Select,
  SelectDiv,
  ViewDiv,
} from "./style";
import { FaTh, FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  changeView,
  searchProducts,
  setSearchQuery,
  setSortingOrder,
  sortContacts,
} from "../../store/store";

function SearchBar() {
  const dispatch = useDispatch();
  const view = useSelector((state) => {
    return state.contacts.view;
  });
  const searchValue = useSelector((state) => {
    return state.contacts.searchQuery;
  });
  const options = [
    {
      name: "Select Order",
      value: "order",
      id: 0,
    },
    {
      name: "a-z",
      value: "a-z",
      id: 1,
    },

    {
      name: "z-a",
      value: "z-a",
      id: 2,
    },
  ];

  const arrangeOrder = (e) => {
    dispatch(setSortingOrder(e.target.value));
    dispatch(sortContacts());
  };
  const searchContacts = (e) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(searchProducts(e.target.value));
    dispatch(sortContacts());
  };
  return (
    <BarContainer>
 
      <SearchBarDiv>
        <Search
          type='text'
          placeholder='Enter name...'
          onChange={searchContacts}
          value={searchValue}
        />
      </SearchBarDiv>

      <FilterDiv>
        <ViewDiv>
          <IconButton
            onClick={() => {
              dispatch(changeView("list"));
            }}
            highlight={view === "list" ? "yes" : "no"}
          >
            <FaList />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(changeView("grid"));
            }}
            highlight={view !== "list" ? "yes" : "no"}
          >
            <FaTh />
          </IconButton>
        </ViewDiv>
        <SelectDiv>
          <Select onChange={arrangeOrder}>
            {options.map((option) => {
              return (
                <Options
                  key={option.id}
                  value={option.value}
                >
                  {option.name}
                </Options>
              );
            })}
          </Select>
        </SelectDiv>
      </FilterDiv>
    </BarContainer>
  );
}

export default SearchBar;
