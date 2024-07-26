"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { Prisma, User } from "@prisma/client";
import { hash } from "bcryptjs";

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


const register = async (formData: FormData) => {
    const pegawaiId = formData.get("pegawaiId") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const rePassword = formData.get("rePassword") as string;
    const role = formData.get("role") as User["role"];

    if (!pegawaiId || !username || !password || !rePassword || !role) {
        throw new Error("Please provide all the necessary information");
    }

    if (password !== rePassword) {
        throw new Error("Passwords do not match");
    }


    const existingUser = await db.user.findUnique({
        where: {
            username: username
        }
    })

    if(existingUser) {
        throw new Error("User already exists");
    }

    const user: User = await db.user.create({
        data: {
            username,
            password,
            role,
            pegawaiId: Number(pegawaiId)
        }
    })

    if (!user) {
        throw new Error("Failed to create user");
    } else {
        revalidatePath("/dataUser");
        redirect("/dataUser");
    }


};

const fetchAllUser = async (query?: string) => {
    const user = await db.user.findMany({
        include: {
            pegawai: true,
        },
        where: {
            username: {
                contains: query,
                mode: "insensitive"
            }
        },
    })
    return user
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

const updateUser = async (id: string, formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const rePassword = formData.get("rePassword") as string;
    const role = formData.get("role") as User["role"];
    const pegawaiId = formData.get("pegawaiId") as string;

    if (!username || !password || !rePassword || !role || !pegawaiId) {
        throw new Error("Please provide all the necessary information");
    }

    if (password !== rePassword) {
        throw new Error("Passwords do not match");
    }

    const user = await db.user.update({
        where: {
            id
        },
        data: {
            username,
            password,
            role,
            pegawaiId: Number(pegawaiId)
        }
    })

    if (user) {
        revalidatePath("/dataUser")
        redirect("/dataUser")
    } else {
        throw new Error("Failed to update user");
    }
}

const deleteUserByUserId = async (id: string) => {
    const user = await db.user.delete({
        where: {
            id
        }
    })

    if (user) {
        revalidatePath("/")
    } else {
        throw new Error("Failed to delete user");
    }
}

export { login, register, updateUser, fetchAllUser, getUserByUserId, deleteUserByUserId }