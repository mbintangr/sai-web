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

  const userData = await getUserByUserId(userId)

  let absensiData: any
  if((user as User).role === 'ADMIN') {
    absensiData = await fetchAllAbsensi(query, date)
  } else if (userData) {
    absensiData = await fetchAbsensiByPegawaiId(userData.pegawaiId, date)
  }

  return (
    <div className="pt-28 px-[10vw]">
      <div className="py-8">
        <h1 className="font-bold text-3xl">Welcome, <span className="text-orange">{userData?.pegawai.namaPegawai}!</span></h1>
        <AbsensiTable absensiData={absensiData} role={(user as User).role}/>
      </div>
    </div>
  )
}

export default Home