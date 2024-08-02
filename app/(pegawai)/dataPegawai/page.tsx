import { fetchAllPegawai } from '@/action/pegawai'
import { getUserByUserId } from '@/action/user'
import PegawaiTable from '@/components/table/PegawaiTable'
import { getSession } from '@/lib/getSession'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

const DataPegawaiPage = async ({searchParams}: {searchParams: {query?: string}}) => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect('/login')
  }

  if ((user as User).role !== 'ADMIN') {
    redirect('/')
  }

  const query = searchParams?.query || ""

  const userId = user?.id as string | ""

  const userData = await getUserByUserId(userId)

  let pegawaiData: any
  pegawaiData = await fetchAllPegawai(query)

  return (
    <div className="pt-16 sm:pt-20 px-[10vw]">
      <div className="py-8">
        <PegawaiTable pegawaiData={pegawaiData} />
      </div>
    </div>
  )
}

export default DataPegawaiPage