<template>
    <form class="form-initial-bid" v-if="user" @submit.prevent="validateAndSendInitialBid">
        <label for="contract-years-input">Тривалість контракту, років:</label>
        <CustomInput
            :error="error"
            inputId="contract-years-input"
            v-model="formInput.years"
            label="від 0 до 15"
        />
        <label for="contract-days-input">Тривалість контракту, днів:</label>
        <CustomInput
            :error="error"
            inputId="contract-days-input"
            v-model="formInput.days"
            label="від 0 до 364"
        />
        <label for="contract-percent-input">Річні платежі, % економії:</label>
        <CustomInput
            :error="error"
            inputId="contract-percent-input"
            v-model="formInput.percent"
            label="від 0 до 100"
        />
        <p class="total-text">Total = {{ total }}</p>
        <CustomButton class="submit-button" type="submit">Додатки початкову заявку</CustomButton>
    </form>
</template>
<script setup lang="ts">
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import { User } from 'src/entities/users/MyUser';
import { number, object } from 'yup';
import { computed, reactive, ref } from 'vue';
import { ESCOAuctionBidding } from 'src/auction/services/ESCOAuctionBidding';
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice';

const emit = defineEmits<{
    (
        event: 'addESCOBid',
        data: { userId: string; years: number; days: number; percent: number },
    ): void;
}>();

export type ESCOVariantProps = {
    user: User | null;
    cashFlow: number;
};

const props = defineProps<ESCOVariantProps>();

const total = computed(() => {
    if (!formInput.days || !formInput.years || !formInput.percent) {
        return 'Неможливо обрахувати';
    }
    const days = Number(formInput.days);
    const years = Number(formInput.years);
    const percent = Number(formInput.percent);

    if (Number.isNaN(days) || Number.isNaN(years) || Number.isNaN(percent)) {
        return 'Неможливо обрахувати';
    }

    return (
        formatNumberToPrice(ESCOAuctionBidding.getNPV(years, days, props.cashFlow, percent)) +
        ' грн'
    );
});

const getFormSchema = () => {
    return object({
        years: number()
            .min(0, `Має бути від 0 до 15`)
            .max(15, `Має бути від 0 до 15`)
            .required('Введіть кількість років'),
        days: number()
            .min(0, `Має бути від 0 до 364`)
            .max(365, `Має бути від 0 до 364`)
            .required('Введіть кількість дні'),
        percent: number()
            .min(0, `Має бути від 0 до 100`)
            .max(100, `Має бути від 0 до 100`)
            .required('Введіть процент'),
    });
};

const formSchema = ref(getFormSchema());

const error = ref(false);

const formInput = reactive({
    years: '',
    days: '',
    percent: '',
});

const validateAndSendInitialBid = async () => {
    try {
        await formSchema.value.validate(formInput);
        error.value = false;
        if (!props.user) {
            return;
        }

        emit('addESCOBid', {
            userId: props.user.id,
            years: Number(formInput.years),
            days: Number(formInput.days),
            percent: Number(formInput.percent),
        });
    } catch (err) {
        error.value = true;
        console.error('Validation error:', err);
    }
};
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.form-initial-bid {
    margin-top: var(--spacing-16);
    display: flex;
    flex-direction: column;
    align-items: start;
}

.submit-button {
    margin-top: var(--spacing-12);
}

.total-text {
    @include font-text-large-bold();

    margin-top: var(--spacing-8);
}
</style>
