"use client"
import React from "react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

import { useGetSpecificOpportunityQuery } from "@/app/service/jobData";
interface SpecificJob {
  title: String;
  description: String;
  responsibilities: String[];
  traits: String;
  when_where: String;
}

const JobDetailLeft = ({ id }: { id: string }) => {
   const {data:response,isLoading,isError,isSuccess}=useGetSpecificOpportunityQuery(id)
   console.log("data",response?.data)

   if (isLoading) {
    return (
      <div className="flex justify-center items-center  ">
        <ClipLoader color="black" size={50} />
      </div>
    )}else if(!isSuccess){
    return <h1>failed</h1>
   }
 

   

  const JobData: SpecificJob = {
    title: response?.data.title,
    description: response.data.description,
    
    traits: response.data.requirements,
    when_where: response.data.whenAndWhere,
    responsibilities: response.data.responsibilities.split("."),
  };

  return (
    <div className="w-[815px] mx-auto pt-7">
      <div className="mb-10">
        <p className=" title">Description</p>
        <p className="pstyles">{JobData.description}</p>
      </div>
      <div className="mb-10">
        <p className="title ">Responsibility</p>
        
          
            {
              JobData.responsibilities.map((res,index)=>(
                res&&
                (<div className="flex gap-3 mb-2" key={index} >
                  
                <Image
                className=" w-[20px] h-[20px]"
                src="/images/tik.png"
                width={20}
                height={20}
                alt="mark"
              />
  
              <p className="pstyles ">{res}</p>
              </div>)
               
              ))
            }
          
            
      </div>
      {
      JobData.traits &&(  <div className="mb-10">
        
        <p className="title">Ideal Candidate we want </p>
        <ul className="list-disc pl-5">
          {/* <li className="sub_title mb-2">
            {JobData.ideal_candidate.age} age {JobData.ideal_candidate.gender}{" "}
            {JobData.title}
          </li> */}

         

              <li className="mb-2">
                <span className="sub_title">
                 {JobData.traits}
                </span>
                
              </li>
            

        </ul>
      </div>)}
      <div>
        <p className="title">When & Where</p>
        <div className="flex gap-2 items-center">
          <Image
            src="/images/location.png"
            width={44}
            height={44}
            alt="location icon"
          />
          <p className="pstyles">{JobData.when_where} </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailLeft;
