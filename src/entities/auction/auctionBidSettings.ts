import { AuctionType } from "./auctionType";

export type AuctionBidSettings = {
    auctionType: AuctionType.DEFAULT
    fullPriceMin: number
} | {
    auctionType: AuctionType.NON_PRICE_CRITERIA
    fullPriceMin: number
    coefficient: number
}
| {
    auctionType: AuctionType.ESCO
    basePrice: number,
    fullPriceMin: number
    defaultYears: number,
    defaultDays: number,
    defaultPercent: number,
}