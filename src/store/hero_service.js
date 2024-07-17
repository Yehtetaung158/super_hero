import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heroApi = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://www.superheroapi.com/api.php/47b96e7a833356ceade78a043ca6a9a7/",
  }),
  endpoints: (builder) => ({}),
});
