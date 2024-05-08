<template>
    <div class="container">
        <AppHeader />
        <main class="content">
            <div class="tabs-container">
                <div class="tabs-head">
                    <RouterLink to="/profile/my-info" class="tab-header-block">
                        <span class="tab-header">Мої данні</span>
                    </RouterLink>
                    <RouterLink
                        v-if="showAuctionsTab"
                        to="/profile/auctions"
                        class="tab-header-block"
                    >
                        <span class="tab-header">Створені аукціони</span>
                    </RouterLink>
                    <div v-if="showUsersTab" class="tab-header-block active-tab">
                        <span class="tab-header">Пошук користувачів</span>
                    </div>
                </div>
                <div class="tabs-body">
                    <UserSearchForm
                        @search="onSearchUser"
                        :pendingForm="usersStore.state.searchStatus === LoadingStatuses.PENDING"
                    />
                    <div class="user-container">
                        <div v-if="usersStore.state.isNotFound">
                            <span class="not-found-text"
                                >Юзера з поштою "{{ usersStore.state.lastSearchEmail }}" не
                                знайдено</span
                            >
                        </div>
                        <UserEditorForm
                            v-else-if="userUpdatedata"
                            :user="userUpdatedata"
                            @updateUser="onUpdateUser"
                            updateError=""
                        />
                        <CustomLabel
                            v-if="usersStore.state.updateStatus === LoadingStatuses.FULFILLED"
                            class="success-updated-text"
                            colorVariant="success"
                            >Користувач успішно оновлений</CustomLabel
                        >
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from 'src/auth/store';
import { LoadingStatuses } from 'src/entities/application';
import { AccessLevel, User } from 'src/entities/users/MyUser';
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
import CustomLabel from 'src/shared/ui/CustomLabel/CustomLabel.vue';
import { useUsersSettingsStore } from 'src/users/store/usersSettingsStore';
import UserEditorForm from 'src/users/ui/UserEditorForm/UserEditorForm.vue';
import UserSearchForm from 'src/users/ui/UserSearchForm/UserSearchForm.vue';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

const usersStore = useUsersSettingsStore();

const onSearchUser = (data: { email: string }) => {
    usersStore.findByEmail(data);
};

const onUpdateUser = (data: Omit<User, 'id'>) => {
    usersStore.updateUser(data);
};

const userUpdatedata = computed(() => {
    const user = usersStore.state.user;

    if (!user) {
        return null;
    }
    return {
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel,
    };
});

const showUsersTab = computed(() => {
    const { user } = authStore.state;
    if (!user) {
        return false;
    }

    if (user.accessLevel === AccessLevel.ADMIN) {
        return true;
    }

    return false;
});

const showAuctionsTab = computed(() => {
    const { user } = authStore.state;
    if (!user) {
        return false;
    }

    if (user.accessLevel === AccessLevel.ADMIN || user.accessLevel === AccessLevel.MANAGER) {
        return true;
    }

    return false;
});
</script>
<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.container {
    background-color: var(--background-color-grey);
    display: flex;
    flex-direction: column;
    flex: 1;
}

.content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: var(--spacing-20);
    padding-right: var(--spacing-20);
    margin-top: var(--spacing-24);
    padding: var(--spacing-16);
}

.tabs-head {
    height: 70px;
}

.tabs-body {
    @include shadow-light-blue-float();

    flex: 1;
    height: 100%;
    clip-path: inset(0px -10px -10px -10px);
    padding-top: var(--spacing-24);
    padding-left: var(--spacing-28);
    padding-right: var(--spacing-28);
    padding-bottom: var(--spacing-24);
    background-color: var(--background-color-white);
    border-radius: var(--radius-large);
    border-top: 0;
    border-top-left-radius: 0;
}

.tabs-container {
    max-width: 1400px;
    width: 100%;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
}

.tabs-head {
    display: flex;
}

.tab-header-block {
    @include shadow-light-blue-float();

    text-decoration: none;
    border-top-left-radius: var(--radius-large);
    border-top-right-radius: var(--radius-large);
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-16);
    cursor: pointer;
    background-color: var(--background-color-frame);

    &.active-tab {
        background-color: var(--background-color-white);
        cursor: default;
    }

    & .tab-header {
        @include font-text-medium();
    }

    &:not(.active-tab) {
        &:hover {
            border: 1px solid var(--color-stroke-grey);
            border-bottom: 0;
        }
    }
}

.user-container {
    margin-top: var(--spacing-24);

    & .not-found-text {
        @include font-text-large();
    }
}

.success-updated-text {
    margin-top: var(--spacing-24);
}
</style>
