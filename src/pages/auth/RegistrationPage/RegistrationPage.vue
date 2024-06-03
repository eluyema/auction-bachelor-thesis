<template>
    <div class="container">
        <AppHeader />
        <main>
            <RegistrationForm
                class="form"
                :errorText="authStore.state.registrationErrorText"
                :isLoading="authStore.state.registrationStatus === LoadingStatuses.PENDING"
                @registration="onRegistration"
            />
        </main>
    </div>
</template>
<script setup lang="ts">
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
import RegistrationForm from 'src/auth/ui/RegistrationForm/RegistrationForm.vue';
import { RegistrationData } from 'src/entities/auth/registrationData';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/auth/store/useAuthStore';
import { watch } from 'vue';
import { LoadingStatuses } from 'src/entities/application';

const router = useRouter();

const authStore = useAuthStore();

const onRegistration = async (data: RegistrationData) => {
    await authStore.registration(data);
};

watch(
    () => authStore.state.registrationStatus,
    () => {
        if (authStore.state.registrationStatus === LoadingStatuses.FULFILLED) {
            router.push('/login');
        }
    },
);
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
