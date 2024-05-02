<template>
    <div class="container">
        <div class="content">
            <div class="content-header">
                <BiddingStatus :currentBid="currentBid" class="bidding-status hide-desktop" />
                <RestrictionText
                    class="total-price-restriction"
                    title="Заявка має бути:"
                    :minValue="formattedFullPriceMin"
                    mobileInline
                />
                <span
                    v-if="currentBid ? currentBid.fullPrice && currentBid.aborted : true"
                    class="calculated-full-price-title hide-mobile"
                >
                    Ваша можлива заявка:<span class="calculated-full-price">{{
                        formattedCalculatedFullPrice
                    }}</span>
                </span>
                <span
                    v-if="currentBid && currentBid.fullPrice && !currentBid.aborted"
                    class="calculated-full-price-title hide-mobile"
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
                                        >Поточне значення: {{ defaultYears }}</span
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
                                        >Поточне значення: {{ defaultDays }}</span
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
                                        >Поточне значення: {{ defaultPercent }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="full-price-block">
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
                                    hidden: !showAbortButton || !!collapsedMobile
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
import { AuctionBid, AuctionType } from 'src/entities/auction'
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue'
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue'
import DesktopOnly from 'src/shared/ui/DesktopOnly/DesktopOnly.vue'
import CircleTimer from 'src/shared/ui/Timers/CircleTimer/CircleTimer.vue'
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice'
import { getSecondsBetweenDates } from 'src/shared/utils/getSecondsBetweenDates'
import { getUuid } from 'src/shared/utils/getUuid'
import { computed, reactive, ref, watch } from 'vue'
import { number, object } from 'yup'
import RestrictionText from './components/RestrictionText.vue'
import MobileOnly from 'src/shared/ui/MobileOnly/MobileOnly.vue'
import BiddingStatus from './components/BiddingStatus.vue'

export type ESCOVariantProps = {
    endAt: Date
    basePrice: number
    fullPriceMin: number
    collapsedMobile: boolean
    defaultYears: number
    defaultDays: number
    defaultPercent: number
    currentBid?: AuctionBid | null
}

const emit = defineEmits<{
    (event: 'bidSent', bidding: AuctionBid): void
    (event: 'bidAbort'): void
}>()

const { endAt, basePrice, currentBid, fullPriceMin, defaultYears, defaultDays, defaultPercent } =
    defineProps<ESCOVariantProps>()

const showAbortButton = computed(() => !!currentBid && !currentBid.aborted)

const formattedFullPriceMin = computed(() => formatNumberToPrice(fullPriceMin))

const formattedCalculatedFullPrice = computed(() => {
    const { years, days, percent } = getValuesOrDefault()

    const value = calculateFullPrice(basePrice, years, days, percent)

    return formatNumberToPrice(value)
})

const diffInSeconds = computed(() => getSecondsBetweenDates(endAt, new Date()))

const getValuesOrDefault = () => {
    const currentYears = isNaN(+formInput.years) ? defaultYears : +formInput.years
    const currentDays = isNaN(+formInput.days) ? defaultDays : +formInput.days
    const currentPercent = isNaN(+formInput.percent) ? defaultPercent : +formInput.percent

    return {
        years: currentYears,
        days: currentDays,
        percent: currentPercent
    }
}

const isError = ref(false)

const onBidAbort = () => {
    emit('bidAbort')
}

const getFormSchema = () => {
    return object({
        years: number()
            .min(0, `Years must be at least ${fullPriceMin}`)
            .max(100, `Years must be at least ${fullPriceMin}`)
            .integer()
            .required('Years is required'),
        days: number()
            .min(0, `Days must be at least ${fullPriceMin}`)
            .max(100, `Days must be at least ${fullPriceMin}`)
            .integer()
            .required('Days is required'),
        percent: number()
            .min(0, `Percent must be at least ${fullPriceMin}`)
            .max(100, `Percent must be at least ${fullPriceMin}`)
            .integer()
            .required('Percent is required')
    })
}

const formSchema = ref(getFormSchema())

const formInput = reactive({
    years: '',
    days: '',
    percent: ''
})

function calculateFullPrice(
    contractYears: number,
    contractDays: number,
    annualSavingsPercentage: number,
    basePrice: number
) {
    // TODO: add real logic here
    return (
        basePrice +
        (contractYears * 1000 + contractDays * 100) *
            (1 + 100 / (annualSavingsPercentage + 0.000001))
    )
}

const sendBid = (fullPrice: number) => {
    const bid: AuctionBid = {
        id: getUuid(),
        auctionType: AuctionType.ESCO,
        fullPrice: formatNumberToPrice(fullPrice),
        years: +formInput.years,
        days: +formInput.days,
        percent: +formInput.percent,
        aborted: false
    }

    console.log(bid)

    emit('bidSent', bid)
}

const validateAndSendBid = async () => {
    try {
        await formSchema.value.validate(formInput)

        const fullPrice = calculateFullPrice(
            basePrice,
            +formInput.years,
            +formInput.days,
            +formInput.percent
        )

        if (fullPrice < fullPriceMin) {
            isError.value = true
            return
        }

        isError.value = false

        sendBid(fullPrice)
    } catch (error) {
        isError.value = true
        console.error('Validation error:', error)
    }
}

watch(
    () => fullPriceMin,
    () => {
        formSchema.value = getFormSchema()
    }
)
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
