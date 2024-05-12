import { AccessLevelType } from 'src/entities/users/MyUser';

export interface AuctionInfoDto {
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
