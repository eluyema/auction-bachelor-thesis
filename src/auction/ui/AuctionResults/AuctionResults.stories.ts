import { Meta, StoryObj } from '@storybook/vue3'
import AuctionResults from './AuctionResults.vue'
import { AuctionResult, AuctionType } from 'src/entities/auction'

const meta: Meta<typeof AuctionResults> = {
    title: 'Organisms/AuctionResults',
    component: AuctionResults,
    parameters: {
        background: {
            default: 'dark'
        }
    },
    argTypes: {
        list: {
            control: 'array',
            description: 'List of auction results'
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

const defaultList: AuctionResult[] = [
    {
        id: '1',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        fullPrice: '46 005 000,00',
        isWinner: false
    },
    {
        id: '2',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ ДУВК`,
        fullPrice: '45 005 000,00',
        isWinner: true
    }
]

const NonPriceList: AuctionResult[] = [
    {
        id: '1',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ "БК"Ізобуд"`,
        fullPrice: '23 030 880,29',
        enteredPrice: '20 000 000,00',
        coefficient: '1,25',
        isWinner: false
    },
    {
        id: '2',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        fullPrice: '20 000 000,00',
        enteredPrice: '16 448 000,00',
        coefficient: '1,25',
        isWinner: false
    },
    {
        id: '3',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ ДУВК`,
        fullPrice: '15 000 000,00',
        enteredPrice: '15 000 000,00',
        coefficient: '1,00',
        isWinner: true
    }
]

const ESCOList: AuctionResult[] = [
    {
        id: '1',
        auctionType: AuctionType.ESCO,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        fullPrice: '46 005 000,00',
        isWinner: false
    },
    {
        id: '2',
        auctionType: AuctionType.ESCO,
        name: `ТОВ ДУВК`,
        fullPrice: '45 005 000,00',
        isWinner: true
    }
]

export const Default: Story = {
    args: {
        list: defaultList
    }
}

export const NonPrice: Story = {
    args: {
        list: NonPriceList
    }
}

export const ESCO: Story = {
    args: {
        list: ESCOList
    }
}