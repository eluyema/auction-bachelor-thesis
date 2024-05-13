<template>
    <VerticalList
        :disabledText="disabledText"
        :disabledIcons="disabledIcons"
        :name="title"
        :list="verticalListItems"
        class="list-block"
    />
</template>

<script setup lang="ts">
import { AuctionRoundBidMapper as mapper } from 'src/auction/mappers';
import { AuctionRoundBid } from 'src/entities/auction';
import VerticalList from 'src/shared/ui/VerticalList/VerticalList.vue';
import { computed } from 'vue';

export type AuctionRoundProps = {
    list: AuctionRoundBid[];
    title: string;
    disabledText?: boolean;
    disabledIcons?: boolean;
    showMax?: boolean;
};

const props = defineProps<AuctionRoundProps>();

const verticalListItems = computed(() =>
    mapper.mapToVerticalListItems(props.list, { showLabelForMax: !!props.showMax }),
);
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.list-block {
    @include shadow-light-blue-float();

    max-width: 407px;
}
</style>
