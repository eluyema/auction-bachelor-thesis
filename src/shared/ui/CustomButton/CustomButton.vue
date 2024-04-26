<template>
    <button class="button" :class="classes">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ColorVariants } from 'src/entities/theme'

export type CustomButtonProps = {
    size?: 'medium' | 'large'
    fullWidthOnMobile?: boolean
    textShape?: 'contained' | 'text'
    colorVariant?: ColorVariants
}

const props = withDefaults(defineProps<CustomButtonProps>(), {
    size: 'medium',
    textShape: 'contained',
    colorVariant: 'primary',
    fullWidthOnMobile: false
})

const colorVariantClassMap: Partial<Record<ColorVariants, string>> = {
    primary: 'primary',
    error: 'error',
    success: 'success'
} as const

const textShapeClassMap: Record<'contained' | 'text', string> = {
    contained: 'shape-contained',
    text: 'shape-text'
} as const

const sizeClassMap: Record<'medium' | 'large', string> = {
    medium: 'medium-size',
    large: 'large-size'
} as const

const classes = computed(() => {
    const defaultColorVariantClass = colorVariantClassMap['primary'] as string
    const defaultTextShapeClass = textShapeClassMap['contained']
    const defaultSizeClass = sizeClassMap['medium']

    const colorVariantClass = colorVariantClassMap[props.colorVariant] ?? defaultColorVariantClass
    const textShapeClass = textShapeClassMap[props.textShape] ?? defaultTextShapeClass
    const sizeClass = sizeClassMap[props.size] ?? defaultSizeClass

    const fullWidthOnMobileClass = props.fullWidthOnMobile ? 'full-width-mobile' : ''

    return [colorVariantClass, textShapeClass, sizeClass, fullWidthOnMobileClass]
})
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.button {
    @include font-text-small();

    padding: var(--spacing-8) var(--spacing-12);
    background: transparent;
    border-color: transparent;
    border-radius: var(--radius-small);
    cursor: pointer;

    &.shape-contained {
        color: var(--background-color-white);

        &.primary {
            background: var(--color-main-blue);

            &:hover {
                background: var(--color-hover-blue);
            }

            &:active {
                background: var(--color-main-blue);
            }
        }

        &.error {
            background: var(--color-stroke-red);

            &:hover {
                background: var(--color-hover-red);
            }

            &:active {
                background: var(--color-stroke-red);
            }
        }

        &.success {
            background: var(--color-button-green);

            &:hover {
                background: var(--color-hover-green);
            }

            &:active {
                background: var(--color-button-green);
            }
        }
    }

    &.shape-text {
        &.primary {
            color: var(--color-main-blue);

            &:hover {
                color: var(--color-hover-blue);
            }
        }

        &.error {
            color: var(--color-text-red);

            &:hover {
                color: var(--color-hover-red);
            }
        }

        &.success {
            color: var(--color-button-green);

            &:hover {
                color: var(--color-hover-green);
            }
        }
    }

    &.medium-size {
        @include font-text-medium();

        padding: var(--spacing-8) var(--spacing-16);
        font-size: var(--size-s);
        line-height: 24px;

        @include desktop() {
            padding: var(--spacing-8) var(--spacing-12);
        }
    }

    &.large-size {
        @include font-text-medium();

        line-height: 24px;
        font-size: var(--size-s);
        padding: var(--spacing-8) var(--spacing-28);

        @include desktop() {
            font-size: var(--size-m);
            padding: var(--spacing-16);
        }
    }

    &.full-width-mobile {
        @include mobile {
            width: 100%;
        }
    }

    &:focus,
    &.shape-contained:focus,
    &.shape-text:focus {
        outline: 1px solid var(--color-text-black);
    }
}
</style>
