<template>
    <slot v-if="mobileVisible" />
</template>
<script setup lang="ts">
import { useDetectBreakpoint } from 'src/app/composables/useDetectBreakpoint'

const { mobileVisible } = useDetectBreakpoint()
</script>
