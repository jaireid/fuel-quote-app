import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base query configuration with an empty base URL
const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Quote"],
  endpoints: (builder) => ({}),
});
