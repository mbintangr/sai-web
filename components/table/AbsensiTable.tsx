"use client"
import React, { useRef } from 'react'
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
import { Badge } from "@/components/ui/badge";
import { deleteAbsensiById } from '@/action/absensi';
import { checkStatus, formatter } from '@/lib/date';
import { DateTime } from 'next-auth/providers/kakao';
import Search from '../Search';
import { DateFilter } from '../filter/DateFilter';
import { IoAdd, IoDownloadOutline } from "react-icons/io5";
const ExcelJS = require('exceljs');

const AbsensiTable = ({ absensiData, role }: { absensiData: any, role: string }) => {

    const tableRef = useRef(null)

    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data Absensi');

        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Waktu Masuk', key: 'waktuMasuk', width: 20 },
            { header: 'Pegawai', key: 'pegawai', width: 20 },
            { header: 'Status', key: 'status', width: 20 },
        ];

        absensiData.map((absensi: { id: number; waktuMasuk: DateTime; pegawai: { namaPegawai: string }; }, index: number) => {
            worksheet.addRow({
                no: index + 1,
                waktuMasuk: formatter(absensi.waktuMasuk),
                pegawai: absensi.pegawai.namaPegawai,
                status: checkStatus(absensi.waktuMasuk)
            });
        })

        workbook.xlsx.writeBuffer().then((data: BlobPart) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Data Absensi.xlsx';
            link.click();
        });
    };

    return (
        <>
            <div className='flex justify-between items-center mt-4 sm:mt-8 mb-2'>
                <h1 className='font-bold text-xl sm:text-2xl'>Data Absensi</h1>
                <div className='flex items-center gap-2'>
                    {(role === 'ADMIN' || 'PRINCIPAL') && <Button className='bg-green hover:bg-green/80 rounded-full text-white text-md' onClick={exportExcelFile} ><span className='hidden sm:inline mr-1'>Export</span><IoDownloadOutline size={25} /></Button>}
                    {role === 'ADMIN' && <Link href="/addAbsensi" className='bg-blue hover:bg-blue/80 rounded-full text-white p-2 flex'><span className='hidden sm:inline mx-1'>Add Data</span><IoAdd size={25} /></Link>}
                </div>
            </div>
            {(role === 'ADMIN' || 'PRINCIPAL') && <Search />}
            <div className='my-2 flex items-center justify-end'>
                <DateFilter />
            </div>
            <Table ref={tableRef}>
                <TableHeader>
                    <TableRow className="font-bold">
                        <TableHead className="w-[5%] font-bold text-center">No</TableHead>
                        <TableHead className="font-bold">Tanggal</TableHead>
                        <TableHead className="font-bold">Nama Pegawai</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        {role === 'ADMIN' && <TableHead className="font-bold">Action</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {absensiData?.map((absensi: { id: number; waktuMasuk: DateTime; pegawai: { namaPegawai: string }; }, index: number) => (
                        <TableRow key={absensi.id}>
                            <TableCell className="w-fit text-center">{index + 1}</TableCell>
                            <TableCell>{formatter(absensi.waktuMasuk.toString())}</TableCell>
                            <TableCell>{absensi.pegawai?.namaPegawai}</TableCell>
                            <TableCell><Badge className={(checkStatus(absensi.waktuMasuk) === "Tepat Waktu" ? "border-2 border-green text-green text-md px-4 py-2" : checkStatus(absensi.waktuMasuk) === "Terlambat" ? "border-2 border-red-600 text-red-600 text-md px-4 py-2" : "border-2 border-blue text-blue text-md px-4 py-2") + ' text-center'}>{checkStatus(absensi.waktuMasuk)}</Badge></TableCell>
                            {role === 'ADMIN' && <TableCell>
                                <div className="flex space-x-2">
                                    <Link href={`/editAbsensi/${absensi.id}`}><Button className="bg-green hover:bg-green/80 rounded-2xl text-white shadow-xl">Edit</Button></Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="bg-orange hover:bg-orange/80 rounded-2xl text-white shadow-xl">Delete</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-light-blue text-blue rounded-xl'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the absensi data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className='bg-green hover:bg-green/80 text-light-green hover:text-light-green rounded-2xl shadow-xl px-4 border-0'>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className='bg-orange hover:bg-orange/80 text-light-orange rounded-2xl shadow-xl px-4'>
                                                    <form action={deleteAbsensiById.bind(null, absensi.id)}>
                                                        <button type="submit">Continue</button>
                                                    </form>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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