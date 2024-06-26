import { Meta, StoryObj } from '@storybook/vue3';
import BiddingForm from './BiddingForm.vue';
import { getAdjustDate } from 'src/shared/utils/getAdjustDate';
import { AuctionType } from 'src/entities/auction';
import { getUuid } from 'src/shared/utils/getUuid';

const meta: Meta<typeof BiddingForm> = {
    title: 'Organisms/BiddingForm',
    component: BiddingForm,
    parameters: {
        backgrounds: {
            default: 'light',
        },
        layout: 'fullscreen',
    },
    argTypes: {
        settings: {
            control: 'object',
            description: 'Basic settings with restriction and type of auction',
        },
        auctionStartAt: {
            control: 'date',
            description: 'Date when the auction start',
        },
        roundStartAt: {
            control: 'date',
            description: 'Date when the round start',
        },
        yourTurnStartAt: {
            control: 'date',
            description: 'Date when the your turn of bidding start',
        },
        yourTurnEndAt: {
            control: 'date',
            description: 'Date when the your turn of bidding end',
        },
        currentBid: {
            control: 'object',
            description: 'Current bid',
        },
        lastBid: {
            control: 'object',
            description: 'Current bid',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AuctionNotStarted: Story = {
    args: {
        settings: { auctionType: AuctionType.DEFAULT, fullPriceMax: 49999998 },
        auctionStartAt: getAdjustDate({ days: 2, hours: 21, seconds: 4 }),
        roundStartAt: getAdjustDate({ days: 3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ days: 4, hours: 21, minutes: 20, seconds: 10 }),
        yourTurnEndAt: getAdjustDate({ days: 4, hours: 21, minutes: 20, seconds: 10 }),
    },
};

export const RoundNotStarted: Story = {
    args: {
        settings: { auctionType: AuctionType.DEFAULT, fullPriceMax: 49999998 },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ hours: 2 }),
        yourTurnStartAt: getAdjustDate({ days: 4, hours: 21, seconds: 10 }),
        yourTurnEndAt: getAdjustDate({ days: 4, hours: 21, minutes: 20, seconds: 10 }),
    },
};

export const YourTurnNotStarted: Story = {
    args: {
        settings: { auctionType: AuctionType.DEFAULT, fullPriceMax: 49999998 },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: 100 }),
        yourTurnEndAt: getAdjustDate({ days: 4, hours: 21, minutes: 20, seconds: 10 }),
    },
};

export const DefaultYourTurnStarted: Story = {
    args: {
        settings: { auctionType: AuctionType.DEFAULT, fullPriceMax: 49999998 },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
    },
};

export const DefaultYourTurnStartedBiddingReady: Story = {
    args: {
        settings: { auctionType: AuctionType.DEFAULT, fullPriceMax: 49999998 },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
        currentBid: {
            aborted: false,
            auctionType: AuctionType.DEFAULT,
            fullPrice: 34546346734645,
            id: 'f126c2ae-6a20-495d-b88a-81fc62e4a85a',
        },
    },
};

export const DefaultYourTurnStartedBiddingAborted: Story = {
    args: {
        settings: { auctionType: AuctionType.DEFAULT, fullPriceMax: 49999998 },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
        currentBid: {
            aborted: true,
            auctionType: AuctionType.DEFAULT,
            fullPrice: 34546346734645,
            id: 'f126c2ae-6a20-495d-b88a-81fc62e4a85a',
        },
    },
};

export const NonPriceYourTurnStarted: Story = {
    args: {
        settings: {
            auctionType: AuctionType.NON_PRICE_CRITERIA,
            fullPriceMax: 49999998,
            coefficient: 1.25,
        },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
    },
};

export const NonPriceYourTurnStartedBiddingReady: Story = {
    args: {
        settings: {
            auctionType: AuctionType.NON_PRICE_CRITERIA,
            fullPriceMax: 49999998,
            coefficient: 1.5,
        },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
        currentBid: {
            aborted: false,
            auctionType: AuctionType.DEFAULT,
            fullPrice: 34546346734645,
            id: 'f126c2ae-6a20-495d-b88a-81fc62e4a85a',
        },
    },
};

export const NonPriceYourTurnStartedBiddingAborted: Story = {
    args: {
        settings: {
            auctionType: AuctionType.NON_PRICE_CRITERIA,
            fullPriceMax: 49999998,
            coefficient: 1.75,
        },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
        currentBid: {
            aborted: true,
            auctionType: AuctionType.DEFAULT,
            fullPrice: 34546346734645,
            id: 'f126c2ae-6a20-495d-b88a-81fc62e4a85a',
        },
    },
};

export const ESCOYourTurnStarted: Story = {
    args: {
        settings: {
            auctionType: AuctionType.ESCO,
            cashFlow: 50000,
            fullPriceMin: 961089,
        },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
        lastBid: {
            id: getUuid(),
            auctionType: AuctionType.ESCO,
            fullPrice: 961089,
            aborted: false,
            years: 11,
            days: 123,
            percent: 87,
        },
    },
};

export const ESCOYourTurnStartedBiddingReady: Story = {
    args: {
        settings: {
            auctionType: AuctionType.ESCO,
            cashFlow: 100000,
            fullPriceMin: 961089,
        },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
        currentBid: {
            aborted: false,
            auctionType: AuctionType.DEFAULT,
            fullPrice: 34546346734645,
            id: 'f126c2ae-6a20-495d-b88a-81fc62e4a85a',
        },
        lastBid: {
            id: getUuid(),
            auctionType: AuctionType.ESCO,
            fullPrice: 961089,
            aborted: false,
            years: 11,
            days: 123,
            percent: 87,
        },
    },
};

export const ESCOYourTurnStartedBiddingAborted: Story = {
    args: {
        settings: {
            auctionType: AuctionType.ESCO,
            cashFlow: 100000,
            fullPriceMin: 961089,
        },
        auctionStartAt: getAdjustDate({ days: -2, hours: 21, seconds: 10 }),
        roundStartAt: getAdjustDate({ days: -3, hours: 21, seconds: 10 }),
        yourTurnStartAt: getAdjustDate({ seconds: -1 }),
        yourTurnEndAt: getAdjustDate({ seconds: 120 }),
        currentBid: {
            aborted: true,
            auctionType: AuctionType.DEFAULT,
            fullPrice: 34546346734645,
            id: 'f126c2ae-6a20-495d-b88a-81fc62e4a85a',
        },
        lastBid: {
            id: getUuid(),
            auctionType: AuctionType.ESCO,
            fullPrice: 961089,
            aborted: false,
            years: 11,
            days: 123,
            percent: 87,
        },
    },
};
