import { AuctionFull } from 'src/entities/auction/auctionFull';
import { DefaultAuctionBidding } from './DefaultAuctionBidding';
import { AuctionType } from 'src/entities/auction';
import { ESCOAuctionBidding } from './ESCOAuctionBidding';
import { NonPriceCriteriaAuctionBidding } from './NonPriceCriteriaAuctionBidding';
import { IAuctionBidding } from './IAuctionBidding';

export class BiddingFabric {
    static getInstance(auction: AuctionFull | null): IAuctionBidding {
        if (!auction) {
            return new DefaultAuctionBidding();
        }

        const { auctionType } = auction;

        if (auctionType === AuctionType.DEFAULT) {
            return new DefaultAuctionBidding();
        } else if (auctionType === AuctionType.ESCO) {
            return new ESCOAuctionBidding();
        }

        return new NonPriceCriteriaAuctionBidding();
    }
}
