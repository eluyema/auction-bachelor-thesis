import { defineStore } from 'pinia';
import { User } from 'src/entities/users/MyUser';
import { computed, inject, reactive } from 'vue';
import { Services } from 'src/bootstrapServices';
import { ApiError } from 'src/app/errors';
import { LoadingStatuses } from 'src/entities/application';

export interface AuthState {
    user: User | null;
    loginStatus: LoadingStatuses;
    loginErrorText: string;
    registrationStatus: LoadingStatuses;
    registrationErrorText: string;
}

export const useAuthStore = defineStore('auth', () => {
    const state = reactive<AuthState>({
        user: null,
        loginStatus: LoadingStatuses.IDLE,
        loginErrorText: '',
        registrationStatus: LoadingStatuses.IDLE,
        registrationErrorText: '',
    });
    const services = inject<Services>('services');

    const isAuthorized = computed(() => !!state.user);

    const login = async (data: { email: string; password: string }) => {
        try {
            if (!services) {
                return;
            }
            const { authClient } = services;
            state.loginErrorText = '';
            state.loginStatus = LoadingStatuses.PENDING;
            await authClient.login(data);
            state.loginStatus = LoadingStatuses.FULFILLED;
            await setupMyUser();
        } catch (err) {
            state.loginStatus = LoadingStatuses.FAILED;

            if (err instanceof ApiError) {
                if (err.originalStatusCode === 401) {
                    state.loginErrorText = 'Пошта чи пароль вказані невірно';
                } else {
                    state.loginErrorText = 'Виникла помилка на сервері, спробуйте ще раз';
                }
            }
        }
    };

    const registration = async (data: { name: string; email: string; password: string }) => {
        try {
            if (!services) {
                return;
            }
            state.registrationErrorText = '';
            const { authClient } = services;
            state.registrationStatus = LoadingStatuses.PENDING;
            await authClient.registration(data);
            state.registrationStatus = LoadingStatuses.FULFILLED;
        } catch (err) {
            state.registrationStatus = LoadingStatuses.FAILED;

            if (err instanceof ApiError) {
                if (err.originalStatusCode === 409) {
                    state.registrationErrorText = 'Пошта з вказаною поштою вже існує, введіть іншу';
                } else {
                    state.registrationErrorText = 'Виникла помилка на сервері, спробуйте ще раз';
                }
            }
        }
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
