import { BidFull } from '../bid/BidFull';

export interface RoundFull {
    id: string;
    sequenceNumber: number;
    auctionId: string;
    userId: null;
    Bids: BidFull[];
    startAt: string;
    endAt: string;
}
