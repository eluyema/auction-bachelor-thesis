import { defineStore } from 'pinia';
import { Services } from 'src/bootstrapServices';
import { LoadingStatuses } from 'src/entities/application';
import { AuctionInfo } from 'src/entities/auction/auctionInfo';
import { inject, reactive } from 'vue';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import { RoundFull } from 'src/entities/round/RoundFull';
import { AuctionBid } from 'src/entities/auction';

export type AuctionsStore = {
    auctions: AuctionInfo[];
    auctionsStatus: LoadingStatuses;
    currentAuction: AuctionFull | null;
    currentAuctionStatus: LoadingStatuses;
    participation: {
        isParticipant: boolean;
        pseudonym: string | null;
        coefficient: number | null;
        lastYears: number | null;
        lastDays: number | null;
        lastPercent: number | null;
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
            pseudonym: null,
            coefficient: null,
            lastYears: null,
            lastDays: null,
            lastPercent: null,
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
            const { pseudonym, isParticipant, coefficient, lastYears, lastDays, lastPercent } =
                await services.auctionClient.getMyParticipation(auctionId);
            state.participation = {
                pseudonym,
                isParticipant,
                coefficient,
                lastYears,
                lastDays,
                lastPercent,
            };
            state.participationStatus = LoadingStatuses.FULFILLED;
        } catch (err) {
            state.participationStatus = LoadingStatuses.FAILED;
        }
    };

    const makeBid = async (auctionId: string, bid: AuctionBid) => {
        try {
            if (!services) {
                return;
            }
            state.biddingStatus = LoadingStatuses.PENDING;
            await services.auctionClient.makeBid(auctionId, bid);
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
