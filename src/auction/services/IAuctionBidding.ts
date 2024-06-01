import { AuctionFull } from 'src/entities/auction/auctionFull';
import { AuctionRoundProps } from '../ui/AuctionRound/AuctionRound.vue';
import {
    AuctionBidSettings,
    AuctionInitialBid,
    AuctionResult,
    Participation,
} from 'src/entities/auction';
import { ProgressBarProps } from 'src/shared/ui/ProgressBar/ProgressBar.vue';

export interface IAuctionBidding {
    getRoundProps(
        roundNum: 1 | 2 | 3,
        auction: AuctionFull | null,
        currentDate: Date,
        participation: Participation,
    ): AuctionRoundProps;

    getBiddingFormSettings(
        auction: AuctionFull | null,
        currentDate: Date,
        participation: Participation,
    ): AuctionBidSettings;

    getAuctionResultList(
        auction: AuctionFull | null,
        participation: Participation,
    ): AuctionResult[];

    getProgressBarProps(auction: AuctionFull | null, currentDate: Date): ProgressBarProps;

    getRoundsDateInterval(auction: AuctionFull | null): {
        startAt: Date;
        endAt: Date;
    };

    getInitialBids(auction: AuctionFull | null, participation: Participation): AuctionInitialBid[];

    getMyNearestBidInterval(
        auction: AuctionFull | null,
        currentDate: Date,
        participation: Participation,
    ): {
        startAt: string;
        endAt: string;
    };

    getIsParticipantsExists(auction: AuctionFull | null): boolean;

    getIsAuctionStarted(auction: AuctionFull | null, currentDate: Date): boolean;
}
