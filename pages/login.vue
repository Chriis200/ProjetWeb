<script setup lang="ts">
    import { ref } from "@vue/reactivity";
    import type { Ref } from "vue"

    const email: Ref<string> = ref('');
    const password: Ref<string> = ref('');
    const hasError = ref(null);
    const errorMessage = ref(null);

    const isLogin = ref(true);
    const isPasswordLost = ref(false);

    function switchToPasswordLost(){
      isLogin.value = false;
      isPasswordLost.value = true;
    }

    function switchToLogin(){
      isLogin.value = true;
      isPasswordLost.value = false;
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
          <h2 v-if="isLogin" class="text-center text-3xl font-extrabold mt-5 text-gray-900">
            Se connecter
          </h2>
          <h2 v-if="isPasswordLost" class="text-center text-3xl font-extrabold mt-5 text-gray-900">
            Mot de passe oublié
          </h2>
        </div>
        <!--
        <div v-if="response?.hasErrors && errors"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3" role="alert">
          <ul class="block sm:inline">
            <li v-for="[key, value] in errors">
              {{ value.message }}
            </li>
          </ul>
        </div>
        -->
        <div v-if="isLogin">
          <form v-on:submit.prevent class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px mb-1">
              <div>
                <label for="email-address" class="sr-only">Adresse mail</label>
                <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Adresse mail" />
              </div>
            </div>
            <div>
              <label for="password" class="sr-only">Mot de passe</label>
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe" />
            </div>

            <div class="flex items-center justify-between">
              <div @click="switchToPasswordLost" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">Mot de passe oublié ?</div>
            </div>
          </form>
          <button @click=""
            class="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Se connecter
          </button>
        </div>

        <div v-if="isPasswordLost">
          <div class="text-center mt-5 text-gray-900">
            Entrez votre adresse mail afin de recevoir un email de modification de mot de passe
          </div>
          <form v-on:submit.prevent class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px mb-1">
              <div>
                <label for="email-address" class="sr-only">Adresse mail</label>
                <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Adresse mail" />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div @click="switchToLogin" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">Retour à la page de connexion</div>
            </div>
          </form>
          <button @click=""
            class="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Valider
          </button>
        </div>
        
        
      </div>
    </div>
  </div>
</template>