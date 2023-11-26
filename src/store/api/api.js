import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://contact-backend.up.railway.app/api'
    }),
    endpoints(builder) {
        return {
            registerUser: builder.mutation({
                query: (formData) => {
                    return {
                        url: '/auth/register',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: formData
                    }
                }
            }),
            getUser: builder.query({
                query: (token) => {
                    return {
                        url: '/auth',
                        method: "GET",
                        headers: {
                            'x-auth-token': token
                        }
                    }
                }
            }),
            loginUser: builder.mutation({
                query: (formData) => {
                    return {
                        url: '/auth/login',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: formData
                    }
                }
            }),

            postContact: builder.mutation({
                query: ({ contactData, token }) => {
                    return {
                        url: '/person',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': token
                        },
                        body: contactData
                    }
                }
            }),
            getContacts: builder.query({
                query: (token) => {
                    return {
                        url: '/person',
                        method: 'GET',
                        headers: {
                            'x-auth-token': token
                        }
                    }
                }
            }),
            deleteContacts: builder.mutation({
                query: ({ token, id }) => {
                    return {
                        url: `/person/${id}`,
                        method: 'DELETE',
                        headers: {
                            'x-auth-token': token
                        }
                    }
                }
            }),
            editContact: builder.mutation({
                query: ({ token, id, editInfo }) => {
                    return {
                        url: `/person/${id}`,
                        method: 'PUT',
                        headers: {
                            'x-auth-token': token
                        },
                        body: editInfo

                    }



                }
            })
        }
    }
})




export const { useRegisterUserMutation, useGetUserQuery, useLoginUserMutation, usePostContactMutation, useGetContactsQuery, useDeleteContactsMutation, useEditContactMutation } = api;