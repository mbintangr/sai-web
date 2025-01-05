import { fetchAllLog } from '@/action/log'
import { getSession } from '@/lib/getSession'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'
import LogTable from '@/components/table/LogTable'

const LogPage = async ({ searchParams }: { searchParams: { query?: string } }) => {
    const session = await getSession()
    const user = session?.user

    if (!user) {
        redirect('/login')
    }

    if ((user as User).role !== 'ADMIN') {
        redirect('/')
    }

    const query = searchParams?.query || ""

    const logData = await fetchAllLog(query)

    return (
        <div className="pt-16 sm:pt-20 px-[10vw]">
            <div className="py-8">
                <LogTable logData={logData} />
            </div>
        </div>
    )
}

export default LogPage