import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://geektrust.s3-ap-southeast-1.amazonaws.com",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/adminui-problem/members.json",
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
