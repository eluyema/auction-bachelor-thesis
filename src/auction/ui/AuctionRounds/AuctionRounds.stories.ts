import { Meta, StoryObj } from '@storybook/vue3'
import AuctionRounds from './AuctionRounds.vue'
import { AuctionType, AuctionRound, AuctionRoundStatus } from 'src/entities/auction'

const meta: Meta<typeof AuctionRounds> = {
    title: 'Organisms/AuctionRounds',
    component: AuctionRounds,
    parameters: {
        background: {
            default: 'dark'
        }
    },
    argTypes: {
        list: {
            control: 'array',
            description: 'List of auction results'
        },
        disabledText: {
            control: 'boolean',
            description: 'Make all text disabled colored'
        },
        showMax: {
            control: 'boolean',
            description: 'Show max label, otherwise min'
        },
        disabledIcons: {
            control: 'boolean',
            description: 'Make all icons disabled colored'
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

const defaultListBeforeRoundBegins: AuctionRound[] = [
    {
        id: '5',
        auctionType: AuctionType.DEFAULT,
        name: `TBD`,
        status: AuctionRoundStatus.PENDING,
        announced: false
    },
    {
        id: '6',
        auctionType: AuctionType.DEFAULT,
        name: `TBD`,
        status: AuctionRoundStatus.PENDING,
        announced: false
    }
]

const defaultListRoundStarted: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `Учасник №1`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `Ви`,
        fullPrice: '50 005 000,00',
        isMin: true,
        isMax: false
    }
]

const defaultList1Bids: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.ABOUT_TO_CLOSE,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `Учасник №1`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `Ви`,
        fullPrice: '50 005 000,00',
        isMin: true,
        isMax: false
    }
]

const defaultList2Bids: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `Учасник №1`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.ABOUT_TO_CLOSE,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `Ви`,
        fullPrice: '50 005 000,00',
        isMin: true,
        isMax: false
    }
]

const defaultListRoundEnds: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `Учасник №1`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `Ви`,
        fullPrice: '50 005 000,00',
        isMin: true,
        isMax: false
    }
]

const defaultListAuctionEnds: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.ACTIVE_BIDDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ ДУВК`,
        fullPrice: '48 000 000,00',
        isMin: true,
        isMax: false
    }
]

const defaultListLarge: AuctionRound[] = [
    {
        id: '1',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДА­ЛЬНІСТЮ «ЕНЕРГЕТИЧНА КОМПАНІЯ «ІНСОЛ»"`,
        fullPrice: '65 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '2',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "ЗАПОРІЗЬКИЙ ТЕПЛО-ЕНЕРГО ПРОЕКТ"`,
        fullPrice: '57 597,00',
        isMin: false,
        isMax: false
    },
    {
        id: '3',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `АТ "Альцест"`,
        fullPrice: '57 006,00',
        isMin: false,
        isMax: false
    },
    {
        id: '4',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "БК СІМАКС"`,
        fullPrice: '53 025,00',
        isMin: false,
        isMax: false
    },
    {
        id: '5',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `ФОП КУЗНЄЦОВ КИРИЛО ІГОРОВИЧ`,
        fullPrice: '52 119,00',
        isMin: false,
        isMax: false
    },
    {
        id: '6',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `ФОП Литвиненко Христина Вікторівна`,
        fullPrice: '50 757,00',
        isMin: false,
        isMax: false
    },
    {
        id: '7',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.DEFAULT,
        name: `ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «ТРЕЙД-КОМПАНІ 2021»`,
        fullPrice: '49 500,00',
        isMin: true,
        isMax: false
    }
]

const nonPriceListBeforeRoundBegins: AuctionRound[] = [
    {
        id: '5',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `TBD`,
        status: AuctionRoundStatus.PENDING,
        announced: false
    },
    {
        id: '6',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `TBD`,
        status: AuctionRoundStatus.PENDING,
        announced: false
    },
    {
        id: '7',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `TBD`,
        status: AuctionRoundStatus.PENDING,
        announced: false
    }
]

const nonPriceListRoundStarted: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №2`,
        enteredPrice: '26 000 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №1`,
        enteredPrice: '20 000 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: false,
        isMax: false
    },
    {
        id: '7',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №3`,
        enteredPrice: '16 448 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: true,
        isMax: false
    }
]

const nonPriceList1Bids: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.ACTIVE_BIDDING,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №2`,
        enteredPrice: '26 000 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.ABOUT_TO_CLOSE,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №1`,
        enteredPrice: '20 000 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: false,
        isMax: false
    },
    {
        id: '7',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №3`,
        enteredPrice: '16 448 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: true,
        isMax: false
    }
]

const nonPriceList2Bids: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.ACTIVE_BIDDING,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №2`,
        enteredPrice: '26 000 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №1`,
        enteredPrice: '20 000 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: false,
        isMax: false
    },
    {
        id: '7',
        status: AuctionRoundStatus.ABOUT_TO_CLOSE,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №3`,
        enteredPrice: '16 448 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: true,
        isMax: false
    }
]

const nonPriceListRoundEnds: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №2`,
        enteredPrice: '26 000 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №1`,
        enteredPrice: '20 000 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: false,
        isMax: false
    },
    {
        id: '7',
        status: AuctionRoundStatus.ACTIVE_BIDDING,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `Учасник №3`,
        enteredPrice: '16 448 000,00',
        fullPrice: '...',
        coefficient: '...',
        isMin: true,
        isMax: false
    }
]

const nonPriceListAuctionEnds: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ ДУВК`,
        enteredPrice: '26 000 000,00',
        fullPrice: '26 000 000,00',
        coefficient: '1,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ "БК"Ізобуд"`,
        enteredPrice: '20 000 000,00',
        fullPrice: '25 712 078,84',
        coefficient: '1,25',
        isMin: false,
        isMax: false
    },
    {
        id: '7',
        status: AuctionRoundStatus.ACTIVE_BIDDING,
        announced: true,
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        enteredPrice: '16 448 000,00',
        fullPrice: '26 030 880,29',
        coefficient: '1,25',
        isMin: true,
        isMax: false
    }
]

const ESCOListBeforeRoundBegins: AuctionRound[] = [
    {
        id: '5',
        auctionType: AuctionType.ESCO,
        name: `TBD`,
        status: AuctionRoundStatus.PENDING,
        announced: false
    },
    {
        id: '6',
        auctionType: AuctionType.ESCO,
        name: `TBD`,
        status: AuctionRoundStatus.PENDING,
        announced: false
    }
]

const ESCOListRoundStarted: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `Учасник №1`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `Ви`,
        fullPrice: '50 005 000,00',
        isMin: true,
        isMax: false
    }
]

const ESCOList1Bids: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.ABOUT_TO_CLOSE,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `Учасник №1`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.PENDING,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `Ви`,
        fullPrice: '50 005 000,00',
        isMin: true,
        isMax: false
    }
]

const ESCOList2Bids: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `Учасник №1`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.ABOUT_TO_CLOSE,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `Ви`,
        fullPrice: '50 005 000,00',
        isMin: true,
        isMax: false
    }
]

const ESCOListRoundEnds: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `Учасник №1`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `Ви`,
        fullPrice: '50 005 000,00',
        isMin: true,
        isMax: false
    }
]

const ESCOListAuctionEnds: AuctionRound[] = [
    {
        id: '5',
        status: AuctionRoundStatus.COMPLETED,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        fullPrice: '50 010 000,00',
        isMin: false,
        isMax: true
    },
    {
        id: '6',
        status: AuctionRoundStatus.ACTIVE_BIDDING,
        announced: true,
        auctionType: AuctionType.ESCO,
        name: `ТОВ ДУВК`,
        fullPrice: '48 000 000,00',
        isMin: true,
        isMax: false
    }
]

export const DefaultBeforeRoundBegins: Story = {
    args: {
        title: 'Раунд 1',
        list: defaultListBeforeRoundBegins,
        disabledText: true
    }
}

export const DefaultRoundStarted: Story = {
    args: {
        title: 'Раунд 1',
        list: defaultListRoundStarted
    }
}

export const Default1Bids: Story = {
    args: {
        title: 'Раунд 2',
        list: defaultList1Bids
    }
}

export const Default2Bids: Story = {
    args: {
        title: 'Раунд 2',
        list: defaultList2Bids
    }
}

export const DefaultRoundEnds: Story = {
    args: {
        title: 'Раунд 2',
        list: defaultListRoundEnds,
        disabledText: true,
        disabledIcons: true
    }
}

export const DefaultAuctionEnds: Story = {
    args: {
        title: 'Раунд 2',
        list: defaultListAuctionEnds,
        disabledIcons: true
    }
}

export const DefaultLarge: Story = {
    args: {
        title: 'Раунд 2',
        list: defaultListLarge
    }
}

export const NonPriceBeforeRoundBegins: Story = {
    args: {
        title: 'Раунд 1',
        list: nonPriceListBeforeRoundBegins,
        disabledText: true,
        disabledIcons: true
    }
}

export const NonPriceRoundStarted: Story = {
    args: {
        title: 'Раунд 1',
        list: nonPriceListRoundStarted
    }
}

export const NonPrice1Bids: Story = {
    args: {
        title: 'Раунд 1',
        list: nonPriceList1Bids
    }
}

export const NonPrice2Bids: Story = {
    args: {
        title: 'Раунд 2',
        list: nonPriceList2Bids
    }
}

export const NonPriceRoundEnds: Story = {
    args: {
        title: 'Раунд 2',
        list: nonPriceListRoundEnds,
        disabledText: true,
        disabledIcons: true
    }
}

export const NonPriceAuctionEnds: Story = {
    args: {
        title: 'Раунд 2',
        list: nonPriceListAuctionEnds,
        disabledText: true,
        disabledIcons: true
    }
}

export const ESCOBeforeRoundBegins: Story = {
    args: {
        title: 'Раунд 1',
        list: ESCOListBeforeRoundBegins,
        showMax: true,
        disabledText: true,
        disabledIcons: true
    }
}

export const ESCORoundStarted: Story = {
    args: {
        title: 'Раунд 1',
        list: ESCOListRoundStarted,
        showMax: true
    }
}

export const ESCO1Bids: Story = {
    args: {
        title: 'Раунд 1',
        list: ESCOList1Bids,
        showMax: true
    }
}

export const ESCO2Bids: Story = {
    args: {
        title: 'Раунд 2',
        list: ESCOList2Bids,
        showMax: true
    }
}

export const ESCORoundEnds: Story = {
    args: {
        title: 'Раунд 2',
        list: ESCOListRoundEnds,
        showMax: true,
        disabledText: true,
        disabledIcons: true
    }
}

export const ESCOAuctionEnds: Story = {
    args: {
        title: 'Раунд 2',
        list: ESCOListAuctionEnds,
        showMax: true,
        disabledIcons: true
    }
}
