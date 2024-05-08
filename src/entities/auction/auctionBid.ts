import { AuctionType } from './auctionType';

export type DefaultAuctionBid = {
    id: string;
    auctionType: AuctionType.DEFAULT;
    fullPrice: string;
    aborted: boolean;
};

export type NonPriceCriteria = {
    id: string;
    auctionType: AuctionType.NON_PRICE_CRITERIA;
    coefficient: number;
    enteredPrice: string;
    fullPrice: string;
    aborted: boolean;
};

export type ESCOAuctionBid = {
    id: string;
    auctionType: AuctionType.ESCO;
    fullPrice: string;
    aborted: boolean;
    years: number;
    days: number;
    percent: number;
};

export type AuctionBid = DefaultAuctionBid | NonPriceCriteria | ESCOAuctionBid;
