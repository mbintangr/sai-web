"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { z } from "zod";

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

const fetchAbsensiByPegawaiId_monthly = async (id: number, date: string) => {
    const whereClause: Prisma.AbsensiWhereInput = {
        pegawai: {
            id
        },
        ...(date && date !== '' ? {
            waktuMasuk: {
                gte: new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 1), // Start of the month
                lt: new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 1) // Start of the next month
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
}

const fetchAbsensiByPegawaiId_timeRange = async (id: number, startDate: string, endDate: string) => {
    const whereClause: Prisma.AbsensiWhereInput = {
        pegawai: {
            id
        },
        ...(startDate && startDate !== '' && endDate && endDate !== '' ? {
            waktuMasuk: {
                gte: new Date(startDate), // Start of the specified range
                lt: new Date(new Date(endDate).getTime() + 86400000) // End of the specified range (exclusive)
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

const AbsensiSchema = z.object({
    pegawai: z.string().min(1, {message: "Nama Pegawai is required"}),
    tanggalWaktuMasuk: z.string().min(1, {message: "Date is required"}),
    jamWaktuMasuk: z.string().min(1, {message: "Time is required"}),
});

const EditAbsensiSchema = z.object({
    tanggalWaktuMasuk: z.string().min(1, {message: "Date is required"}),
    jamWaktuMasuk: z.string().min(1, {message: "Time is required"}),
});

const updateAbsensiById = async (prevState: any, formData: FormData) => {
    const validatedFields = EditAbsensiSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }
    
    const tanggalWaktuMasuk = validatedFields.data?.tanggalWaktuMasuk as string;
    const jamWaktuMasuk = validatedFields.data?.jamWaktuMasuk as string;
    const id = Number(formData.get("absensiId") as string);

    const waktuMasuk = new Date(`${tanggalWaktuMasuk}T${jamWaktuMasuk}Z`);

    const absensi = await db.absensi.update({
        where: { 
            id 
        },
        data: { 
            waktuMasuk 
        }
    });

    if (absensi) {
        revalidatePath("/")
        redirect("/");
    } else {
        console.log(id, waktuMasuk);
    }
}


const addAbsensi = async (prevState: any, formData: FormData) => {
    const validatedFields = AbsensiSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const tanggalWaktuMasuk = validatedFields.data?.tanggalWaktuMasuk as string;
    const jamWaktuMasuk = validatedFields.data?.jamWaktuMasuk as string;
    const pegawaiId = Number(validatedFields.data?.pegawai as string);

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

export { fetchAllAbsensi, getAbsensiById, fetchAbsensiByPegawaiId, fetchAbsensiByPegawaiId_monthly, fetchAbsensiByPegawaiId_timeRange, deleteAbsensiById, updateAbsensiById, addAbsensi }