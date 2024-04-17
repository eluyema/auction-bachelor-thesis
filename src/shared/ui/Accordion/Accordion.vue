<template>
  <div class="accordion">
    <div class="accordion-panel" ref="accordionContent" :style="contentStyles">
      <div class="inner-content">
        <slot></slot>
      </div>
    </div>
    <button textShape="text" @click="toggle" class="accordion-header">
      <span class="header-title">{{ title }}</span>
      <span class="icon-wrapper">
        <Icon
            class="icon"
            colorVariant="primary"
            icon-name="expand_more"
            :class="iconClass"
        />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Icon from "../Icon/Icon.vue";

export type AccordionProps = {
  title: string;
};

defineProps<AccordionProps>();

const accordionContent = ref<HTMLDivElement | null>(null);

const isOpen = ref(false);

function toggle(_event): void {
  isOpen.value = !isOpen.value;
}

const contentStyles = computed(()=> {
  const element = accordionContent.value;

  if(!isOpen.value || !element) {
    return { maxHeight: null };
  }

  return { maxHeight: element.scrollHeight + "px" };
})

const iconClass = computed(()=>{
  return {
    "rotate-icon": isOpen.value,
  }
})
</script>
<style scoped lang="scss">
@import "src/app/assets/styles/theme/index.scss";

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: var(--spacing-8);
  padding-bottom: var(--spacing-8);
  cursor: pointer;

  & .header-title {
    @include font-text-medium();

    color: var(--color-main-blue);
  }

  &:hover .header-title, &:hover .icon {
    color: var(--color-hover-blue);
  }

  &:focus {
    outline: none;
  }

  &:focus .icon-wrapper {
    outline: 1px solid var(--color-text-black);
  }

  @include desktop() {
    width: auto;
    padding-top: 0;
    padding-bottom: 0;
  }
}

.icon-wrapper {
  display: flex;
  margin-left: var(--spacing-4);
}

.accordion-panel {
  display: flex;
  flex-direction: column;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

:deep(.icon) {
  transition-duration: 0.2s;
}

:deep(.rotate-icon) {
  transform: rotate(-180deg);
}
</style>
