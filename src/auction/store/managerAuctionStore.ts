import { defineStore } from 'pinia';
import { Services } from 'src/bootstrapServices';
import { LoadingStatuses } from 'src/entities/application';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import { AuctionInfo } from 'src/entities/auction/auctionInfo';
import { inject, reactive } from 'vue';
import { CreateAuctionDto } from '../services/dto/createAuctionDto';

export interface ManagerAuctionState {
    myAuctions: AuctionInfo[];
    auctionFull: AuctionFull | null;
    myAuctionsStatus: LoadingStatuses;
    auctionFullStatus: LoadingStatuses;
    createAuctionStatus: LoadingStatuses;
    addBidStatus: LoadingStatuses;
    removeBidStatus: LoadingStatuses;
    removeStatus: LoadingStatuses;
}

export const useManagerAuctionStore = defineStore('managerAuction', () => {
    const state = reactive<ManagerAuctionState>({
        myAuctions: [],
        auctionFull: null,
        myAuctionsStatus: LoadingStatuses.IDLE,
        auctionFullStatus: LoadingStatuses.IDLE,
        createAuctionStatus: LoadingStatuses.IDLE,
        addBidStatus: LoadingStatuses.IDLE,
        removeBidStatus: LoadingStatuses.IDLE,
        removeStatus: LoadingStatuses.IDLE,
    });

    const services = inject<Services>('services');

    const loadMyAuctions = async () => {
        try {
            if (!services) {
                return;
            }
            state.myAuctionsStatus = LoadingStatuses.PENDING;
            state.myAuctions = [];
            const auctions = await services.managerAuctionClient.getMyAuctions();
            state.myAuctionsStatus = LoadingStatuses.FULFILLED;
            state.myAuctions = auctions;
        } catch (err) {
            state.myAuctionsStatus = LoadingStatuses.FAILED;
        }
    };

    const loadAuctionById = async (id: string) => {
        try {
            if (!services) {
                return;
            }
            state.auctionFullStatus = LoadingStatuses.PENDING;
            state.auctionFull = null;
            const auction = await services.managerAuctionClient.getFullAccessAuction(id);
            state.auctionFullStatus = LoadingStatuses.FULFILLED;
            state.auctionFull = auction;
        } catch (err) {
            state.auctionFullStatus = LoadingStatuses.FAILED;
        }
    };

    const createAuction = async (data: CreateAuctionDto) => {
        try {
            if (!services) {
                return;
            }
            state.createAuctionStatus = LoadingStatuses.PENDING;
            await services.managerAuctionClient.createAuction(data);
            state.createAuctionStatus = LoadingStatuses.FULFILLED;
        } catch (err) {
            state.createAuctionStatus = LoadingStatuses.FAILED;
        }
    };

    const addInitialBidForUser = async (data: {
        userId: string;
        auctionId: string;
        total: number;
    }) => {
        try {
            if (!services) {
                return;
            }
            const { userId, auctionId, total } = data;
            state.addBidStatus = LoadingStatuses.PENDING;
            await services.managerAuctionClient.addInitialBidForUser({ userId, auctionId, total });
            state.addBidStatus = LoadingStatuses.FULFILLED;
        } catch (err) {
            state.addBidStatus = LoadingStatuses.FAILED;
        }
    };

    const removeInitialBidForUser = async (data: { userId: string; auctionId: string }) => {
        try {
            if (!services) {
                return;
            }
            const { userId, auctionId } = data;
            state.removeBidStatus = LoadingStatuses.PENDING;
            await services.managerAuctionClient.removeInitialBidForUser({ userId, auctionId });
            state.removeBidStatus = LoadingStatuses.FULFILLED;
        } catch (err) {
            state.removeBidStatus = LoadingStatuses.FAILED;
        }
    };

    const removeAuction = async (auctionId: string) => {
        try {
            if (!services) {
                return;
            }

            state.removeStatus = LoadingStatuses.PENDING;
            await services.managerAuctionClient.removeAuction({ auctionId });
            state.removeStatus = LoadingStatuses.FULFILLED;
        } catch (err) {
            state.removeStatus = LoadingStatuses.FAILED;
        }
    };

    return {
        state,
        loadMyAuctions,
        loadAuctionById,
        createAuction,
        addInitialBidForUser,
        removeInitialBidForUser,
        removeAuction,
    };
});
