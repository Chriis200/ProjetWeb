import { H3Event, sendError } from "h3";
import type { IUser } from "~/types/IUser";
import { createUser } from "~/prisma/repositories/userRepository"
import bcrypt from 'bcrypt';
import { makeSession } from "~/server/services/sessionService";
import type { RegistationRequest } from '~~/types/IRegistration';
import { validateUser } from "~/server/services/userService";

export default async (event: H3Event) => {
    const body = await readBody(event);
    const data = body.data as RegistationRequest;

    const validation = await validateUser(data);
    if (validation.hasErrors === true) {
        if (validation.errors) {
            const errors = JSON.stringify(Object.fromEntries(validation.errors));
            sendError(event, createError({ statusCode: 422, data: errors }));
        } 
    }
    
    let encryptedPassword:string;
    if (data.password !== undefined) {
        encryptedPassword = await bcrypt.hash(data.password, 10);
        // Utilisez encryptedPassword comme nécessaire
    } else {
        throw new Error("Le mot de passe doit être défini.");
    }
    const userData: IUser = {
        username: data.username,
        name: data.name,
        email: data.email,
        password: encryptedPassword,
    }
    const user = await createUser(userData);


    return await makeSession(user, event);
};