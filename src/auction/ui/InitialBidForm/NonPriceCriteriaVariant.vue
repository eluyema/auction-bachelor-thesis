<template>
    <form class="form-initial-bid" v-if="user" @submit.prevent="validateAndSendInitialBid">
        <CustomInput :error="error" v-model="formInput.total" label="Ставка" />
        <CustomInput :error="error" v-model="formInput.coefficient" label="Коефіцієнт" />
        <CustomInput
            :error="error"
            disabled
            v-model="formInput.adjustedPrice"
            label="Приведена ціна"
        />
        <CustomButton class="submit-button" type="submit">Додатки початкову заявку</CustomButton>
    </form>
</template>
<script setup lang="ts">
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import { User } from 'src/entities/users/MyUser';
import { number, object } from 'yup';
import { reactive, ref, watch } from 'vue';

const emit = defineEmits<{
    (
        event: 'addNonPriceCriteriaBid',
        data: { userId: string; total: number; coefficient: number },
    ): void;
}>();

export type NonPriceCriteriaVariantProps = {
    user: User | null;
};

const props = defineProps<NonPriceCriteriaVariantProps>();

const getFormSchema = () => {
    return object({
        total: number().min(0, `Має бути більше 0`).required('Введіть ставку'),
        coefficient: number().min(0, `Має бути більше 0`).required('Введіть коефіцієнт'),
        adjustedPrice: number().min(0, `Має бути більше 0`).required('Введіть приведену ціну'),
    });
};

const formSchema = ref(getFormSchema());

const error = ref(false);

const formInput = reactive({
    total: '',
    coefficient: '',
    adjustedPrice: '',
});

const tryToCalculateAdjustedPrice = () => {
    if (!formInput.coefficient || !formInput.total) {
        return;
    }
    const coefficient = Number(formInput.coefficient);
    const total = Number(formInput.total);
    if (Number.isNaN(coefficient) || Number.isNaN(total)) {
        return;
    }

    formInput.adjustedPrice = (total / coefficient).toFixed(0);
};

watch(() => formInput.total, tryToCalculateAdjustedPrice);

watch(() => formInput.coefficient, tryToCalculateAdjustedPrice);

const validateAndSendInitialBid = async () => {
    try {
        await formSchema.value.validate(formInput);
        error.value = false;
        if (!props.user) {
            return;
        }

        emit('addNonPriceCriteriaBid', {
            userId: props.user.id,
            total: Number(formInput.total),
            coefficient: Number(formInput.coefficient),
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
</style>
