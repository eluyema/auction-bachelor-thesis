import { AuctionResult } from 'src/entities/auction';
import { VerticalListItemProps } from 'src/shared/ui/VerticalList/VerticalListItem.vue';
import { TableRowProps, TableColumnProps } from 'src/shared/ui/TableData/index';
import { getUuid } from 'src/shared/utils/getUuid';
import { AuctionType } from 'src/entities/auction';
import { tableColumns } from './data';

class AuctionResultsMapper {
    static mapToVerticalListItems(results: AuctionResult[]): VerticalListItemProps[] {
        return results.map((result) => this.mapResultToVerticalListItem(result));
    }

    private static mapResultToVerticalListItem(result: AuctionResult): VerticalListItemProps {
        const tableData = [{ key: 'Повна ціна, грн:', value: result.fullPrice }];

        if (result.auctionType === AuctionType.NON_PRICE_CRITERIA) {
            tableData.push(
                { key: 'Коефіцієнт: ', value: result.coefficient },
                { key: 'Приведена ціна, грн:', value: result.enteredPrice },
            );
        }

        return {
            id: result.id,
            iconProps: {
                iconName: 'done',
                colorVariant: 'success',
            },
            name: result.name,
            tableData,
            labelValue: result.isWinner ? 'Переможець' : null,
            labelProps: { colorVariant: 'success', textShape: 'text' },
            activeBackground: result.isWinner,
        };
    }

    static mapToTableDataRows(results: AuctionResult[]): TableRowProps[] {
        return results.map((result) => {
            const data: TableRowProps['data'] = [
                {
                    id: getUuid(),
                    iconProps: {
                        iconName: 'done',
                        colorVariant: 'success',
                    },
                },
                {
                    id: getUuid(),
                    value: result.name,
                },
                {
                    id: getUuid(),
                    value: result.fullPrice,
                },
            ];

            if (result.auctionType === AuctionType.NON_PRICE_CRITERIA) {
                data.push(
                    { id: getUuid(), value: result.coefficient },
                    { id: getUuid(), value: result.enteredPrice },
                );
            }

            if (result.isWinner) {
                data.push({
                    id: getUuid(),
                    value: 'Переможець',
                    labelProps: {
                        textShape: 'text',
                        colorVariant: 'success',
                    },
                });
            } else {
                data.push({ id: getUuid(), value: '' });
            }

            return {
                id: result.id,
                data,
                activeBackground: result.isWinner,
            };
        });
    }

    static mapToTableDataColumns(results: AuctionResult[]): TableColumnProps[] {
        const auctionType = results[0].auctionType;

        return tableColumns[auctionType];
    }
}

export { AuctionResultsMapper };
