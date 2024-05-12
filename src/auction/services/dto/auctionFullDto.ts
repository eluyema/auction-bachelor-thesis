import { Round } from 'src/entities/round/round';
import { AccessLevelType } from 'src/entities/users/MyUser';

export interface AuctionFullDto {
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
    Rounds: Round[];
}
