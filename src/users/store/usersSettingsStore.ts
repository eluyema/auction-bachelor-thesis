import { defineStore } from 'pinia';
import { User } from 'src/entities/users/MyUser';
import { inject, reactive } from 'vue';
import { Services } from 'src/bootstrapServices';
import { LoadingStatuses } from 'src/entities/application';
import { ApiError } from 'src/app/errors';

export interface UsersSettingsState {
    user: User | null;
    lastSearchEmail: string;
    searchStatus: LoadingStatuses;
    updateStatus: LoadingStatuses;
    isNotFound: boolean;
}

export const useUsersSettingsStore = defineStore('users', () => {
    const state = reactive<UsersSettingsState>({
        user: null,
        searchStatus: LoadingStatuses.IDLE,
        updateStatus: LoadingStatuses.IDLE,
        isNotFound: false,
        lastSearchEmail: '',
    });
    const services = inject<Services>('services');

    const findByEmail = async (data: { email: string }) => {
        try {
            if (!services) {
                return;
            }
            const { usersClient } = services;
            state.lastSearchEmail = data.email;
            state.updateStatus = LoadingStatuses.IDLE;
            state.searchStatus = LoadingStatuses.PENDING;
            const foundUser = await usersClient.getUserByEmail(data.email);
            state.searchStatus = LoadingStatuses.FULFILLED;

            state.isNotFound = false;

            state.user = foundUser;
        } catch (err) {
            state.searchStatus = LoadingStatuses.FAILED;
            if (err instanceof ApiError) {
                if (err.originalStatusCode === 404) {
                    state.user = null;
                    state.isNotFound = true;
                }
            }
        }
    };

    const updateUser = async (data: Omit<User, 'id'>) => {
        try {
            if (!services) {
                return;
            }
            const { usersClient } = services;
            state.updateStatus = LoadingStatuses.PENDING;
            const foundUser = await usersClient.updateUser(state.lastSearchEmail, data);
            state.updateStatus = LoadingStatuses.FULFILLED;

            state.isNotFound = false;

            state.user = foundUser;
        } catch (err) {
            state.updateStatus = LoadingStatuses.FAILED;
        }
    };

    return { state, findByEmail, updateUser };
});
