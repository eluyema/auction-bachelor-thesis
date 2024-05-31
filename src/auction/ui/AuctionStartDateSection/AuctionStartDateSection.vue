<template>
    <section class="auction-date-block">
        <h6 class="date-text">{{ formatDateUA(auctionStartAt) }}</h6>
    </section>
</template>
<script setup lang="ts">
import { formatDateUA } from 'src/shared/utils/formatDate';

export type AuctionStartDateSectionProps = {
    auctionStartAt: Date;
};

defineProps<AuctionStartDateSectionProps>();
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.auction-date-block {
    padding: var(--spacing-24);
    background-color: var(--background-color-white);
    border-radius: var(--radius-medium);
}

.date-text {
    @include font-text-large();
}
</style>
