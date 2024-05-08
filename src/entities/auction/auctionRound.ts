import { AuctionType } from './auctionType';

export enum AuctionRoundStatus {
    PENDING = 'pending',
    ACTIVE_BIDDING = 'active_bidding',
    ABOUT_TO_CLOSE = 'about_to_close',
    COMPLETED = 'completed',
}

export type AuctionRound =
    | {
          id: string;
          auctionType: AuctionType;
          announced: false;
          name: string;
          status: AuctionRoundStatus;
      }
    | {
          id: string;
          auctionType: AuctionType.DEFAULT | AuctionType.ESCO;
          announced: true;
          name: string;
          status: AuctionRoundStatus;
          fullPrice: string;
          isMax: boolean;
          isMin: boolean;
      }
    | {
          id: string;
          auctionType: AuctionType.NON_PRICE_CRITERIA;
          announced: true;
          name: string;
          status: AuctionRoundStatus;
          fullPrice: string;
          coefficient: string;
          enteredPrice: string;
          isMax: boolean;
          isMin: boolean;
      };
