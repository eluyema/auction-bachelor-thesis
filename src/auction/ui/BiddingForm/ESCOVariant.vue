<template>
    <div class="container">
        <div class="content">
            <div class="content-header">
                <BiddingStatus :currentBid="currentBid" class="bidding-status hide-desktop" />
                <RestrictionText
                    class="total-price-restriction"
                    title="Заявка має бути:"
                    :class="{ 'hide-mobile': !!collapsedMobile }"
                    :minValue="formattedFullPriceMin"
                    isMax
                    mobileInline
                />
                <span
                    v-if="currentBid ? currentBid.fullPrice && currentBid.aborted : true"
                    class="calculated-full-price-title hide-mobile"
                    :class="{ 'hide-mobile': !!collapsedMobile }"
                >
                    Ваша можлива заявка:<span class="calculated-full-price">{{
                        formattedCalculatedFullPrice
                    }}</span>
                </span>
                <span
                    v-if="currentBid && currentBid.fullPrice && !currentBid.aborted"
                    class="calculated-full-price-title hide-mobile"
                    :class="{ 'hide-mobile': !!collapsedMobile }"
                >
                    Ваша заявка:<span class="calculated-full-price">{{
                        currentBid.fullPrice
                    }}</span>
                </span>
            </div>
            <div class="content-body" :class="{ center: !!currentBid }">
                <DesktopOnly>
                    <CircleTimer class="timer" :time="diffInSeconds" />
                </DesktopOnly>
                <div class="form-container">
                    <form
                        class="form"
                        @submit.prevent="validateAndSendBid"
                        :class="{ collapsed: !!collapsedMobile }"
                    >
                        <div class="form-content">
                            <MobileOnly>
                                <CircleTimer class="timer" :time="diffInSeconds" />
                            </MobileOnly>
                            <div class="form-inputs" :class="{ 'hide-mobile': !!collapsedMobile }">
                                <div class="form-field-block">
                                    <RestrictionText
                                        title="Тривалість контракту, років:"
                                        :isError="isError"
                                    />
                                    <CustomInput
                                        :error="isError"
                                        class="input"
                                        label="від 0 до 15"
                                        v-model="formInput.years"
                                    />
                                    <span class="default-text"
                                        >Поточне значення: {{ currentYears }}</span
                                    >
                                </div>
                                <div class="form-field-block">
                                    <RestrictionText
                                        title="Тривалість контракту, днів:"
                                        :isError="isError"
                                    />
                                    <CustomInput
                                        class="input"
                                        label="від 0 до 364"
                                        :error="isError"
                                        v-model="formInput.days"
                                    />
                                    <span class="default-text"
                                        >Поточне значення: {{ currentDays }}</span
                                    >
                                </div>
                                <div class="form-field-block">
                                    <RestrictionText
                                        title="Річні платежі, % економії:"
                                        :isError="isError"
                                    />
                                    <CustomInput
                                        :error="isError"
                                        class="input"
                                        label="від 0 до 100"
                                        v-model="formInput.percent"
                                    />
                                    <span class="default-text"
                                        >Поточне значення: {{ currentPercent }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="full-price-block" :class="{ 'hide-mobile': !!collapsedMobile }">
                            <span
                                v-if="
                                    currentBid ? currentBid.fullPrice && currentBid.aborted : true
                                "
                                :class="{ 'hide-mobile': !!collapsedMobile }"
                                class="calculated-full-price-title hide-desktop"
                            >
                                Ваша можлива заявка:<span class="calculated-full-price">{{
                                    formattedCalculatedFullPrice
                                }}</span>
                            </span>
                            <span
                                v-if="currentBid && currentBid.fullPrice && !currentBid.aborted"
                                class="calculated-full-price-title hide-desktop"
                            >
                                Ваша заявка:<span class="calculated-full-price">{{
                                    currentBid.fullPrice
                                }}</span>
                            </span>
                        </div>
                        <div class="buttons-block">
                            <CustomButton type="submit" class="button" colorVariant="success">
                                {{ showAbortButton ? 'Оновити заявку' : 'Зробити заявку' }}
                            </CustomButton>
                            <CustomButton
                                :disabled="!showAbortButton"
                                type="button"
                                class="button"
                                :class="{
                                    hidden: !showAbortButton || !!collapsedMobile,
                                }"
                                @click="onBidAbort"
                                colorVariant="error"
                                textShape="text"
                            >
                                Відмінити заявку
                            </CustomButton>
                        </div>
                    </form>
                    <BiddingStatus :currentBid="currentBid" class="hide-mobile" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AuctionBid, AuctionType } from 'src/entities/auction';
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import DesktopOnly from 'src/shared/ui/DesktopOnly/DesktopOnly.vue';
import CircleTimer from 'src/shared/ui/Timers/CircleTimer/CircleTimer.vue';
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice';
import { getSecondsBetweenDates } from 'src/shared/utils/getSecondsBetweenDates';
import { getUuid } from 'src/shared/utils/getUuid';
import { computed, reactive, ref, watch } from 'vue';
import { number, object } from 'yup';
import RestrictionText from './components/RestrictionText.vue';
import MobileOnly from 'src/shared/ui/MobileOnly/MobileOnly.vue';
import BiddingStatus from './components/BiddingStatus.vue';
import { ESCOAuctionBidding } from 'src/auction/services/ESCOAuctionBidding';

export type ESCOVariantProps = {
    endAtStr: string;
    cashFlow: number;
    fullPriceMin: number;
    collapsedMobile: boolean;
    currentBid?: AuctionBid | null;
    lastBid?: AuctionBid | null;
};

const emit = defineEmits<{
    (event: 'bidSent', bidding: AuctionBid): void;
    (event: 'bidAbort'): void;
}>();

const props = defineProps<ESCOVariantProps>();

const currentYears = computed(() => {
    if (!props.lastBid || props.lastBid.auctionType !== AuctionType.ESCO) {
        return 0;
    }
    return props.lastBid.years;
});

const currentDays = computed(() => {
    if (!props.lastBid || props.lastBid.auctionType !== AuctionType.ESCO) {
        return 0;
    }
    return props.lastBid.days;
});

const currentPercent = computed(() => {
    if (!props.lastBid || props.lastBid.auctionType !== AuctionType.ESCO) {
        return 0;
    }
    return props.lastBid.percent;
});

const showAbortButton = computed(() => !!props.currentBid && !props.currentBid.aborted);

const formattedFullPriceMin = computed(() => formatNumberToPrice(props.fullPriceMin));

const formattedCalculatedFullPrice = computed(() => {
    const { years, days, percent } = getValuesOrDefault();

    const value = calculateFullPrice(years, days, props.cashFlow, percent);

    return formatNumberToPrice(value);
});

const diffInSeconds = computed(() => getSecondsBetweenDates(new Date(props.endAtStr), new Date()));

const getValuesOrDefault = () => {
    const currentYears = isNaN(+formInput.years) ? 0 : +formInput.years;
    const currentDays = isNaN(+formInput.days) ? 0 : +formInput.days;
    const currentPercent = isNaN(+formInput.percent) ? 1 : +formInput.percent;

    return {
        years: currentYears,
        days: currentDays,
        percent: currentPercent,
    };
};

const isError = ref(false);

const onBidAbort = () => {
    emit('bidAbort');
};

const getFormSchema = () => {
    return object({
        years: number()
            .min(0, `Years must be at least 0`)
            .max(15, `Years must be at least 15`)
            .integer()
            .required('Years is required'),
        days: number()
            .min(0, `Days must be at least 0`)
            .max(364, `Days must be at least 364`)
            .integer()
            .required('Days is required'),
        percent: number()
            .min(1, `Percent must be at least 1`)
            .max(100, `Percent must be at least 100`)
            .integer()
            .required('Percent is required'),
    });
};

const formSchema = ref(getFormSchema());

const formInput = reactive({
    years: '',
    days: '',
    percent: '',
});

function calculateFullPrice(years: number, days: number, cashFlow: number, percent: number) {
    try {
        const calc = ESCOAuctionBidding.getNPV(years, days, cashFlow, percent);
        return calc;
    } catch (_err) {
        return 0;
    }
}

const sendBid = (fullPrice: number) => {
    const bid: AuctionBid = {
        id: getUuid(),
        auctionType: AuctionType.ESCO,
        fullPrice: fullPrice,
        years: +formInput.years,
        days: +formInput.days,
        percent: +formInput.percent,
        aborted: false,
    };

    emit('bidSent', bid);
};

const validateAndSendBid = async () => {
    try {
        await formSchema.value.validate(formInput);

        const fullPrice = calculateFullPrice(
            +formInput.years,
            +formInput.days,
            props.cashFlow,
            +formInput.percent,
        );

        if (fullPrice < props.fullPriceMin) {
            isError.value = true;

            return;
        }

        isError.value = false;

        sendBid(fullPrice);
    } catch (error) {
        isError.value = true;
        console.error('Validation error:', error);
    }
};

watch(
    () => props.fullPriceMin,
    () => {
        formSchema.value = getFormSchema();
    },
);
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bidding-status {
    margin-bottom: var(--spacing-8);
}

.timer {
    margin-right: var(--spacing-16);
    margin-top: var(--spacing-32);
    align-self: flex-start;

    @include desktop() {
        margin-top: var(--spacing-28);
        margin-right: 0;
    }
}

.collapsed .timer {
    margin-right: var(--spacing-4);
    margin-top: 0;
}

.calculated-full-price-title {
    @include font-text-large();

    width: 100%;

    & .calculated-full-price {
        font-weight: 700;
        margin-left: var(--spacing-4);
        border-bottom: 1px dashed var(--color-text-gray);
    }
}

.total-price-restriction {
    @include font-text-large();

    width: 100%;
}

.default-text {
    @include font-text-medium();

    font-size: var(--size-s);
    color: var(--color-text-gray);

    @include desktop() {
        font-size: var(--size-m);
    }
}

.content {
    padding-left: var(--spacing-8);
    padding-right: var(--spacing-8);
    width: 100%;
    max-width: 1200px;

    @include desktop() {
        padding-left: var(--spacing-4);
        padding-right: var(--spacing-4);
    }
}

.full-price-block {
    width: 100%;
    margin-top: var(--spacing-16);
}

.content-header {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    justify-content: space-between;
    margin-bottom: var(--spacing-8);

    @include desktop() {
        flex-direction: row;
        margin-bottom: var(--spacing-20);
    }
}

.content-body {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: end;

    &.center {
        align-items: center;
    }
}

.form {
    display: flex;
    flex-direction: column;
    align-items: start;

    @include desktop() {
        flex-direction: row;
    }

    & .form-content {
        display: flex;
    }

    & .form-inputs {
        width: 100%;
        display: flex;
        flex-direction: column;

        @include desktop() {
            flex-direction: row;
            align-items: end;
        }
    }

    &.collapsed {
        flex-direction: row;
        align-items: center;
    }
}

.form-container {
    width: 100%;
    max-width: 450px;
    padding-right: var(--spacing-8);

    @include desktop() {
        max-width: 100%;
        width: auto;
    }
}

.form-field-block {
    margin-top: var(--spacing-8);

    @include desktop() {
        margin-top: 0;
        margin-left: var(--spacing-8);
    }
}

.buttons-block {
    display: flex;
    flex-direction: column;
    margin-top: var(--spacing-12);
    width: 100%;

    @include desktop() {
        margin-top: var(--spacing-28);
        padding-left: 0;
        padding-right: 0;
        height: 54px;
        flex-direction: row;
    }
}

.collapsed .buttons-block {
    flex: 1;

    @include mobile() {
        margin-top: 0;
    }
}

.button {
    width: 100%;
    text-wrap: nowrap;
    height: 100%;
    margin-top: var(--spacing-4);

    &.hidden {
        display: none;
        opacity: 1;

        @include desktop() {
            opacity: 0;
            display: block;
        }
    }

    @include desktop() {
        margin-left: var(--spacing-8);
        margin-top: 0;
        width: auto;
    }
}

.input {
    min-width: 230px;
    width: 100%;

    &.unactive {
        min-width: 90px;
        max-width: 90px;
    }

    @include desktop() {
        min-width: 250px;
    }
}

.hide-mobile {
    @include mobile() {
        display: none !important;
    }
}

.hide-desktop {
    @include desktop() {
        display: none !important;
    }
}
</style>
