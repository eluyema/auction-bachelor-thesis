<template>
    <div class="container">
        <AppHeader />
        <main>
            <LoginForm class="form" @login="onLogin" />
        </main>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from 'src/auth/store';
import LoginForm from 'src/auth/ui/LoginForm/LoginForm.vue';
import { LoginData } from 'src/entities/auth/loginData';
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();

const onLogin = async (data: LoginData) => {
    await authStore.login(data);
    router.push('/');
};
</script>

<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.container {
    background-color: var(--background-color-grey);
    flex: 1;
}

.form {
    margin-top: var(--spacing-32);
    margin-left: auto;
    margin-right: auto;
}
</style>
