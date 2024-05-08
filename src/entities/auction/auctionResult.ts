import { AuctionType } from './auctionType';

export type AuctionResult =
    | {
          id: string;
          auctionType: AuctionType.DEFAULT | AuctionType.ESCO;
          name: string;
          isWinner: boolean;
          fullPrice: string;
      }
    | {
          id: string;
          auctionType: AuctionType.NON_PRICE_CRITERIA;
          name: string;
          isWinner: boolean;
          fullPrice: string;
          coefficient: string;
          enteredPrice: string;
      };
