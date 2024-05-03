<template>
    <span class="restriction-text" :class="{ error: !!isError, 'mobile-inline': !!mobileInline }"
        >{{ title }}
        <span class="price-text" v-if="!!minValue">
            <span class="price-value">{{ minValue }}</span> або менше</span
        >
    </span>
</template>

<script setup lang="ts">
export type InputNameProps = {
    title: string;
    minValue?: string;
    mobileInline?: boolean;
    isError?: boolean;
};

defineProps<InputNameProps>();
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.restriction-text {
    @include font-text-medium();

    display: block;
    font-size: var(--size-s);

    &.mobile-inline .price-text {
        display: inline;
    }

    & .price-text {
        color: var(--color-text-gray);
        display: block;

        @include desktop() {
            display: inline;
        }
    }

    & .price-value {
        color: var(--color-text-gray);
        border-bottom: 1px var(--color-text-gray) dashed;
    }

    &.error {
        color: var(--color-text-red);

        & .price-text {
            color: var(--color-text-red);
        }

        & .price-value {
            color: var(--color-text-red);
            border-bottom: 1px var(--color-text-red) dashed;
        }
    }

    @include desktop() {
        font-size: var(--size-m);
    }
}
</style>
