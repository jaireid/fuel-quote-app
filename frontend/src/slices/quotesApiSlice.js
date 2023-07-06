import { apiSlice } from "./apiSlice";

// Base URL for the quotes API
const QUOTES_URL = "/api/quotes";

// Inject quotes endpoints
export const quotesApiSlice = apiSlice.injectEndpoints({
  // Create quote endpoint
  endpoint: (builder) => ({
    // Query function for the create quote endpoint
    create: builder.mutation({
      query: (data) => ({
        url: `${QUOTES_URL}`, // Set the URL for the create quote endpoint
        method: "POST", // Set the HTTP method to "POST"
        body: data, // Set the request body to the provided data
      }),
    }),
  }),
});

export const { createQuoteMutation } = quotesApiSlice;
