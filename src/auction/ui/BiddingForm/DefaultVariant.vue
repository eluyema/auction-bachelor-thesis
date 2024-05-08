<template>
    <div class="container">
        <div class="content" :class="{ center: !!currentBid }">
            <DesktopOnly>
                <CircleTimer class="timer" :time="diffInSeconds" />
            </DesktopOnly>
            <div class="content-body">
                <RestrictionText
                    class="hide-mobile"
                    title="Заявка має бути:"
                    :isError="isError"
                    :minValue="formattedFullPriceMin"
                />
                <BiddingStatus :currentBid="currentBid" class="hide-desktop" />
                <form class="form" @submit.prevent="validateAndSendBid">
                    <div class="form-content">
                        <MobileOnly>
                            <CircleTimer class="timer" :time="diffInSeconds" />
                        </MobileOnly>
                        <div class="form-inputs">
                            <div class="form-field-block">
                                <RestrictionText
                                    class="hide-desktop"
                                    title="Заявка має бути:"
                                    :isError="isError"
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

export type DefaultVariantProps = {
    endAt: Date;
    fullPriceMin: number;
    currentBid?: AuctionBid | null;
    collapsedMobile: boolean;
};

const emit = defineEmits<{
    (event: 'bidSent', bidding: AuctionBid): void;
    (event: 'bidAbort'): void;
}>();

const { endAt, fullPriceMin, currentBid } = defineProps<DefaultVariantProps>();

const showAbortButton = computed(() => !!currentBid && !currentBid.aborted);

const formattedFullPriceMin = computed(() => formatNumberToPrice(fullPriceMin));

const diffInSeconds = computed(() => getSecondsBetweenDates(endAt, new Date()));

const isError = ref(false);

const onBidAbort = () => {
    emit('bidAbort');
};

const getFormSchema = () => {
    return object({
        fullPrice: number()
            .min(fullPriceMin, `Full price must be at least ${fullPriceMin}`)
            .required('Full price is required'),
    });
};

const formSchema = ref(getFormSchema());

watch(
    () => fullPriceMin,
    () => {
        formSchema.value = getFormSchema();
    },
);

const formInput = reactive({
    fullPrice: '',
});

const sendBid = () => {
    const bid: AuctionBid = {
        id: getUuid(),
        auctionType: AuctionType.DEFAULT,
        fullPrice: formatNumberToPrice(+formInput.fullPrice),
        aborted: false,
    };

    console.log(bid);

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
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.container {
    width: 100%;
}

.content-body {
    @include mobile() {
        max-width: 500px;
        width: 100%;
    }
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
    padding-left: var(--spacing-8);
    padding-right: var(--spacing-8);

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
        flex: 1;
        width: 100%;
    }
}

.buttons-block {
    display: flex;
    flex-direction: column;
    padding-top: var(--spacing-8);

    @include desktop() {
        flex-direction: row;
        padding-bottom: var(--spacing-4);
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
