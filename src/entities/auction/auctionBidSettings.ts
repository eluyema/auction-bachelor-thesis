import { AuctionType } from './auctionType';

export type AuctionBidSettings =
    | {
          auctionType: AuctionType.DEFAULT;
          fullPriceMax: number;
      }
    | {
          auctionType: AuctionType.NON_PRICE_CRITERIA;
          fullPriceMax: number;
          coefficient: number;
      }
    | {
          auctionType: AuctionType.ESCO;
          cashFlow: number;
          fullPriceMin: number;
      };
