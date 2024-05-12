<template>
    <ul class="list">
        <li class="item" v-for="auction of auctions" :key="auction.id">
            <div class="content-block">
                <RouterLink class="link-name" :to="linkBase + auction.id">{{
                    auction.name
                }}</RouterLink>
                <p class="owner-block">{{ auction.customerName }}</p>
                <p class="tender-id-block">{{ auction.purchaseCode }}</p>
            </div>
            <div class="widgets-block">
                <div v-if="auction.auctionStatus === 'waiting'" class="status-block">
                    <div>
                        <CustomIcon iconName="nest_clock_farsight_analog" colorVariant="warning" />
                    </div>
                    <p class="status-text waiting">Очікується</p>
                </div>
                <div v-else-if="auction.auctionStatus === 'active'" class="status-block">
                    <div>
                        <CustomIcon iconName="progress_activity" colorVariant="primary" />
                    </div>
                    <p class="status-text active">Активний</p>
                </div>
                <div v-else class="status-block">
                    <div>
                        <CustomIcon iconName="done" colorVariant="success" />
                    </div>
                    <p class="status-text finished">Завершений</p>
                </div>
                <p class="date-head-text">Дата та час початку</p>
                <p class="date-text">{{ formatDateUA(new Date(auction.auctionStartAt)) }}</p>
            </div>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { AuctionInfo } from 'src/entities/auction/auctionInfo';
import CustomIcon from 'src/shared/ui/CustomIcon/CustomIcon.vue';
import { formatDateUA } from 'src/shared/utils/formatDate';
import { RouterLink } from 'vue-router';

export type AuctionsListProps = {
    auctions: AuctionInfo[];
    linkBase: string;
};

defineProps<AuctionsListProps>();
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.list {
    width: 100%;
}

.link-name {
    @include link();
}

.item {
    @include shadow-light-blue-float();

    padding: var(--spacing-16) var(--spacing-24);
    width: 100%;
    display: flex;
    background-color: var(--background-color-white);

    &:not(:first-child) {
        margin-top: var(--spacing-12);
    }
}

.content-block {
    flex: 1;
}

.widgets-block {
    min-width: 220px;
    margin-left: var(--spacing-32);
}

.owner-block {
    @include font-text-medium();

    margin-top: var(--spacing-8);
}

.tender-id-block {
    @include font-text-medium();

    margin-top: var(--spacing-8);
}

.status-block {
    display: flex;
    align-items: center;
}

.status-text {
    @include font-text-small();

    text-wrap: nowrap;
    margin-left: var(--spacing-8);

    &.waiting {
        color: var(--color-alert);
    }

    &.active {
        color: var(--color-main-blue);
    }

    &.finished {
        color: var(--color-text-green);
    }
}

.date-head-text {
    @include font-text-small();

    text-wrap: nowrap;
    color: var(--color-text-gray);
}

.date-text {
    @include font-text-small();

    text-wrap: nowrap;
}
</style>
