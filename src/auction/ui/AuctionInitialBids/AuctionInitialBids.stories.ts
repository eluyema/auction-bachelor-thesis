import { Meta, StoryObj } from '@storybook/vue3';
import AuctionInitialBids from './AuctionInitialBids.vue';
import { AuctionInitialBid, AuctionType } from 'src/entities/auction';

const meta: Meta<typeof AuctionInitialBids> = {
    title: 'Organisms/AuctionInitialBids',
    component: AuctionInitialBids,
    argTypes: {
        list: {
            control: 'array',
            description: 'List of auction results',
        },
        disabled: {
            control: 'boolean',
            description: 'Make all text disabled colored',
        },
        showMax: {
            control: 'boolean',
            description: 'Show max label, otherwise min',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultList: AuctionInitialBid[] = [
    {
        id: '5',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        fullPrice: '46 005 000,00',
        isMin: false,
        isMax: true,
    },
    {
        id: '6',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ ДУВК`,
        fullPrice: '45 005 000,00',
        isMin: true,
        isMax: false,
    },
];

const defaultListLarge: AuctionInitialBid[] = [
    {
        id: '1',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ ВКП "ЕСКО"`,
        fullPrice: '58 500,00',
        isMin: false,
        isMax: true,
    },
    {
        id: '2',
        auctionType: AuctionType.DEFAULT,
        name: `ФОП "РУСАНОВ МИХАЙЛО ОЛЕКСІЙОВИЧ"`,
        fullPrice: '57 597,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '3',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "КИЇВСЬКА НАСОСНА КОМПАНІЯ"`,
        fullPrice: '57 006,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '4',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "ТОРГОВЕЛЬНА КОМПАНІЯ "СЕК"`,
        fullPrice: '53 025,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '5',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "ВКС АВТО"`,
        fullPrice: '52 119,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '6',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "ПРОФІЦЕНТР КВІТКА З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ НАУКОВО-ВИРОБНИЧИЙ ЦЕНТР ЕНЕРГІЯ ПЛЮС"`,
        fullPrice: '50 757,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '7',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "МАСТ КОМПАНІ"`,
        fullPrice: '49 500,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '8',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВ "ФОТОМАКС"`,
        fullPrice: '49 500,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '9',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "СМАРТ ГРІД"`,
        fullPrice: '48 093,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '10',
        auctionType: AuctionType.DEFAULT,
        name: `ФОП "Вітюк Юрій Петрович"`,
        fullPrice: '43 656,00',
        isMin: false,
        isMax: false,
    },
    {
        id: '11',
        auctionType: AuctionType.DEFAULT,
        name: `ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "НАУКОВО-ВИРОБНИЧЕ ПІДПРИЄМСТВО "ЕНЕРГОЗБЕРІГАЮЧІ ВИМІРЮВАЛЬНІ ТЕХНОЛОГІЇ"`,
        fullPrice: '42 000,00',
        isMin: true,
        isMax: false,
    },
];

const NonPriceList: AuctionInitialBid[] = [
    {
        id: '7',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ "БК"Ізобуд"`,
        fullPrice: '23 030 880,29',
        enteredPrice: '20 000 000,00',
        coefficient: '1,25',
        isMin: false,
        isMax: true,
    },
    {
        id: '8',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        fullPrice: '20 000 000,00',
        enteredPrice: '16 448 000,00',
        coefficient: '1,25',
        isMin: false,
        isMax: false,
    },
    {
        id: '9',
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        name: `ТОВ ДУВК`,
        fullPrice: '15 000 000,00',
        enteredPrice: '15 000 000,00',
        coefficient: '1,00',
        isMin: true,
        isMax: false,
    },
];

const ESCOList: AuctionInitialBid[] = [
    {
        id: '10',
        auctionType: AuctionType.ESCO,
        name: `ТОВ "БУДРЕМСЕРВІС"`,
        fullPrice: '46 005 000,00',
        isMin: false,
        isMax: true,
    },
    {
        id: '11',
        auctionType: AuctionType.ESCO,
        name: `ТОВ ДУВК`,
        fullPrice: '45 005 000,00',
        isMin: true,
        isMax: false,
    },
];

export const Default: Story = {
    args: {
        list: defaultList,
    },
};

export const DefaultDisabled: Story = {
    args: {
        list: defaultList,
        disabled: true,
    },
};

export const DefaultLarge: Story = {
    args: {
        list: defaultListLarge,
    },
};

export const NonPrice: Story = {
    args: {
        list: NonPriceList,
    },
};

export const NonPriceDisabled: Story = {
    args: {
        list: NonPriceList,
        disabled: true,
    },
};

export const ESCO: Story = {
    args: {
        list: ESCOList,
        showMax: true,
    },
};

export const ESCODisabled: Story = {
    args: {
        list: ESCOList,
        disabled: true,
        showMax: true,
    },
};
