'use server';
import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getSettingsValueByName = async (variableName: string) => {
    const webSettings = await db.webSettings.findUnique({
        where: {
            name: variableName
        }
    })

    return webSettings
}

const getReportParameters = async () => {
    const reportParameters: Array<string> = []
    const potonganYangDiToleransi = await db.webSettings.findUnique({
        where: {
            name: 'potonganYangDiToleransi'
        }
    })

    if (potonganYangDiToleransi) {
        reportParameters.push(potonganYangDiToleransi.value)
    } else {
        reportParameters.push('')
    }

    const potonganKeterlambatanPerMenit = await db.webSettings.findUnique({
        where: {
            name: 'potonganKeterlambatanPerMenit'
        }
    })

    if (potonganKeterlambatanPerMenit) {
        reportParameters.push(potonganKeterlambatanPerMenit.value)
    } else {
        reportParameters.push('')
    }

    const potonganKetidakhadiranPerHari = await db.webSettings.findUnique({
        where: {
            name: 'potonganKetidakhadiranPerHari'
        }
    })

    if (potonganKetidakhadiranPerHari) {
        reportParameters.push(potonganKetidakhadiranPerHari.value)
    } else {
        reportParameters.push('')
    }

    const jumlahJamPerHari = await db.webSettings.findUnique({
        where: {
            name: 'jumlahJamPerHari'
        }
    })

    if (jumlahJamPerHari) {
        reportParameters.push(jumlahJamPerHari.value)
    } else {
        reportParameters.push('')
    }

    return reportParameters
}

const getAllSettings = async () => {
    const webSettings = await db.webSettings.findMany({})
    return webSettings
}

const AbsensiSettingsSchema = z.object({
    waktuMasukMaksimal: z.string().min(1, {message: "Waktu Masuk Maksimal is required"}),
    waktuPulang: z.string().min(1, {message: "Waktu Pulang is required"}),
})

const updateAbsensiSettings = async (prevState: any, formData: FormData) => {
    const validatedFields = AbsensiSettingsSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const waktuMasukMaksimalStr = validatedFields.data?.waktuMasukMaksimal as string;
    const waktuPulangStr = validatedFields.data?.waktuPulang as string;
    
    const waktuMasukMaksimal = waktuMasukMaksimalStr + ':00.000';
    const waktuPulang = waktuPulangStr + ':00.000';

    const newWaktuMasukMaksimal = await db.webSettings.update({
        where: {
            name: "waktuMasukMaksimal"
        },
        data: {
            value: waktuMasukMaksimal
        }
    })

    const newWaktuPulang = await db.webSettings.update({
        where: {
            name: "waktuPulang"
        },
        data: {
            value: waktuPulang
        }
    })

    if (newWaktuMasukMaksimal && newWaktuPulang) {
        revalidatePath('/settings');
        redirect('/settings');
    } else {
        console.log({
            error: "Failed to update settings"
        }); 
    }
}

const KalkulasiSettingsSchema = z.object({
    potonganYangDitoleransi: z.string().min(1, {message: "Potongan Yang Di Toleransi is required"}),
    potonganKeterlambatanPerMenit: z.string().min(1, {message: "Potongan Keterlambatan Per Menit is required"}),
    potonganKetidakhadiranPerHari: z.string().min(1, {message: "Potongan Ketidakhadiran Per Hari is required"}),
    jumlahJamPerHari: z.string().min(1, {message: "Jumlah Jam Per Hari is required"}),
})

const updateKalkulasiSettings = async (prevState: any, formData: FormData) => {
    const validatedFields = KalkulasiSettingsSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    } else {
        console.log('Success!');
    }

    const potonganYangDiToleransi = validatedFields.data?.potonganYangDitoleransi as string;
    const potonganKeterlambatanPerMenit = validatedFields.data?.potonganKeterlambatanPerMenit as string;
    const potonganKetidakhadiranPerHari = validatedFields.data?.potonganKetidakhadiranPerHari as string;
    const jumlahJamPerHari = validatedFields.data?.jumlahJamPerHari as string;

    const newPotonganYangDiToleransi = await db.webSettings.update({
        where: {
            name: "potonganYangDiToleransi"
        },
        data: {
            value: potonganYangDiToleransi
        }
    })

    const newPotonganKeterlambatanPerMenit = await db.webSettings.update({
        where: {
            name: "potonganKeterlambatanPerMenit"
        },
        data: {
            value: potonganKeterlambatanPerMenit
        }
    })

    const newPotonganKetidakhadiranPerHari = await db.webSettings.update({
        where: {
            name: "potonganKetidakhadiranPerHari"
        },
        data: {
            value: potonganKetidakhadiranPerHari
        }
    })

    const newJumlahJamPerHari = await db.webSettings.update({
        where: {
            name: "jumlahJamPerHari"
        },
        data: {
            value: jumlahJamPerHari
        }
    })

    if (newPotonganYangDiToleransi && newPotonganKeterlambatanPerMenit && newPotonganKetidakhadiranPerHari && newJumlahJamPerHari) {
        revalidatePath('/settings');
        redirect('/settings');
    } else {
        console.log({
            error: "Failed to update settings"
        }); 
    }
}

export { getSettingsValueByName, updateAbsensiSettings, updateKalkulasiSettings, getReportParameters }