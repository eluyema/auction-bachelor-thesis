<template>
    <div class="container">
        <AppHeader />
        <main class="content">
            <div class="tabs-container">
                <div class="tabs-head">
                    <RouterLink to="/profile/my-info" class="tab-header-block">
                        <span class="tab-header">Мої данні</span>
                    </RouterLink>
                    <div class="tab-header-block active-tab">
                        <span class="tab-header">Створені аукціони</span>
                    </div>
                    <RouterLink to="/profile/users" class="tab-header-block">
                        <span class="tab-header">Пошук користувачів</span>
                    </RouterLink>
                </div>
                <div class="tabs-body"></div>
            </div>
        </main>
    </div>
</template>
<script setup lang="ts">
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
import { RouterLink } from 'vue-router';
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
    background-color: var(--background-color-white);
    border-radius: var(--radius-large);
    border-top: 0;
    border-top-left-radius: 0;
}

.tabs-container {
    max-width: 1400px;
    width: 100%;
    min-height: 80%;
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
</style>
