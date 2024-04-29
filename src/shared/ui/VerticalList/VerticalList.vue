<template>
    <div class="container">
        <h4 class="title" :class="{ disabled: disabled }">{{ name }}</h4>
        <ul>
            <VerticalListItem v-for="item of list" :key="item.id" v-bind="item" />
        </ul>
    </div>
</template>
<script setup lang="ts">
import VerticalListItem, { VerticalListItemProps } from './VerticalListItem.vue'

export type VerticalListProps = {
    name: string
    disabled?: boolean
    list: VerticalListItemProps[]
}

const { name, disabled, list } = defineProps<VerticalListProps>()
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.title {
    @include font-h2();

    margin-left: var(--spacing-8);
    margin-right: var(--spacing-8);
    margin-bottom: var(--spacing-8);

    @include desktop() {
        margin-left: 0;
        margin-right: 0;
    }
}

.container {
    background: var(--background-color-white);
    padding-top: var(--spacing-16);
    padding-bottom: var(--spacing-16);

    @include desktop() {
        padding: var(--spacing-24);
    }
}
</style>
