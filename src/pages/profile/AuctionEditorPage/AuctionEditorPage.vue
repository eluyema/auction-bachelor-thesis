<template>
    <TabsPageWrapper :tabs="tabs" :activeTabName="activeTabName">
        <div class="button-back-block">
            <RouterLink to="/profile/auctions">
                <CustomButton>Повернутись до списку аукціонів</CustomButton>
            </RouterLink>
        </div>
        <h4 class="title">Дані аукціона</h4>
        <table>
            <tr class="row" v-for="[name, value] of auctionDataRows" :key="String(name)">
                <th class="data-horizontal-name">{{ name }}</th>
                <td class="data-horizontal-value">{{ value }}</td>
            </tr>
        </table>
        <h4 class="title">Початкові заявки</h4>
        <table class="users-table">
            <tr>
                <th class="data-vertical-name">Ім'я</th>
                <th class="data-vertical-name">Пошта</th>
                <th class="data-vertical-name" v-if="auctionType === AuctionType.ESCO">Років</th>
                <th class="data-vertical-name" v-if="auctionType === AuctionType.ESCO">Днів</th>
                <th class="data-vertical-name" v-if="auctionType === AuctionType.ESCO">
                    % економії
                </th>
                <th class="data-vertical-name">Початкова ставка</th>
                <th
                    class="data-vertical-name"
                    v-if="auctionType === AuctionType.NON_PRICE_CRITERIA"
                >
                    Коефіцієнт
                </th>
                <th
                    class="data-vertical-name"
                    v-if="auctionType === AuctionType.NON_PRICE_CRITERIA"
                >
                    Приведена ставка
                </th>
                <th></th>
            </tr>
            <tr class="user-bid" v-for="bid of initBids" :key="String(bid.userId)">
                <td class="data-vertical-value">
                    {{ bid.User?.name }}
                </td>
                <td class="data-vertical-value">
                    {{ bid.User?.email }}
                </td>
                <td class="data-vertical-value" v-if="auctionType === AuctionType.ESCO">
                    {{ bid.years }}
                </td>
                <td class="data-vertical-value" v-if="auctionType === AuctionType.ESCO">
                    {{ bid.days }}
                </td>
                <td class="data-vertical-value" v-if="auctionType === AuctionType.ESCO">
                    {{ bid.percent }}
                </td>
                <td class="data-vertical-value">
                    {{ formatNumberToPrice(bid.total ?? 0) + ' грн' }}
                </td>
                <td
                    class="data-vertical-value"
                    v-if="auctionType === AuctionType.NON_PRICE_CRITERIA"
                >
                    {{ bid.coefficient }}
                </td>
                <td
                    class="data-vertical-value"
                    v-if="auctionType === AuctionType.NON_PRICE_CRITERIA"
                >
                    {{ formatNumberToPrice(bid.adjustedPrice ?? 0) + ' грн' }}
                </td>
                <td>
                    <CustomButton colorVariant="error" @click="onRemoveInitBid(bid)"
                        >Видалити заявку</CustomButton
                    >
                </td>
            </tr>
        </table>
        <h4 class="title">Додати нову зявку заявки</h4>
        <InitialBidForm
            v-if="auctionStore.state.auctionFull"
            :auctionType="auctionStore.state.auctionFull.auctionType"
            :cashFlow="auctionStore.state.auctionFull.cashFlow"
            @addBid="onAddBid"
        />
        <div
            class="button-remove-block"
            v-if="auctionStore.state.auctionFullStatus === LoadingStatuses.FULFILLED"
        >
            <CustomButton colorVariant="error" textShape="text" @click="onRemove"
                >Видалити аукціон</CustomButton
            >
        </div>
    </TabsPageWrapper>
</template>

<script setup lang="ts">
import { useManagerAuctionStore } from 'src/auction/store/managerAuctionStore';
import InitialBidForm from 'src/auction/ui/InitialBidForm/InitialBidForm.vue';
import { useAuthStore } from 'src/auth/store';
import { LoadingStatuses } from 'src/entities/application';
import { AuctionType } from 'src/entities/auction';
import { BidFull } from 'src/entities/bid/BidFull';
import { myAuctionsTab, selectAvailableTabs } from 'src/entities/profile/tabs';
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import TabsPageWrapper from 'src/shared/ui/TabsPageWrapper/TabsPageWrapper.vue';
import { formatDateUA } from 'src/shared/utils/formatDate';
import { formatNumberToPrice } from 'src/shared/utils/formatNumberToPrice';
import { useUsersSettingsStore } from 'src/users/store/usersSettingsStore';
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const auctionStore = useManagerAuctionStore();
const usersSearchStore = useUsersSettingsStore();
const route = useRoute();
const router = useRouter();

const tabs = computed(() => {
    const user = authStore.state.user;

    if (!user) {
        return [];
    }

    return selectAvailableTabs(user.accessLevel);
});

const activeTabName = myAuctionsTab.name;

const initBids = computed(() => {
    if (!auctionStore.state.auctionFull) {
        return [];
    }

    const initialRound = auctionStore.state.auctionFull.Rounds.find(
        (round) => round.sequenceNumber === 0,
    );

    if (!initialRound) {
        return [];
    }

    return initialRound.Bids;
});

const auctionData = computed(() => {
    if (!auctionStore.state.auctionFull) {
        return {};
    }

    return {
        'Ідентифікатор аукціона': auctionStore.state.auctionFull.id,
        'Ідентифікатор автора(менеджера)': auctionStore.state.auctionFull.authorId,
        'Тип аукціона': auctionStore.state.auctionFull.auctionType,
        'Статус аукціона': auctionStore.state.auctionFull.auctionStatus,
        'Додаткові налаштування аукціона': auctionStore.state.auctionFull.auctionOptions || 'немає',
        'Назва аукціона': auctionStore.state.auctionFull.name,
        'Номер закупівлі': auctionStore.state.auctionFull.purchaseCode,
        Замовник: auctionStore.state.auctionFull.customerName,
        'Грошовий потік за рік': auctionStore.state.auctionFull.cashFlow
            ? formatNumberToPrice(auctionStore.state.auctionFull.cashFlow) + ' грн'
            : undefined,
        'Очікувана вартість':
            formatNumberToPrice(auctionStore.state.auctionFull.expectedCost) + ' грн',
        'Крок зменшення': formatNumberToPrice(auctionStore.state.auctionFull.decreaseStep) + ' грн',
        'Час початку аукціона': formatDateUA(
            new Date(auctionStore.state.auctionFull.auctionStartAt),
        ),
        'Час початку першого раунду': formatDateUA(
            new Date(auctionStore.state.auctionFull.firstRoundStartAt),
        ),
        'Кількість секунд на один хід': auctionStore.state.auctionFull.timeForRoundInSecs,
    };
});

const auctionDataRows = computed(() =>
    Object.entries(auctionData.value).filter(([_key, value]) => value !== undefined),
);

const auctionType = computed(() => {
    const auction = auctionStore.state.auctionFull;

    if (!auction) {
        return null;
    }

    return auction.auctionType;
});

const onRemove = () => {
    const auctionIdParam = route.params.auctionId;
    const auctionId = Array.isArray(auctionIdParam) ? auctionIdParam[0] : auctionIdParam;
    auctionStore.removeAuction(auctionId);
};

const onAddBid = async (params: {
    userId: string;
    total?: number;
    coefficient?: number;
    years?: number;
    days?: number;
    percent?: number;
}) => {
    const { userId, total, coefficient, years, days, percent } = params;

    const auctionIdParam = route.params.auctionId;
    const auctionId = Array.isArray(auctionIdParam) ? auctionIdParam[0] : auctionIdParam;
    await auctionStore.addInitialBidForUser({
        userId,
        total,
        coefficient,
        years,
        days,
        percent,
        auctionId,
    });
    await auctionStore.loadAuctionById(auctionId);
    usersSearchStore.reloadState();
};

const onRemoveInitBid = async (bid: BidFull) => {
    const userId = bid.User?.id;

    if (!userId) {
        return;
    }

    const auctionIdParam = route.params.auctionId;
    const auctionId = Array.isArray(auctionIdParam) ? auctionIdParam[0] : auctionIdParam;

    await auctionStore.removeInitialBidForUser({ auctionId, userId });
    await auctionStore.loadAuctionById(auctionId);
};

watch(
    () => auctionStore.state.removeStatus,
    () => {
        if (auctionStore.state.removeStatus !== LoadingStatuses.FULFILLED) {
            return;
        }

        router.push('/profile/auctions');
    },
);

onMounted(() => {
    const auctionId = route.params.auctionId;

    if (!auctionId) {
        return;
    }

    const id = Array.isArray(auctionId) ? auctionId[0] : auctionId;

    auctionStore.loadAuctionById(id);
});
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.button-back-block {
    margin-bottom: var(--spacing-16);
}

.button-remove-block {
    margin-top: var(--spacing-16);
}

.data-vertical-name {
    @include font-text-medium();

    padding-left: var(--spacing-12);
    padding-right: var(--spacing-12);
    min-width: 150px;
    text-align: start;
}

.data-vertical-value {
    @include font-text-medium();

    padding-left: var(--spacing-12);
    padding-right: var(--spacing-12);
}

.data-horizontal-name {
    @include font-text-small-semibold();

    text-align: start;
    padding-top: var(--spacing-8);
    min-width: 200px;
    width: 200px;
    text-wrap: nowrap;
}

.data-horizontal-value {
    @include font-text-medium();

    padding-top: var(--spacing-8);
    padding-left: var(--spacing-16);
}

.user-bid {
}

.users-table {
    margin-top: var(--spacing-16);
}

.title {
    @include font-text-large-bold();

    margin-top: var(--spacing-24);
}
</style>
