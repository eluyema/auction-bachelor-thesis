<template>
    <UserSearchForm
        @search="onSearchUser"
        class="search-form"
        :pendingForm="usersSearchStore.state.searchStatus === LoadingStatuses.PENDING"
    />
    <p v-if="usersSearchStore.state.searchStatus === LoadingStatuses.FAILED" class="not-found-user">
        Юзера з поштою {{ usersSearchStore.state.lastSearchEmail }} не знайдено
    </p>
    <form
        class="form-initial-bid"
        v-if="usersSearchStore.state.user"
        @submit.prevent="validateAndSendInitialBid"
    >
        <h6 class="title">Знайдений юзер</h6>
        <div class="row">
            <p class="data-name">Ім'я</p>
            <p class="data-value">{{ usersSearchStore.state.user.name }}</p>
        </div>
        <div class="row">
            <p class="data-name">Пошта</p>
            <p class="data-value">{{ usersSearchStore.state.user.email }}</p>
        </div>
        <CustomInput :error="error" v-model="formInput.total" label="Ставка" />
        <CustomButton class="submit-button" type="submit">Додатки початкову заявку</CustomButton>
    </form>
</template>
<script setup lang="ts">
import { LoadingStatuses } from 'src/entities/application';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import { useUsersSettingsStore } from 'src/users/store/usersSettingsStore';
import UserSearchForm from 'src/users/ui/UserSearchForm/UserSearchForm.vue';
import { onMounted, reactive, ref } from 'vue';
import { number, object } from 'yup';

// export type InitialBidForm = {};

// const props = defineProps<InitialBidForm>();

const emit = defineEmits<{
    (event: 'addBid', data: { userId: string; total: number }): void;
}>();

const usersSearchStore = useUsersSettingsStore();

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

const onSearchUser = (data: { email: string }) => {
    usersSearchStore.findByEmail(data);
};

const validateAndSendInitialBid = async () => {
    try {
        await formSchema.value.validate(formInput);
        error.value = false;
        if (!usersSearchStore.state.user) {
            return;
        }

        emit('addBid', {
            userId: usersSearchStore.state.user.id,
            total: Number(formInput.total),
        });
    } catch (err) {
        error.value = true;
        console.error('Validation error:', err);
    }
};

onMounted(() => {
    usersSearchStore.reloadState();
});
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.search-form {
    margin-top: var(--spacing-12);
}

.title {
    @include font-text-medium();

    margin-top: var(--spacing-12);
    margin-bottom: var(--spacing-12);
}

.form-initial-bid {
    margin-top: var(--spacing-16);
    display: flex;
    flex-direction: column;
    align-items: start;
}

.row {
    display: flex;
    margin-top: var(--spacing-12);
}

.data-name {
    @include font-text-small-semibold();

    width: 100px;
}

.data-value {
    @include font-text-medium();
}

.submit-button {
    margin-top: var(--spacing-12);
}

.not-found-user {
    @include font-text-medium();

    margin-top: var(--spacing-12);
}
</style>
