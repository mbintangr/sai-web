"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractDate, extractTime } from '@/lib/date';
import { updateAbsensiById } from '@/action/absensi';
import { useFormState } from 'react-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const EditDataAbsensi = ({ absensiData, pegawaiData }: { absensiData: any, pegawaiData: { id: number; namaPegawai: string}[] }) => {
    const [tanggalWaktuMasuk, setTanggalWaktuMasuk] = useState('');
    const [jamWaktuMasuk, setJamWaktuMasuk] = useState('');
    const [selectedPegawai, setSelectedPegawai] = useState(absensiData.pegawaiId.toString());

    useEffect(() => {
        if (absensiData?.waktuMasuk) {
            setTanggalWaktuMasuk(extractDate(absensiData.waktuMasuk));
            setJamWaktuMasuk(extractTime(absensiData.waktuMasuk));
        }
    }, [absensiData]);

    const handleDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTanggalWaktuMasuk(e.target.value);
    };

    const handleTimeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setJamWaktuMasuk(e.target.value);
    };

    const handleSelectChange = (value: string) => {
        setSelectedPegawai(value);
    };

    const [state, formAction] = useFormState(updateAbsensiById, null);
    
    return (
        <form action={formAction} className=''>
            <div className="grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                    <input type="hidden" name="absensiId" id="absensiId" value={absensiData?.id} />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                    <Label htmlFor="pegawai">Nama:</Label>
                        <Select value={selectedPegawai} onValueChange={handleSelectChange} name="pegawai" disabled>
                            <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full">
                                <SelectValue placeholder="Nama Pegawai" />
                            </SelectTrigger>
                            <SelectContent className='bg-light-orange text-orange rounded-xl shadow-md'>
                                <SelectGroup className="rounded-xl border-1 border-orange bg-light-orange text-orange">
                                    <SelectLabel>Nama Pegawai</SelectLabel>
                                    {pegawaiData.map((pegawai) => (
                                        <SelectItem key={pegawai.id} value={pegawai.id.toString()} className="hover:cursor-pointer">
                                            {pegawai.namaPegawai}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="tanggalWaktuMasuk">Tanggal Absensi:</Label>
                        <Input id="tanggalWaktuMasuk" name="tanggalWaktuMasuk" placeholder="Jam Masuk" value={tanggalWaktuMasuk} onChange={handleDateChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="date" />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.tanggalWaktuMasuk}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="jamWaktuMasuk">Jam Absensi:</Label>
                        <Input id="jamWaktuMasuk" name="jamWaktuMasuk" placeholder="Jam Masuk" value={jamWaktuMasuk} onChange={handleTimeChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="time" />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.jamWaktuMasuk}</p>

                    <div className="w-full flex items-center justify-start">
                        <Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4" type="submit">Save</Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditDataAbsensi;
