import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     
    addMessage: builder.mutation({
      query: () => ({
        url: `/message/create-message`,
        method: "GET",
      }),
    }),
  }),
});

export const {  useAddMessageMutation  } = contactApi;
