import { AuctionResult } from 'src/entities/auction';
import { VerticalListItemProps } from 'src/shared/ui/VerticalList/VerticalListItem.vue';
import { TableRowProps, TableColumnProps } from 'src/shared/ui/TableData/index';
import { getUuid } from 'src/shared/utils/getUuid';
import { AuctionType } from 'src/entities/auction';
import { tableColumns } from './data';
import { RoundFull } from 'src/entities/round/RoundFull';
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice';

class AuctionResultsMapper {
    static mapToAuctionResults(params: {
        round: RoundFull;
        auctionType: AuctionType;
    }): AuctionResult[] {
        const { round, auctionType } = params;

        if (!round.Bids.length) {
            return [];
        }

        if (auctionType !== AuctionType.DEFAULT) {
            return [];
        }

        const sortedBids = [...round.Bids].sort((a, b) => a.sequenceNumber - b.sequenceNumber);

        const filteredBids = [...round.Bids].sort((a, b) => a.total - b.total);

        const minBid = filteredBids[0];

        return sortedBids.map((bid) => {
            const name = bid.User ? bid.User.name : 'Учасник №' + (bid.sequenceNumber + 1);

            const auctionRoundBid: AuctionResult = {
                id: bid.id,
                name,
                auctionType: auctionType,
                fullPrice: formatNumberToPrice(bid.total) + ' грн',
                isWinner: bid.id === minBid.id,
            };

            return auctionRoundBid;
        });
    }

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
        if (!results.length) {
            return tableColumns[AuctionType.DEFAULT];
        }
        const auctionType = results[0].auctionType;

        return tableColumns[auctionType];
    }
}

export { AuctionResultsMapper };
