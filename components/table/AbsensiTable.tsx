import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { deleteAbsensiById } from '@/action/absensi';
import { checkStatus, formatter } from '@/lib/date';
import { DateTime } from 'next-auth/providers/kakao';
import { getSession } from '@/lib/getSession';
import Search from '../Search';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';
import { DateFilter } from '../filter/DateFilter';

const AbsensiTable = async ({ absensiData, role }: { absensiData: any, role: string }) => {
    const session = await getSession()
    const user = session?.user
    if (!user) {
        redirect('/login')
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl mt-8'>Data Absensi</h1>
                {(user as User).role === 'ADMIN' && <Link href="/addAbsensi"><Button className='bg-blue hover:bg-blue/80 rounded-2xl text-white'>Add Absensi</Button></Link>}
            </div>
            {role === 'ADMIN' && <Search />}
            <div className='my-4 flex items-center justify-end'>
                <DateFilter />
            </div>
            <Table className="">
                <TableHeader>
                    <TableRow className="font-bold">
                        <TableHead className="w-[5%] font-bold text-center">No</TableHead>
                        <TableHead className="font-bold">Tanggal</TableHead>
                        <TableHead className="font-bold">Nama Pegawai</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        {(user as User).role === 'ADMIN' && <TableHead className="font-bold">Action</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {absensiData?.map((absensi: { id: number; waktuMasuk: DateTime; pegawai: { namaPegawai: string }; }, index: number) => (
                        <TableRow key={absensi.id}>
                            <TableCell className="w-fit text-center">{index + 1}</TableCell>
                            <TableCell>{formatter(absensi.waktuMasuk.toString())}</TableCell>
                            <TableCell>{absensi.pegawai?.namaPegawai}</TableCell>
                            <TableCell><Badge className={(checkStatus(absensi.waktuMasuk) === "Tepat Waktu" ? "border-2 border-green text-green text-md px-4 py-2" : checkStatus(absensi.waktuMasuk) === "Terlambat" ? "border-2 border-red-600 text-red-600 text-md px-4 py-2" : "border-2 border-blue text-blue text-md px-4 py-2")}>{checkStatus(absensi.waktuMasuk)}</Badge></TableCell>
                            {(user as User).role === 'ADMIN' && <TableCell>
                                <div className="flex space-x-2">
                                    <Link href={`/editAbsensi/${absensi.id}`}><Button className="bg-green hover:bg-green/80 rounded-2xl text-white">Edit</Button></Link>
                                    <form action={deleteAbsensiById.bind(null, absensi.id)}>
                                        <Button className="bg-orange hover:bg-orange/80 rounded-2xl text-white" type="submit">Delete</Button>
                                    </form>
                                </div>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default AbsensiTable