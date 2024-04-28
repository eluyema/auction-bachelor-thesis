<template>
    <slot v-if="desktopVisible" />
</template>
<script setup lang="ts">
import { useDetectBreakpoint } from 'src/app/composables/useDetectBreakpoint'

const { desktopVisible } = useDetectBreakpoint()
</script>
