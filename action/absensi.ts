"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

const fetchAbsensiByPegawaiId = async (id: number, date?: string) => {
    const whereClause: Prisma.AbsensiWhereInput = {
        pegawai: {
            id
        },
        ...(date && date !== '' ? {
            waktuMasuk: {
                gte: new Date(`${date}T00:00:00.000Z`), // Start of the day in UTC
                lt: new Date(`${date}T23:59:59.999Z`)  // End of the day in UTC
            }
        } : {}),
    };

    const absensi = await db.absensi.findMany({
        where: whereClause,
        include: {
            pegawai: true
        },
        orderBy: {
            waktuMasuk: 'desc'
        }
    })
    
    return absensi
}

const getAbsensiById = async (id: number) => {
    const absensi = await db.absensi.findUnique({
        where: {
            id
        }, 
        include: {
            pegawai: true
        }
    })
    return absensi
}

const fetchAllAbsensi = async (query?: string, date?: string) => {
    const whereClause: Prisma.AbsensiWhereInput = {
        pegawai: {
            namaPegawai: {
                contains: query,
                mode: "insensitive"
            }
        },
        ...(date && date !== '' ? {
            waktuMasuk: {
                gte: new Date(`${date}T00:00:00.000Z`), // Start of the day in UTC
                lt: new Date(`${date}T23:59:59.999Z`)  // End of the day in UTC
            }
        } : {}),
    };

    const absensi = await db.absensi.findMany({
        where: whereClause,
        include: {
            pegawai: true
        },
        orderBy: {
            waktuMasuk: 'desc'
        }
    });

    return absensi;
};


const deleteAbsensiById = async (id: number) => {
    const absensi = await db.absensi.delete({
        where: {
            id
        }
    })

    revalidatePath("/")
}

const updateAbsensiById = async (id: number, formData: FormData) => {
    const tanggalWaktuMasuk = formData.get("tanggalWaktuMasuk") as string;
    const jamWaktuMasuk = formData.get("jamWaktuMasuk") as string;

    if (!tanggalWaktuMasuk || !jamWaktuMasuk) {
        throw new Error("Both date and time must be provided");
    }

    // Combine date and time into a single string and parse as UTC
    const dateStr = new Date(`${tanggalWaktuMasuk}T${jamWaktuMasuk}Z`);

    const absensi = await db.absensi.update({
        where: { id },
        data: { waktuMasuk: dateStr }
    });

    redirect("/");
}


const addAbsensi = async (formData: FormData) => {
    const tanggalWaktuMasuk = formData.get("tanggalWaktuMasuk") as string;
    const jamWaktuMasuk = formData.get("jamWaktuMasuk") as string;
    const pegawaiId = Number(formData.get("pegawaiId") as string);

    if (!tanggalWaktuMasuk || !jamWaktuMasuk) {
        throw new Error("Both date and time must be provided");
    }

    const waktuMasuk = new Date(`${tanggalWaktuMasuk}T${jamWaktuMasuk}Z`);

    const absensi = await db.absensi.create({
        data: {
            pegawaiId: pegawaiId,
            waktuMasuk: waktuMasuk
        }
    });

    if (absensi) {
        revalidatePath("/")
        redirect("/")
    } else {
        console.log(pegawaiId, waktuMasuk);
    }

}

export { fetchAllAbsensi, getAbsensiById, fetchAbsensiByPegawaiId, deleteAbsensiById, updateAbsensiById, addAbsensi }