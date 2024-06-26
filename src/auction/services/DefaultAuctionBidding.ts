import { AuctionFull } from 'src/entities/auction/auctionFull';
import { AuctionRoundProps } from '../ui/AuctionRound/AuctionRound.vue';
import { AuctionInitialBidsMapper, AuctionResultsMapper, AuctionRoundBidMapper } from '../mappers';
import { AuctionBidSettings, AuctionType, Participation } from 'src/entities/auction';
import { ProgressBarProps } from 'src/shared/ui/ProgressBar/ProgressBar.vue';
import { IAuctionBidding } from './IAuctionBidding';

export class DefaultAuctionBidding implements IAuctionBidding {
    getRoundProps(
        roundNum: 1 | 2 | 3,
        auction: AuctionFull | null,
        currentDate: Date,
        participation: Participation,
    ): AuctionRoundProps {
        const defaultProps = {
            title: 'Раунд ' + roundNum,
            list: [],
            disabledText: true,
            disabledIcons: true,
        };

        if (!auction || !auction.Rounds.length) {
            return defaultProps;
        }

        const round = auction.Rounds.find((round) => round.sequenceNumber === roundNum);

        if (!round?.Bids?.length) {
            return defaultProps;
        }

        const list = AuctionRoundBidMapper.mapToAuctionRoundBids({
            round,
            currentDate,
            auctionType: auction.auctionType,
            participation: participation,
        });

        const disabledIcons =
            new Date(round.endAt) < currentDate || new Date(round.startAt) > currentDate;

        const disabledText =
            new Date(round.endAt) < currentDate || new Date(round.startAt) > currentDate;

        return { ...defaultProps, list, disabledIcons, disabledText };
    }

    getBiddingFormSettings(
        auction: AuctionFull | null,
        currentDate: Date,
        participation: Participation,
    ): AuctionBidSettings {
        const defaultBadSettings: AuctionBidSettings = {
            auctionType: AuctionType.DEFAULT,
            fullPriceMax: 0,
        };

        if (!auction) {
            return defaultBadSettings;
        }

        if (!auction.Rounds.length) {
            return defaultBadSettings;
        }

        const currentTimeStr = currentDate.toISOString();

        const currentRound = auction.Rounds.find(
            (round) => round.startAt < currentTimeStr && round.endAt > currentTimeStr,
        );

        if (!currentRound || currentRound.sequenceNumber === 0) {
            return defaultBadSettings;
        }

        const roundBeforeCurrent = auction.Rounds.find(
            (round) => round.sequenceNumber === currentRound.sequenceNumber - 1,
        );

        if (!roundBeforeCurrent) {
            return defaultBadSettings;
        }

        const myPseudonym = participation.pseudonym;
        const currentBidsWithoutMyBid = currentRound.Bids.filter(
            (bid) => bid.pseudonym !== myPseudonym,
        );
        const allBidsToCompare = [...currentBidsWithoutMyBid, ...roundBeforeCurrent.Bids];

        const sortedBids = [...allBidsToCompare].sort((a, b) => {
            if (!a.total || !b.total) {
                throw new Error('total is missed in bids');
            }
            return a.total - b.total;
        });

        const minBid = sortedBids[0];

        if (!minBid) {
            return defaultBadSettings;
        }

        const step = auction.decreaseStep;

        if (!minBid.total) {
            throw new Error('Total is missed in last bid');
        }

        const fullPriceMax = minBid.total - step;

        return {
            auctionType: AuctionType.DEFAULT,
            fullPriceMax: fullPriceMax > 0 ? fullPriceMax : 0,
        };
    }

    getAuctionResultList(auction: AuctionFull | null, participation: Participation) {
        if (!auction) {
            return [];
        }

        const thirdRound = auction.Rounds.find((round) => round.sequenceNumber === 3);

        if (!thirdRound) {
            return [];
        }

        return AuctionResultsMapper.mapToAuctionResults({
            round: thirdRound,
            auctionType: auction.auctionType,
            participation: participation,
        });
    }

    getProgressBarProps(auction: AuctionFull | null, currentDate: Date): ProgressBarProps {
        if (!auction) {
            return { message: 'Очікування', variant: 'warning' };
        }

        const isEmptyRounds = !auction.Rounds.length;

        if (isEmptyRounds && new Date(auction.firstRoundStartAt) < currentDate) {
            return { message: 'Завершено', variant: 'success' };
        } else if (isEmptyRounds) {
            return { message: 'Очікування', variant: 'warning' };
        }

        const rounds = auction.Rounds;

        const firstRound = rounds.find((r) => r.sequenceNumber === 1);
        const secondRound = rounds.find((r) => r.sequenceNumber === 2);
        const thirdRound = rounds.find((r) => r.sequenceNumber === 3);

        if (!firstRound || !secondRound || !thirdRound) {
            return { message: 'Очікування', variant: 'warning' };
        }

        if (
            new Date(firstRound.startAt) < currentDate &&
            new Date(firstRound.endAt) > currentDate
        ) {
            return {
                message: 'Раунд 1',
                variant: 'primary',
            };
        }

        if (
            new Date(secondRound.startAt) < currentDate &&
            new Date(secondRound.endAt) > currentDate
        ) {
            return {
                message: 'Раунд 2',
                variant: 'primary',
            };
        }

        if (
            new Date(thirdRound.startAt) < currentDate &&
            new Date(thirdRound.endAt) > currentDate
        ) {
            return {
                message: 'Раунд 3',
                variant: 'primary',
            };
        }

        if (new Date(thirdRound.endAt) < currentDate) {
            return { message: 'Завершено', variant: 'success' };
        }

        return { message: 'Очікування', variant: 'warning' };
    }

    getRoundsDateInterval(auction: AuctionFull | null) {
        if (!auction) {
            return { startAt: new Date(0), endAt: new Date(0) };
        }

        if (!auction.Rounds.length) {
            return {
                startAt: new Date(auction.auctionStartAt),
                endAt: new Date(auction.auctionStartAt),
            };
        }

        const { startAt, endAt } = AuctionRoundBidMapper.getRoundsDateInterval(
            auction.Rounds.filter((round) => round.sequenceNumber !== 0),
        );

        return {
            startAt: startAt || new Date(auction.auctionStartAt),
            endAt: endAt || new Date(auction.auctionStartAt),
        };
    }

    getInitialBids(auction: AuctionFull | null, participation: Participation) {
        if (!auction) {
            return [];
        }

        if (!auction.Rounds.length) {
            return [];
        }

        return AuctionInitialBidsMapper.mapToInitialBids(auction, participation);
    }

    getIsAuctionStarted(auction: AuctionFull | null, currentDate: Date) {
        if (!auction) {
            return false;
        }

        return new Date(auction.auctionStartAt) < currentDate;
    }

    getMyNearestBidInterval(
        auction: AuctionFull | null,
        currentDate: Date,
        participation: Participation,
    ) {
        if (!auction || !participation.isParticipant || participation.pseudonym === null) {
            return { startAt: new Date(0).toJSON(), endAt: new Date(0).toJSON() };
        }

        const yourPseudonym = participation.pseudonym;

        const currentRound = auction.Rounds.find(
            (round) => new Date(round.startAt) < currentDate && new Date(round.endAt) > currentDate,
        );

        const nextRounds = auction.Rounds.filter((round) => new Date(round.startAt) > currentDate);

        if (!currentRound) {
            return { startAt: new Date(0).toJSON(), endAt: new Date(0).toJSON() };
        }

        const yourBid = currentRound.Bids.find((bid) => bid.pseudonym === yourPseudonym);

        if (!yourBid) {
            return { startAt: new Date(0).toJSON(), endAt: new Date(0).toJSON() };
        }

        if (new Date(yourBid.endAt) < currentDate && nextRounds.length) {
            const nextRound = [...nextRounds].sort(
                (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
            )[0];
            const yourBid = nextRound.Bids.find((bid) => bid.pseudonym === yourPseudonym);

            if (!yourBid) {
                return { startAt: new Date(0).toJSON(), endAt: new Date(0).toJSON() };
            }

            return { startAt: yourBid.startAt, endAt: yourBid.endAt };
        }

        return { startAt: yourBid.startAt, endAt: yourBid.endAt };
    }

    getIsParticipantsExists(auction: AuctionFull | null) {
        if (!auction) {
            return false;
        }

        const rounds = auction.Rounds;

        if (rounds.length === 0) {
            return false;
        }

        const initRound = rounds.find((round) => round.sequenceNumber === 0);

        if (!initRound) {
            return false;
        }

        if (initRound.Bids.length === 0) {
            return false;
        }

        return true;
    }
}
