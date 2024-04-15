<template>
  <button class="icon-button" :class="paddingSizeClass">
    <Icon :iconName="iconName"
          :isActive="!!colorVariant"
          :activeColorVariant="colorVariant"
          :activeClass="activeIconClass"
          />
  </button>
</template>

<script setup lang="ts">
import { ColorVariants } from "src/entities/theme";
import Icon, {IconProps} from '../Icon/Icon.vue';
import {computed} from "vue";

export type IconButtonProps = {
  iconName: string;
  colorVariant?: ColorVariants,
  paddingSize?: 'small' | 'medium' | 'large',
};

const props = withDefaults(defineProps<IconButtonProps>(), { paddingSize: 'medium' });

const colorVariantHoverClassMap: Partial<Record<ColorVariants, string>> = {
  "primary": "primary-hover", // new classes can be added here
};

const paddingSizeClassMap: Partial<Record<IconButtonProps["paddingSize"], string>> = {
  "small": "padding-size-small",
  "medium": "padding-size-medium",
  "large": "padding-size-large",
};

const activeIconClass = computed(()=> {
  return !!props.colorVariant ? colorVariantHoverClassMap[props.colorVariant] ?? '' : '';
})

const paddingSizeClass = computed(()=> {
  console.log(paddingSizeClassMap[props.paddingSize])
  return paddingSizeClassMap[props.paddingSize];
})

</script>

<style scoped>
@import "src/app/assets/styles/theme/index.scss";

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

  &:hover .primary-hover {
    color: var(--color-hover-blue);
  }

  &.padding-size-small {
    padding: var(--spacing-4);
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

.icon-button:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
