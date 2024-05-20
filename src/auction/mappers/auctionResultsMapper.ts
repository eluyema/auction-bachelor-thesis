import { AuctionResult, Participation } from 'src/entities/auction';
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
        participation: Participation;
    }): AuctionResult[] {
        const { round, auctionType, participation } = params;

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
            let name = bid.pseudonym;
            let userAuctionsLink = null;
            if (
                participation.isParticipant &&
                participation.pseudonym !== null &&
                participation.pseudonym === bid.pseudonym
            ) {
                name = 'Ви';
            } else if (bid.User) {
                userAuctionsLink = '/auctions/user/' + bid.User.id;
                name = bid.User.name;
            }

            const auctionRoundBid: AuctionResult = {
                id: bid.id,
                name,
                auctionType: auctionType,
                userAuctionsLink,
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
                    link: null,
                },
                {
                    id: getUuid(),
                    value: result.name,
                    link: result.userAuctionsLink || null,
                },
                {
                    id: getUuid(),
                    value: result.fullPrice,
                    link: null,
                },
            ];

            if (result.auctionType === AuctionType.NON_PRICE_CRITERIA) {
                data.push(
                    {
                        id: getUuid(),
                        value: result.coefficient,
                        link: null,
                    },
                    {
                        id: getUuid(),
                        value: result.enteredPrice,
                        link: null,
                    },
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
                    link: null,
                });
            } else {
                data.push({ id: getUuid(), value: '', link: null });
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
