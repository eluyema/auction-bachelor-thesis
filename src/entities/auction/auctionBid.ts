import { AuctionType } from './auctionType'

export type AuctionBid =
    | {
          id: string
          auctionType: AuctionType.DEFAULT
          fullPrice: string
          aborted: boolean
      }
    | {
          id: string
          auctionType: AuctionType.NON_PRICE_CRITERIA
          coefficient: number
          enteredPrice: string
          fullPrice: string
          aborted: boolean
      }
    | {
          id: string
          auctionType: AuctionType.ESCO
          fullPrice: string
          aborted: boolean
          years: number
          days: number
          percent: number
      }
