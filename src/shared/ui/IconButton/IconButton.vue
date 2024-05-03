<template>
    <button class="icon-button" :class="paddingSizeClass">
        <Icon
            class="icon"
            :class="[hoverClass, iconClass]"
            :iconName="iconName"
            :colorVariant="colorVariant"
        />
    </button>
</template>

<script setup lang="ts">
import Icon from '../CustomIcon/CustomIcon.vue';
import { ColorVariants } from 'src/entities/theme';
import { computed } from 'vue';

export type IconButtonProps = {
    iconName: string;
    colorVariant?: ColorVariants;
    iconClass?: string;
    paddingSize?: 'unset' | 'medium' | 'large';
};

const props = withDefaults(defineProps<IconButtonProps>(), { paddingSize: 'unset' });

const colorVariantHoverClassMap: Partial<Record<ColorVariants, string>> = {
    primary: 'primary-hover', // new classes can be added here
} as const;

const paddingSizeClassMap: Record<'unset' | 'medium' | 'large', string> = {
    unset: '',
    medium: 'padding-size-medium',
    large: 'padding-size-large',
} as const;

const hoverClass = computed(() => {
    return props.colorVariant
        ? colorVariantHoverClassMap[props.colorVariant] ?? 'default-hover'
        : 'default-hover';
});

const paddingSizeClass = computed(() => {
    return paddingSizeClassMap[props.paddingSize];
});
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-color: transparent;
    border-radius: var(--radius-small);
    cursor: pointer;

    &:hover {
        background-color: transparent;
    }

    &:hover .icon.default-hover {
        color: var(--color-main-blue);
    }

    &:hover .icon.primary-hover {
        color: var(--color-hover-blue);
    }

    &.padding-size-medium {
        padding: var(--spacing-8);
    }

    &.padding-size-large {
        padding: var(--spacing-10);
    }

    &:focus {
        outline: 1px solid var(--color-text-black);
    }
}
</style>
