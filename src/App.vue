<template>
  <v-app>
    <v-main>
      <router-view v-if="isLoginPage"></router-view>
      <Layout v-else></Layout>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Layout from './components/Layout.vue';

const authenticated = ref(localStorage.getItem('authenticated') === 'true');
const route = useRoute();

const isLoginPage = computed(() => route.path === '/Login');
</script>

<style>
* {
  font-family: khmer OS SiemReap;
}
</style>
