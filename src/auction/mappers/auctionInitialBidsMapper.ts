import { AuctionInitialBid, AuctionType } from 'src/entities/auction';
import { VerticalListItemProps } from 'src/shared/ui/VerticalList/VerticalListItem.vue';
import { TableRowProps, TableColumnProps } from 'src/shared/ui/TableData/index';
import { getUuid } from 'src/shared/utils/getUuid';
import { tableColumns } from './data';

class AuctionInitialBidsMapper {
    static mapToVerticalListItems(
        results: AuctionInitialBid[],
        options = { showLabelForMax: false },
    ): VerticalListItemProps[] {
        return results.map((result) => this.mapInitialBidsToVerticalListItem(result, options));
    }

    private static mapInitialBidsToVerticalListItem(
        result: AuctionInitialBid,
        options = { showLabelForMax: false },
    ): VerticalListItemProps {
        const { showLabelForMax } = options;

        const tableData = [{ key: 'Повна ціна, грн:', value: result.fullPrice }];

        if (result.auctionType === AuctionType.NON_PRICE_CRITERIA) {
            tableData.push(
                { key: 'Коефіцієнт: ', value: result.coefficient },
                { key: 'Приведена ціна, грн:', value: result.enteredPrice },
            );
        }

        const labelValue = this.getLabelValue(result, showLabelForMax);

        return {
            id: result.id,
            iconProps: {
                iconName: 'done',
            },
            name: result.name,
            tableData,
            labelValue,
            labelProps: { colorVariant: 'primary', textShape: 'contained' },
        };
    }

    private static getLabelValue(data: AuctionInitialBid, showLabelForMax: boolean): string | null {
        if (showLabelForMax && data.isMax) {
            return 'максимум';
        }

        if (!showLabelForMax && data.isMin) {
            return 'мінімум';
        }

        return null;
    }

    static mapToTableDataRows(
        results: AuctionInitialBid[],
        options = { showLabelForMax: false },
    ): TableRowProps[] {
        const { showLabelForMax } = options;

        return results.map((result) => {
            const data: TableRowProps['data'] = [
                {
                    id: getUuid(),
                    iconProps: {
                        iconName: 'done',
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

            const labelValue = this.getLabelValue(result, showLabelForMax);

            data.push({
                id: getUuid(),
                value: labelValue || '',
                labelProps: { colorVariant: 'primary', textShape: 'contained' },
            });

            return {
                id: result.id,
                data,
            };
        });
    }

    static mapToTableDataColumns(results: AuctionInitialBid[]): TableColumnProps[] {
        const auctionType = results[0].auctionType;

        return tableColumns[auctionType];
    }
}

export { AuctionInitialBidsMapper };
