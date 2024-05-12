import { defineStore } from 'pinia';

export type AuctionStore = {
    auctions: [];
};

export const useAuctionStore = defineStore('auction', () => {});
