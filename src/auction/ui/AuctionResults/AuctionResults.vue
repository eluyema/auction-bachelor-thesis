<template>
    <DesktopOnly>
        <TableData name="Результати" :rows="tableRows" :columns="tableColumns" />
    </DesktopOnly>
    <MobileOnly>
        <VerticalList name="Результати" :list="verticalListItems" />
    </MobileOnly>
</template>

<script setup lang="ts">
import { AuctionResultsMapper as mapper } from 'src/auction/mappers';
import { AuctionResult } from 'src/entities/auction';
import DesktopOnly from 'src/shared/ui/DesktopOnly/DesktopOnly.vue';
import MobileOnly from 'src/shared/ui/MobileOnly/MobileOnly.vue';
import TableData from 'src/shared/ui/TableData/TableData.vue';
import VerticalList from 'src/shared/ui/VerticalList/VerticalList.vue';

export type AuctionResultsProps = {
    list: AuctionResult[];
};

const { list } = defineProps<AuctionResultsProps>();
const verticalListItems = mapper.mapToVerticalListItems(list);
const tableColumns = mapper.mapToTableDataColumns(list);
const tableRows = mapper.mapToTableDataRows(list);
</script>
