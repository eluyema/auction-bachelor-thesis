<template>
    <div class="container">
        <AppHeader />
        <main class="content">
            <span class="not-found-text"> Цієї сторінки не існує 😢 </span>
        </main>
    </div>
</template>
<script setup lang="ts">
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
</script>
<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.container {
    background-color: var(--background-color-grey);
    display: flex;
    flex-direction: column;
    flex: 1;
}

.content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.not-found-text {
    @include font-h1();

    @include desktop() {
        font-size: 40px;
    }
}
</style>
