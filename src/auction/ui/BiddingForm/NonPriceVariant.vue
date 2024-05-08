<template>
    <div class="container">
        <div class="content" :class="{ center: !!currentBid }">
            <DesktopOnly>
                <CircleTimer class="timer" :time="diffInSeconds" />
            </DesktopOnly>
            <div class="form-container">
                <BiddingStatus :currentBid="currentBid" class="hide-desktop" />
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
                                    title="Повна ціна має бути:"
                                    :isError="isError"
                                    :minValue="formattedFullPriceMin"
                                />
                                <CustomInput
                                    :error="isError"
                                    class="input"
                                    v-model="formInput.fullPrice"
                                />
                            </div>
                            <div class="sign-block hide-mobile">
                                <span class="sign-text"> / </span>
                            </div>
                            <div class="form-field-block">
                                <RestrictionText title="Коефіцієнт" />
                                <CustomInput
                                    class="input unactive"
                                    disabled
                                    v-model="coefficientFormatted"
                                />
                            </div>
                            <div class="sign-block hide-mobile">
                                <span class="sign-text"> = </span>
                            </div>
                            <div class="form-field-block">
                                <RestrictionText
                                    title="Приведена ціна має бути:"
                                    :isError="isError"
                                    :minValue="minEnteredPrice"
                                />
                                <CustomInput
                                    :error="isError"
                                    class="input"
                                    v-model="formInput.enteredPrice"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="buttons-block">
                        <CustomButton type="submit" class="button" colorVariant="success">
                            {{ showAbortButton ? 'Оновити заявку' : 'Зробити заявку' }}
                        </CustomButton>
                        <CustomButton
                            :disabled="!showAbortButton"
                            type="button"
                            class="button"
                            :class="{ hidden: !showAbortButton }"
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

export type NonPriceVariantProps = {
    endAt: Date;
    fullPriceMin: number;
    coefficient: number;
    currentBid?: AuctionBid | null;
    collapsedMobile: boolean;
};

const emit = defineEmits<{
    (event: 'bidSent', bidding: AuctionBid): void;
    (event: 'bidAbort'): void;
}>();

const { endAt, fullPriceMin, currentBid, coefficient } = defineProps<NonPriceVariantProps>();

const showAbortButton = computed(() => !!currentBid && !currentBid.aborted);

const coefficientFormatted = computed(() => coefficient.toFixed(2));

const formattedFullPriceMin = computed(() => formatNumberToPrice(fullPriceMin));

const diffInSeconds = computed(() => getSecondsBetweenDates(endAt, new Date()));

const minEnteredPrice = computed(() => formatNumberToPrice(fullPriceMin / coefficient));

const isError = ref(false);

const onBidAbort = () => {
    emit('bidAbort');
};

const getFormSchema = () => {
    const calculatedMinEnteredPrice = fullPriceMin / coefficient;

    return object({
        fullPrice: number()
            .min(fullPriceMin, `Full price must be at least ${fullPriceMin}`)
            .required('Full price is required'),
        enteredPrice: number()
            .min(
                calculatedMinEnteredPrice,
                `Entered price must be at least ${calculatedMinEnteredPrice}`,
            )
            .required('Entered price is required'),
    });
};

const formSchema = ref(getFormSchema());

const formInput = reactive({
    fullPrice: '',
    enteredPrice: '',
});

const sendBid = () => {
    const bid: AuctionBid = {
        id: getUuid(),
        auctionType: AuctionType.NON_PRICE_CRITERIA,
        fullPrice: formatNumberToPrice(+formInput.fullPrice),
        coefficient: coefficient,
        enteredPrice: formatNumberToPrice(+formInput.enteredPrice),
        aborted: false,
    };

    emit('bidSent', bid);
};

const validateAndSendBid = async () => {
    try {
        await formSchema.value.validate(formInput);
        isError.value = false;

        sendBid();
    } catch (error) {
        isError.value = true;
        console.error('Validation error:', error);
    }
};

watch(
    () => formInput.enteredPrice,
    () => {
        const enteredPriceNum = +formInput.enteredPrice;

        if (isNaN(enteredPriceNum)) {
            return;
        }

        const updatedValue = (enteredPriceNum * coefficient).toFixed(2);

        if (updatedValue === (+formInput.fullPrice).toFixed(2)) {
            return;
        }

        formInput.fullPrice = updatedValue;
    },
);

watch(
    () => formInput.fullPrice,
    () => {
        const fullPriceNum = +formInput.fullPrice;

        if (isNaN(fullPriceMin)) {
            return;
        }

        const updatedValue = (fullPriceNum / coefficient).toFixed(2);

        if (updatedValue === (+formInput.enteredPrice).toFixed(2)) {
            return;
        }

        formInput.enteredPrice = updatedValue;
    },
);

watch(
    () => fullPriceMin,
    () => {
        formSchema.value = getFormSchema();
    },
);

watch(
    () => coefficient,
    () => {
        formSchema.value = getFormSchema();
    },
);
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.container {
    width: 100%;
}

.timer {
    margin-right: var(--spacing-16);

    @include desktop() {
        margin-right: var(--spacing-24);
    }
}

.content {
    width: 100%;
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
    }
}

.form-container {
    width: 100%;
    max-width: 450px;
    padding-left: var(--spacing-8);
    padding-right: var(--spacing-8);

    @include desktop() {
        max-width: 100%;
        width: auto;
    }
}

.buttons-block {
    display: flex;
    flex-direction: column;
    padding-top: var(--spacing-8);

    @include desktop() {
        flex-direction: row;
        padding-top: var(--spacing-28);
        padding-bottom: var(--spacing-4);
    }
}

.collapsed .buttons-block {
    flex: 1;
}

.sign-block {
    display: flex;
    height: 100%;
    align-items: center;
    padding-left: var(--spacing-8);
    padding-right: var(--spacing-8);
    padding-top: var(--spacing-28);

    & .sign-text {
        @include font-text-large();
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
