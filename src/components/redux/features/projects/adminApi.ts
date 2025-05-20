import { baseApi } from "../../api/baseApi";

const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProjects: builder.query({
      query: () => ({
        url: `/projects`,
        method: "GET",
      }),
    }),
    getProject: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllProjectsQuery, useGetProjectQuery } = projectsApi;
