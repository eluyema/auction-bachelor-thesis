import { AuctionType } from 'src/entities/auction';
import { RoundFull } from 'src/entities/round/RoundFull';

export interface AuctionFullDto {
    id: string;
    auctionType: AuctionType;
    auctionStatus: 'waiting' | 'active' | 'finished';
    auctionOptions: null;
    name: string;
    purchaseCode: string;
    cashFlow: number | null;
    customerName: string;
    expectedCost: number;
    decreaseStep: number;
    auctionStartAt: string;
    firstRoundStartAt: string;
    timeForRoundInSecs: number;
    authorId: string;
    Rounds: RoundFull[];
}
