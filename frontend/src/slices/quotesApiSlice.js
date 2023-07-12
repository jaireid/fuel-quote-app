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
  }),
});

export const { useCreateQuoteMutation, useGetUserQuotesQuery } = quoteApiSlice;
