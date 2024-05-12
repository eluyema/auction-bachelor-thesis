import { Round } from '../round/round';
import { AuctionInfo } from './auctionInfo';

export interface AuctionFull extends AuctionInfo {
    Rounds: Round[];
}
