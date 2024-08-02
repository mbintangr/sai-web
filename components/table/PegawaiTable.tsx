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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { extractYear } from '@/lib/date';
import { DateTime } from 'next-auth/providers/kakao';
import { getSession } from '@/lib/getSession';
import Search from '../Search';
import { redirect } from 'next/navigation';
import { deletePegawaiById } from '@/action/pegawai';
import { IoAdd } from 'react-icons/io5';

const PegawaiTable = async ({ pegawaiData }: { pegawaiData: any }) => {
    const session = await getSession()
    const user = session?.user
    if (!user) {
        redirect('/login')
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-xl sm:text-2xl my-4 sm:my-8'>Data Pegawai</h1>
                <Link href="/addPegawai" className='bg-blue hover:bg-blue/80 rounded-full text-white p-2'><IoAdd size={25} /></Link>
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
                                    <Link href={`/editPegawai/${pegawai.id}`}><Button className="bg-green hover:bg-green/80 rounded-2xl text-white shadow-xl">Edit</Button></Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="bg-orange hover:bg-orange/80 rounded-2xl text-white shadow-xl">Delete</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-light-blue text-blue rounded-xl'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the pegawai data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className='bg-green hover:bg-green/80 text-light-green hover:text-light-green rounded-2xl shadow-xl px-4 border-0'>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className='bg-orange hover:bg-orange/80 text-light-orange rounded-2xl shadow-xl px-4'>
                                                    <form action={deletePegawaiById.bind(null, pegawai.id)}>
                                                        <button type="submit">Continue</button>
                                                    </form>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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