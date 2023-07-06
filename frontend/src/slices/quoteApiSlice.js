import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const quoteApiSlice = createApi({
  baseQuery,
  tagTypes: ["Quote"],
  endpoints: (builder) => ({}),
});
