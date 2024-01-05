import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
  baseUrl: '/api', 
  prepareHeaders: (headers, {method})=>{
  headers.set('Contant-Type', 'application/json');
  return headers
  }}),

  endpoints: (builder) => ({
    addNotes: builder.mutation({
      query: (newItems) => ({
          url: 'notes',
          method: 'POST',
          body: newItems,
          responseHandler: (response) => {
            return response.text()
          }
      }),
      onError:  (error)=>{
        throw error;
      }
    }),
    getNotesByID: builder.query({
      query: (id) => ({
        url: `notes/${id}`,
        method:"GET"
      }),
    }),
    getAllNotes: builder.query({
      query: () => 'notes'
    }),
    updateNotes: builder.mutation({
      query: (id) => {
        console.log("ID coming:", id);
        return {
          url: `notes/${id}`,
          method: "PATCH",
        };
      },
    }),
    deleteNotes: builder.mutation({
      query: (id) => ({
        url: `notes/${id}`,
        method:"DELETE"
      }),
    }),
  }),
});

export const {
  useAddNotesMutation,
  useGetAllNotesQuery,
  useUpdateNotesMutation,
  useDeleteNotesMutation,
  useGetNotesByIDQuery
} = userApi;
