<template>
    <UserSearchForm
        @search="onSearchUser"
        class="search-form"
        :pendingForm="usersSearchStore.state.searchStatus === LoadingStatuses.PENDING"
    />
    <p v-if="usersSearchStore.state.searchStatus === LoadingStatuses.FAILED" class="not-found-user">
        Юзера з поштою {{ usersSearchStore.state.lastSearchEmail }} не знайдено
    </p>
    <div class="initial-bid-block" v-if="usersSearchStore.state.user">
        <h6 class="title">Знайдений юзер</h6>
        <div class="row">
            <p class="data-name">Ім'я</p>
            <p class="data-value">{{ usersSearchStore.state.user.name }}</p>
        </div>
        <div class="row">
            <p class="data-name">Пошта</p>
            <p class="data-value">{{ usersSearchStore.state.user.email }}</p>
        </div>
        <DefaultVariant
            v-if="auctionType === AuctionType.DEFAULT"
            :user="usersSearchStore.state.user"
            @addDefaultBid="sendDefaultBid"
        />
        <ESCOVariant
            v-if="cashFlow && auctionType === AuctionType.ESCO"
            :user="usersSearchStore.state.user"
            :cashFlow="cashFlow"
            @addESCOBid="sendESCOBid"
        />
        <NonPriceCriteriaVariant
            v-if="auctionType === AuctionType.NON_PRICE_CRITERIA"
            :user="usersSearchStore.state.user"
            @addNonPriceCriteriaBid="sendNonPriceCriteriaBid"
        />
    </div>
</template>
<script setup lang="ts">
import { LoadingStatuses } from 'src/entities/application';
import { useUsersSettingsStore } from 'src/users/store/usersSettingsStore';
import UserSearchForm from 'src/users/ui/UserSearchForm/UserSearchForm.vue';
import { onMounted } from 'vue';
import DefaultVariant from './DefaultVariant.vue';
import ESCOVariant from './ESCOVariant.vue';
import NonPriceCriteriaVariant from './NonPriceCriteriaVariant.vue';
import { AuctionType } from 'src/entities/auction';

export type InitialBidForm = {
    auctionType: AuctionType;
    cashFlow: number | null;
};

defineProps<InitialBidForm>();

const emit = defineEmits<{
    (
        event: 'addBid',
        data: {
            userId: string;
            total?: number;
            coefficient?: number;
            years?: number;
            days?: number;
            percent?: number;
        },
    ): void;
}>();

const usersSearchStore = useUsersSettingsStore();

const onSearchUser = (data: { email: string }) => {
    usersSearchStore.findByEmail(data);
};

const sendDefaultBid = (data: { userId: string; total: number }) => {
    emit('addBid', data);
};

const sendESCOBid = (data: { userId: string; years: number; days: number; percent: number }) => {
    emit('addBid', data);
};

const sendNonPriceCriteriaBid = (data: { userId: string; total: number; coefficient: number }) => {
    emit('addBid', data);
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

.not-found-user {
    @include font-text-medium();

    margin-top: var(--spacing-12);
}
</style>
