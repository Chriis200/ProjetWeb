import { getUserBySessionToken } from "~/server/services/sessionService";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
    const authToken = getCookie(event,'auth_token');
    if(!authToken) {
        return null
      }
    const user = await getUserBySessionToken(authToken);

    return user;
});