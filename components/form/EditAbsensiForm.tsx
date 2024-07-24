"use client";

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractDate, extractTime } from '@/lib/date';
import { updateAbsensiById } from '@/action/user';

const EditDataAbsensi = ({ absensiData }: { absensiData: any }) => {
    const [tanggalWaktuMasuk, setTanggalWaktuMasuk] = useState('');
    const [jamWaktuMasuk, setJamWaktuMasuk] = useState('');

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tanggalWaktuMasuk', tanggalWaktuMasuk);
        formData.append('jamWaktuMasuk', jamWaktuMasuk);
        await updateAbsensiById(absensiData.id, formData);
    };

    return (
        <form onSubmit={handleSubmit} className='mt-8 max-w-[400px] w-[50%]'>
            <div className="grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="name">Nama:</Label>
                        <Input id="name" name="name" placeholder="name" value={absensiData?.pegawai.namaPegawai} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full" type="text" disabled />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="tanggalWaktuMasuk">Tanggal Absensi:</Label>
                        <Input id="tanggalWaktuMasuk" name="tanggalWaktuMasuk" placeholder="Jam Masuk" value={tanggalWaktuMasuk} onChange={handleDateChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="date" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="jamWaktuMasuk">Jam Absensi:</Label>
                        <Input id="jamWaktuMasuk" name="jamWaktuMasuk" placeholder="Jam Masuk" value={jamWaktuMasuk} onChange={handleTimeChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="time" />
                    </div>

                    <div className="w-full flex items-center justify-start">
                        <Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4" type="submit">Save</Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditDataAbsensi;
