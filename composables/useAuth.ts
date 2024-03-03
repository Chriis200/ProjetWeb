import type { ISession } from "~/types/ISession";
import type { IUser } from "~/types/IUser";
import { useRouter, useState } from "nuxt/app";


export const useAuthCookie = () => useCookie('auth_token');

export async function useUser(): Promise<IUser | null> {
    const authCookie = useAuthCookie().value;
    const user = useState<IUser | null>('user');

    if(authCookie && !user.value){
        const {data} = await useFetch("/api/auth/getAuthByToken", {
            headers: useRequestHeaders(['cookie'])
        })

        user.value = data.value;
    }

    return user.value;
}


export async function logout() {
    await useFetch("/api/auth/logout");
    useState('user').value = null;
    await useRouter().push('/');
}

export async function registerWithEmail(username:string,name:string,email:string,password:string) {
    try {
        const res = await $fetch<ISession>('/api/auth/register', {
            method: "POST",
            body: {username, name, email, password}
        })

        if(res){
            useState('user').value = res;
            await useRouter().push('/about');
        }
    } catch(e){
        console.log("error: ");
    }
}