<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar color="primary">
        <q-toolbar-title>
          <q-btn flat @click="navigateTo('/todos')" label="Todos" />
          <q-btn flat @click="navigateTo('/posts')" label="Posts" />
          <q-btn flat @click="navigateTo('/albums')" label="Albums" />
        </q-toolbar-title>
        
        <q-btn flat dense icon="person" />
        <div class="q-ml-auto">
          <q-toolbar-title>Nur Azima</q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      navigateTo,
    };
  },
});
</script>

<style scoped>
.justify-between {
  justify-content: space-between !important;
}
</style>
