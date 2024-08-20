"use client"
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {useForm} from "react-hook-form"
import {useRouter} from "next/navigation"
import axios from "axios";
import { useState } from "react";
type FormValues={
  num1:string
  num2:string
  num3:string
  num4:string
}

const verifyEmail = () => {

const router=useRouter()
const user=useSelector((state:RootState)=>state.user)
const form=useForm<FormValues>()
const {register,handleSubmit,formState,reset}=form
const {errors}=formState
const [errorMessage, setErrorMessage] = useState<string | null>(null);


  if(!user.name){
    router.push("/api/signup")
    
  }
  
  const onSubmit= async (data:FormValues)=>{
    console.log(data)
   

    try {
      const otp=data.num1 + data.num2 + data.num3+data.num4
      console.log("otp",otp)
      reset()
      
  
      const response=await axios.post("https://akil-backend.onrender.com/verify-email",{email:user.email,OTP:otp})

      if(response.data.success){
       console.log(response)
        router.push("/api/signIn")
      }else{
        setErrorMessage(response.data.message);
      }

    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  }


  return (
    <div className="w-[409px] mx-auto mt-20">
      <p className="font-Poppins font-black text-[32px] leading-[38.4px] text-center mb-10">
        Verify Email
      </p>
      <p className="font-epilogue font-normal text-sm text-[#7C8493]">
        We've sent a verfication code to the email address you provided. To
        complete the verfication process. Please enter the code here.
      </p>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      noValidate>
        <div className="flex justify-between mt-14">
          <input
            id="num1"
            placeholder="0"
            className="w-[76px] h-[50px] border-2 border-[#4640DE66] custom-placeholder  pt-3 rounded-lg"
            {...register("num1",{required:{value:true,message:"Otp is requred"}})}
          />
          <input
            id="num2"
            placeholder="0"
            className="w-[76px] h-[50px] border-2 border-[#4640DE66] custom-placeholder  pt-3 rounded-lg"
            {...register("num2",{required:{value:true,message:"Otp is requred"}})}
          />
          <input
            id="num3"
            placeholder="0"
            className="w-[76px] h-[50px] border-2  border-[#4640DE66] custom-placeholder  pt-3 rounded-lg"
            {...register("num3",{required:{value:true,message:"Otp is requred"}})}
          />
          <input
            id="num4"
            placeholder="0"
            className="w-[76px] h-[50px] border-2 border-[#4640DE66] custom-placeholder  pt-3 rounded-lg"
            {...register("num4",{required:{value:true,message:"Otp is requred"}})}
          />
        </div>
        <p className="text-center font-epilogue font-normal text-sm text-[#7C8493] mt-5">
          You can request to{" "}
          <span className="text-[#4640DE] font-semibold text-base">
            Resend code{" "}
          </span>{" "}
          in{" "}
          <span className="text-[#4640DE] font-semibold text-base">0:30</span>{" "}
        </p>
        {Object.keys(errors).length > 0 && (
          <p className="text-red-500 text-center mt-2">OTP is required</p>
        )}
        {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
        <button className="block btn bg-[#4640DE] w-full text-white py-3 px-6 mt-10">
          Continue
        </button>
      </form>
    </div>
  );
};

export default verifyEmail;
