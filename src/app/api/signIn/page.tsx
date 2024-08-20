"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn ,useSession} from "next-auth/react";
import { useRouter ,useSearchParams} from "next/navigation";


type FormValues = {
  email: string;
  password: string;
};

const signin = () => {
  const { data: session } = useSession();
  const router=useRouter()
  const searchParams=useSearchParams()
  const callbackUrl=searchParams.get("callbackUrl") || "/"
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

if(session){
  router.push(callbackUrl)
}

  const onSubmit = async (data: FormValues) => {

   const result= await signIn("credentials",{
      redirect:false,
      email:data.email,
      password:data.password
    })
    if (result?.error){
      console.log("error",result.error)
    }else{
      router.push(callbackUrl)
    }
  };

  return (
    <form
      className="w-[408px] mx-auto mt-20"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <p className="font-Poppins font-black text-[32px] leading-[38.4px] text-center mb-10">
        Welcome Back ,
      </p>
      <div className="flex justify-between">
        <div className="w-[109px] border-1 border-[#D6DDEB]"></div>
        <div className="w-[109px] border-1 border-[#D6DDEB]"></div>
      </div>
      <label htmlFor="email" className="block label mt-5">
        Email Address
      </label>
      <input id="email" placeholder="Enter email address" className="input" 
      {...register("email",{pattern:{
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message:"invalid email address"
    },required:{value:true,
        message:"Email is required"
    }})}/>
            <p className="error">{errors.email?.message}</p>

      <label htmlFor="password" className="block label">
        Password
      </label>
      <input id="password" placeholder="Enter password" className="input" 
      {...register("password",{required:{value:true,message:"Password is requred"}})}/>
              <p className="error">{errors.password?.message}</p>

      <button className=" block btn bg-[#4640DE] w-full text-white py-3 px-6 my-7">
        Login
      </button>
      <div className="flex gap-3">
        <p>Don't have an account?</p>{" "}
        <Link href="/api/signup" className="text-[#4640DE] font-semibold text-base">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default signin;
