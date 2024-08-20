"use client"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobPosting } from "../types/jobPosting";

interface reponse {
  message:string
  success:boolean
  data:JobPosting[]
  errors:any
  count:number
}

interface responseForSpecific {
  message:string
  success:boolean
  data:JobPosting
  errors:any
  count:number
}


export const jobApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
  endpoints: (builder) => ({
    getAllOpportunity: builder.query<reponse, void>({
      query: () => "opportunities/search",
    }),
    getSpecificOpportunity: builder.query<responseForSpecific, string>({
      query: (id: string) => `opportunities/${id} `,
    }),
  }),
});

export const {useGetAllOpportunityQuery,useGetSpecificOpportunityQuery}=jobApi
