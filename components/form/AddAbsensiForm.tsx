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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tanggalWaktuMasuk', tanggalWaktuMasuk);
        formData.append('jamWaktuMasuk', jamWaktuMasuk);
        formData.append('pegawaiId', selectedPegawai)
        await addAbsensi(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='mt-8 max-w-[400px] w-[50%]'>
            <div className="grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="pegawai">Nama:</Label>
                        <Select value={selectedPegawai} onValueChange={handleSelectChange} name="pegawai">
                            <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full">
                                <SelectValue placeholder="Pegawai" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="bg-white rounded-xl border-1 border-orange">
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

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="tanggalWaktuMasuk">Tanggal Absensi:</Label>
                        <Input id="tanggalWaktuMasuk" name="tanggalWaktuMasuk" placeholder="Tanggal Masuk" value={tanggalWaktuMasuk} onChange={handleDateChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="date" />
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
    );
};

export default AddDataAbsensi;
