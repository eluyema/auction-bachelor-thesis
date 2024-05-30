<template>
    <DesktopOnly>
        <TableData
            :disabled="disabled"
            name="Початкові заявки"
            :rows="tableRows"
            :columns="tableColumns"
        />
    </DesktopOnly>
    <MobileOnly>
        <VerticalList :disabled="disabled" name="Початкові заявки" :list="verticalListItems" />
    </MobileOnly>
</template>

<script setup lang="ts">
import { AuctionInitialBidsMapper as mapper } from 'src/auction/mappers';
import { AuctionInitialBid } from 'src/entities/auction';
import DesktopOnly from 'src/shared/ui/DesktopOnly/DesktopOnly.vue';
import MobileOnly from 'src/shared/ui/MobileOnly/MobileOnly.vue';
import TableData from 'src/shared/ui/TableData/TableData.vue';
import VerticalList from 'src/shared/ui/VerticalList/VerticalList.vue';
import { computed } from 'vue';

export type AuctionInitialBidsProps = {
    list: AuctionInitialBid[];
    disabled?: boolean;
    showMax?: boolean;
};

const props = defineProps<AuctionInitialBidsProps>();

const verticalListItems = computed(() =>
    mapper.mapToVerticalListItems(props.list, { showLabelForMax: !!props.showMax }),
);
const tableColumns = computed(() => mapper.mapToTableDataColumns(props.list));
const tableRows = computed(() =>
    mapper.mapToTableDataRows(props.list, { showLabelForMax: !!props.showMax }),
);
</script>
