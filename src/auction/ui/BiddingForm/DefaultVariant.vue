<template>
    <div class="container">
        <div class="content" :class="{ center: !!currentBid }">
            <DesktopOnly>
                <CircleTimer class="timer" :time="diffInSeconds" />
            </DesktopOnly>
            <div>
                <InputName
                    class="hide-mobile"
                    title="Заявка має бути:"
                    :minValue="formattedFullPriceMin"
                />
                <form class="form" @submit.prevent="validateAndSendBid">
                    <div class="form-content">
                        <MobileOnly>
                            <CircleTimer class="timer" :time="diffInSeconds" />
                        </MobileOnly>
                        <div class="form-inputs">
                            <div class="form-field-block">
                                <InputName
                                    class="hide-desktop"
                                    title="Заявка має бути:"
                                    :minValue="formattedFullPriceMin"
                                />
                                <CustomInput
                                    :error="isError"
                                    class="input"
                                    v-model="formInput.fullPrice"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="buttons-block">
                        <CustomButton type="submit" class="button" colorVariant="success">
                            Зробити заявку
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
                <div class="bid-status-block" v-if="currentBid">
                    <CustomIcon
                        iconName="done"
                        :colorVariant="currentBid.aborted ? null : 'success'"
                    />
                    <span v-if="currentBid.aborted" class="bid-status-text">
                        Ваша заявка відмінена
                    </span>
                    <span v-if="!currentBid.aborted" class="bid-status-text active">
                        Ваша заявка {{ currentBid.fullPrice }} прийнята
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AuctionBid } from 'src/entities/auction'
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue'
import CustomIcon from 'src/shared/ui/CustomIcon/CustomIcon.vue'
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue'
import DesktopOnly from 'src/shared/ui/DesktopOnly/DesktopOnly.vue'
import CircleTimer from 'src/shared/ui/Timers/CircleTimer/CircleTimer.vue'
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice'
import { getSecondsBetweenDates } from 'src/shared/utils/getSecondsBetweenDates'
import { getUuid } from 'src/shared/utils/getUuid'
import { computed, reactive, ref, watch } from 'vue'
import { number, object } from 'yup'
import InputName from './InputName.vue'
import MobileOnly from 'src/shared/ui/MobileOnly/MobileOnly.vue'

export type DefaultVariantProps = {
    endAt: Date
    fullPriceMin: number
    currentBid?: AuctionBid | null
}

const emit = defineEmits<{
    (event: 'bidSent', bidding: AuctionBid): void
    (event: 'bidAbort'): void
}>()

const { endAt, fullPriceMin, currentBid } = defineProps<DefaultVariantProps>()

const showAbortButton = computed(() => !!currentBid && !currentBid.aborted)

const formattedFullPriceMin = computed(() => formatNumberToPrice(fullPriceMin))

const diffInSeconds = computed(() => getSecondsBetweenDates(endAt, new Date()))

const isError = ref(false)

const onTimeEnd = () => {
    console.log('time end')
}

const onBidAbort = () => {
    emit('bidAbort')
}

const getFormSchema = () => {
    return object({
        fullPrice: number()
            .min(fullPriceMin, `Full price must be at least ${fullPriceMin}`)
            .required('Full price is required')
    })
}

const formSchema = ref(getFormSchema())

watch(
    () => fullPriceMin,
    () => {
        formSchema.value = getFormSchema()
    }
)

const formInput = reactive({
    fullPrice: ''
})

const sendBid = () => {
    const bid = {
        id: getUuid(),
        fullPrice: formatNumberToPrice(+formInput.fullPrice),
        aborted: false
    }

    console.log(bid)

    emit('bidSent', bid)
}

const validateAndSendBid = async () => {
    try {
        await formSchema.value.validate(formInput)
        isError.value = false

        sendBid()
    } catch (error) {
        isError.value = true
        console.error('Validation error:', error)
    }
}
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.container {
    width: 100%;
}

.timer {
    margin-right: var(--spacing-24);
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

    & .form-field-block {
    }
}

.bid-status-text {
    @include font-text-medium();

    font-size: var(--size-s);
    margin-left: var(--spacing-8);

    &.active {
        color: var(--color-text-green);
    }

    @include desktop() {
        font-size: var(--size-m);
    }
}

.buttons-block {
    padding-top: var(--spacing-8);
    padding-bottom: var(--spacing-4);
    display: flex;
}

.button {
    text-wrap: nowrap;
    height: 100%;
    margin-left: var(--spacing-8);

    &.hidden {
        display: none;
        opacity: 1;

        @include desktop() {
            opacity: 0;
            display: block;
        }
    }
}

.bid-status-block {
    display: none;
    align-items: center;
    margin-top: var(--spacing-12);

    @include desktop() {
        display: flex;
    }
}

.input {
    width: 230px;

    @include desktop() {
        width: 456px;
    }
}

.hide-mobile {
    @include mobile() {
        display: none;
    }
}

.hide-desktop {
    @include desktop() {
        display: none;
    }
}
</style>
