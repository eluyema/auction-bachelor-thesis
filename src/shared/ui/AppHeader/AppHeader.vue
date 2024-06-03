<template>
    <header class="header">
        <div class="header-body">
            <a class="header-logo" href="/" target="_self">
                <!-- <img :src="prozorroLogo" class="header-logo-image" alt="Логотип Прозорро" /> -->
                Онлайн Аукціон
            </a>
            <div class="header-content">
                <!--TODO: add logic for localization here-->
                <div class="lang-block">
                    <span class="language-text">UA</span>
                    <div class="lang-divider" />
                    <a class="language-text" target="_self" href="/en">ENG</a>
                </div>
                <!-- <ul class="social-list">
                    <li class="social-item" v-for="item in socialItems" :key="item.src">
                        <a target="_blank" class="social-link" :href="item.src"
                            ><img class="social-image" :src="item.image" :alt="item.alt"
                        /></a>
                    </li>
                </ul> -->
                <div class="auth" v-if="!authStore.isAuthorized">
                    <RouterLink to="/login">Вхід</RouterLink><span class="divider">|</span
                    ><RouterLink to="/registration">Реєстрація</RouterLink>
                </div>
                <RouterLink v-else class="profile" to="/profile/my-info">
                    <CustomIcon class="account-icon" iconName="account_circle" />
                </RouterLink>
            </div>
        </div>
    </header>
    <ProgressBar v-show="showProgressBar" v-bind="progressBarProps" />
</template>

<script setup lang="ts">
import CustomIcon from 'src/shared/ui/CustomIcon/CustomIcon.vue';
//import prozorroLogo from 'src/app/assets/images/prozorro-logo.svg';
import ProgressBar, { ProgressBarProps } from 'src/shared/ui/ProgressBar/ProgressBar.vue';
import { useAuthStore } from 'src/auth/store/useAuthStore';
import { RouterLink } from 'vue-router';
//import { socialItems } from './data';

export type AppHeaderProps = {
    showProgressBar?: boolean;
    progressBarProps?: ProgressBarProps;
};

const authStore = useAuthStore();

withDefaults(defineProps<AppHeaderProps>(), {
    showProgressBar: false,
    progressBarProps: () => ({ variant: 'primary' }),
});
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.header {
    display: flex;
    height: 64px;
    padding: var(--spacing-8) var(--spacing-12);
    background: var(--background-color-white);

    @include desktop() {
        padding-right: var(--spacing-40);
        padding-left: var(--spacing-40);
    }
}

.header-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-logo {
    @include font-text-large();

    text-decoration: none;
    //padding-top: var(--spacing-10);
}

.header-logo-image {
    display: block;
}

.header-content {
    display: flex;
}

.social-list {
    display: none;
    align-items: center;

    @include desktop() {
        margin-right: var(--spacing-32);
        display: flex;
    }
}

.social-item:not(:last-child) {
    margin-right: var(--spacing-20);
}

.social-link {
    background-repeat: no-repeat;
    background-position: 50%;
}

.social-image {
    display: block;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
}

.lang-block {
    display: none;
    align-items: center;
    margin-right: var(--spacing-12);

    @include desktop() {
        margin-right: var(--spacing-32);
    }
}

.language-text {
    @include font-text-medium();

    text-decoration: none;

    @include desktop() {
        font-size: var(--size-s);
    }
}

.lang-divider {
    height: 13px;
    border-left: var(--color-text-gray) 2px solid;
    margin-left: var(--spacing-8);
    margin-right: var(--spacing-8);
}

.account-icon {
    margin-right: var(--spacing-10);
}

.divider {
    margin-left: var(--spacing-4);
    margin-right: var(--spacing-4);
}

.link {
    @include link();
}

.auth {
    @include font-text-medium();
}

.profile {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
}
</style>
