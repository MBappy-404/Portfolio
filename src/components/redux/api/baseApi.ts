// services/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: `https://my-server-sjb.vercel.app/api`,
  credentials: "include",
  
}); 

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    'projects'
  ],
  endpoints: () => ({}),
});
