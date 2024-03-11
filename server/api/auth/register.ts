import { H3Event, sendError } from "h3";
import type { IUser } from "~/types/IUser";
import { createUser } from "~/prisma/repositories/userRepository"
import bcrypt from 'bcrypt';
import { makeSession } from "~/server/services/sessionService";
import { doesUserExists } from "~/server/services/userService";
import { eventHandler } from 'h3';

const yourEventHandler = eventHandler(async (event) => {
    const body = await readBody(event);
    const name = body.name;
    const username = body.username;
    const email: string = body.email;
    const password: string = body.password;

    const userExists = await doesUserExists(email, username);

    if(userExists.value === true){
        sendError(event, createError({statusCode: 422, statusMessage: userExists.message}));
    }

    const encryptedPassword: string = await bcrypt.hash(password, 10);
    const userData: IUser = {
        username: username,
        name: name,
        email: email,
        password: encryptedPassword,
    }
    const user = await createUser(userData);


    return await makeSession(user, event);
});
  
export default yourEventHandler;