import { AuctionType } from './auctionType';

export type AuctionResult =
    | {
          id: string;
          auctionType: AuctionType.DEFAULT;
          name: string;
          isWinner: boolean;
          userAuctionsLink: string | null;
          winnerLink?: string;
          fullPrice: string;
      }
    | {
          id: string;
          auctionType: AuctionType.ESCO;
          name: string;
          isWinner: boolean;
          userAuctionsLink: string | null;
          fullPrice: string;
          years: string; // TODO: refactor
          days: string;
          winnerLink?: string;
          percent: string;
      }
    | {
          id: string;
          auctionType: AuctionType.NON_PRICE_CRITERIA;
          name: string;
          isWinner: boolean;
          fullPrice: string;
          userAuctionsLink: string | null;
          winnerLink?: string;
          coefficient: string;
          adjustedPrice: string;
      };
