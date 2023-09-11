import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



export const recordApi = createApi({
  reducerPath: 'recordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api',
    credentials: 'include',
    fetchFn: async url => {
      const options = {
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }

      return fetch(url, options)
    },
  }),
  endpoints: builder => ({
    record: builder.mutation<unknown, {data: string}>({
      query: body => {
        return {
        url: '/upload',
        method: 'POST',
        body,
      }
    },
    }),
  }),
})

export const {
  useRecordMutation
}=recordApi
