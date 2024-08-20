import { options } from "@/app/api/auth/[...nextauth]/options";
import JobDetailLeft from "../JobDetailLeft/page";
import JobDetailRight from "../JobDetailRight/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const JobDetail = async ({ params }: { params: { id: string} }) => {
const session=await getServerSession(options)
if(!session){
  const callbackUrl = `/component/JobDetail/${params.id}`;
  // Redirect to sign-in with callback URL
  redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);}
  return (
    <div className="flex gap-[6px] p-8">
      <JobDetailLeft id={params.id}  />
      <JobDetailRight id={params.id} />
    </div>
  );
};

export default JobDetail;
