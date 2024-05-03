<template>
    <div class="progress-bar">
        <div class="progress" :class="progressClasses" :style="{ width: `${preparedPercent}%` }">
            <div class="progress-space"></div>
            <span class="message">
                {{ message }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ColorVariants } from 'src/entities/theme';

export type ProgressBarProps = {
    percent?: number;
    variant: ColorVariants;
    message?: string;
};

const props = withDefaults(defineProps<ProgressBarProps>(), {
    percent: 100,
    message: '',
});

const variantColorClassMap: Partial<Record<ColorVariants, string>> = {
    primary: 'primary-variant',
    warning: 'warning-variant',
    success: 'success-variant',
} as const;

const progressClasses = computed(() => {
    const defaultClass = variantColorClassMap['primary'];

    return (variantColorClassMap[props.variant] ?? defaultClass) as string;
});

const preparedPercent = computed(() =>
    props.percent > 100 || props.percent < 0 ? 100 : props.percent,
);
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.progress-bar {
    width: 100%;
    height: 20px;
    background: var(--background-color-grey);

    @include desktop {
        height: 24px;
    }
}

.progress {
    height: 100%;
    min-width: min-content;
    display: flex;
    align-items: center;

    &.warning-variant {
        background: var(--color-gradient-orange);
    }
    &.primary-variant {
        background: var(--color-gradient-blue);
    }
    &.success-variant {
        background: var(--color-gradient-green);
    }
}

.progress-space {
    width: 100%;
    max-width: var(--spacing-48);
}

.message {
    @include font-text-small();

    color: var(--background-color-white);
    white-space: nowrap;
    padding-left: var(--spacing-8);
    padding-right: var(--spacing-8);
}
</style>
