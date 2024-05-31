import { AuctionType } from 'src/entities/auction';

export interface CreateAuctionDto {
    name: string;
    auctionType: AuctionType;
    purchaseCode: string;
    customerName: string;
    cashFlow?: number;
    expectedCost: number;
    decreaseStep: number;
    timeForRoundInSecs: number;
    auctionStartAt: string;
    firstRoundStartAt: string;
}
