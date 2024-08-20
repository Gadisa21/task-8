import React from "react";
import Card from "../card/card";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Signout from "../../api/signOut/Signout";
const JobListing = async () => {
  const session=await getServerSession(options)

  if(!session){
    redirect("api/signIn?CallbackUrl=/")
  }
  console.log("session",session)
  return (
    <div className="w-[919px] mx-auto mt-5">
      <div className="flex justify-between">

      
      <div className="w-[236px] h-[38px]  ">
        
        <p className="font-Poppins text-4xl font-extrabold leading-[38.4px] text-left text-[#25324B]">
          opportunities
        </p>
        
        <p className="text-[#7C8493] font-epilogue text-base font-normal leading-[25.6px] text-left">
          showing 73 results
        </p>
      
      </div>
      <Signout/>
      </div>
      <div className="   text-right mb-10">
        <span className="text-[#7C8493] font-epilogue text-base font-normal leading-[25.6px] text-right">
          sort by:
        </span>
        <select className="text-[#25324B] font-epilogue text-base font-medium leading-[25.6px]">
          <option>Most relevant</option>
          <option>newest</option>
          <option>oldest</option>
        </select>
      </div>
      <Card />
    </div>
  );
};

export default JobListing;
