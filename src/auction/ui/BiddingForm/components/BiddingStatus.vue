<template>
    <div class="bidding-status-block" v-if="currentBid">
        <CustomIcon iconName="done" :colorVariant="currentBid.aborted ? null : 'success'" />
        <span v-if="currentBid.aborted" class="bidding-status-text"> Ваша заявка відмінена </span>
        <span v-if="!currentBid.aborted" class="bidding-status-text active">
            Ваша заявка {{ currentBid.fullPrice }} прийнята
        </span>
    </div>
</template>

<script setup lang="ts">
import { AuctionBid } from 'src/entities/auction';
import CustomIcon from 'src/shared/ui/CustomIcon/CustomIcon.vue';

export type BiddingStatusProps = {
    currentBid?: AuctionBid | null;
};

defineProps<BiddingStatusProps>();
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.bidding-status-block {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-12);

    @include desktop() {
        margin-top: var(--spacing-12);
        margin-bottom: 0;
    }
}

.bidding-status-text {
    @include font-text-medium();

    font-size: var(--size-s);
    margin-left: var(--spacing-8);

    &.active {
        color: var(--color-text-green);
    }

    @include desktop() {
        font-size: var(--size-m);
    }
}
</style>
