import { AuctionType } from './auctionType';

export interface AuctionInfo {
    id: string;
    auctionType: AuctionType;
    auctionStatus: 'waiting' | 'active' | 'finished';
    auctionOptions: null;
    cashFlow: number | null;
    name: string;
    purchaseCode: string;
    customerName: string;
    expectedCost: number;
    decreaseStep: number;
    auctionStartAt: string;
    firstRoundStartAt: string;
    timeForRoundInSecs: number;
    authorId: string;
}
