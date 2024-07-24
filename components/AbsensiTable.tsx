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
import { deleteAbsensiById } from '@/action/user';
import { checkStatus, formatter } from '@/lib/date';
import { DateTime } from 'next-auth/providers/kakao';
import { getSession } from '@/lib/getSession';
import Search from './Search';

const AbsensiTable = async ({ absensiData, role }: { absensiData: any, role: string }) => {
    const session = await getSession()
    const user = session?.user
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl my-8'>List Absensi</h1>
                <Link href="/add"><Button className='bg-blue hover:bg-blue/80 rounded-2xl text-white'>Add Absensi</Button></Link>
            </div>
            {role === 'ADMIN' && <Search />}
            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="font-bold">
                        <TableHead className="w-[5%] font-bold text-center">No</TableHead>
                        <TableHead className="font-bold">Tanggal</TableHead>
                        <TableHead className="font-bold">Nama Pegawai</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        {user.role === 'ADMIN' && <TableHead className="font-bold">Action</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {absensiData?.map((absensi: { id: number; waktuMasuk: DateTime; pegawai: { namaPegawai: string }; }, index: number) => (
                        <TableRow key={absensi.id}>
                            <TableCell className="w-fit text-center">{index + 1}</TableCell>
                            <TableCell>{formatter(absensi.waktuMasuk.toString())}</TableCell>
                            <TableCell>{absensi.pegawai?.namaPegawai}</TableCell>
                            <TableCell><Badge className={(checkStatus(absensi.waktuMasuk) === "Tepat Waktu" ? "border-2 border-green text-green text-md px-4 py-2" : checkStatus(absensi.waktuMasuk) === "Terlambat" ? "border-2 border-red-600 text-red-600 text-md px-4 py-2" : "border-2 border-blue text-blue text-md px-4 py-2")}>{checkStatus(absensi.waktuMasuk)}</Badge></TableCell>
                            {user.role === 'ADMIN' && <TableCell>
                                <div className="flex space-x-2">
                                    <Link href={`/edit/${absensi.id}`}><Button className="bg-green hover:bg-green/80 rounded-2xl text-white">Edit</Button></Link>
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