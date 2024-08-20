"use client"

import Link from "next/link"

const Signout = () => {
  return (
    <div>
        <Link href="api/auth/signout?callbackUrl=/api/signIn" className="text-[#4640DE] font-bold text-2xl">Logout</Link>
    </div>
  )
}

export default Signout