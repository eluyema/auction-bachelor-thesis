<template>
    <div class="container">
        <div class="auction-header">
            <AppHeader :showProgressBar="!!currentAuction" :progressBarProps="progressBarProps" />
        </div>
        <main class="content-wrapper">
            <div class="content">
                <AuctionInfoBanner
                    class="auction-banner"
                    v-if="currentAuction"
                    :auction="currentAuction"
                />
                <AuctionStartDateSection
                    class="auction-start-date-section"
                    v-if="currentAuction && !isAuctionStarted"
                    :auctionStartAt="new Date(currentAuction.auctionStartAt)"
                />
                <AuctionInitialBids
                    v-if="!isNoOneParticipants && isAuctionStarted"
                    :list="initialBids"
                    :showMax="showMaxLabel"
                    :disabled="isRoundsTime"
                />
                <ul class="rounds-list" v-if="!isNoOneParticipants && isRoundsStarted">
                    <li class="round-item">
                        <AuctionRound
                            :showMax="showMaxLabel"
                            class="round-block"
                            v-bind:="firstRoundProps"
                        />
                    </li>
                    <li class="round-item">
                        <AuctionRound
                            :showMax="showMaxLabel"
                            class="round-block"
                            v-bind:="secondRoundProps"
                        />
                    </li>
                    <li class="round-item">
                        <AuctionRound
                            :showMax="showMaxLabel"
                            class="round-block"
                            v-bind:="thirdRoundProps"
                        />
                    </li>
                </ul>
                <AuctionResults
                    v-if="!isNoOneParticipants && isRoundsEnded"
                    :list="auctionResultsList"
                />
                <div class="bidding-form-space" v-if="currentAuction && showBiddingForm"></div>
            </div>
        </main>
        <BiddingForm
            class="bidding-form-section"
            @bidSent="onMakeBid"
            v-if="currentAuction && showBiddingForm"
            :auctionStartAt="currentAuction.auctionStartAt"
            :roundStartAt="currentAuction.firstRoundStartAt"
            :currentBid="null"
            :lastBid="lastBid"
            :yourTurnStartAt="myNearestBidInterval.startAt"
            :yourTurnEndAt="myNearestBidInterval.endAt"
            :auctionEndAt="roundsDateInterval.endAt.toJSON()"
            :settings="biddingFormSettings"
        />
    </div>
</template>
<script setup lang="ts">
import { AuctionSocket } from 'src/auction/services/AuctionSocket';
import { BiddingFabric } from 'src/auction/services/BiddingFabric';
import { ESCOAuctionBidding } from 'src/auction/services/ESCOAuctionBidding';
import { IAuctionBidding } from 'src/auction/services/IAuctionBidding';
import { useAuctionsStore } from 'src/auction/store/auctionsStore';
import AuctionInfoBanner from 'src/auction/ui/AuctionInfoBanner/AuctionInfoBanner.vue';
import AuctionInitialBids from 'src/auction/ui/AuctionInitialBids/AuctionInitialBids.vue';
import AuctionResults from 'src/auction/ui/AuctionResults/AuctionResults.vue';
import AuctionRound, { AuctionRoundProps } from 'src/auction/ui/AuctionRound/AuctionRound.vue';
import AuctionStartDateSection from 'src/auction/ui/AuctionStartDateSection/AuctionStartDateSection.vue';
import BiddingForm from 'src/auction/ui/BiddingForm/BiddingForm.vue';
import { config } from 'src/config';
import { AuctionBid, AuctionType } from 'src/entities/auction';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import { AuctionPersistenceKeys } from 'src/entities/auction/auctionPersistenceKeys';
import { LocalStorageService } from 'src/shared/services/LocalStorageService';
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
import { ProgressBarProps } from 'src/shared/ui/ProgressBar/ProgressBar.vue';
import { getUuid } from 'src/shared/utils/getUuid';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const auctionsStore = useAuctionsStore();
const route = useRoute();
const socketInstance = ref(new AuctionSocket(config.apiUrl));
const lastBid = ref<AuctionBid | null>(null);
const currentTime = ref(new Date());
const currentAuction = computed<AuctionFull | null>(() => auctionsStore.state.currentAuction);

const showBiddingForm = computed(
    () =>
        currentAuction.value &&
        auctionsStore.state.participation.isParticipant &&
        currentTime.value < roundsDateInterval.value.endAt,
);

const biddingService = computed<IAuctionBidding>(() =>
    BiddingFabric.getInstance(currentAuction.value),
);

const isNoOneParticipants = computed(
    () => !biddingService.value.getIsParticipantsExists(currentAuction.value),
);

const showMaxLabel = computed(() => {
    if (!currentAuction.value) {
        return false;
    }
    return AuctionType.ESCO === currentAuction.value.auctionType;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firstRoundProps = computed<AuctionRoundProps>(() => {
    return biddingService.value.getRoundProps(
        1,
        currentAuction.value,
        currentTime.value,
        auctionsStore.state.participation,
    );
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const secondRoundProps = computed<AuctionRoundProps>(() => {
    return biddingService.value.getRoundProps(
        2,
        currentAuction.value,
        currentTime.value,
        auctionsStore.state.participation,
    );
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const thirdRoundProps = computed<AuctionRoundProps>(() => {
    return biddingService.value.getRoundProps(
        3,
        currentAuction.value,
        currentTime.value,
        auctionsStore.state.participation,
    );
});

const biddingFormSettings = computed(() =>
    biddingService.value.getBiddingFormSettings(
        currentAuction.value,
        currentTime.value,
        auctionsStore.state.participation,
    ),
);

const auctionResultsList = computed(() => {
    return biddingService.value.getAuctionResultList(
        currentAuction.value,
        auctionsStore.state.participation,
    );
});

const progressBarProps = computed<ProgressBarProps>(() =>
    biddingService.value.getProgressBarProps(currentAuction.value, currentTime.value),
);

const roundsDateInterval = computed(() => {
    return biddingService.value.getRoundsDateInterval(currentAuction.value);
});

const isRoundsStarted = computed(() => {
    if (!currentAuction.value) {
        return false;
    }

    return currentTime.value > new Date(currentAuction.value.firstRoundStartAt);
});

const isRoundsEnded = computed(() => {
    if (!currentAuction.value) {
        return false;
    }

    return currentTime.value > roundsDateInterval.value.endAt;
});

const isRoundsTime = computed(() => {
    if (!currentAuction.value) {
        return false;
    }

    if (!roundsDateInterval.value.startAt || !roundsDateInterval.value.endAt) {
        return false;
    }

    return (
        roundsDateInterval.value.startAt < currentTime.value &&
        roundsDateInterval.value.endAt > currentTime.value
    );
});

const initialBids = computed(() =>
    biddingService.value.getInitialBids(currentAuction.value, auctionsStore.state.participation),
);

const isAuctionStarted = computed(() =>
    biddingService.value.getIsAuctionStarted(currentAuction.value, currentTime.value),
);

const auctionId = computed(() => {
    const auctionIdParam = route.params.auctionId;

    if (!auctionIdParam) {
        return null;
    }

    return Array.isArray(auctionIdParam) ? auctionIdParam[0] : auctionIdParam;
});

const onMakeBid = (bid: AuctionBid) => {
    if (!currentAuction.value) {
        return;
    }
    auctionsStore.makeBid(currentAuction.value.id, bid);

    if (
        currentAuction.value.auctionType === AuctionType.ESCO &&
        bid.auctionType === AuctionType.ESCO
    ) {
        LocalStorageService.setItem(AuctionPersistenceKeys.LAST_YEARS, bid.years);
        LocalStorageService.setItem(AuctionPersistenceKeys.LAST_DAYS, bid.days);
        LocalStorageService.setItem(AuctionPersistenceKeys.LAST_PERCENT, bid.percent);
        updateCurrentBid();
    }
};

const updateCurrentBid = () => {
    if (!currentAuction.value) {
        return;
    }
    if (currentAuction.value.auctionType === AuctionType.ESCO && currentAuction.value.cashFlow) {
        const years = Number(LocalStorageService.getItem(AuctionPersistenceKeys.LAST_YEARS));
        const days = Number(LocalStorageService.getItem(AuctionPersistenceKeys.LAST_DAYS));
        const percent = Number(LocalStorageService.getItem(AuctionPersistenceKeys.LAST_PERCENT));
        console.log(years, days, percent, currentAuction.value.cashFlow);
        lastBid.value = {
            id: getUuid(),
            auctionType: AuctionType.ESCO,
            fullPrice: ESCOAuctionBidding.getNPV(
                years,
                days,
                currentAuction.value.cashFlow,
                percent,
            ),
            aborted: false,
            years: years,
            days: days,
            percent: percent,
        };
    }
};

const myNearestBidInterval = computed(() =>
    biddingService.value.getMyNearestBidInterval(
        currentAuction.value,
        currentTime.value,
        auctionsStore.state.participation,
    ),
);

watch(
    () => auctionsStore.state.participation,
    () => {
        const { lastYears, lastDays, lastPercent } = auctionsStore.state.participation;
        if (lastYears !== null) {
            LocalStorageService.setItem(AuctionPersistenceKeys.LAST_YEARS, lastYears);
        }
        if (lastDays !== null) {
            LocalStorageService.setItem(AuctionPersistenceKeys.LAST_DAYS, lastDays);
        }
        if (lastPercent !== null) {
            LocalStorageService.setItem(AuctionPersistenceKeys.LAST_PERCENT, lastPercent);
        }
        updateCurrentBid();
    },
);

onMounted(() => {
    if (!auctionId.value) {
        return;
    }

    auctionsStore.loadMyParticipation(auctionId.value);
    auctionsStore.loadAuctionById(auctionId.value);
    socketInstance.value.initConnect({ auctionId: auctionId.value });
    socketInstance.value.onRoundsUpdate(auctionsStore.updateRounds);

    const interval = setInterval(() => {
        currentTime.value = new Date();
    }, 1000);

    onUnmounted(() => {
        clearInterval(interval);
        socketInstance.value.disconnect();
    });
});
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.container {
    background-color: var(--background-color-grey);
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: var(--spacing-56);
}

.content-wrapper {
    width: 100%;
    padding: var(--spacing-48) var(--spacing-40);
}

.content {
    max-width: 1286px;
    margin-right: auto;
    margin-left: auto;
}

.auction-banner {
    margin-bottom: var(--spacing-24);
}

.auction-start-date-section {
    margin-top: var(--spacing-24);
}

.rounds-list {
    display: flex;
    flex-direction: column;
    margin-top: var(--spacing-24);
    margin-bottom: var(--spacing-24);

    & .round-item {
        flex: 1;
        display: flex;
        justify-content: center;
        width: 100%;

        &:not(:first-child) {
            margin-top: var(--spacing-12);
        }
    }

    @include desktop() {
        flex-direction: row;

        & .round-item {
            flex: 1;
            display: flex;

            &:not(:first-child) {
                margin-top: 0;
                margin-left: var(--spacing-32);
            }
        }
    }
}

.round-block {
    flex: 1;
}

.auction-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.bidding-form-section {
    position: fixed !important;
    bottom: 0;
    left: 0;
    right: 0;
}

.bidding-form-space {
    height: 200px;
}
</style>
