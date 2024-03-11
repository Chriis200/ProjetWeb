import { getUserByEmail, getUserByUsername } from "~/prisma/repositories/userRepository";
import type { IUser } from "~/types/IUser";

type ExistsCheck = {
    value: boolean
    message?: string
}

type RegistrationErrors = {
    emailError?: string
    usernameError?: string
}

export async function doesUserExists(email: string, username: string): Promise<ExistsCheck> {
    const hasEmail = await getUserByEmail(email);
    const hasUsername = await getUserByUsername(email);
    const emailExists = hasEmail !== null;
    const usernameExists = hasUsername !== null;

    console.log(hasEmail)

    const errors: RegistrationErrors = {};
    
    if(emailExists){
        errors.emailError = `This email, ${email}, is already registered !`;
    }
    if(usernameExists){
        errors.usernameError = `This username, ${username}, is already registered !`;
    }
    if(emailExists || usernameExists){
        const message = JSON.stringify(errors);
        return {value: true, message};
    }

    return {value: false};
}

export function sanitizeUserForFrontend(user: IUser | undefined): IUser|undefined{
    if(!user){
        return user;
    }

    delete user.password;

    return user;
}