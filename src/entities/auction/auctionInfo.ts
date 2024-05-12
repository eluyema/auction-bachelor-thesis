import { AccessLevelType } from '../users/MyUser';

export interface AuctionInfo {
    id: string;
    auctionType: AccessLevelType;
    auctionStatus: 'waiting' | 'active' | 'finished';
    auctionOptions: null;
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
