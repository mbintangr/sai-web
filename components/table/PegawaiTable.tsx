"use client"
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
import Search from '../Search';
import { deletePegawaiById } from '@/action/pegawai';
import { IoAdd, IoDownloadOutline } from 'react-icons/io5';
const ExcelJS = require('exceljs');

const PegawaiTable = ({ pegawaiData }: { pegawaiData: any }) => {
    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data Pegawai');

        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Nama Pegawai', key: 'namaPegawai', width: 30 },
            { header: 'Pendidikan', key: 'pendidikan', width: 15 },
            { header: 'Tahun Mulai Kerja', key: 'mulaiKerja', width: 10 },
            { header: 'Golongan', key: 'golongan', width: 10 },
            { header: 'Pin', key: 'pin', width: 10 },
        ];

        pegawaiData.map((pegawai: { id: number; namaPegawai: String; pendidikan: String; mulaiKerja: DateTime; golongan: { namaGolongan: string }; pin: number }, index: number) => {
            worksheet.addRow({
                no: index + 1,
                namaPegawai: pegawai?.namaPegawai,
                pendidikan: pegawai?.pendidikan,
                mulaiKerja: extractYear(pegawai?.mulaiKerja),
                golongan: pegawai?.golongan?.namaGolongan,
                pin: pegawai.pin ? pegawai.pin : 'N/A',
            });
        })

        workbook.xlsx.writeBuffer().then((data: BlobPart) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Data Pegawai.xlsx';
            link.click();
        });
    };

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-xl sm:text-2xl my-4 sm:my-8'>Data Pegawai</h1>
                <div className='flex gap-2'>
                    <Button className='bg-green hover:bg-green/80 rounded-full text-white flex items-center text-md shadow-xl' onClick={exportExcelFile} ><span className='hidden sm:inline mr-1'>Export</span><IoDownloadOutline size={25} /></Button>
                    <Link href="/addPegawai" className='bg-blue hover:bg-blue/80 rounded-full text-white p-2 flex shadow-xl'><span className='hidden sm:inline mx-1'>Add Data</span><IoAdd size={25} /></Link>
                </div>
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
                        <TableHead className="font-bold text-center">Pin</TableHead>
                        <TableHead className="font-bold text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pegawaiData?.map((pegawai: { id: number; namaPegawai: String; pendidikan: String; mulaiKerja: DateTime; golongan: { namaGolongan: string }; pin: number }, index: number) => (
                        <TableRow key={pegawai.id}>
                            <TableCell className="w-fit text-center">{index + 1}</TableCell>
                            <TableCell>{pegawai.namaPegawai}</TableCell>
                            <TableCell className='text-center'>{pegawai.pendidikan}</TableCell>
                            <TableCell className='text-center'>{extractYear(pegawai.mulaiKerja.toString())}</TableCell>
                            <TableCell className='text-center'>{pegawai.golongan.namaGolongan}</TableCell>
                            <TableCell className='text-center'>{pegawai.pin ? pegawai.pin : 'N/A'}</TableCell>
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