'use client'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useFormState } from 'react-dom';
import { updateAbsensiSettings, updateKalkulasiSettings } from '@/action/settings';
import { Button } from '../ui/button';

interface SettingsFormProps {
    waktuMasukMaksimal: any;
    waktuPulang: any;
    reportParameters: Array<string>;
}

const SettingsForm = ({ waktuMasukMaksimal, waktuPulang, reportParameters }: SettingsFormProps) => {

    const getTimeString = (timeStr: any) => {
        const [hours, minutes] = timeStr.split(':');
        return `${hours}:${minutes}`;
    }

    const [waktuMasukMaksimalStr, setWaktuMasukMaksimalStr] = useState(getTimeString(waktuMasukMaksimal.value));
    const [waktuPulangStr, setWaktuPulangStr] = useState(getTimeString(waktuPulang.value));

    const handleWaktuMasukMaksimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaktuMasukMaksimalStr(e.target.value);
    }

    const handleWaktuPulangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaktuPulangStr(e.target.value);
    }

    const [stateAbsensi, formUpdateAbsensiAction] = useFormState(updateAbsensiSettings, null);

    const [potonganYangDitoleransiStr, setPotonganYangDitoleransiStr] = useState(reportParameters[0]);
    const [potonganKeterlambatanPerMenitStr, setPotonganKeterlambatanPerMenitStr] = useState(reportParameters[1]);
    const [potonganKetidakhadiranPerHariStr, setPotonganKetidakhadiranPerHariStr] = useState(reportParameters[2]);
    const [jumlahJamPerHariStr, setJumlahJamPerHariStr] = useState(reportParameters[3]);

    const handlePotonganYangDitoleransiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPotonganYangDitoleransiStr(e.target.value);
    }

    const handlePotonganKeterlambatanPerMenitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPotonganKeterlambatanPerMenitStr(e.target.value);
    }

    const handlePotonganKetidakhadiranPerHariChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPotonganKetidakhadiranPerHariStr(e.target.value);
    }

    const handleJumlahJamPerHariChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJumlahJamPerHariStr(e.target.value);
    }
    
    const [stateKalkulasi, formUpdateKalkulasiAction] = useFormState(updateKalkulasiSettings, null);

    return (
        <div className='space-y-8'>
            <form className='space-y-2' action={formUpdateAbsensiAction}>
                <h2 className="font-bold text-xl">Absensi</h2>
                <div className='flex flex-col items-start w-full gap-2 text-sm'>
                    <div className="grid grid-cols-2 items-center justify-center">
                        <Label className="text-sm mr-4" htmlFor="waktuMasukMaksimal">Waktu Masuk Maksimal</Label>
                        <Input
                            className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-fit"
                            type="time"
                            id="waktuMasukMaksimal"
                            name="waktuMasukMaksimal"
                            defaultValue={waktuMasukMaksimalStr}
                            value={waktuMasukMaksimalStr}
                            onChange={handleWaktuMasukMaksimalChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center justify-center">
                        <Label className="text-sm mr-4" htmlFor="waktuPulang">Waktu Pulang</Label>
                        <Input
                            className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-fit"
                            type="time"
                            id="waktuPulang"
                            name="waktuPulang"
                            defaultValue={waktuPulangStr}
                            value={waktuPulangStr}
                            onChange={handleWaktuPulangChange}
                        />
                    </div>
                    <div className="w-full flex items-center justify-start">
                        <Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4" type="submit" onClick={() => {alert('Settings updated successfully');}}>Save</Button>
                    </div>
                </div>
            </form>

            <form action={formUpdateKalkulasiAction} className='space-y-2'>
                <h2 className="font-bold text-xl">Kalkulasi Laporan</h2>
                <div className='flex flex-col items-start gap-2 text-sm'>
                    <div className="grid grid-cols-2 items-center justify-center">
                        <Label className="text-sm mr-4" htmlFor="potonganYangDitoleransi">Potongan yang Ditoleransi</Label>
                        <div className='flex justify-between items-center space-x-4'>
                            <Input
                                className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full"
                                type="text"
                                id="potonganYangDitoleransi"
                                name="potonganYangDitoleransi"
                                placeholder="Jumlah Toleransi Potongan"
                                defaultValue={potonganYangDitoleransiStr}
                                value={potonganYangDitoleransiStr}
                                onChange={handlePotonganYangDitoleransiChange}
                            />
                            <p className='w-full'>Rupiah</p>
                        </div>
                        <p className='text-red-600 text-xs'>{stateKalkulasi?.error?.potonganYangDitoleransi}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center justify-center">
                        <Label className="text-sm mr-4" htmlFor="potonganKeterlambatanPerMenit">Potongan Keterlambatan</Label>
                        <div className='flex justify-between items-center space-x-4'>
                            <Input
                                className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full"
                                type="text"
                                id="potonganKeterlambatanPerMenit"
                                name="potonganKeterlambatanPerMenit"
                                placeholder="Jumlah Potongan Keterlambatan per Menit"
                                defaultValue={potonganKeterlambatanPerMenitStr}
                                value={potonganKeterlambatanPerMenitStr}
                                onChange={handlePotonganKeterlambatanPerMenitChange}
                            />
                            <p className='w-full'>/ Menit</p>
                        </div>
                        <p className='text-red-600 text-xs'>{stateKalkulasi?.error?.potonganKeterlambatanPerMenit}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center justify-center">
                        <Label className="text-sm mr-4" htmlFor="potonganKetidakhadiranPerHari">Potongan Ketidakhadiran</Label>
                        <div className='flex justify-between items-center space-x-4'>
                            <Input
                                className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full"
                                type="text"
                                id="potonganKetidakhadiranPerHari"
                                name="potonganKetidakhadiranPerHari"
                                placeholder="Jumlah Potongan Ketidakhadiran per Hari"
                                defaultValue={potonganKetidakhadiranPerHariStr}
                                value={potonganKetidakhadiranPerHariStr}
                                onChange={handlePotonganKetidakhadiranPerHariChange}
                            />
                            <p className='w-full'>/ Hari</p>
                        </div>
                        <p className='text-red-600 text-xs'>{stateKalkulasi?.error?.potonganKetidakhadiranPerHari}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center justify-center">
                        <Label className="text-sm mr-4" htmlFor="jumlahJamPerHari">Jumlah Jam Kerja</Label>
                        <div className='flex justify-between items-center space-x-4'>
                            <Input
                                className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full"
                                type="text"
                                id="jumlahJamPerHari"
                                name="jumlahJamPerHari"
                                placeholder="Jumlah Jam Kerja per Hari"
                                defaultValue={jumlahJamPerHariStr}
                                value={jumlahJamPerHariStr}
                                onChange={handleJumlahJamPerHariChange}
                            />
                            <p className='w-full'>Jam / Hari</p>
                        </div>
                        <p className='text-red-600 text-xs'>{stateKalkulasi?.error?.jumlahJamPerHari}</p>
                    </div>
                    <div className="w-full flex items-center justify-start">
                        <Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4" type="submit" onClick={() => {alert('Settings updated successfully');}}>Save</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SettingsForm