"use client";
import Image from "next/image";

import Link from "next/link";
import { useGetAllOpportunityQuery } from "@/app/service/jobData";

import { ClipLoader } from "react-spinners";

interface JobPosting {
  title: string;
  company: string;
  description: string;
  location: string[];
  image: string;
  id: string;
}
const images: string[] = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
];
const getRandomImage = (): string => {
  const randomIndex: number = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
const Card = () => {
  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllOpportunityQuery();
  console.log(responseData ? responseData : "not yet");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="black" size={50} />
      </div>
    );
  } else if(!isSuccess){
    return <h1>failed</h1>
  }

  

  
  const jobData: JobPosting[] = responseData.data.map((job, index) => ({
      title: job.title,
      company: job.orgName,
      description: job.description,
      location: job.location,
      image: getRandomImage(),
      id: job.id,
    }));
  

  return (
    <>
      {jobData.map((job, index) => (
        <Link
          href={`component/JobDetail/${job.id}`}
          className="w-[919px] h-[266px] rounded-[30px] border  p-6 grid grid-cols-12 gap-4 mx-auto mb-8 border-[#D6DDEB]"
        >
          <div className="col-span-1 ">
            <Image src={job.image} alt="image" width={66} height={59} />
          </div>
          <div className="col-span-11 ">
            <p className="text-[20px] leading-6  font-epilogue font-semibold text-manga ">
              {job.title}{" "}
            </p>
            <p className="font-epilogue text-base font-normal text-[#7C8493] mt-3 ">
              {job.company} .{" "}
              {job.location.map((loc, index) => (
                <span key={index}>{loc} {index==job.location.length-1?".":"," } </span>
              ))}
            </p>

            <p className=" pstyles  mt-3 text-manga">{job.description}</p>

            <div className="w-[242px] h-[31px] flex grid-cols-3 gap-2 mt-3  ">
              <div className="border-r-2 ">
                <div className="custom bg-purposeBg text-pupose btn mr-2">
                  In Person
                </div>
              </div>
              <div className="custom  text-education border border-education  btn">
                Education
              </div>
              <div className="custom text-IT border border-IT  btn rounded-[2px] w-14  ">
                IT
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

//fetch data server side

export default Card;
