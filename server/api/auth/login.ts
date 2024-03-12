import { H3Event, sendError } from "h3";
import { getUserByEmail } from "~/prisma/repositories/userRepository"
import bcrypt from 'bcrypt';
import { makeSession } from "~/server/services/sessionService";
import { sanitizeUserForFrontend, validateUser } from "~/server/services/userService";


export default async (event: H3Event) => {
    const body = await readBody(event);
    const email: string = body.email;
    const password: string = body.password;
    const user = await getUserByEmail(email);

    if(user === null){
        sendError(event, createError({statusCode: 401, statusMessage: "Unauthenticated"}));
        return;
    }
    if (user.password !== null && user.password !== undefined) {
        const isPasswordCorrect = bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            sendError(event, createError({statusCode: 401, statusMessage: "Unauthenticated"}));
        }
    }
    else{
        sendError(event, createError({statusCode: 401, statusMessage: "Unauthenticated"}));
    }

    await makeSession(user, event);
    return sanitizeUserForFrontend(user);
};