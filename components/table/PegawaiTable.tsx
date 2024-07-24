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
import { extractYear } from '@/lib/date';
import { DateTime } from 'next-auth/providers/kakao';
import { getSession } from '@/lib/getSession';
import Search from '../Search';
import { redirect } from 'next/navigation';
import { deletePegawaiById } from '@/action/pegawai';

const PegawaiTable = async ({ pegawaiData }: { pegawaiData: any }) => {
    const session = await getSession()
    const user = session?.user
    if (!user) {
        redirect('/login')
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl my-8'>Data Pegawai</h1>
                <Link href="/addPegawai"><Button className='bg-blue hover:bg-blue/80 rounded-2xl text-white'>Add Pegawai</Button></Link>
            </div>
            <Search />
            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="font-bold">
                        <TableHead className="w-[5%] font-bold text-center">No</TableHead>
                        <TableHead className="font-bold">Nama</TableHead>
                        <TableHead className="font-bold text-center">Pendidikan</TableHead>
                        <TableHead className="font-bold text-center">Tahun Mulai Kerja</TableHead>
                        <TableHead className="font-bold text-center">Golongan</TableHead>
                        <TableHead className="font-bold text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pegawaiData?.map((pegawai: { id: number; namaPegawai: String; pendidikan: String; mulaiKerja: DateTime; golongan: { namaGolongan: string }; }, index: number) => (
                        <TableRow key={pegawai.id}>
                            <TableCell className="w-fit text-center">{index + 1}</TableCell>
                            <TableCell>{pegawai.namaPegawai}</TableCell>
                            <TableCell className='text-center'>{pegawai.pendidikan}</TableCell>
                            <TableCell className='text-center'>{extractYear(pegawai.mulaiKerja.toString())}</TableCell>
                            <TableCell className='text-center'>{pegawai.golongan.namaGolongan}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2 justify-center">
                                    <Link href={`/editPegawai/${pegawai.id}`}><Button className="bg-green hover:bg-green/80 rounded-2xl text-white">Edit</Button></Link>
                                    <form action={deletePegawaiById.bind(null, pegawai.id)}>
                                        <Button className="bg-orange hover:bg-orange/80 rounded-2xl text-white" type="submit">Delete</Button>
                                    </form>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default PegawaiTable