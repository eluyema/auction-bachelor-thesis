import { AuctionResult } from 'src/entities/auction';
import { VerticalListItemProps } from 'src/shared/ui/VerticalList/VerticalListItem.vue';
import { TableRowProps, TableColumnProps } from 'src/shared/ui/TableData/index';
import { getUuid } from 'src/shared/utils/getUuid';
import { AuctionType } from 'src/entities/auction/auctionType';

class AuctionResultsMapper {
    private static tableColumns: Record<AuctionType, TableColumnProps[]> = {
        [AuctionType.DEFAULT]: [
            {id: "icon", name: '', width: 'min'},
            {id: "name", name: '', width: 'max'},
            {id: "fullPrice", name: 'Повна ціна, грн'},
            {id: "isWinner", name: '', width: 'min'}
        ],
        [AuctionType.NON_PRICE_CRITERIA]: [
            {id: "icon", name: '', width: 'min'},
            {id: "name", name: '', width: 'max'},
            {id: "fullPrice", name: 'Повна ціна, грн'},
            {id: "coefficient", name: 'Коефіцієнт'},
            {id: "enteredPrice", name: 'Приведена ціна, грн'},
            {id: "isWinner", name: '', width: 'min'}
        ],
        [AuctionType.ESCO]: [
            {id: "icon", name: '', width: 'min'},
            {id: "name", name: '', width: 'max'},
            {id: "fullPrice", name: 'Повна ціна, грн'},
            {id: "isWinner", name: '', width: 'min'}
        ],
    };


    static mapToVerticalListItems(results: AuctionResult[]): VerticalListItemProps[] {
        return results.map(result => this.mapResultToVerticalListItem(result));
    }

    private static mapResultToVerticalListItem(result: AuctionResult): VerticalListItemProps {
        const tableData = [
            { key: 'Повна ціна, грн:', value: result.fullPrice }
        ];

        if (result.auctionType === AuctionType.NON_PRICE_CRITERIA) {
            tableData.push({ key: 'Коефіцієнт: ', value: result.coefficient || '...'},
            { key: 'Приведена ціна, грн:', value: result.enteredPrice || '...' });
        }

        return {
            id: result.id,
            iconProps: {
                iconName: 'done',
                colorVariant: 'success'
            },
            name: result.name,
            tableData,
            labelValue: result.isWinner ? 'Переможець' : null,
            labelProps: { colorVariant: 'success', textShape: 'text' },
            activeBackground: result.isWinner
        };
    }

    static mapToTableDataRows(results: AuctionResult[]): TableRowProps[] {
        return results.map(result => {
            const data: TableRowProps["data"] = [
                {
                    id: getUuid(),
                    iconProps: {
                        iconName: 'done',
                        colorVariant: 'success'
                    }
                },
                {
                    id: getUuid(),
                    value: result.name,
                },
                {
                    id: getUuid(),
                    value: result.fullPrice
                }
            ];

            if (result.coefficient) {
                data.push({ id: getUuid(), value: result.coefficient });
            }

            if (result.enteredPrice) {
                data.push({ id: getUuid(), value: result.enteredPrice });
            }

            if (result.isWinner) {
                data.push({
                    id: getUuid(),
                    value: 'Переможець',
                    labelProps: {
                        textShape: 'text',
                        colorVariant: 'success'
                    }
                });
            } else {
                data.push({ id: getUuid(), value: '' });
            }

            return {
                id: result.id,
                data,
                activeBackground: result.isWinner
            };
        });
    }

    static mapToTableDataColumns(results: AuctionResult[]): TableColumnProps[] {
        const auctionType = results[0].auctionType;

        return this.tableColumns[auctionType];
    }
}

export { AuctionResultsMapper };
