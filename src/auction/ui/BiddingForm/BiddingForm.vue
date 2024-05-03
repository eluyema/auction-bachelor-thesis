<template>
    <div class="bidding-form-container" :class="{ success: showSuccessBidding }">
        <button @click="collapsedMobile = !collapsedMobile" class="drag-button">
            <img :src="dragHandleIcon" alt="drag handle icon" />
        </button>
        <div class="content">
            <BiddingPreview
                v-if="showPreview"
                class="hide-mobile"
                :date="nearestDate"
                :message="previewMessage"
            />
            <template v-if="state == BiddingFormState.ACTIVE_BIDDING_TIME">
                <DefaultVariant
                    v-if="settings.auctionType === AuctionType.DEFAULT"
                    :endAt="yourTurnEndAt"
                    :fullPriceMin="settings.fullPriceMin"
                    :currentBid="currentBid"
                    :collapsedMobile="collapsedMobile"
                    @bidSent="handleBidSent"
                    @bidAbort="handleBidAbort"
                />
                <NonPriceVariant
                    v-else-if="settings.auctionType === AuctionType.NON_PRICE_CRITERIA"
                    :endAt="yourTurnEndAt"
                    :fullPriceMin="settings.fullPriceMin"
                    :coefficient="settings.coefficient"
                    :currentBid="currentBid"
                    :collapsedMobile="collapsedMobile"
                    @bidSent="handleBidSent"
                    @bidAbort="handleBidAbort"
                />
                <ESCOVariant
                    v-else-if="settings.auctionType === AuctionType.ESCO"
                    :endAt="yourTurnEndAt"
                    :basePrice="settings.basePrice"
                    :defaultYears="settings.defaultYears"
                    :defaultDays="settings.defaultDays"
                    :defaultPercent="settings.defaultPercent"
                    :fullPriceMin="settings.fullPriceMin"
                    :currentBid="currentBid"
                    :collapsedMobile="collapsedMobile"
                    @bidSent="handleBidSent"
                    @bidAbort="handleBidAbort"
                />
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import BiddingPreview from './BiddingPreview.vue';
import dragHandleIcon from 'src/app/assets/images/drag-handle-icon.svg';
import DefaultVariant from './DefaultVariant.vue';
import { AuctionBid, AuctionType, AuctionBidSettings } from 'src/entities/auction';
import NonPriceVariant from './NonPriceVariant.vue';
import ESCOVariant from './ESCOVariant.vue';

enum BiddingFormState {
    BEFORE_AUCTION_START,
    BEFORE_ROUND_START,
    BEFORE_YOUR_TURN_START,
    ACTIVE_BIDDING_TIME,
    BIDDING_TIME_END,
}

export interface BiddingForm {
    auctionStartAt: Date;
    roundStartAt: Date;
    yourTurnStartAt: Date;
    yourTurnEndAt: Date;
    settings: AuctionBidSettings;
    currentBid?: AuctionBid | null;
}

const emit = defineEmits<{
    (event: 'bidSent', bidding: AuctionBid): void;
    (event: 'bidAbort'): void;
}>();

const { auctionStartAt, roundStartAt, yourTurnStartAt, yourTurnEndAt, currentBid } =
    defineProps<BiddingForm>();

const calculateCurrentState = () => {
    const currentDate = new Date();

    if (currentDate < auctionStartAt) {
        return BiddingFormState.BEFORE_AUCTION_START;
    }
    if (currentDate < roundStartAt) {
        return BiddingFormState.BEFORE_ROUND_START;
    }
    if (currentDate < yourTurnStartAt) {
        return BiddingFormState.BEFORE_YOUR_TURN_START;
    }
    if (currentDate < yourTurnEndAt) {
        return BiddingFormState.ACTIVE_BIDDING_TIME;
    }

    return BiddingFormState.BIDDING_TIME_END;
};

const getNearestDate = () => {
    const currentDate = new Date();

    if (currentDate < auctionStartAt) {
        return auctionStartAt;
    }
    if (currentDate < roundStartAt) {
        return roundStartAt;
    }
    if (currentDate < yourTurnStartAt) {
        return yourTurnStartAt;
    }
    if (currentDate < yourTurnEndAt) {
        return yourTurnEndAt;
    }

    return yourTurnEndAt;
};

const state = ref(calculateCurrentState());
const nearestDate = ref(getNearestDate());

const previewMessageMap = {
    [BiddingFormState.BEFORE_AUCTION_START]: [
        'Ви зареєстровані як учасник.',
        'До початку аукціону:',
    ],
    [BiddingFormState.BEFORE_ROUND_START]: 'До початку раунду 1:',
    [BiddingFormState.BEFORE_YOUR_TURN_START]: 'Ваш хід о 18:14:13, через',
};

const showPreview = computed(() =>
    [
        BiddingFormState.BEFORE_AUCTION_START,
        BiddingFormState.BEFORE_ROUND_START,
        BiddingFormState.BEFORE_YOUR_TURN_START,
    ].includes(state.value),
);

const showSuccessBidding = computed(() => (currentBid ? !currentBid.aborted : false));

const previewMessage = computed(
    () => previewMessageMap[state.value as keyof typeof previewMessageMap] || '',
);

let timerInterval = ref<null | ReturnType<typeof setTimeout>>(null);

const startTimer = () => {
    timerInterval.value = setInterval(() => {
        state.value = calculateCurrentState();
        nearestDate.value = getNearestDate();
    });
};

const handleBidSent = (bid: AuctionBid) => {
    emit('bidSent', bid);
};

const handleBidAbort = () => {
    emit('bidAbort');
};

const restartTimer = () => {
    if (timerInterval.value !== null) {
        clearInterval(timerInterval.value);
    }
    state.value = calculateCurrentState();
    nearestDate.value = getNearestDate();
    startTimer();
};

watch(() => auctionStartAt, restartTimer);
watch(() => roundStartAt, restartTimer);
watch(() => yourTurnStartAt, restartTimer);
watch(() => yourTurnEndAt, restartTimer);

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    if (timerInterval.value === null) {
        return;
    }
    clearInterval(timerInterval.value);
});

const collapsedMobile = ref(false);
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.bidding-form-container {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;

    @include desktop() {
        @include shadow-dark-inset();

        min-height: 120px;
    }
}

.drag-button {
    @include shadow-dark-inset();

    height: 32px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color-blue);
    border-top-left-radius: var(--radius-large);
    border-top-right-radius: var(--radius-large);

    &:hover {
        background-color: var(--background-color-blue);
    }

    @include desktop() {
        display: none;
    }
}

.content {
    widows: 100%;
    padding-top: var(--spacing-12);
    padding-bottom: var(--spacing-20);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color-blue);
}

.success .content,
.success .drag-button {
    background-color: var(--background-color-green);
}
</style>
