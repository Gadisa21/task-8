// app/signup/page.tsx
"use client";
import { useForm } from "react-hook-form";
import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import icon from "./google.png";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setUserInfo } from "../../service/userSlice";
import { useDispatch, UseDispatch,useSelector } from "react-redux";
import { RootState } from "../../store";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role:string
};

const SignupPage = () => {
  const dispatch=useDispatch()
  const user=useSelector((state:RootState)=>state.user)
  const form = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState,reset } = form;
  const { errors } = formState;
  const router=useRouter()

  const onSubmit = async (data: FormValues) => {
    
    
    data.role="student"
 
   
    try {
      reset()
      dispatch(setUserInfo({name:data.name,email:data.email}))
      // console.log(user)
  
      const response=await axios.post("https://akil-backend.onrender.com/signup",data)
      router.push("/api/verifyEmail")
      if(response.data.success){
       console.log(response)
        router.push("/api/verifyEmail")
      }else{
        setErrorMessage(response.data.message);
      }

    } catch (error) {
      console.log(error)
      setErrorMessage('An error occurred. Please try again.');
    }
    
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <form
      className="w-[408px] mx-auto mt-10"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <p className="font-Poppins font-black text-[32px] leading-[38.4px] text-center">
        Sign Up Today!
      </p>
      <div className="flex  gap-3 justify-center items-center border-1 border-[#CCCCF5] rounded-md py-3 px-4 my-5">
        <Image
          src={icon}
          width={20}
          height={20}
          alt="icon"
          className="w-[20px] h-[20px]"
        />
        <button
          type="button"
          className="text-[#4640DE] font-epilogue font-bold text-[16px] leading-[25.6px] "
          onClick={handleGoogleSignIn}
        >
          Sign Up with Google
        </button>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-[108px] border-b border-[#D6DDEB]"></div>
        <p className="font-epilogue font-normal text-base text-[rgb(167,168,173)]">
          Or sign up with Email
        </p>
        <div className="w-[108px] border-b border-[#D6DDEB]"></div>
      </div>
      <label htmlFor="name" className="label">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        placeholder="Enter your full name"
        className="input"
        {...register("name", {
          required: { value: true, message: "Name field is required" },
        })}
      />
      <p className="error">{errors.name?.message}</p>
      <label htmlFor="email" className="label">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        placeholder="Enter email address"
        className="input"
        {...register("email", {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
          required: { value: true, message: "Email is required" },
        })}
        
      />
      <p className="error">{errors.email?.message}</p>
      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Enter password"
        className="input"
        {...register("password", {
          required: { value: true, message: "Password requred" },
        })}
      />
      <p className="error">{errors.password?.message}</p>
      <label htmlFor="confirmpass" className="label">
        Confirm Password
      </label>
      <input
        id="confirmpass"
        type="password"
        placeholder="Enter password"
        className="input"
        {...register("confirmPassword", {
          required: { value: true, message: "Password confirm is  requred" },
        })}
      />
      <p className="error">{errors.confirmPassword?.message}</p>
      <button className="block btn bg-[#4640DE] w-full text-white py-3 px-6">
        Continue
      </button>
      <div className="my-5">
        <p className="inline mr-3 font-epilogue font-normal text-base text-[rgb(141,144,153)] ">
          Already Have an account?
        </p>
        <Link href="/api/signIn" className="text-[#4640DE] font-semibold text-base ">
          Login
        </Link>
      </div>
      <p className=" font-epilogue font-normal text-sm text-[#7C8493]">
        By clicking Continue you acknowlegde that you have read and accpeted our{" "}
        <span className="text-[#4640DE] font-semibold text-base">
          Terms of use
        </span>{" "}
        and{" "}
        <span className="text-[#4640DE] font-semibold text-base">
          Privacy Policy
        </span>
      </p>
    </form>
  );
};

export default SignupPage;


