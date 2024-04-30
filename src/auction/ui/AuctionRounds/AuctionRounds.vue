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
import { AuctionRoundsMapper as mapper } from 'src/auction/mappers'
import { AuctionRound } from 'src/entities/auction'
import VerticalList from 'src/shared/ui/VerticalList/VerticalList.vue'

export type AuctionResultsProps = {
    list: AuctionRound[]
    title: string
    disabledText?: boolean
    disabledIcons?: boolean
    showMax?: boolean
}

const { title, list, disabledText, disabledIcons, showMax } = defineProps<AuctionResultsProps>()
const verticalListItems = mapper.mapToVerticalListItems(list, { showLabelForMax: !!showMax })
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.list-block {
    @include shadow-light-blue-float();

    max-width: 407px;
}
</style>
