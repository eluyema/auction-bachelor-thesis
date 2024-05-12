import { defineStore } from 'pinia';
import { Services } from 'src/bootstrapServices';
import { LoadingStatuses } from 'src/entities/application';
import { AuctionInfo } from 'src/entities/auction/auctionInfo';
import { inject, reactive } from 'vue';

export type AuctionsStore = {
    auctions: AuctionInfo[];
    auctionsStatus: LoadingStatuses;
};

export const useAuctionsStore = defineStore('auction', () => {
    const state = reactive<AuctionsStore>({
        auctions: [],
        auctionsStatus: LoadingStatuses.IDLE,
    });

    const services = inject<Services>('services');

    const loadAuctions = async () => {
        try {
            if (!services) {
                return;
            }
            state.auctionsStatus = LoadingStatuses.PENDING;
            state.auctions = [];
            const auctions = await services.auctionClient.getAllAuctions();
            state.auctionsStatus = LoadingStatuses.FULFILLED;
            state.auctions = auctions;
        } catch (err) {
            state.auctionsStatus = LoadingStatuses.FAILED;
        }
    };

    return { state, loadAuctions };
});
