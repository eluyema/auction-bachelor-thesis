<template>
        <table class='table'>
            <tr class='table-head'>
                <th class='table-head-cell table-head-name'></th>
                <th class='table-head-cell table-head-full-price'>Повна ціна, грн</th>
                <th class='table-head-cell table-head-coefficient' v-if='!!firstItem.coefficient'>Коефіцієнт</th>
                <th class='table-head-cell table-head-entered-price' v-if='!!firstItem.enteredPrice'>Приведена ціна, грн</th>
                <th class='table-head-cell table-head-winner'></th>
            </tr>
            <tr v-for='item of list' class='item' :class='{winner: item.isWinner}'>
                <td class='table-data-cell'>
                    <h6 class='item-title'>
                        <CustomIcon iconName='done' colorVariant='success' class='item-title-icon' />{{item.name}}
                    </h6>
                </td>
                <td class='table-data-cell'>{{item.fullPrice}}</td>
                <td class='table-data-cell' v-if='item.coefficient'>{{item.coefficient}}</td>
                <td class='table-data-cell' v-if='item.enteredPrice'>{{item.enteredPrice}}</td>
                <td class='table-data-cell winner'>{{item.isWinner ? 'Переможець' : ''}}</td>
            </tr>
        </table>
</template>
<script setup lang='ts'>
import { AuctionResult } from 'src/entities/auction';
import CustomIcon from 'src/shared/ui/CustomIcon/CustomIcon.vue'

export type MobileListProps = {
    list: AuctionResult[];
};

const { list } = defineProps<MobileListProps>();

const defaultFirstItem: AuctionResult = {
    id: '',
    name: '',
    fullPrice: '',
    isWinner: false,
};

const firstItem: AuctionResult = list.length && list[0] || defaultFirstItem;

</script>

<style scoped lang='scss'>
@import 'src/app/assets/styles/theme/index.scss';

.table {
    width: 100%;
    border-collapse: collapse;
}

.table-head {
    height: 40px;
    margin-bottom: var(--spacing-8);
    border-bottom: var(--color-stroke-grey) 1px solid;
}

.table-head-name {
    width: max-content;
}

.table-head-full-price {
    width: 180px;
}

.table-head-coefficient {
    width: 180px;
}

.table-head-entered-price {
    width: 180px;
}

.table-head-winner {
    width: 130px;
}

.item.winner {
    background: var(--background-color-green);
}

.item-title {
    display: flex;
    align-items: center;
}


.item-title-icon {
    margin-right: var(--spacing-16);
    margin-left: var(--spacing-12);
}


.table-head-cell {
    @include font-text-medium();

    text-align: start;
    color: var(--color-text-gray);
}

.table-data-cell, .item-title {
    @include font-text-medium();

    height: 48px;

    &.winner {
        color: var(--color-stroke-green)
    }

    @include desktop() {
        font-size: var(--size-m);
    }
}
</style>
