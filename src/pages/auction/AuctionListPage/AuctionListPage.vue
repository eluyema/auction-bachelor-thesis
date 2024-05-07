<template>
    <div class="container">
        <AppHeader />
        <main>Auction List Page</main>
    </div>
</template>
<script setup lang="ts">
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
</script>

<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.container {
    background-color: var(--background-color-grey);
    flex: 1;
}
</style>
