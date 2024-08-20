import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import  CredentialsProvider  from "next-auth/providers/credentials"
import { Provider } from "react-redux"

import { UserResponse } from "./type"


if (!process.env.GOOGLE_ID || !process.env.GOOGLE_Secret) {
  throw new Error("Missing GOOGLE_ID or GOOGLE_SECRET environment variables");
}

export const options:NextAuthOptions={
    providers:[
       
            GoogleProvider({
                clientId:process.env.GOOGLE_ID  ,
                clientSecret:process.env.GOOGLE_Secret,

          
        }),
        CredentialsProvider({
          name:"credentials",
          credentials:{
            email:{label:"Email",type:"email",placeholder:"Enter your email"},
            password:{label:"Password",type:"password",placeholder:"Enter your email password"}
          },
          async authorize(credentials, req) {
            const res = await fetch('https://akil-backend.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password
                })
            });

            const user = await res.json();

            if (res.ok && user) {
                return user;
            }
            return null;
        }
        })],
        pages:{
          signIn:"/api/signIn"
        },
        callbacks: {
          async jwt({ token, user }) {
            
            if (user) {
              const res=user as unknown as UserResponse
              if(res.data){

             
              token.accessToken = res.data.accessToken;
              token.refreshToken = res.data.refreshToken;
              token.role = res.data.role;
              token.profileComplete = res.data.profileComplete;
            } }

            return token;
          },
          async session({ session, token }) {
            console.log("two",token)

            if (typeof token.accessToken === 'string') {
              session.accessToken = token.accessToken;
            }
            if (typeof token.refreshToken === 'string') {
                session.refreshToken = token.refreshToken;
              }

              if (typeof token.role === 'string') {
                session.user.role = token.role;
              }

              if (typeof token.profileComplete === 'boolean') {
                session.user.profileComplete = token.profileComplete;
              }
                        return session;
                      },
                    },
}