import { fetchAbsensiByPegawaiId, fetchAllAbsensi } from "@/action/absensi";
import { getUserByUserId } from "@/action/user";
import { getSession } from "@/lib/getSession";
import { redirect } from 'next/navigation'
import React from 'react'
import AbsensiTable from "@/components/table/AbsensiTable";
import { User } from "@prisma/client";

const Home = async ({searchParams} : {searchParams: {query?: string, date?: string}}) => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect('/login')
  }

  const date = searchParams?.date || ""

  const query = searchParams?.query || ""

  const userId = user?.id as string | ""

  let userData = await getUserByUserId(userId)

  if (!userData) {
    throw new Error("User Data not found")
  }

  console.log(user.role);

  let absensiData: any
  if((user as User).role === 'ADMIN') {
    absensiData = await fetchAllAbsensi(query, date)
  } else if ((user as User).role === 'PRINCIPAL' && userData) {
    absensiData = await fetchAllAbsensi(query, date)
  } else {
    absensiData = await fetchAbsensiByPegawaiId(userData.pegawaiId, date)
  }

  return (
    <div className="pt-20 sm:pt-28 px-[10vw]">
      <div className="py-8">
        <h1 className="font-bold text-2xl sm:text-3xl mb-4 sm:mb-2">Welcome, <span className="text-orange">{userData?.pegawai.namaPegawai}!</span></h1>
        <AbsensiTable absensiData={absensiData} role={(user as User).role}/>
      </div>
    </div>
  )
}

export default Home