"use client"
import {configureStore} from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { jobApi } from "./service/jobData"
import userReducer from "./service/userSlice"


export const store=configureStore({
    reducer:{
[jobApi.reducerPath]:jobApi.reducer,
user:userReducer
    },
    
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(jobApi.middleware)

})

export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch)