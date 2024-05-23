// mockStore.ts
import { createPinia, defineStore, setActivePinia } from 'pinia';
import { AccessLevel, User } from 'src/entities/users/MyUser';
import { reactive, computed } from 'vue';

export interface AuthState {
    user: User | null;
}

export const useMockAuthStore = defineStore('mockAuth', () => {
    const state = reactive<AuthState>({
        user: null,
    });

    const isAuthorized = computed(() => !!state.user);

    const login = async (data: { email: string; password: string }) => {
        await setupMyUser();
    };

    const registration = async (data: { name: string; email: string; password: string }) => {};

    const setupMyUser = async () => {
        const user = {
            id: '423423dfsas',
            name: 'Danylo',
            email: 'elluyema@gmail.com',
            accessLevel: AccessLevel.REGULAR,
        };
        state.user = user;
    };

    const logout = async () => {
        state.user = null;
    };

    return { state, isAuthorized, login, registration, logout, setupMyUser };
});

export const setupMockPinia = () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    return pinia;
};
