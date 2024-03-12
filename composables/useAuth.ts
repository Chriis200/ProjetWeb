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

export async function registerWithEmail(username: string, name: string, email: string, password: string): Promise<FormValidation|undefined> {
  try {
    const { data, error } = await useFetch<ISession>('/api/auth/register', {
      method: 'POST',
      body: { data: { username, name, email, password } }
    })

    if (error.value) {
      type ErrorData = {
        data: ErrorData
      }

      const errorData = error.value as unknown as ErrorData;
      const errors = errorData.data.data as unknown as string;
      const res = JSON.parse(errors);
      const errorMap = new Map<string, { check: InputValidation; }>(Object.entries(res));

      return {hasErrors: true, errors: errorMap}
    }

    if (data) {
      useState('user').value = data;
      await useRouter().push('/about');
    }
  } catch (e) {
    console.log('error: ' + e);
  }
}

export async function loginWithEmail(email: string, password: string) {
  const user = await useFetch<ISession>('/api/auth/login', {
    method: 'POST',
    body: { data: { email: email, password: password } }
  })
  useState('user').value = user;
  await useRouter().push('/about');
}