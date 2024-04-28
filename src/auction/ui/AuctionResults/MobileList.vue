<template>
    <ul>
        <li v-for='item of list' class='item' :class='{ winner: item.isWinner}'>
            <div class='divider'/>
            <h6 class='item-title'>
                <CustomIcon iconName='done' colorVariant='success' />
               {{item.name}}
            </h6>
            <table>
                <tr>
                    <th class='table-head-cell'>Повна ціна, грн:</th>
                    <td class='table-data-cell'>{{item.fullPrice}}</td>
                </tr>
                <tr v-if='item.coefficient'>
                    <th class='table-head-cell'>Коефіцієнт:</th>
                    <td class='table-data-cell'>{{item.coefficient}}</td>
                </tr>
                <tr v-if='item.enteredPrice'>
                    <th class='table-head-cell'>Приведена ціна, грн:</th>
                    <td class='table-data-cell'>{{item.enteredPrice}}</td>
                </tr>
                <tr v-if='item.isWinner'>
                    <th class='table-head-cell'></th>
                    <td class='table-data-cell winner'>Переможець</td>
                </tr>
            </table>
        </li>
    </ul>
</template>
<script setup lang='ts'>
import { AuctionResult } from 'src/entities/auction';
import CustomIcon from 'src/shared/ui/CustomIcon/CustomIcon.vue'

export type MobileListProps = {
    list: AuctionResult[];
};

const { list } = defineProps<MobileListProps>();
</script>

<style scoped lang='scss'>
@import 'src/app/assets/styles/theme/index.scss';

.item {
    padding-left: var(--spacing-8);
    padding-right: var(--spacing-8);
    padding-bottom: var(--spacing-16);

    &:not(:first-child) .divider{
        border-top: var(--color-stroke-grey) 1px solid;
    }
}

.item.winner {
    background: var(--background-color-green);
}


.item-title {
    @include font-text-large();

    display: flex;
    align-items: center;
    margin-top: var(--spacing-12);
    margin-bottom: var(--spacing-12);
}

.table-head-cell {
    @include font-text-medium();

    padding-right: var(--spacing-16);
    color: var(--color-text-gray);
}

.table-data-cell {
    @include font-text-large();

    &.winner {
        color: var(--color-stroke-green)
    }
}
</style>
