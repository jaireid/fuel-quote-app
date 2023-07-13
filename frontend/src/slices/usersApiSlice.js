import { apiSlice } from "./apiSlice";

// Base URL for the users API
const USERS_URL = "/api/users";

// Inject users endpoints
export const userApiSlice = apiSlice.injectEndpoints({
  // Login endpoint
  endpoints: (builder) => ({
    // Query function for the register endpoint
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // Set the URL for the endpoint
        method: "POST", // Set the HTTP method
        body: data, // Set the request body to the provided data
      }),
    }),
    login: builder.mutation({
      // Query function for the login endpoint
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    // Query function for the update user endpoint
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    // Query function for the logout endpoint
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    // Query function for the get user quotes endpoint
    quotes: builder.query({
      query: (_, userId) => `${USERS_URL}/${userId}/quotes`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useLogoutMutation,
  useQuotesQuery,
} = userApiSlice;
