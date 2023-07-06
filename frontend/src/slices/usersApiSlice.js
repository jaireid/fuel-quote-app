import { apiSlice } from "./apiSlice";

// Base URL for the users API
const USERS_URL = "/api/users";

// Inject users endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  // Login endpoint
  endpoint: (builder) => ({
    login: builder.mutation({
      // Query function for the login endpoint
      query: (data) => ({
        url: `${USERS_URL}/auth`, // Set the URL for the login endpoint
        method: "POST", // Set the HTTP method to "POST"
        body: data, // Set the request body to the provided data
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;