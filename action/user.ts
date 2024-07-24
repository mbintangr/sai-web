"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

const login = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {

        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            username,
            password
        })

    } catch (error) {
        const someError = error as CredentialsSignin
        return someError.cause
    }

    redirect("/")
}


/* const register = async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!firstName || !lastName || !email || !password) {
        throw new Error("Please provide all the necessary information");
    }


    const existingUser = await db.user.findUnique({
        where: {
            username: username
        }
    })

    if(existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })

    if (!user) {
        throw new Error("Failed to create user");
    } else {
        console.log(user.firstName, user.lastName, user.email, user.password);
        redirect("/login");
    }


}; */

const fetchAllUser = async () => {
    const users = await db.user.findMany({})
    return users
}

const getUserByUserId = async (userId: string) => {
    const pegawai = await db.user.findUnique({
        where: {
            id: userId
        },
        include: {
            pegawai: true,
        }
    })
    return pegawai
}

const fetchAbsensiByPegawaiId = async (pegawaiId: number, query?: string) => {
    const absensi = await db.absensi.findMany({
        where: {
            AND: [{
                    pegawaiId: {
                        equals: pegawaiId
                    },
                },
                {
                    pegawai: {
                        namaPegawai: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }
                }
            ]
        },
        include: {
            pegawai: true
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

const fetchAllAbsensi = async (query?: string) => {
    const absensi = await db.absensi.findMany({
        where: {
            pegawai: {
                namaPegawai: {
                    contains: query,
                    mode: "insensitive"
                }
            }
        },

        include: {
            pegawai: true
        }
    })
    return absensi
}

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

    // Combine date and time into a single Date object
    const waktuMasuk = new Date(`${tanggalWaktuMasuk}T${jamWaktuMasuk}`);

    const absensi = await db.absensi.update({
        where: {
            id
        },
        data: {
            waktuMasuk: waktuMasuk
        }
    });

    redirect("/")
}

const addAbsensi = async (formData: FormData) => {
    const tanggalWaktuMasuk = formData.get("tanggalWaktuMasuk") as string;
    const jamWaktuMasuk = formData.get("jamWaktuMasuk") as string;
    const pegawaiId = Number(formData.get("pegawaiId") as string);

    if (!tanggalWaktuMasuk || !jamWaktuMasuk) {
        throw new Error("Both date and time must be provided");
    }

    const waktuMasuk = new Date(`${tanggalWaktuMasuk}T${jamWaktuMasuk}`);

    await db.absensi.create({
        data: {
            pegawaiId: pegawaiId,
            waktuMasuk: waktuMasuk
        }
    });

    redirect("/")
}

const fetchAllPegawai = async () => {
    const pegawai = await db.pegawai.findMany({})
    return pegawai
}

export { login, fetchAllUser, getUserByUserId, fetchAllAbsensi, getAbsensiById, fetchAbsensiByPegawaiId, deleteAbsensiById, updateAbsensiById, addAbsensi, fetchAllPegawai }