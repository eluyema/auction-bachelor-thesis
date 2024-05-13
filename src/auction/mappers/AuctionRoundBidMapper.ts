import {
    AuctionRoundBid,
    AuctionRoundStatus,
    AuctionType,
    Participation,
} from 'src/entities/auction';
import { RoundFull } from 'src/entities/round/RoundFull';
import { VerticalListItemProps } from 'src/shared/ui/VerticalList/VerticalListItem.vue';
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice';

class AuctionRoundBidMapper {
    static mapToAuctionRoundBids(params: {
        round: RoundFull;
        auctionType: AuctionType;
        currentDate: Date;
        participation: Participation;
    }): AuctionRoundBid[] {
        const { round, currentDate, auctionType, participation } = params;

        if (!round.Bids.length) {
            return [];
        }

        if (auctionType !== AuctionType.DEFAULT) {
            return [];
        }

        const announced = new Date(round.startAt) < currentDate;

        const sortedBids = [...round.Bids].sort((a, b) => a.sequenceNumber - b.sequenceNumber);

        const filteredBids = [...round.Bids].sort((a, b) => a.total - b.total);

        const maxBid = filteredBids[filteredBids.length - 1];
        const minBid = filteredBids[0];

        if (!announced) {
            return sortedBids.map((bid) => {
                const auctionRoundBid: AuctionRoundBid = {
                    id: bid.id,
                    announced,
                    name: 'TBD',
                    auctionType: auctionType,
                    status: AuctionRoundStatus.PENDING,
                };

                return auctionRoundBid;
            });
        }

        return sortedBids.map((bid) => {
            let status = AuctionRoundStatus.PENDING;

            if (new Date(bid.startAt) < currentDate && currentDate < new Date(bid.endAt)) {
                status = AuctionRoundStatus.ABOUT_TO_CLOSE;
            } else if (new Date(bid.endAt) < currentDate) {
                status = AuctionRoundStatus.COMPLETED;
            }

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

            const auctionRoundBid: AuctionRoundBid = {
                id: bid.id,
                announced,
                name,
                auctionType: auctionType,
                status,
                fullPrice: formatNumberToPrice(bid.total) + ' грн',
                isMin: bid.id === minBid.id,
                isMax: bid.id === maxBid.id,
            };

            return auctionRoundBid;
        });
    }

    static mapToVerticalListItems(
        results: AuctionRoundBid[],
        options = { showLabelForMax: false },
    ): VerticalListItemProps[] {
        return results.map((result) => this.mapRoundToVerticalListItem(result, options));
    }

    private static mapRoundToVerticalListItem(
        result: AuctionRoundBid,
        options = { showLabelForMax: false },
    ): VerticalListItemProps {
        const { showLabelForMax } = options;
        if (!result.announced) {
            return {
                id: result.id,
                iconProps: {
                    iconName: 'circle',
                },
                name: result.name,
                tableData: [],
            };
        }

        const tableData = [{ key: 'Повна ціна, грн:', value: result.fullPrice }];

        if (result.auctionType === AuctionType.NON_PRICE_CRITERIA) {
            tableData.push(
                { key: 'Коефіцієнт: ', value: result.coefficient },
                { key: 'Приведена ціна, грн:', value: result.enteredPrice },
            );
        }

        const labelValue = this.getLabelValue(result, showLabelForMax);
        const iconProps = this.getIconProps(result);
        const bordered = this.getBorderedValue(result);

        return {
            id: result.id,
            iconProps,
            name: result.name,
            tableData,
            labelValue,
            labelProps: { colorVariant: 'primary', textShape: 'contained' },
            bordered,
        };
    }

    public static getRoundsDateInterval(rounds: RoundFull[]): {
        startAt: Date | null;
        endAt: Date | null;
    } {
        let startAt: string | null = null;
        let endAt: string | null = null;

        rounds.forEach((round) => {
            if (!round.startAt || !round.endAt) {
                return;
            }
            if (startAt === null && round.startAt) {
                startAt = round.startAt;
            }
            if (endAt === null && round.endAt) {
                endAt = round.endAt;
            }
            if (startAt && round.startAt < startAt) {
                startAt = round.startAt;
            }
            if (endAt && round.endAt > endAt) {
                endAt = round.endAt;
            }
        });

        if (startAt && endAt) {
            return { startAt: new Date(startAt), endAt: new Date(endAt) };
        }

        return { startAt: null, endAt: null };
    }

    private static getLabelValue(
        data: AuctionRoundBid,
        showLabelForMax: boolean,
    ): 'максимум' | 'мінімум' | null {
        if (!data.announced) {
            return null;
        }

        if (showLabelForMax && data.isMax) {
            return 'максимум';
        }

        if (!showLabelForMax && data.isMin) {
            return 'мінімум';
        }

        return null;
    }

    private static getIconProps(data: AuctionRoundBid): VerticalListItemProps['iconProps'] {
        const roundStatus: AuctionRoundStatus = data.status;

        switch (roundStatus) {
            case AuctionRoundStatus.PENDING:
                return {
                    iconName: 'circle',
                };
            case AuctionRoundStatus.ACTIVE_BIDDING:
                return {
                    iconName: 'arrow_circle_down',
                    colorVariant: 'success',
                };
            case AuctionRoundStatus.ABOUT_TO_CLOSE:
                return {
                    iconName: 'schedule',
                    colorVariant: 'primary',
                };
            default:
                return {
                    iconName: 'done',
                    colorVariant: 'success',
                };
        }
    }

    private static getBorderedValue(data: AuctionRoundBid) {
        if (!data.announced) {
            return false;
        }

        if (data.status === AuctionRoundStatus.ABOUT_TO_CLOSE) {
            return true;
        }

        return false;
    }
}

export { AuctionRoundBidMapper };
