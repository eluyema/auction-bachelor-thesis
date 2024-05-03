<template>
    <th class="table-head-cell" :class="width">
        {{ name }}
    </th>
</template>

<script setup lang="ts">
export type TableColumnProps = { id: string; name: string; width?: 'min' | 'default' | 'max' };

const { name, width } = defineProps<TableColumnProps>();
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.table-head-cell {
    @include font-text-medium();

    text-align: start;
    color: var(--color-text-gray);
    width: 180px;
}

.max {
    width: auto;
}

.min {
    white-space: nowrap;
    width: 1%;
}
</style>
