import { AuctionInitialBid, AuctionType, Participation } from 'src/entities/auction';
import { VerticalListItemProps } from 'src/shared/ui/VerticalList/VerticalListItem.vue';
import { TableRowProps, TableColumnProps } from 'src/shared/ui/TableData/index';
import { getUuid } from 'src/shared/utils/getUuid';
import { tableColumns } from './data';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice';

class AuctionInitialBidsMapper {
    static mapToInitialBids(
        auction: AuctionFull,
        participation: Participation,
    ): AuctionInitialBid[] {
        if (auction.Rounds.length === 0) {
            return [];
        }

        const initRound = auction.Rounds.find((round) => round.sequenceNumber === 0);
        if (!initRound) {
            return [];
        }

        if (auction.auctionType === AuctionType.DEFAULT) {
            const bids: AuctionInitialBid[] = initRound.Bids.map((bid) => {
                let name = 'Учасник №' + (bid.sequenceNumber + 1);
                if (
                    participation.isParticipant &&
                    participation.sequenceNumber !== null &&
                    participation.sequenceNumber === bid.sequenceNumber
                ) {
                    name = 'Ви';
                } else if (bid.User) {
                    name = bid.User.name;
                }

                const preparedRound: AuctionInitialBid = {
                    id: bid.id,
                    auctionType: AuctionType.DEFAULT,
                    name,
                    isMin: bid.sequenceNumber === initRound.Bids.length - 1,
                    isMax: bid.sequenceNumber !== initRound.Bids.length - 1,
                    fullPrice: formatNumberToPrice(bid.total) + ' грн',
                };

                return preparedRound;
            });
            return bids;
        }
        return [];
    }

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
                    link: null,
                },
                {
                    id: getUuid(),
                    value: result.name,
                    link: null,
                },
                {
                    id: getUuid(),
                    value: result.fullPrice,
                    link: null,
                },
            ];

            if (result.auctionType === AuctionType.NON_PRICE_CRITERIA) {
                data.push(
                    { id: getUuid(), value: result.coefficient, link: null },
                    { id: getUuid(), value: result.enteredPrice, link: null },
                );
            }

            const labelValue = this.getLabelValue(result, showLabelForMax);

            data.push({
                id: getUuid(),
                value: labelValue || '',
                link: null,
                labelProps: { colorVariant: 'primary', textShape: 'contained' },
            });

            return {
                id: result.id,
                data,
            };
        });
    }

    static mapToTableDataColumns(results: AuctionInitialBid[]): TableColumnProps[] {
        if (!results.length) {
            return tableColumns[AuctionType.DEFAULT];
        }
        const auctionType = results[0].auctionType;

        return tableColumns[auctionType];
    }
}

export { AuctionInitialBidsMapper };
