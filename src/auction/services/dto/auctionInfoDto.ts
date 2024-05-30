import { AuctionType } from 'src/entities/auction';

export interface AuctionInfoDto {
    id: string;
    auctionType: AuctionType;
    auctionStatus: 'waiting' | 'active' | 'finished';
    auctionOptions: null;
    name: string;
    cashFlow: number | null;
    purchaseCode: string;
    customerName: string;
    expectedCost: number;
    decreaseStep: number;
    auctionStartAt: string;
    firstRoundStartAt: string;
    timeForRoundInSecs: number;
    authorId: string;
}
