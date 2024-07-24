import { deleteAbsensiById, fetchAbsensiByPegawaiId, fetchAllAbsensi, getUserByUserId } from "@/action/user";
import NavBar from "@/components/auth/NavBar";
import { getSession } from "@/lib/getSession";
import { redirect } from 'next/navigation'
import { formatter, checkStatus } from "@/lib/date";
import React from 'react'
import AbsensiTable from "@/components/table/AbsensiTable";
import Search from "@/components/Search";

const Home = async ({searchParams} : {searchParams: {query?: string}}) => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect('/login')
  }

  const query = searchParams?.query || ""

  const userId = user?.id as string | ""

  const userData = await getUserByUserId(userId)

  let absensiData: any
  if(user.role === 'ADMIN') {
    absensiData = await fetchAllAbsensi(query)
  } else {
    absensiData = await fetchAbsensiByPegawaiId(userData?.pegawaiId)
  }

  return (
    <div className="pt-28 px-[10vw]">
      <div className="py-8">
        <h1 className="font-bold text-3xl">Welcome, <span className="text-orange">{userData?.pegawai.namaPegawai}!</span></h1>
        <AbsensiTable absensiData={absensiData} role={user.role}/>
      </div>
    </div>
  )
}

export default Home