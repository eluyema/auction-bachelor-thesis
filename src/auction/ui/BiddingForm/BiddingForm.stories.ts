import { Meta, StoryObj } from '@storybook/vue3'
import BiddingForm from './BiddingForm.vue'
import { getAdjustDate } from 'src/shared/utils/getAdjustDate'

const meta: Meta<typeof BiddingForm> = {
    title: 'Organisms/BiddingForm',
    component: BiddingForm,
    parameters: {
        backgrounds: {
            default: 'light',
        },
        layout: 'fullscreen'
    },
    argTypes: {
        auctionStartAt: {
            control: 'date',
            description: 'Date when the auction start'
        },
        roundStartAt: {
            control: 'date',
            description: 'Date when the round start'
        },
        yourTurnStartAt: {
            control: 'date',
            description: 'Date when the your turn of bidding start'
        },
        yourTurnEndAt: {
            control: 'date',
            description: 'Date when the your turn of bidding end'
        },
        fullPriceMin: {
            control: 'number',
            description: 'Minimal full price'
        },
        currentBid: {
            control: 'object',
            description: 'Current bid'
        },
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const AuctionNotStarted: Story = {
    args: {
        auctionStartAt: getAdjustDate({ days: 2, hours: 21, seconds: 4 }),
        roundStartAt: getAdjustDate({ days: 3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ days: 4, hours: 21, seconds: 10 }),
        yourTurnEndAt: getAdjustDate({ days: 4, hours: 21, minutes: 20, seconds: 10 }),
        fullPriceMin: 49999998,
    },
}

export const RoundNotStarted: Story = {
    args: {
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({  hours: 2 }),
        yourTurnStartAt: getAdjustDate({ days: 4, hours: 21, seconds: 10 }),
        yourTurnEndAt: getAdjustDate({ days: 4, hours: 21, minutes: 20, seconds: 10 }),
        fullPriceMin: 49999998,
    },

}

export const YourTurnNotStarted: Story = {
    args: {
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: 100 }),
        yourTurnEndAt: getAdjustDate({ days: 4, hours: 21, minutes: 20, seconds: 10 }),
        fullPriceMin: 49999998,
    }
}

export const YourTurnStarted: Story = {
    args: {
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 1000 }),
        fullPriceMin: 49999998,
    }
}

export const YourTurnStartedBiddingReady: Story = {
    args: {
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 1000 }),
        fullPriceMin: 49999998,
        currentBid: {
            aborted: false,
            fullPrice: "34 546 346 734 645,00",
            id: "f126c2ae-6a20-495d-b88a-81fc62e4a85a"
        }   
    }
}