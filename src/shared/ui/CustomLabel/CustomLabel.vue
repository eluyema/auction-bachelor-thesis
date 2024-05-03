<template>
    <span class="label" :class="classes">
        <slot />
    </span>
</template>

<script setup lang="ts">
import { ColorVariants } from 'src/entities/theme';
import { computed } from 'vue';

export type CustomLabelProps = {
    textShape?: 'contained' | 'text';
    colorVariant: ColorVariants;
};

const props = withDefaults(defineProps<CustomLabelProps>(), {
    textShape: 'contained',
});

const colorVariantClassMap: Partial<Record<ColorVariants, string>> = {
    primary: 'primary',
    warning: 'warning',
    success: 'success',
} as const;

const textShapeClassMap: Record<'contained' | 'text', string> = {
    contained: 'shape-contained',
    text: 'shape-text',
} as const;

const classes = computed(() => {
    const defaultColorVariantClass = colorVariantClassMap['primary'];
    const defaultTextShapeClass = textShapeClassMap['contained'];

    const textShapeClass = textShapeClassMap[props.textShape] ?? defaultTextShapeClass;
    const colorVariantClass = colorVariantClassMap[props.colorVariant] ?? defaultColorVariantClass;

    return [colorVariantClass, textShapeClass];
});
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.label {
    @include font-text-small();

    padding: var(--spacing-2) var(--spacing-4);

    &.shape-contained {
        border-radius: var(--radius-small);
        color: var(--background-color-white);

        &.primary {
            background: var(--color-main-blue);
        }

        &.warning {
            background: var(--color-alert);
        }

        &.success {
            background: var(--color-stroke-green);
        }
    }

    &.shape-text {
        &.primary {
            color: var(--color-main-blue);
        }

        &.warning {
            color: var(--color-alert);
        }

        &.success {
            color: var(--color-stroke-green);
        }
    }
}
</style>
