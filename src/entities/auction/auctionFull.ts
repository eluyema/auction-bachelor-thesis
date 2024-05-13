import { RoundFull } from '../round/RoundFull';
import { AuctionInfo } from './auctionInfo';

export interface AuctionFull extends AuctionInfo {
    Rounds: RoundFull[];
}
