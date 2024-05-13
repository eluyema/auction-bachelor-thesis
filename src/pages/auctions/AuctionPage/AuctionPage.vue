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
                    v-if="!isNoParticipants && isAuctionStarted"
                    :list="initialBids"
                    :disabled="isRoundsTime"
                />
                <ul class="rounds-list" v-if="!isNoParticipants && isRoundsStarted">
                    <li class="round-item">
                        <AuctionRound class="round-block" v-bind:="firstRoundProps" />
                    </li>
                    <li class="round-item">
                        <AuctionRound class="round-block" v-bind:="secondRoundProps" />
                    </li>
                    <li class="round-item">
                        <AuctionRound class="round-block" v-bind:="thirdRoundProps" />
                    </li>
                </ul>
                <AuctionResults
                    v-if="!isNoParticipants && isRoundsEnded"
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
            :yourTurnStartAt="yourTurnDates.startAt"
            :yourTurnEndAt="yourTurnDates.endAt"
            :auctionEndAt="roundsDateInterval.endAt.toJSON()"
            :settings="{ auctionType: AuctionType.DEFAULT, fullPriceMin: 0 }"
        />
    </div>
</template>
<script setup lang="ts">
import {
    AuctionInitialBidsMapper,
    AuctionResultsMapper,
    AuctionRoundBidMapper,
} from 'src/auction/mappers';
import { AuctionSocket } from 'src/auction/services/AuctionSocket';
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
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
import { ProgressBarProps } from 'src/shared/ui/ProgressBar/ProgressBar.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const auctionsStore = useAuctionsStore();
const route = useRoute();
const socketInstance = ref(new AuctionSocket(config.apiUrl));

const currentTime = ref(new Date());
const currentAuction = computed<AuctionFull | null>(() => auctionsStore.state.currentAuction);

const showBiddingForm = computed(
    () =>
        currentAuction.value &&
        auctionsStore.state.participation.isParticipant &&
        currentTime.value < roundsDateInterval.value.endAt,
);

const getRoundProps = (
    roundNum: 1 | 2 | 3,
    auction: AuctionFull | null,
    currentDate: Date,
): AuctionRoundProps => {
    const defaultProps = {
        title: 'Раунд ' + roundNum,
        list: [],
        disabledText: true,
        disabledIcons: true,
    };

    if (!auction || !auction.Rounds.length) {
        return defaultProps;
    }

    const round = auction.Rounds.find((round) => round.sequenceNumber === roundNum);

    if (!round || !round.Bids.length) {
        return defaultProps;
    }

    const list = AuctionRoundBidMapper.mapToAuctionRoundBids({
        round,
        currentDate,
        auctionType: auction.auctionType,
        participation: auctionsStore.state.participation,
    });

    const disabledIcons =
        new Date(round.endAt) < currentDate || new Date(round.startAt) > currentDate;

    const disabledText =
        new Date(round.endAt) < currentDate || new Date(round.startAt) > currentDate;

    return { ...defaultProps, list, disabledIcons, disabledText };
};

const isNoParticipants = computed(() => {
    if (!currentAuction.value) {
        return true;
    }

    const rounds = currentAuction.value.Rounds;

    if (rounds.length === 0) {
        return true;
    }

    const initRound = rounds.find((round) => round.sequenceNumber === 0);

    if (!initRound) {
        return true;
    }

    if (initRound.Bids.length === 0) {
        return true;
    }

    return false;
});

const firstRoundProps = computed<AuctionRoundProps>(() => {
    return getRoundProps(1, currentAuction.value, currentTime.value);
});

const secondRoundProps = computed<AuctionRoundProps>(() => {
    const propss = getRoundProps(2, currentAuction.value, currentTime.value);
    return propss;
});

const thirdRoundProps = computed<AuctionRoundProps>(() => {
    return getRoundProps(3, currentAuction.value, currentTime.value);
});

const auctionResultsList = computed(() => {
    if (!currentAuction.value) {
        return [];
    }

    const thirdRound = currentAuction.value.Rounds.find((round) => round.sequenceNumber === 3);

    if (!thirdRound) {
        return [];
    }

    return AuctionResultsMapper.mapToAuctionResults({
        round: thirdRound,
        auctionType: currentAuction.value.auctionType,
        participation: auctionsStore.state.participation,
    });
});

const progressBarProps = computed<ProgressBarProps>(() => {
    if (!currentAuction.value) {
        return { message: 'Очікування1', variant: 'warning' };
    }

    const isEmptyRounds = !currentAuction.value.Rounds.length;

    if (isEmptyRounds && new Date(currentAuction.value.firstRoundStartAt) < currentTime.value) {
        return { message: 'Завершено', variant: 'success' };
    } else if (isEmptyRounds) {
        return { message: 'Очікування', variant: 'warning' };
    }

    const rounds = currentAuction.value.Rounds;

    const firstRound = rounds.find((r) => r.sequenceNumber === 1);
    const secondRound = rounds.find((r) => r.sequenceNumber === 2);
    const thirdRound = rounds.find((r) => r.sequenceNumber === 3);

    if (!firstRound || !secondRound || !thirdRound) {
        return { message: 'Очікування3', variant: 'warning' };
    }

    if (
        new Date(firstRound.startAt) < currentTime.value &&
        new Date(firstRound.endAt) > currentTime.value
    ) {
        return {
            message: 'Раунд 1',
            variant: 'primary',
        };
    }

    if (
        new Date(secondRound.startAt) < currentTime.value &&
        new Date(secondRound.endAt) > currentTime.value
    ) {
        return {
            message: 'Раунд 2',
            variant: 'primary',
        };
    }

    if (
        new Date(thirdRound.startAt) < currentTime.value &&
        new Date(thirdRound.endAt) > currentTime.value
    ) {
        return {
            message: 'Раунд 3',
            variant: 'primary',
        };
    }

    if (new Date(thirdRound.endAt) < currentTime.value) {
        return { message: 'Завершено', variant: 'success' };
    }

    return { message: 'Очікування1', variant: 'warning' };
});

const roundsDateInterval = computed(() => {
    if (!currentAuction.value) {
        return { startAt: new Date(0), endAt: new Date(0) };
    }

    if (!currentAuction.value.Rounds.length) {
        return {
            startAt: new Date(currentAuction.value.auctionStartAt),
            endAt: new Date(currentAuction.value.auctionStartAt),
        };
    }

    const { startAt, endAt } = AuctionRoundBidMapper.getRoundsDateInterval(
        currentAuction.value.Rounds.filter((round) => round.sequenceNumber !== 0),
    );

    return {
        startAt: startAt || new Date(currentAuction.value.auctionStartAt),
        endAt: endAt || new Date(currentAuction.value.auctionStartAt),
    };
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

const initialBids = computed(() => {
    if (!currentAuction.value) {
        return [];
    }

    if (!currentAuction.value.Rounds.length) {
        return [];
    }

    return AuctionInitialBidsMapper.mapToInitialBids(
        currentAuction.value,
        auctionsStore.state.participation,
    );
});

const isAuctionStarted = computed(() => {
    if (!currentAuction.value) {
        return false;
    }

    return new Date(currentAuction.value.auctionStartAt) < currentTime.value;
});

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

    auctionsStore.makeBid(currentAuction.value.id, Number(bid.fullPrice));
};

const yourTurnDates = computed(() => {
    if (
        !currentAuction.value ||
        !auctionsStore.state.participation.isParticipant ||
        auctionsStore.state.participation.sequenceNumber === null
    ) {
        return { startAt: new Date(0).toJSON(), endAt: new Date(0).toJSON() };
    }

    const yourSequenceNumber = auctionsStore.state.participation.sequenceNumber;

    const currentRound = currentAuction.value.Rounds.find(
        (round) =>
            new Date(round.startAt) < currentTime.value &&
            new Date(round.endAt) > currentTime.value,
    );

    const nextRounds = currentAuction.value.Rounds.filter(
        (round) => new Date(round.startAt) > currentTime.value,
    );

    if (!currentRound) {
        return { startAt: new Date(0).toJSON(), endAt: new Date(0).toJSON() };
    }

    const yourBid = currentRound.Bids.find((bid) => bid.sequenceNumber === yourSequenceNumber);

    if (!yourBid) {
        return { startAt: new Date(0).toJSON(), endAt: new Date(0).toJSON() };
    }

    if (new Date(yourBid.endAt) < currentTime.value && nextRounds.length) {
        const nextRound = [...nextRounds].sort(
            (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
        )[0];
        const yourBid = nextRound.Bids.find((bid) => bid.sequenceNumber === yourSequenceNumber);

        if (!yourBid) {
            return { startAt: new Date(0).toJSON(), endAt: new Date(0).toJSON() };
        }

        return { startAt: yourBid.startAt, endAt: yourBid.endAt };
    }

    return { startAt: yourBid.startAt, endAt: yourBid.endAt };
});

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
