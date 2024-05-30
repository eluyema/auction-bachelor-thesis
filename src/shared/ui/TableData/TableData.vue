<template>
    <div class="container">
        <h4 class="title" :class="{ disabled: disabled }">{{ name }}</h4>
        <table class="table">
            <tr class="table-head">
                <TableColumn v-for="column of columns" v-bind="column" :key="column.id" />
            </tr>
            <TableRow
                v-for="row of rows"
                :key="row.id"
                :data="row.data"
                :active-background="row.activeBackground"
                :bordered="row.bordered"
                :id="row.id"
                :disabled="disabled"
            />
        </table>
    </div>
</template>
<script setup lang="ts">
import TableRow, { TableRowProps } from './TableRow.vue';
import TableColumn, { TableColumnProps } from './TableColumn.vue';

export type TableDataProps = {
    name: string;
    disabled?: boolean;
    columns: TableColumnProps[];
    rows: TableRowProps[];
};

defineProps<TableDataProps>();
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.container {
    @include shadow-light-blue-float();

    background: var(--background-color-white);
    padding-top: var(--spacing-16);
    padding-bottom: var(--spacing-16);
    border-radius: (--radius-small);

    @include desktop() {
        padding: var(--spacing-24);
    }
}

.title {
    @include font-h2();

    margin-left: var(--spacing-8);
    margin-right: var(--spacing-8);
    margin-bottom: var(--spacing-8);

    &.disabled {
        color: var(--color-text-gray);
    }

    @include desktop() {
        margin-left: 0;
        margin-right: 0;
    }
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table-head {
    height: 40px;
    margin-bottom: var(--spacing-8);
    border-bottom: var(--color-stroke-grey) 1px solid;
}
</style>
