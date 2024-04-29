import { AuctionType } from './auctionType'

export type AuctionResult = {
    id: string
    auctionType: AuctionType
    name: string
    isWinner: boolean
    fullPrice: string
    coefficient?: string
    enteredPrice?: string
}
