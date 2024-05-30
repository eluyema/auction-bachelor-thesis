import { AuctionType } from 'src/entities/auction';
import { TableColumnProps } from 'src/shared/ui/TableData';

export const tableColumns: Record<AuctionType, TableColumnProps[]> = {
    [AuctionType.DEFAULT]: [
        { id: 'icon', name: '', width: 'min' },
        { id: 'name', name: '', width: 'max' },
        { id: 'fullPrice', name: 'Повна ціна, грн' },
        { id: 'isWinner', name: '', width: 'min' },
    ],
    [AuctionType.NON_PRICE_CRITERIA]: [
        { id: 'icon', name: '', width: 'min' },
        { id: 'name', name: '', width: 'max' },
        { id: 'fullPrice', name: 'Повна ціна, грн' },
        { id: 'coefficient', name: 'Коефіцієнт' },
        { id: 'adjustedPrice', name: 'Приведена ціна, грн' },
        { id: 'isWinner', name: '', width: 'min' },
    ],
    [AuctionType.ESCO]: [
        { id: 'icon', name: '', width: 'min' },
        { id: 'name', name: '', width: 'max' },
        { id: 'fullPrice', name: 'Повна ціна, грн' },
        { id: 'isWinner', name: '', width: 'min' },
    ],
};
