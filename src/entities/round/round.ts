import { Bid } from '../bid/Bid';

export interface Round {
    id: string;
    sequenceNumber: 0;
    auctionId: string;
    userId: null;
    Bids: Bid[];
}
