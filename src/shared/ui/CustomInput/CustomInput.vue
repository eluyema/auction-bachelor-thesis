<template>
    <label class="label-block" :class="{ error: !!error }">
        <input
            class="input"
            :value="modelValue"
            :disabled="disabled"
            @input="handleInput($event)"
            :class="{ 'empty-label': !label }"
            placeholder=" "
            :type="inputType"
        />
        <span class="label">{{ label }}</span>
        <IconButton
            v-if="showClearButton"
            class="clear-button"
            type="button"
            iconName="close"
            @click="onClearText"
        />
        <IconButton
            v-if="showPasswordButton"
            class="clear-button"
            type="button"
            :iconName="showPasswordText ? 'visibility' : 'visibility_off'"
            @click="showPasswordText = !showPasswordText"
        />
    </label>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import IconButton from '../IconButton/IconButton.vue';

export type CustomInputProps = {
    modelValue: string;
    label?: string;
    disabled?: boolean;
    hideClearButton?: boolean;
    type?: HTMLInputElement['type'];
    error?: boolean;
};

const props = defineProps<CustomInputProps>();

const showClearButton = computed(
    () =>
        !!props.modelValue &&
        !props.disabled &&
        !props.hideClearButton &&
        props.type !== 'password',
);

const showPasswordButton = computed(() => props.type === 'password');

const showPasswordText = ref(false);

const inputType = computed(() => {
    if (props.type !== 'password') {
        return props.type || 'text';
    }
    return showPasswordText.value ? 'text' : 'password';
});

const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;

    if (target) {
        emits('update:modelValue', target.value);
    }
};

const onClearText = () => {
    emits('update:modelValue', ''); // Emit with empty string on clear
};
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.label-block {
    @include font-text-large();

    position: relative;
    display: inline-block;
    padding-top: var(--spacing-8);
    overflow: hidden;
}

/* Input, Textarea */
.label-block > .input {
    @include font-text-medium();

    font-size: var(--size-s);
    box-sizing: border-box;
    margin: 0;
    border: solid 1px; /* Safari */
    border-color: var(--color-stroke-grey);
    border-top-color: transparent;
    border-radius: var(--radius-small);
    padding: var(--spacing-8) var(--spacing-12);
    width: 100%;
    height: inherit;
    color: var(--color-text-black);
    background-color: var(--background-color-white);
    box-shadow: none;
    transition: border 0.2s;

    @include desktop() {
        padding-top: var(--spacing-16);
        padding-bottom: var(--spacing-16);
        font-size: var(--size-m);
    }
}

.label-block.error > .input {
    border-color: var(--color-stroke-red);
    border-top-color: transparent;
}

.label-block > .input + .label {
    @include font-label();

    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border-color: var(--color-stroke-grey);
    width: 100%;
    max-height: 100%;
    color: var(--color-text-black);
    cursor: text;
    transition:
        color 0.2s,
        font-size 0.2s,
        line-height 0.2s;
}

/* Corners */
.label-block > .input + .label::before,
.label-block > .input + .label::after {
    content: '';
    display: block;
    box-sizing: border-box;
    margin-top: var(--spacing-8);
    border-top: solid 1px;
    border-top-color: var(--color-stroke-grey);
    min-width: 10px;
    height: 8px;
    pointer-events: none;
    transition: border-color 0.2s;
}

.label-block.error > .input + .label::before,
.label-block.error > .input + .label::after {
    border-color: var(--color-stroke-red);
}

.label-block > .input + .label::before {
    margin-right: var(--spacing-4);
    border-left: solid 1px transparent;
    border-radius: var(--radius-small) 0;
}

.label-block > .input + .label::after {
    flex-grow: 1;
    margin-left: var(--spacing-4);
    border-right: solid 1px transparent;
    border-radius: 0 var(--radius-small);
}

.label-block > .input.empty-label {
    & + .label::after {
        margin-left: 0;
    }

    & + .label::before {
        margin-right: 0;
    }
}
.label-block > .input:focus + .label {
    color: var(--color-text-black);
}

/* Hover */
.label-block:hover > .input {
    border-color: var(--color-stroke-grey);
    border-top-color: transparent;
}

.label-block.error:hover > .input {
    border-color: var(--color-stroke-red);
    border-top-color: transparent;
}

.label-block:hover > .input + .label::before,
.label-block:hover > .input + .label::after {
    border-top-color: var(--color-stroke-grey);
}

.label-block.error:hover > .input + .label::before,
.label-block.error:hover > .input + .label::after {
    border-top-color: var(--color-stroke-red);
}

.label-block:hover > .input:not(:focus):placeholder-shown {
    border-color: var(--color-stroke-grey);
}

.label-block.error:hover > .input:not(:focus):placeholder-shown {
    border-color: var(--color-stroke-red);
}

/* Placeholder-shown */
.label-block > .input:not(:focus):placeholder-shown {
    border-top-color: var(--color-stroke-grey);
}

.label-block.error > .input:not(:focus):placeholder-shown {
    border-top-color: var(--color-stroke-red);
}

.label-block > .input:not(:focus):placeholder-shown + .label {
    @include font-text-medium();

    font-size: var(--size-s);
    color: var(--color-text-gray);
    @include mobile() {
        line-height: 56px !important;
    }
    @include desktop() {
        line-height: 70px !important;
        font-size: var(--size-m);
    }
}

.label-block > .input:not(:focus):placeholder-shown + .label::before,
.label-block > .input:not(:focus):placeholder-shown + .label::after {
    border-top-color: transparent;
}

/* Focus */
.label-block > .input:focus {
    border-color: var(--color-stroke-green);
    border-top-color: transparent;
    outline: none;
}

.label-block > .input:focus + .label::before,
.label-block > .input:focus + .label::after {
    border-top-color: var(--color-stroke-green) !important;
}

//

.label-block.error > .input:focus {
    border-color: var(--color-stroke-red);
    border-top-color: transparent;
    outline: none;
}

.label-block.error > .input:focus + .label::before,
.label-block.error > .input:focus + .label::after {
    border-top-color: var(--color-stroke-red) !important;
}
//
/* Disabled */
.label-block > .input:disabled {
    background-color: var(--background-color-grey);
}

.label-block > .input:disabled,
.label-block > .input:disabled + .label {
    border-color: var(--color-stroke-grey) !important;
    border-top-color: transparent !important;
    pointer-events: none;
}

.label-block > .input:disabled + .label::before,
.label-block > .input:disabled + .label::after {
    border-top-color: var(--color-stroke-grey) !important;
}

.label-block > .input:disabled:placeholder-shown,
.label-block > .input:disabled:placeholder-shown + .label {
    border-top-color: var(--color-stroke-grey) !important;
}

.label-block > .input:disabled:placeholder-shown + .label::before,
.label-block > .input:disabled:placeholder-shown + .label::after {
    border-top-color: transparent !important;
}

.clear-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--spacing-8);
    margin-top: var(--spacing-4);
}

/* Faster transition in Safari for less noticable fractional font-size issue */
@media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
        .label-block > .input,
        .label-block > .input + .label,
        .label-block > .input + .label::before,
        .label-block > .input + .label::after {
            transition-duration: 0.1s;
        }
    }
}
</style>
