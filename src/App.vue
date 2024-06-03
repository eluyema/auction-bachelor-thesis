<template>
    <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './auth/store/useAuthStore';

const authStore = useAuthStore();

onMounted(() => {
    authStore.setupMyUser();
});
</script>
