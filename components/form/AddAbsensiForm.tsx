"use client";

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAbsensi } from '@/action/absensi';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFormState } from 'react-dom';

interface AddDataAbsensiProps {
    dataPegawai: { id: number; namaPegawai: string }[];
}

const AddDataAbsensi = ({ dataPegawai }: AddDataAbsensiProps) => {
    const [tanggalWaktuMasuk, setTanggalWaktuMasuk] = useState('');
    const [jamWaktuMasuk, setJamWaktuMasuk] = useState('');
    const [selectedPegawai, setSelectedPegawai] = useState('');

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTanggalWaktuMasuk(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJamWaktuMasuk(e.target.value);
    };

    const handleSelectChange = (value: string) => {
        setSelectedPegawai(value);
    };

    const [state, formAction] = useFormState(addAbsensi, null);
    
    return (
        <form action={formAction} className=''>
            <div className="grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="pegawai">Nama:</Label>
                        <Select onValueChange={handleSelectChange} name="pegawai">
                            <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full">
                                <SelectValue placeholder="Nama Pegawai" />
                            </SelectTrigger>
                            <SelectContent className='bg-light-orange text-orange rounded-xl shadow-md'>
                                <SelectGroup className="rounded-xl border-1 border-orange bg-light-orange text-orange">
                                    <SelectLabel>Nama Pegawai</SelectLabel>
                                    {dataPegawai.map((pegawai) => (
                                        <SelectItem key={pegawai.id} value={pegawai.id.toString()} className="hover:cursor-pointer">
                                            {pegawai.namaPegawai}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.pegawai}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="tanggalWaktuMasuk">Tanggal Absensi:</Label>
                        <Input id="tanggalWaktuMasuk" name="tanggalWaktuMasuk" placeholder="Tanggal Masuk" value={tanggalWaktuMasuk} onChange={handleDateChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="date" />
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
    );
};

export default AddDataAbsensi;
