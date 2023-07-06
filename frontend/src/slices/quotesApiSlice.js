import { apiSlice } from "./apiSlice";

// Base URL for the quotes API
const QUOTES_URL = "/api/quotes";

// Inject quotes endpoints
export const quoteApiSlice = apiSlice.injectEndpoints({
  // Create quote endpoint
  endpoints: (builder) => ({
    // Query function for the create quote endpoint
    createQuote: builder.mutation({
      query: (data) => ({
        url: `${QUOTES_URL}`, // Set the URL for the endpoint
        method: "POST", // Set the HTTP method
        body: data, // Set the request body to the provided data
      }),
    }),
    // Query function for the get user quotes endpoint
    getUserQuotes: builder.query({
      query: (userId) => ({
        url: `${QUOTES_URL}/user/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateQuoteMutation, useGetUserQuotesQuery } = quoteApiSlice;
