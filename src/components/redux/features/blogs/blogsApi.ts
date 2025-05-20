import { baseApi } from "../../api/baseApi";

const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBlogs: builder.query({
      query: () => ({
        url: `/blogs`,
        method: "GET",
      }),
    }),
    getBlogs: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllBlogsQuery, useGetBlogsQuery } = blogsApi;
