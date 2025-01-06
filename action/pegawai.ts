"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { addLog } from "./log";
import { getGolonganById } from "./golongan";

const PegawaiSchema = z.object({
    namaPegawai: z.string().min(1, {message: "Nama Pegawai is required"}),
    pendidikan: z.string().min(1, {message: "Pendidikan is required"}),
    golongan: z.string().min(1, {message: "Golongan is required"}),
    // pin: z.string().min(6, {message: "Pin has to be 6 digit"}).max(6, {message: "Pin has to be 6 digit"}),
    tanggalMulaiKerja: z.string().min(1, {message: "Tanggal Mulai Kerja is required"}),
});

const AddPegawaiSchema = z.object({
    namaPegawai: z.string().min(1, {message: "Nama Pegawai is required"}),
    pendidikan: z.string().min(1, {message: "Pendidikan is required"}),
    golongan: z.string().min(1, {message: "Golongan is required"}),
    tanggalMulaiKerja: z.string().min(1, {message: "Tanggal Mulai Kerja is required"}),
});

const addPegawai = async (prevState: any, formData: FormData) => {
    const validatedFields = AddPegawaiSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const namaPegawai = validatedFields.data?.namaPegawai as string;
    const pendidikan = validatedFields.data?.pendidikan as string;
    const golonganId = Number(validatedFields.data?.golongan as string);
    // const pin = Number(validatedFields.data?.pin as string);
    const tanggalMulaiKerja = validatedFields.data?.tanggalMulaiKerja as string;
    const mulaiKerja = new Date(`${tanggalMulaiKerja}T00:00:00Z`);
    
    const pegawai = await db.pegawai.create({
        data: {
            namaPegawai,
            pendidikan,
            golonganId,
            // pin,
            mulaiKerja
        }
    })

    if (pegawai) {
        addLog('CREATE', `pegawai with value {"namaPegawai" : "${pegawai?.namaPegawai}", "pendidikan" : "${pegawai?.pendidikan}", "golonganId" : "${pegawai?.golonganId}", "mulaiKerja" : "${pegawai?.mulaiKerja}"}`);
        revalidatePath("/dataPegawai");
        redirect("/dataPegawai");
    }
}

const fetchAllPegawai = async (query?: string) => {
    const pegawai = await db.pegawai.findMany({
        include: {
            golongan: true
        },
        where: {
            namaPegawai: {
                contains: query,
                mode: "insensitive"
            }
        }
    })
    return pegawai
}


const deletePegawaiById = async (id: number) => {
    const pegawai = await db.pegawai.delete({
        where: {
            id
        }
    })

    if (pegawai) {
        addLog('DELETE', `pegawai with id ${id}`);
        revalidatePath("/dataPegawai");
    }
}

const getPegawaiById = async (id: number) => {
    const pegawai = await db.pegawai.findUnique({
        where: {
            id
        },
        include: {
            golongan: true
        }
    })
    return pegawai
}

const updatePegawaiById = async (prevState: any, formData: FormData) => {
    const validatedFields = PegawaiSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const id = formData.get("id") as string;

    const namaPegawai = validatedFields.data?.namaPegawai as string;
    const pendidikan = validatedFields.data?.pendidikan as string;
    const golonganId = Number(validatedFields.data?.golongan as string);
    const pin = +(formData.get("pin") as string);
    const tanggalMulaiKerja = validatedFields.data?.tanggalMulaiKerja as string;
    const mulaiKerja = new Date(`${tanggalMulaiKerja}T00:00:00Z`);

    const golonganData = await getGolonganById(golonganId)

    const prevPegawaiData = await getPegawaiById(Number(id));

    const prevNamaPegawai = prevPegawaiData?.namaPegawai as string;
    const prevPendidikan = prevPegawaiData?.pendidikan as string;
    const prevGolongan = prevPegawaiData?.golongan.namaGolongan as string;
    const prevPin = prevPegawaiData?.pin as number;
    const prevMulaiKerja = prevPegawaiData?.mulaiKerja as Date;

    let pegawai;
    if (pin !== 0) {
        pegawai = await db.pegawai.update({
            where: {
                id: Number(id),
            },
            data: {
                namaPegawai,
                pendidikan,
                golonganId,
                pin,
                mulaiKerja
            }
        });
    } else {
        pegawai = await db.pegawai.update({
            where: {
                id: Number(id),
            },
            data: {
                namaPegawai,
                pendidikan,
                golonganId,
                mulaiKerja
            }
        });
    }

    if (pegawai) {
        addLog('UPDATE', `pegawai with id ${id} from value {"namaPegawai" : "${prevNamaPegawai}", "pendidikan" : "${prevPendidikan}", "golongan" : "${prevGolongan}", "pin" : "${prevPin}", "mulaiKerja" : "${prevMulaiKerja}"} to value {"namaPegawai" : "${namaPegawai}", "pendidikan" : "${pendidikan}", "golongan" : "${golonganData?.namaGolongan}", "pin" : "${pin}", "mulaiKerja" : "${mulaiKerja}"}`);
        revalidatePath("/dataPegawai");
        redirect("/dataPegawai")
    }
}

export { fetchAllPegawai, addPegawai, deletePegawaiById, updatePegawaiById, getPegawaiById }