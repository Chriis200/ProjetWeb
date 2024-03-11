import { H3Event } from "h3";
import type { IUser } from "~/types/IUser";
import { v4 as uuidv4 } from 'uuid';
import { createSession, gestSessionByAuthToken } from "~/prisma/repositories/sessionRepository";
import { sanitizeUserForFrontend } from "./userService";

export async function makeSession(user: IUser, event: H3Event): Promise<IUser | undefined> {
    const authToken = uuidv4().replaceAll('-', '');
    const session = await createSession({ authToken, userId: user.id });
    const userId = session.userId;

    if (userId) {
        setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true });
        return getUserBySessionToken(authToken);
    }

    return undefined;
}

export async function getUserBySessionToken(authToken: string): Promise<IUser | undefined> {
    const session = await gestSessionByAuthToken(authToken);
    if(session === null){return;}
    return sanitizeUserForFrontend(session.user);
}