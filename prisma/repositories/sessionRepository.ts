import type { IUser } from "~/types/IUser";
import prisma from "../client";
import type { ISession } from "~/types/ISession";


export async function createSession(sessionData: ISession): Promise<ISession> {
    if (!sessionData.authToken) {
      throw Error('missing auth token for session')
    }
    if (!sessionData.userId) {
        throw Error('missing userId')
      }
    
    return await prisma.session.create({
      data: {
        userId: sessionData.userId,
        authToken: sessionData.authToken
      }
    })
}

export async function gestSessionByAuthToken(authToken: string): Promise<ISession | null> {
    const user: IUser | null = await getUserByAuthToken(authToken);
    
    if (user) {
        return { authToken, user };
    } else {
        return null;
    }
}

async function getUserByAuthToken(authToken: string): Promise<IUser | null>{

    const session = await prisma.session.findUnique({
        where: {
            authToken: authToken
        }
    });

    if (session && session.userId) {
        const user = await prisma.utilisateur.findUnique({
            where: {
                id: session.userId
            }
        });
        
        if (user) {
            return user as IUser;
        } else {
            return null; // Utilisateur introuvable pour l'ID de session donné
        }
    } else {
        return null; // Session introuvable ou utilisateur non défini dans la session
    }
}