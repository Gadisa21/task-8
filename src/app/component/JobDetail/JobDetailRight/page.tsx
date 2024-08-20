"use client";

import React from "react";
import Image from "next/image";

import { useGetSpecificOpportunityQuery } from "@/app/service/jobData";
interface SpecificJob {
  posted_on: String;
  deadline: String;
  location: String[];
  start_date: String;
  end_date: String;
  categories: String[];
  required_skills: String[];
}

const JobDetailRight = ({ id }: { id: string }) => {
  const {data:res,isLoading,isError,isSuccess} = useGetSpecificOpportunityQuery(id);

 if(isLoading){
  return <h1></h1>
 } else if(!isSuccess){
  return <h1>Failed</h1>
 }

  
  const about: SpecificJob = {
    posted_on: res.data.datePosted,
    deadline: res.data.deadline,
    location: res.data.location,
    start_date: res.data.startDate,
    end_date: res.data.endDate,
    categories: res.data.categories,
    required_skills: res.data.requiredSkills,
  };

  return (
    <div className="w-[293.5px] mx-auto">
      <p className="title ">About</p>
      <div className="flex gap-4 mb-6 mt-9">
        <Image
          className="border-[#D6DDEB] w-[44px] h-[44px]"
          src="/images/posted.png"
          width={44}
          height={44}
          alt="icon"
        />
        <div>
          <p className=" text-[#515B6F] font-epilogue font-normal text-base">
            Posted On
          </p>
          <p className="font-epilogue font-semibold text-base color-[#25324B]">
            {about.posted_on}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Image
          className="border-[#D6DDEB] w-[44px] h-[44px]"
          src="/images/deadline.png"
          width={44}
          height={44}
          alt="icon"
        />
        <div>
          <p className=" text-[#515B6F] font-epilogue font-normal text-base">
            Deadline
          </p>
          <p className="font-epilogue font-semibold text-base color-[#25324B]">
            {about.deadline}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Image
          className="border-[#D6DDEB] w-[44px] h-[44px]"
          src="/images/location.png"
          width={44}
          height={44}
          alt="icon"
        />
        <div>
          <p className=" text-[#515B6F] font-epilogue font-normal text-base">
            Location
          </p>
          <p className="font-epilogue font-semibold text-base color-[#25324B]">
            {about.location}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Image
          className="border-[#D6DDEB] w-[44px] h-[44px]"
          src="/images/startdate.png"
          width={44}
          height={44}
          alt="icon"
        />
        <div>
          <p className=" text-[#515B6F] font-epilogue font-normal text-base">
            Start Date
          </p>
          <p className="font-epilogue font-semibold text-base color-[#25324B]">
            {about.start_date}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Image
          className="border-[#D6DDEB] w-[44px] h-[44px]"
          src="/images/enddate.png"
          width={44}
          height={44}
          alt="icon"
        />
        <div>
          <p className=" text-[#515B6F] font-epilogue font-normal text-base">
            End Date
          </p>
          <p className="font-epilogue font-semibold text-base color-[#25324B]">
            {about.end_date}
          </p>
        </div>
      </div>

      <div className="border-t border-b border-[#D6DDEB]">
        <p className="title mt-4">Categories</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {about.categories.map((cat,index)=>(
 <p className={index%2==0?"btnd bg-[#EB85331A] text-[#FFB836]":" btnd text-[#56CDAD] bg-[#56CDAD1A]"}>
 {cat}
</p>
          ))
         
        }
        </div>
      </div>

      <div className="mt-4">
        <p className="title">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {about.required_skills.map((skill, index) => (
            <p className="required_skill mb-0" key={index}>
              {skill}
            </p>
          ))}
        </div>

        {/* <p className="required_skill">English</p>
          <p className="required_skill">Copywriting</p> */}
      </div>
    </div>
  );
};

export default JobDetailRight;
