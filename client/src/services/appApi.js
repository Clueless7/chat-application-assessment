import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),

  endpoints: (builder) => ({
    // signup
    signupUser: builder.mutation({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),

    // login
    loginUser: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),

    // logout
    logoutUser: builder.mutation({
      query: (payload) => ({
        url: '/logout',
        method: 'DELETE',
        body: payload,
      }),
    }),
  }),
})

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = appApi

export default appApi
