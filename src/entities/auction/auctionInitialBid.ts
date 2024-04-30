import { AuctionType } from './auctionType'

export type AuctionInitialBid =
    | {
          id: string
          auctionType: AuctionType.DEFAULT | AuctionType.ESCO
          name: string
          isMin: boolean
          isMax: boolean
          fullPrice: string
      }
    | {
          id: string
          auctionType: AuctionType.NON_PRICE_CRITERIA
          name: string
          isMin: boolean
          isMax: boolean
          fullPrice: string
          coefficient: string
          enteredPrice: string
      }
