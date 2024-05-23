<template>
    <div class="bidding-form-container" :class="{ success: showSuccessBidding }">
        <button @click="collapsedMobile = !collapsedMobile" class="drag-button">
            <img :src="dragHandleIcon" alt="drag handle icon" />
        </button>
        <div class="content">
            <BiddingPreview
                v-if="showPreview"
                class="hide-mobile"
                :date="new Date(nearestDate)"
                :message="previewMessage"
            />
            <template v-if="state.value == BiddingFormState.ACTIVE_BIDDING_TIME">
                <DefaultVariant
                    v-if="settings.auctionType === AuctionType.DEFAULT"
                    :endAtStr="yourTurnEndAt"
                    :fullPriceMin="settings.fullPriceMin"
                    :currentBid="currentBid"
                    :collapsedMobile="collapsedMobile"
                    @bidSent="handleBidSent"
                    @bidAbort="handleBidAbort"
                />
                <NonPriceVariant
                    v-else-if="settings.auctionType === AuctionType.NON_PRICE_CRITERIA"
                    :endAtStr="yourTurnEndAt"
                    :fullPriceMin="settings.fullPriceMin"
                    :coefficient="settings.coefficient"
                    :currentBid="currentBid"
                    :collapsedMobile="collapsedMobile"
                    @bidSent="handleBidSent"
                    @bidAbort="handleBidAbort"
                />
                <ESCOVariant
                    v-else-if="settings.auctionType === AuctionType.ESCO"
                    :endAtStr="yourTurnEndAt"
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
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import BiddingPreview from './BiddingPreview.vue';
import dragHandleIcon from 'src/app/assets/images/drag-handle-icon.svg';
import DefaultVariant from './DefaultVariant.vue';
import { AuctionBid, AuctionType, AuctionBidSettings } from 'src/entities/auction';
import NonPriceVariant from './NonPriceVariant.vue';
import ESCOVariant from './ESCOVariant.vue';
import { BiddingFormState } from 'src/entities/auction/biddingFormState';
import { previewMessageMap } from './data';

export interface BiddingFormProps {
    auctionStartAt: string;
    roundStartAt: string;
    yourTurnStartAt: string;
    yourTurnEndAt: string;
    auctionEndAt: string;
    settings: AuctionBidSettings;
    currentBid?: AuctionBid | null;
}

const emit = defineEmits<{
    (event: 'bidSent', bidding: AuctionBid): void;
    (event: 'bidAbort'): void;
}>();

const props = defineProps<BiddingFormProps>();

const calculateCurrentState = () => {
    const currentDate = new Date();

    if (currentDate < new Date(props.auctionStartAt)) {
        return BiddingFormState.BEFORE_AUCTION_START;
    }
    if (currentDate < new Date(props.roundStartAt)) {
        return BiddingFormState.BEFORE_ROUND_START;
    }
    if (currentDate < new Date(props.yourTurnStartAt)) {
        return BiddingFormState.BEFORE_YOUR_TURN_START;
    }
    if (currentDate < new Date(props.yourTurnEndAt)) {
        return BiddingFormState.ACTIVE_BIDDING_TIME;
    }

    return BiddingFormState.BIDDING_TIME_END;
};

const getNearestDate = () => {
    const currentDate = new Date();

    if (currentDate < new Date(props.auctionStartAt)) {
        return props.auctionStartAt;
    }
    if (currentDate < new Date(props.roundStartAt)) {
        return props.roundStartAt;
    }
    if (currentDate < new Date(props.yourTurnStartAt)) {
        return props.yourTurnStartAt;
    }
    if (currentDate < new Date(props.yourTurnEndAt)) {
        return props.yourTurnEndAt;
    }
    if (currentDate < new Date(props.auctionEndAt)) {
        return props.auctionEndAt;
    }

    return props.yourTurnEndAt;
};

const state = reactive({ value: calculateCurrentState() });
const nearestDate = ref(getNearestDate());

const showPreview = computed(() => {
    return [
        BiddingFormState.BEFORE_AUCTION_START,
        BiddingFormState.BEFORE_ROUND_START,
        BiddingFormState.BEFORE_YOUR_TURN_START,
        BiddingFormState.BIDDING_TIME_END,
    ].includes(state.value);
});

const showSuccessBidding = computed(() => (props.currentBid ? !props.currentBid.aborted : false));

const previewMessage = computed(() => {
    const message = previewMessageMap[state.value as keyof typeof previewMessageMap] || '';

    return message;
});

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

watch(() => props.auctionStartAt, restartTimer);
watch(() => props.roundStartAt, restartTimer);
watch(() => props.yourTurnStartAt, restartTimer);
watch(() => props.yourTurnEndAt, restartTimer);

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
