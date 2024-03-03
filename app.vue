<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>
<script setup lang="ts">
import type { IUser } from './types/IUser';
import { useUser } from './composables/useAuth';

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
})

const user: IUser | null = await useUser();
</script>