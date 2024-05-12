<template>
    <div class="container">
        <AppHeader />
        <main class="content">
            <div class="tabs-container">
                <div class="tabs-head">
                    <template v-for="tab of tabs" :key="tab.name">
                        <RouterLink
                            v-if="tab.name !== activeTabName"
                            :to="tab.link"
                            class="tab-header-block"
                        >
                            <span class="tab-header">{{ tab.name }}</span>
                        </RouterLink>
                        <div v-else class="tab-header-block active-tab">
                            <span class="tab-header">{{ tab.name }}</span>
                        </div>
                    </template>
                </div>
                <div class="tabs-body">
                    <slot></slot>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppHeader from '../AppHeader/AppHeader.vue';

export type TabsPageWrapperProps = {
    tabs: Array<{ name: string; link: string }>;
    activeTabName: string;
};

defineProps<TabsPageWrapperProps>();
</script>
<style scoped lang="scss">
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
</style>
