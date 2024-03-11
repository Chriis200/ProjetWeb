<script setup lang="ts">
    import { ref } from "@vue/reactivity";
    import { registerWithEmail } from "~/composables/useAuth";
    import type { Ref } from "vue"

    const email: Ref<string> = ref('');
    const password: Ref<string> = ref('');
    const username: Ref<string> = ref('');
    const name: Ref<string> = ref('');
    const hasError = ref(null);
    const errorMessage = ref(null);
    const errors = ref<Map<any, any> | undefined>(new Map());
    let response = ref<FormValidation>({ hasErrors: false });

    const postRegisterForm = async function(){
      //await registerWithEmail(username.value, name.value, email.value, password.value);
      //errors.value = response.value.errors


      registerWithEmail(username.value, name.value, email.value, password.value);
      errors.value = response.value.errors
    }
</script>

<template>
  <div class="h-screen">
    <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        
        <div>
            <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900">
            NBA App
          </h1>
          <h2 class="text-center text-3xl font-extrabold mt-5 text-gray-900">
            S'inscrire
          </h2>
        </div>
        <div v-if="response.hasErrors && errors"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3" role="alert">
          <strong class="font-bold">Oops, try again! </strong>

          <ul class="block sm:inline">
            <li v-for="[key, value] in errors">
              {{ value.check.errorMessage }}
            </li>
          </ul>

    
        </div>
        <form v-on:submit.prevent class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px mb-1">
            <div>
              <label for="name" class="sr-only">Name</label>
              <input v-model="name" id="name" name="name" required
                :class="errors?.has('name') ? ' border-red-500' : ''"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom" />
            </div>
          </div>
          <div class="rounded-md shadow-sm -space-y-px mb-1">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input type="texte" v-model="username" id="username" name="username" required
                :class="errors?.has('username') ? ' border-red-500' : ''"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Pseudo" />
            </div>
          </div>

          <div class="rounded-md shadow-sm -space-y-px mb-1">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required
                :class="errors?.has('email') ? ' border-red-500' : ''"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse mail" />
            </div>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required
              :class="errors?.has('email') ? ' border-red-500' : ''"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe" />
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Déjà inscrit ? Se connecter
              </a>
            </div>
          </div>

          <div></div>
        </form>
        <button @click.prevent="postRegisterForm"
          class="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          S'inscrire
        </button>
        
      </div>
    </div>
  </div>
</template>