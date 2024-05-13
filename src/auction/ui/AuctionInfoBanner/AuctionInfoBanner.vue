<template>
    <section class="auction-banner-block">
        <h2 class="auction-name">{{ auction.name }}</h2>
        <CustomAccordion class="auction-accordion" title="Деталі закупівлі">
            <div class="divider"></div>
            <table class="auction-data-table">
                <tr
                    class="table-row"
                    v-for="[name, value] of Object.entries(auctionData)"
                    :key="String(name)"
                >
                    <th class="table-head-cell">{{ name }}</th>
                    <td class="table-data-cell">{{ value }}</td>
                </tr>
            </table>
        </CustomAccordion>
    </section>
</template>
<script setup lang="ts">
import { AuctionFull } from 'src/entities/auction/auctionFull';
import CustomAccordion from 'src/shared/ui/CustomAccordion/CustomAccordion.vue';
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice';
import { computed } from 'vue';

export type AuctionInfoBanner = {
    auction: AuctionFull;
};

const props = defineProps<AuctionInfoBanner>();

const auctionData = computed(() => {
    if (!props.auction) {
        return {};
    }

    return {
        'Номер закупівлі': props.auction.purchaseCode,
        Замовник: props.auction.customerName,
        'Очікувана вартість': formatNumberToPrice(props.auction.expectedCost) + ' грн',
        'Крок зменшення': formatNumberToPrice(props.auction.decreaseStep) + ' грн',
    };
});
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.divider {
    border-top: 1px solid var(--color-stroke-grey);
    width: 100%;
}

.auction-accordion {
    width: 100%;
}

.auction-banner-block {
    @include shadow-light-blue-float();

    padding: var(--spacing-24);
    background-color: var(--background-color-white);
    border-radius: var(--radius-medium);
}

.auction-name {
    @include font-text-large();

    margin-bottom: var(--spacing-24);
}

.auction-data-table {
    margin-top: var(--spacing-16);
    margin-bottom: var(--spacing-16);
}

.table-row {
    height: 30px;
}

.table-head-cell {
    @include font-text-small();

    text-align: start;
    color: var(--color-text-gray);
}

.table-data-cell {
    @include font-text-small();

    text-align: start;
    padding-left: var(--spacing-8);
}
</style>
