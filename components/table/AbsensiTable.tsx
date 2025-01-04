"use client";
import React, { useEffect, useRef, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { deleteAbsensiById } from '@/action/absensi';
import { checkStatus, formatter } from '@/lib/date';
import Search from '../Search';
import { DateFilter } from '../filter/DateFilter';
import { IoAdd, IoDownloadOutline } from "react-icons/io5";
import { DateTime } from 'next-auth/providers/kakao';
import { processData } from '@/lib/report';
import { getNumberOfWeekdays } from '@/lib/date';
const ExcelJS = require('exceljs');

const AbsensiTable = ({ absensiData, pegawaiData, waktuMasukMaksimal, waktuPulang, reportParameters, role }: { absensiData: any, pegawaiData: any; waktuMasukMaksimal: string; waktuPulang: string; reportParameters: Array<string>; role: string }) => {
  const [reportData, setReportData] = useState<any[]>([]);

  const [reportStartDay, setReportStartDay] = useState<string>(`${(new Date).getDate()}`);
  const [reportStartMonth, setReportStartMonth] = useState<string>(`${Number((new Date).getMonth()) + 1}`);
  const [reportStartYear, setReportStartYear] = useState<string>(`${(new Date).getFullYear()}`);
  const [selectedStartDate, setSelectedStartDate] = useState<string>(`${reportStartYear}-${reportStartMonth}-${reportStartDay}`);

  const handleSelectStartDayChange = (value: string) => {
    setReportStartDay(value);
    setSelectedStartDate(`${reportStartYear}-${reportStartMonth}-${value}`);
  }

  const handleSelectStartMonthChange = (value: string) => {
    setReportStartMonth(value);
    setSelectedStartDate(`${reportStartYear}-${value}-${reportStartDay}`);
  }

  const handleSelectStartYearChange = (value: string) => {
    setReportStartYear(value);
    setSelectedStartDate(`${value}-${reportStartMonth}-${reportStartDay}`);
  }
  
  const [reportEndDay, setReportEndDay] = useState<string>(`${(new Date).getDate()}`);
  const [reportEndMonth, setReportEndMonth] = useState<string>(`${Number((new Date).getMonth()) + 1}`);
  const [reportEndYear, setReportEndYear] = useState<string>(`${(new Date).getFullYear()}`);
  const [selectedEndDate, setSelectedEndDate] = useState<string>(`${reportEndYear}-${reportEndMonth}-${reportEndDay}`);

  const handleSelectEndDayChange = (value: string) => {
    setReportEndDay(value);
    setSelectedEndDate(`${reportEndYear}-${reportEndMonth}-${value}`);
  }

  const handleSelectEndMonthChange = (value: string) => {
    setReportEndMonth(value);
    setSelectedEndDate(`${reportEndYear}-${value}-${reportEndDay}`);
  }

  const handleSelectEndYearChange = (value: string) => {
    setReportEndYear(value);
    setSelectedEndDate(`${value}-${reportEndMonth}-${reportEndDay}`);
  }

  useEffect(() => {
    const fetchReportData = async () => {
      const data = await processData(pegawaiData, selectedStartDate, selectedEndDate, waktuMasukMaksimal, waktuPulang, reportParameters);
      setReportData(data);
    };

    fetchReportData();
  }, [selectedStartDate, pegawaiData]);

  useEffect(() => {
    const fetchReportData = async () => {
      const data = await processData(pegawaiData, selectedStartDate, selectedEndDate, waktuMasukMaksimal, waktuPulang, reportParameters);
      setReportData(data);
    };

    fetchReportData();
  }, [selectedEndDate, pegawaiData]);


  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Absensi');
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Nama Pegawai', key: 'namaPegawai', width: 20 },
      { header: 'Keterlambatan Menit', key: 'keterlambatanMenit', width: 20 },
      { header: 'Keterlambatan Potongan', key: 'keterlambatanPotongan', width: 20 },
      { header: 'Keterlambatan Konversi', key: 'keterlambatanKonversi', width: 20 },
      { header: 'Ketidakhadiran Hari', key: 'ketidakhadiranHari', width: 20 },
      { header: 'Ketidakhadiran Potongan', key: 'ketidakhadiranPotongan', width: 20 },
      { header: 'Ketidakhadiran Konversi', key: 'ketidakhadiranKonversi', width: 20 },
      { header: 'Total Menit Kerja', key: 'totalMenitKerja', width: 20 },
      { header: 'Point Absen', key: 'pointAbsen', width: 20 },
    ];

    reportData.forEach((report, index) => {
      worksheet.addRow({
        id: report.id,
        namaPegawai: report.nama,
        keterlambatanMenit: report.keterlambatanMenit,
        keterlambatanPotongan: report.keterlambatanPotongan,
        keterlambatanKonversi: report.keterlambatanKonversi,
        ketidakhadiranHari: report.ketidakhadiranHari,
        ketidakhadiranPotongan: report.ketidakhadiranPotongan,
        ketidakhadiranKonversi: report.ketidakhadiranKonversi,
        totalMenitKerja: report.totalMenitKerja,
        pointAbsen: report.pointAbsen,
      });
    });

    workbook.xlsx.writeBuffer().then((data: BlobPart) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Data Absensi ${selectedStartDate} s/d ${selectedEndDate}.xlsx`;
      link.click();
    });
  };

  return (
    <>
      <div className='flex justify-between items-center mt-4 sm:mt-8 mb-2'>
        <h1 className='font-bold text-xl sm:text-2xl'>Data Absensi</h1>
        <div className='flex items-center gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='shadow-xl bg-green hover:bg-green/80 rounded-full text-white text-md'><span className='hidden sm:inline mr-1'>Export</span><IoDownloadOutline size={25} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-light-blue text-blue rounded-xl">
              <DialogHeader>
                <DialogTitle>Export Absensi Data</DialogTitle>
                <DialogDescription>
                  Insert the start date and the end date of the data you want to export!
                </DialogDescription>
              </DialogHeader>
              <h1 className='font-bold'>Start Date</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-4">
                  <Select name="day" onValueChange={handleSelectStartDayChange} defaultValue={reportStartDay}>
                    <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl border-1 border-orange shadow-md bg-light-orange text-orange'>
                      <SelectGroup>
                        <SelectLabel>Day</SelectLabel>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()} className="hover:cursor-pointer">
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <Select name="month" onValueChange={handleSelectStartMonthChange} defaultValue={reportStartMonth}>
                    <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl border-1 border-orange shadow-md bg-light-orange text-orange'>
                      <SelectGroup>
                        <SelectLabel>Month</SelectLabel>
                        <SelectItem value="1" className="hover:cursor-pointer">
                          January
                        </SelectItem>
                        <SelectItem value="2" className="hover:cursor-pointer">
                          February
                        </SelectItem>
                        <SelectItem value="3" className="hover:cursor-pointer">
                          March
                        </SelectItem>
                        <SelectItem value="4" className="hover:cursor-pointer">
                          April
                        </SelectItem>
                        <SelectItem value="5" className="hover:cursor-pointer">
                          May
                        </SelectItem>
                        <SelectItem value="6" className="hover:cursor-pointer">
                          June
                        </SelectItem>
                        <SelectItem value="7" className="hover:cursor-pointer">
                          July
                        </SelectItem>
                        <SelectItem value="8" className="hover:cursor-pointer">
                          August
                        </SelectItem>
                        <SelectItem value="9" className="hover:cursor-pointer">
                          September
                        </SelectItem>
                        <SelectItem value="10" className="hover:cursor-pointer">
                          October
                        </SelectItem>
                        <SelectItem value="11" className="hover:cursor-pointer">
                          November
                        </SelectItem>
                        <SelectItem value="12" className="hover:cursor-pointer">
                          December
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <Select name="year" onValueChange={handleSelectStartYearChange} defaultValue={reportStartYear}>
                    <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-1 border-orange shadow-md bg-light-orange text-orange">
                      <SelectGroup>
                        <SelectLabel>Year</SelectLabel>
                        {Array.from({ length: 5 }, (_, i) => i + Number((new Date).getFullYear()) - 4).map((year) => (
                          <SelectItem key={year} value={year.toString()} className="hover:cursor-pointer">
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <h1 className='font-bold'>End Date</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-4">
                  <Select name="day" onValueChange={handleSelectEndDayChange} defaultValue={reportEndDay}>
                    <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl border-1 border-orange shadow-md bg-light-orange text-orange'>
                      <SelectGroup>
                        <SelectLabel>Day</SelectLabel>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()} className="hover:cursor-pointer">
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <Select name="month" onValueChange={handleSelectEndMonthChange} defaultValue={reportEndMonth}>
                    <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent className='rounded-xl border-1 border-orange shadow-md bg-light-orange text-orange'>
                      <SelectGroup>
                        <SelectLabel>Month</SelectLabel>
                        <SelectItem value="1" className="hover:cursor-pointer">
                          January
                        </SelectItem>
                        <SelectItem value="2" className="hover:cursor-pointer">
                          February
                        </SelectItem>
                        <SelectItem value="3" className="hover:cursor-pointer">
                          March
                        </SelectItem>
                        <SelectItem value="4" className="hover:cursor-pointer">
                          April
                        </SelectItem>
                        <SelectItem value="5" className="hover:cursor-pointer">
                          May
                        </SelectItem>
                        <SelectItem value="6" className="hover:cursor-pointer">
                          June
                        </SelectItem>
                        <SelectItem value="7" className="hover:cursor-pointer">
                          July
                        </SelectItem>
                        <SelectItem value="8" className="hover:cursor-pointer">
                          August
                        </SelectItem>
                        <SelectItem value="9" className="hover:cursor-pointer">
                          September
                        </SelectItem>
                        <SelectItem value="10" className="hover:cursor-pointer">
                          October
                        </SelectItem>
                        <SelectItem value="11" className="hover:cursor-pointer">
                          November
                        </SelectItem>
                        <SelectItem value="12" className="hover:cursor-pointer">
                          December
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <Select name="year" onValueChange={handleSelectEndYearChange} defaultValue={reportEndYear}>
                    <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-1 border-orange shadow-md bg-light-orange text-orange">
                      <SelectGroup>
                        <SelectLabel>Year</SelectLabel>
                        {Array.from({ length: 5 }, (_, i) => i + Number((new Date).getFullYear()) - 4).map((year) => (
                          <SelectItem key={year} value={year.toString()} className="hover:cursor-pointer">
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button className='bg-green hover:bg-green/80 rounded-full text-white text-md' onClick={exportExcelFile} >Export &rarr;</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {role === 'ADMIN' && <Link href="/addAbsensi" className='shadow-xl bg-blue hover:bg-blue/80 rounded-full text-white p-2 flex'><span className='hidden sm:inline mx-1'>Add Data</span><IoAdd size={25} /></Link>}
        </div>
      </div>
      {(role === 'ADMIN' || 'PRINCIPAL') && <Search />}
      <div className='my-2 flex items-center justify-end'>
        <DateFilter />
      </div>
      <Table>
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
              <TableCell><Badge className={(checkStatus(absensi.waktuMasuk, waktuMasukMaksimal, waktuPulang).status === "Tepat Waktu" ? "border-2 border-green text-green text-md px-4 py-2" : checkStatus(absensi.waktuMasuk, waktuMasukMaksimal, waktuPulang).status === "Terlambat" ? "border-2 border-red-600 text-red-600 text-md px-4 py-2" : "border-2 border-blue text-blue text-md px-4 py-2") + ' text-center'}>{checkStatus(absensi.waktuMasuk, waktuMasukMaksimal, waktuPulang).status}</Badge></TableCell>
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
  );
};

export default AbsensiTable;
