<template>
    <li
        class="item"
        :class="{ bordered: !!bordered, 'active-background': !!activeBackground }"
        :key="id"
    >
        <div class="divider" v-if="!bordered" />
        <h6 class="item-title" :class="{ disabled: !!disabledText }">
            <CustomIcon
                :iconName="iconProps.iconName"
                :colorVariant="disabledIcons ? null : iconProps.colorVariant"
                class="icon"
            />
            {{ name }}
        </h6>
        <div class="content">
            <table class="table" v-if="tableData.length">
                <tr v-for="row of tableData" :key="row.key">
                    <th class="table-head-cell">{{ row.key }}</th>
                    <td class="table-data-cell">{{ row.value }}</td>
                </tr>
                <MobileOnly>
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
                </MobileOnly>
            </table>
            <DesktopOnly>
                <CustomLabel
                    v-if="labelValue && labelProps"
                    :textShape="labelProps.textShape"
                    :colorVariant="labelProps.colorVariant"
                    class="label"
                >
                    {{ labelValue }}
                </CustomLabel>
            </DesktopOnly>
        </div>
    </li>
</template>
<script setup lang="ts">
import CustomIcon, { CustomIconProps } from 'src/shared/ui/CustomIcon/CustomIcon.vue'
import CustomLabel, { CustomLabelProps } from 'src/shared/ui/CustomLabel/CustomLabel.vue'
import MobileOnly from '../MobileOnly/MobileOnly.vue'
import DesktopOnly from '../DesktopOnly/DesktopOnly.vue'

export type VerticalListItemProps = {
    id: string
    disabled?: boolean
    iconProps: CustomIconProps
    name: string
    tableData: { key: string; value: string }[]
    labelProps?: CustomLabelProps | null
    labelValue?: string | null
    disabledText?: boolean
    disabledIcons?: boolean
    activeBackground?: boolean
    bordered?: boolean
}

const {
    iconProps,
    name,
    tableData,
    labelProps,
    labelValue,
    disabledIcons,
    disabledText,
    activeBackground,
    bordered
} = defineProps<VerticalListItemProps>()
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
    outline: var(--color-stroke-green) 2px solid;
}

.icon {
    margin-right: var(--spacing-4);
}

.item-title {
    @include font-text-large();

    padding-top: var(--spacing-12);
    display: flex;
    align-items: center;

    &.disabled {
        color: var(--color-text-gray);
    }
}

.content {
    display: flex;
    align-items: end;
}

.table {
    margin-top: var(--spacing-12);
}

.table-head-cell {
    @include font-text-medium();

    padding-right: var(--spacing-16);
    color: var(--color-text-gray);
}

.table-data-cell,
.label {
    @include font-text-large();

    @include desktop() {
        margin-left: var(--spacing-40);
    }
}
</style>
