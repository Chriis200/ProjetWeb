import { H3Event, setCookie } from "h3";

export default async(event: H3Event) => {
    setCookie(event, 'auth_token', "");
}