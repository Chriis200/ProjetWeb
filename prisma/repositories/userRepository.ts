import prisma from "../client";
import type { IUser } from "~/types/IUser";

export async function getUserByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.utilisateur.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            username: true
        }
    });

    if (user) {
        return user as IUser;
    } else {
        return null;
    }
}

export async function getUserByUsername(username: string): Promise<IUser | null> {
    const user = prisma.utilisateur.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true
        }
    })

    if (user) {
        return user as IUser;
    } else {
        return null;
    }
}

export async function createUser(data: IUser) {
    const user = await prisma.utilisateur.create({
        data: {
            username: data.username,
            name: data.name,
            email: data.email || "",
            password: data.password,
        },
    })

    return user;
}