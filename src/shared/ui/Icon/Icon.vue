<template>
  <span
      class="material-icons icon"
      :class="colorVariantClass"
  >{{ iconName }}</span>
</template>

<script setup lang="ts">
import {ColorVariants} from "src/entities/theme";
import {computed} from "vue";

export type IconProps = {
  iconName: string;
  colorVariant?: ColorVariants;
}

const props = defineProps<IconProps>();

const colorVariantClassMap: Partial<Record<ColorVariants, string>> = {
  ['primary']: 'active-primary',
  ['warning']: 'active-warning',
  ['success']: 'active-success',
} as const;

const colorVariantClass = computed(()=>{
  if(!props.colorVariant) {
    return '';
  }

  return colorVariantClassMap[props.colorVariant] ?? '';
})

</script>

<style scoped>
@import "src/app/assets/styles/theme/index.scss";

.icon {
  color: var(--color-text-gray);
}

.active-primary {
  color: var(--color-main-blue);
}

.active-warning {
  color: var(--color-alert);
}

.active-success {
  color: var(--color-stroke-green);
}
</style>
