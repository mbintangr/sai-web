"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { Prisma, User } from "@prisma/client";
import { z } from "zod";

const UserLoginSchema = z.object({
    username: z.string().min(1, {message: "Username is required"}),
    password: z.string().min(1, {message: "Password is required"}),
})

const UserSchema = z.object({
    pegawai: z.string().min(1, {message: "Pegawai is required"}),
    username: z.string().min(1, {message: "Username is required"}),
    password: z.string().min(1, {message: "Password is required"}),
    rePassword: z.string().min(1, {message: "Re-Password is required"}),
    role: z.string().min(1, {message: "Role is required"}),
}).refine(data => data.password === data.rePassword, {
    message: "Password does not match",
    path: ["rePassword"]
})

const login = async (prevState: any, formData: FormData) => {
    const validatedFields = UserLoginSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    try {

        const user = await db.user.findUnique({
            where: {
                username: validatedFields.data?.username
            },
            select: {
                password: true
            }
        })

        if (!user) {
            return {
                error: {
                    username: "User not found"
                }
            }
        } else if (user.password !== validatedFields.data?.password) {
            return {
                error: {
                    password: "Wrong password"
                }
            }
        }

        const result = await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            username: validatedFields.data?.username,
            password: validatedFields.data?.password
        })

        if (result?.error) {
            return result.error;
        }

    } catch (error) {
        const someError = error as CredentialsSignin
        console.log(someError.message.toString);
        return someError.cause
    }

    revalidatePath('/login')
    redirect("/")
}


const register = async (prevState: any, formData: FormData) => {
    const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const pegawaiId = validatedFields.data.pegawai as string;
    const username = validatedFields.data.username as string;
    const password = validatedFields.data.password as string;
    const rePassword = validatedFields.data.rePassword as string;
    const role = validatedFields.data.role as User["role"];


    const existingUser = await db.user.findUnique({
        where: {
            username: username
        }
    })

    if(existingUser) {
        return {
            error: {
                pegawai: "",
                username: "User already exists",
                password: "",
                rePassword: "",
                role: "",
            }
        }
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

const updateUser = async (prevState: any, formData: FormData) => {
    const validatedFields = UserSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const id = formData.get("userId") as string;
    const pegawaiId = validatedFields.data.pegawai as string;
    const username = validatedFields.data.username as string;
    const password = validatedFields.data.password as string;
    const rePassword = validatedFields.data.rePassword as string;
    const role = validatedFields.data.role as User["role"];

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

const fetchAllUser = async (query?: string) => {
    const user = await db.user.findMany({
        include: {
            pegawai: true,
        },
        where: {
            OR: [
                {
                    username: {
                        contains: query,
                        mode: "insensitive"
                    }
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
        orderBy: {
            role: 'asc',
        }
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