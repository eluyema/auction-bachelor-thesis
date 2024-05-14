import { defineStore } from 'pinia';
import { Services } from 'src/bootstrapServices';
import { LoadingStatuses } from 'src/entities/application';
import { AuctionInfo } from 'src/entities/auction/auctionInfo';
import { inject, reactive } from 'vue';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import { RoundFull } from 'src/entities/round/RoundFull';

export type AuctionsStore = {
    auctions: AuctionInfo[];
    auctionsStatus: LoadingStatuses;
    currentAuction: AuctionFull | null;
    currentAuctionStatus: LoadingStatuses;
    participation: {
        isParticipant: boolean;
        sequenceNumber: number | null;
    };
    participationStatus: LoadingStatuses;
    biddingStatus: LoadingStatuses;
    userAuctions: AuctionInfo[];
    userAuctionsStatus: LoadingStatuses;
    userNameOfAuctions: string;
};

export const useAuctionsStore = defineStore('auction', () => {
    const state = reactive<AuctionsStore>({
        auctions: [],
        auctionsStatus: LoadingStatuses.IDLE,
        currentAuction: null,
        currentAuctionStatus: LoadingStatuses.IDLE,
        participationStatus: LoadingStatuses.IDLE,
        participation: {
            isParticipant: false,
            sequenceNumber: null,
        },
        userAuctions: [],
        userAuctionsStatus: LoadingStatuses.IDLE,
        userNameOfAuctions: '',
        biddingStatus: LoadingStatuses.IDLE,
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

    const loadUserAuctions = async (userId: string) => {
        try {
            if (!services) {
                return;
            }
            state.userAuctionsStatus = LoadingStatuses.PENDING;
            state.userAuctions = [];
            const { userName, auctions } = await services.auctionClient.getUserAuctions(userId);
            state.userAuctionsStatus = LoadingStatuses.FULFILLED;
            state.userAuctions = auctions;
            state.userNameOfAuctions = userName;
        } catch (err) {
            state.userAuctionsStatus = LoadingStatuses.FAILED;
        }
    };

    const loadAuctionById = async (auctionId: string) => {
        try {
            if (!services) {
                return;
            }
            state.currentAuctionStatus = LoadingStatuses.PENDING;
            state.currentAuction = null;
            const auction = await services.auctionClient.getAuctionById(auctionId);
            state.currentAuctionStatus = LoadingStatuses.FULFILLED;
            state.currentAuction = auction;
        } catch (err) {
            state.currentAuctionStatus = LoadingStatuses.FAILED;
        }
    };

    const updateRounds = (rounds: RoundFull[]) => {
        if (!state.currentAuction) {
            return;
        }

        state.currentAuction.Rounds = rounds;
    };

    const loadMyParticipation = async (auctionId: string) => {
        try {
            if (!services) {
                return;
            }
            state.participationStatus = LoadingStatuses.PENDING;
            state.currentAuction = null;
            const { sequenceNumber, isParticipant } =
                await services.auctionClient.getMyParticipation(auctionId);
            state.participation = {
                sequenceNumber,
                isParticipant,
            };
            state.participationStatus = LoadingStatuses.FULFILLED;
        } catch (err) {
            state.participationStatus = LoadingStatuses.FAILED;
        }
    };

    const makeBid = async (auctionId: string, total: number) => {
        try {
            if (!services) {
                return;
            }
            state.biddingStatus = LoadingStatuses.PENDING;
            await services.auctionClient.makeBid(auctionId, total);
            state.biddingStatus = LoadingStatuses.FULFILLED;
        } catch (err) {
            state.biddingStatus = LoadingStatuses.FAILED;
        }
    };

    return {
        state,
        updateRounds,
        loadAuctions,
        loadUserAuctions,
        loadAuctionById,
        loadMyParticipation,
        makeBid,
    };
});
