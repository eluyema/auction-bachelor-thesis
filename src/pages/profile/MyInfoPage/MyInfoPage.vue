<template>
    <div class="container">
        <AppHeader />
        <main class="content">
            <div class="tabs-container">
                <div class="tabs-head">
                    <div class="tab-header-block active-tab">
                        <span class="tab-header">Мої данні</span>
                    </div>
                    <RouterLink
                        v-if="showAuctionsTab"
                        to="/profile/auctions"
                        class="tab-header-block"
                    >
                        <span class="tab-header">Створені аукціони</span>
                    </RouterLink>
                    <RouterLink v-if="showUsersTab" to="/profile/users" class="tab-header-block">
                        <span class="tab-header">Пошук користувачів</span>
                    </RouterLink>
                </div>
                <div class="tabs-body">
                    <UserInfo v-if="authStore.state.user" :user="authStore.state.user" />
                    <CustomButton
                        @click="authStore.logout()"
                        class="logout-button"
                        colorVariant="error"
                        textShape="text"
                        >Вийти з облікового запису</CustomButton
                    >
                </div>
            </div>
        </main>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from 'src/auth/store';
import { AccessLevel } from 'src/entities/users/MyUser';
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import UserInfo from 'src/users/ui/UserInfo/UserInfo.vue';
import { computed, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const authStore = useAuthStore();

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

const router = useRouter();

watch(
    () => authStore.isAuthorized,
    () => {
        if (!authStore.isAuthorized) {
            router.push('/');
        }
    },
);
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

.tabs-body {
    @include shadow-light-blue-float();

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    flex: 1;
    height: 100%;
    padding-top: var(--spacing-24);
    padding-left: var(--spacing-28);
    padding-right: var(--spacing-28);
    padding-bottom: var(--spacing-24);
    clip-path: inset(0px -10px -10px -10px);
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

    height: 70px;
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
</style>
