import { AuctionType } from "./auctionType";

export type AuctionInitialBid = {
    id: string;
    auctionType: AuctionType;
    name: string;
    isMin: boolean;
    isMax: boolean;
    fullPrice: string
    coefficient?: string
    enteredPrice?: string
}
