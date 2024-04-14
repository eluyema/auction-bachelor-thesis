<template>
  <span
      class="material-icons icon"
      :class="{ 'active-icon': isActive, [activeColorClass]: isActive, [activeClass]: isActive && activeClass }"
  >{{ iconName }}</span>
</template>

<script setup lang="ts">
import {ColorVariants} from "src/entities/theme";
import {computed} from "vue";

const activeColorVariantClassMap: Partial<Record<ColorVariants, string>> = {
  ['primary']: 'active-primary',
  ['warning']: 'active-warning',
  ['success']: 'active-success',
} as const;

export type IconProps = {
  iconName: string;
  isActive: boolean;
  activeColorVariant?: ColorVariants;
  activeClass?: string;
}

const props = withDefaults(defineProps<IconProps>(),
    {
      activeColorVariant: 'primary',
      activeClass: '',
    }
);

const activeColorClass = computed(()=>{
  const defaultClass = activeColorVariantClassMap['primary'];

  return (activeColorVariantClassMap[props.activeColorVariant] ?? defaultClass) as string;
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
