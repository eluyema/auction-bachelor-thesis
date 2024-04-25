<template>
  <span class="material-icons material-symbols-outlined icon" :class="colorVariantClass">{{ iconName }}</span>
</template>

<script setup lang="ts">
import { ColorVariants } from 'src/entities/theme'
import { computed } from 'vue'

export type CustomIconProps = {
  iconName: string
  colorVariant?: ColorVariants
}

const props = defineProps<CustomIconProps>()

const colorVariantClassMap: Partial<Record<ColorVariants, string>> = {
  ['primary']: 'active-primary',
  ['warning']: 'active-warning',
  ['success']: 'active-success'
} as const

const colorVariantClass = computed(() => {
  if (!props.colorVariant) {
    return ''
  }

  return colorVariantClassMap[props.colorVariant] ?? ''
})
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

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

.material-symbols-outlined {
     font-variation-settings:
         'FILL' 0,
         'wght' 400,
         'GRAD' 0,
         'opsz' 24
}

</style>
