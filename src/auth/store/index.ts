import { defineStore } from 'pinia';
import { MyUser } from 'src/entities/users/MyUser';
import { computed, inject, reactive } from 'vue';
import { Services } from 'src/bootstrapServices';

export interface AuthState {
    user: MyUser | null;
}

export const useAuthStore = defineStore('auth', () => {
    const state = reactive<AuthState>({
        user: null,
    });
    const services = inject<Services>('services');

    const isAuthorized = computed(() => !!state.user);

    const login = async (data: { email: string; password: string }) => {
        if (!services) {
            return;
        }
        const { authClient } = services;
        await authClient.login(data);
        await setupMyUser();
    };

    const registration = async (data: { name: string; email: string; password: string }) => {
        if (!services) {
            return;
        }
        const { authClient } = services;
        await authClient.registration(data);
    };

    const setupMyUser = async () => {
        if (!services) {
            return;
        }
        const { usersClient, authClient } = services;

        if (!authClient.tokensAvailable()) {
            return;
        }

        const user = await usersClient.getMyUser();

        state.user = user;
    };

    const logout = async () => {
        if (!services) {
            return;
        }
        const { authClient } = services;

        await authClient.logout();
        state.user = null;
    };

    return { state, isAuthorized, login, registration, logout, setupMyUser };
});
