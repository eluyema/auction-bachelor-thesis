<template>
    <li
        class="item"
        :class="{ bordered: !!borderColor, 'active-background': !!activeBackground }"
        :key="id"
    >
        <div class="divider" />
        <h6 class="item-title">
            <CustomIcon
                :iconName="iconProps.iconName"
                :colorVariant="iconProps.colorVariant"
                class="icon"
            />
            {{ name }}
        </h6>
        <table>
            <tr v-for="row of tableData" :key="row.key">
                <th class="table-head-cell">{{ row.key }}</th>
                <td class="table-data-cell">{{ row.value }}</td>
            </tr>
            <tr v-if="labelProps">
                <th class="table-head-cell"></th>
                <td class="table-data-cell">
                    <CustomLabel
                        v-if="labelValue"
                        :textShape="labelProps.textShape"
                        :colorVariant="labelProps.colorVariant"
                        class="label"
                    >
                        {{ labelValue }}
                    </CustomLabel>
                </td>
            </tr>
        </table>
    </li>
</template>
<script setup lang="ts">
import CustomIcon, { CustomIconProps } from 'src/shared/ui/CustomIcon/CustomIcon.vue'
import CustomLabel, { CustomLabelProps } from 'src/shared/ui/CustomLabel/CustomLabel.vue'

export type VerticalListItemProps = {
    id: string
    disabled?: boolean
    iconProps: CustomIconProps
    name: string
    tableData: { key: string; value: string }[]
    labelProps?: CustomLabelProps | null
    labelValue?: string | null
    activeBackground?: boolean
    borderColor?: boolean
}

const { iconProps, name, tableData, labelProps, labelValue, activeBackground, borderColor } =
    defineProps<VerticalListItemProps>()
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.item {
    padding: 0 var(--spacing-8) var(--spacing-16);

    &:not(:first-child) .divider {
        border-top: var(--color-stroke-grey) 1px solid;
    }
}

.item.active-background {
    background: var(--background-color-green);
}

.item.bordered {
    border: var(--color-stroke-green) 1px solid;
}

.icon {
    margin-right: var(--spacing-4);
}

.item-title {
    @include font-text-large();

    margin-top: var(--spacing-12);
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-12);
}

.table-head-cell {
    @include font-text-medium();

    padding-right: var(--spacing-16);
    color: var(--color-text-gray);
}

.table-data-cell,
.label {
    @include font-text-large();
}
</style>
