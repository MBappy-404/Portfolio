import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: (messageData) => ({
        url: `/message/create-message`,
        method: "POST",
        body: messageData,  // Send the message data here
      }),
    }),
  }),
});

export const { useAddMessageMutation } = contactApi;
