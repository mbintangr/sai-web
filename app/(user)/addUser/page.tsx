import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AddDataUser from '@/components/form/AddUserForm'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { User } from '@prisma/client'
import { fetchAllPegawai } from '@/action/pegawai'

const Register = async () => {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
        redirect('/login');
    } else if ((user as User).role !== 'ADMIN') {
        redirect('/');
    }

    const dataPegawai = await fetchAllPegawai();
    return (
        <>
            <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
                <Card className="w-full mx-[10vw] max-w-[500px] rounded-xl bg-light-blue text-blue shadow-orange/50 shadow-2xl">
                    <CardHeader>
                        <CardTitle>Register!</CardTitle>
                        <CardDescription>Register new Account!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AddDataUser dataPegawai={dataPegawai}/>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Register