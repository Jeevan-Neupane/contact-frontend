import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    all_contacts: [],
    edit_contacts: null,
    view: 'list',
    order: '',
    filter_contacts: [],
    searchQuery: '',
}


const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContacts: (state, action) => {
            state.all_contacts = [...action.payload];
            state.filter_contacts = [...action.payload];
        },

        addContact: (state, action) => {

            state.filter_contacts = [action.payload, ...state.filter_contacts]
            state.all_contacts = [action.payload, ...state.all_contacts];

        },
        addEditContact: (state, action) => {
            state.edit_contacts = action.payload;
        },

        saveEditContact: (state, action) => {
            const editedContact = state.filter_contacts.map((contact) => {
                if (contact._id === action.payload._id) {
                    return action.payload;
                } else {
                    return contact;
                }
            })
            state.filter_contacts = [...editedContact];
        },

        removeContact: (state, action) => {
            const filterContacts = state.all_contacts.filter((contact) => {
                return contact._id !== action.payload;
            })

            state.filter_contacts = [...filterContacts];
            state.all_contacts = [...filterContacts];
        },
        changeView: (state, action) => {
            state.view = action.payload;
        },
        setSortingOrder: (state, action) => {
            state.order = action.payload;
        },
        sortContacts: (state, action) => {
            let sortedData;
            const { filter_contacts, order } = state;
            let tempSortProducts = [...filter_contacts];
            const sortFunction = (a, b) => {
                if (order === 'a-z') {
                    return a.firstName.localeCompare(b.firstName);
                }
                if (order === 'z-a') {
                    return b.firstName.localeCompare(a.firstName);
                }
            }

            sortedData = tempSortProducts.sort(sortFunction);
            state.filter_contacts = sortedData;


        },
        searchProducts: (state, action) => {
            let tempFilter = state.all_contacts;
            tempFilter = tempFilter.filter((contact) => {
                const regex = new RegExp(`${action.payload}`, 'gi');
                return contact.firstName.match(regex) || contact.middleName.match(regex) || contact.lastName.match(regex) || contact.phone.match(regex);



            })
            state.filter_contacts = tempFilter;



        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        removeContacts: (state, action) => {
            state.filter_contacts = [];
            state.all_contacts = [];
        }
    }
})

export default contactSlice.reducer;
export const { addContacts, addContact, removeContact, addEditContact, removeContacts, saveEditContact, changeView, searchProducts, setSortingOrder, sortContacts, setSearchQuery } = contactSlice.actions;