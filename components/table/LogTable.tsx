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
import { Button } from "@/components/ui/button";
import { formatter } from '@/lib/date';
import { DateTime } from 'next-auth/providers/kakao';
import Search from '../Search';
import { IoDownloadOutline } from 'react-icons/io5';
import { Badge } from '../ui/badge';
const ExcelJS = require('exceljs');

const LogTable = ({ logData }: { logData: any }) => {
    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('System Log');

        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Type', key: 'type', width: 10 },
            { header: 'Message', key: 'message', width: 100 },
            { header: 'Tanggal', key: 'tanggal', width: 10 },
        ];

        logData?.map((log: { id: string; type: String; message: String; createdAt: DateTime }, index: number) => (
            worksheet.addRow({
                no: index + 1,
                type: log?.type,
                message: log?.message,
                tanggal: (log.createdAt).toString(),
            })
        ))

        workbook.xlsx.writeBuffer().then((data: BlobPart) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'System Log.xlsx';
            link.click();
        });
    };

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-xl sm:text-2xl my-4 sm:my-8'>Data Log Sistem</h1>
                <div className='flex gap-2'>
                    <Button className='bg-green hover:bg-green/80 rounded-full text-white flex items-center text-md shadow-xl' onClick={exportExcelFile} ><span className='hidden sm:inline mr-1'>Export</span><IoDownloadOutline size={25} /></Button>
                </div>
            </div>
            <Search />
            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="font-bold">
                        <TableHead className="w-[5%] font-bold text-center">No</TableHead>
                        <TableHead className="font-bold text-center">Type</TableHead>
                        <TableHead className="font-bold text-center">Message</TableHead>
                        <TableHead className="font-bold text-center">Tanggal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {logData?.map((log: { id: string; type: String; message: String; createdAt: DateTime }, index: number) => (
                        <TableRow key={log.id}>
                            <TableCell className="w-fit text-center">{index + 1}</TableCell>
                            <TableCell className='text-center'><Badge className={log.type === 'CREATE' ? "border-2 border-green text-green text-md px-4 py-2" : (log.type === 'UPDATE' ? "border-2 border-blue text-blue text-md px-4 py-2" : "border-2 border-red-600 text-red-600 text-md px-4 py-2")}>{log.type}</Badge></TableCell>
                            <TableCell className=''>{log.message}</TableCell>
                            <TableCell className='text-center'>{(log.createdAt).toString()}</TableCell>
                        </TableRow> 
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default LogTable