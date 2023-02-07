import { IPost } from './../models/IPost'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => {
    return {
      fetchAllPosts: build.query<IPost[], number>({
        query: (limit: number = 5) => {
          return {
            url: `/posts`,
            params: {
              _limit: limit,
            },
          }
        },
        providesTags: (result) => ['Post'],
      }),
      createPost: build.mutation<IPost, IPost>({
        query: (post) => {
          return {
            url: `/posts`,
            method: 'POST',
            body: post,
          }
        },
        invalidatesTags: ['Post'],
      }),
      updatePost: build.mutation<IPost, IPost>({
        query: (post) => {
          return {
            url: `/posts/${post.id}`,
            method: 'PUT',
            body: post,
          }
        },
        invalidatesTags: ['Post'],
      }),
      deletePost: build.mutation<IPost, IPost>({
        query: (post) => {
          return {
            url: `/posts/${post.id}`,
            method: 'DELETE',
            body: post,
          }
        },
        invalidatesTags: ['Post'],
      }),
    }
  },
})
