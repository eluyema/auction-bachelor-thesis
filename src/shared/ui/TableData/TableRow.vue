<template>
    <tr class="row" :class="{ disabled: disabled }">
        <td
            v-for="item of data"
            :key="item.id"
            class="data-cell"
            :class="{ 'active-background': !!activeBackground, bordered: !!bordered }"
        >
            <div class="data-cell-content">
                <CustomIcon v-if="item.iconProps" v-bind="item.iconProps" />
                <CustomLabel
                    v-if="item.labelProps && item.value"
                    v-bind="item.labelProps"
                    class="label"
                >
                    {{ item.value }}
                </CustomLabel>
                <span v-if="!item.labelProps && item.value" class="data-cell-text">
                    {{ item.value }}
                </span>
            </div>
        </td>
    </tr>
</template>

<script setup lang="ts">
import CustomLabel, { CustomLabelProps } from '../CustomLabel/CustomLabel.vue';
import CustomIcon, { CustomIconProps } from '../CustomIcon/CustomIcon.vue';

export type TableRowProps = {
    id: string;
    disabled?: boolean;
    data: {
        id: string;
        value?: string;
        iconProps?: CustomIconProps;
        labelProps?: CustomLabelProps | null;
    }[];
    bordered?: boolean;
    activeBackground?: boolean;
};

const { data, bordered, activeBackground, disabled } = defineProps<TableRowProps>();
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.row {
    height: 48px;
}

.data-cell {
    vertical-align: top;
    line-height: 0;
    margin: 0;
    padding: 0;
}

.data-cell,
.label {
    @include font-text-medium();

    @include desktop() {
        font-size: var(--size-m);
    }
}

.disabled .data-cell-text {
    color: var(--color-text-gray);
}

.data-cell-text {
    padding-top: var(--spacing-4);
}

.data-cell-content {
    display: flex;
    align-items: start;
    padding: var(--spacing-12);
}

.active-background {
    background: var(--background-color-green);
}

.bordered {
    border: var(--color-stroke-green) 1px solid;
}
</style>
