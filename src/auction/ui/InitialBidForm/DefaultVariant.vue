<template>
    <form class="form-initial-bid" v-if="user" @submit.prevent="validateAndSendInitialBid">
        <CustomInput :error="error" v-model="formInput.total" label="Ставка" />
        <CustomButton class="submit-button" type="submit">Додатки початкову заявку</CustomButton>
    </form>
</template>
<script setup lang="ts">
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import { User } from 'src/entities/users/MyUser';
import { number, object } from 'yup';
import { reactive, ref } from 'vue';

const emit = defineEmits<{
    (event: 'addDefaultBid', data: { userId: string; total: number }): void;
}>();

export type DefaultVariantProps = {
    user: User | null;
};

const props = defineProps<DefaultVariantProps>();

const getFormSchema = () => {
    return object({
        total: number().min(0, `Має бути більше 0`).required('Введіть ставку'),
    });
};

const formSchema = ref(getFormSchema());

const error = ref(false);

const formInput = reactive({
    total: '',
});

const validateAndSendInitialBid = async () => {
    try {
        await formSchema.value.validate(formInput);
        error.value = false;
        if (!props.user) {
            return;
        }

        emit('addDefaultBid', {
            userId: props.user.id,
            total: Number(formInput.total),
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
