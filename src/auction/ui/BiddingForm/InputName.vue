<template>
    <div>
        <span class="restriction-text" :class="{ error: !!isError }"
            >{{ title }}
            <span class="price-text">
                <span class="price-value">{{ minValue }}</span> або менше</span
            >
        </span>
    </div>
</template>

<script setup lang="ts">
export type InputNameProps = {
    title: string
    minValue?: string
    isError?: boolean
}

defineProps<InputNameProps>()
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.restriction-text {
    @include font-text-medium();

    font-size: var(--size-s);

    & .price-text {
        color: var(--color-text-gray);
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
