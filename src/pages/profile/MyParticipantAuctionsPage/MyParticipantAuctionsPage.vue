<template>
    <TabsPageWrapper :tabs="tabs" :activeTabName="activeTabName">
        <AuctionsList
            class="auctions-list"
            :auctions="auctionsStore.state.userAuctions"
            linkBase="/auctions/"
        />
        <p
            v-if="
                auctionsStore.state.userAuctions.length === 0 &&
                auctionsStore.state.userAuctionsStatus === LoadingStatuses.FULFILLED
            "
            class="not-found-my-auctions-text"
        >
            Ви не брали участі в жодному з аукціонів
        </p>
    </TabsPageWrapper>
</template>
<script setup lang="ts">
import { useAuctionsStore } from 'src/auction/store/auctionsStore';
import AuctionsList from 'src/auction/ui/AuctionsList/AuctionsList.vue';
import { useAuthStore } from 'src/auth/store';
import { LoadingStatuses } from 'src/entities/application';
import { myParticipationAuctionsTab, selectAvailableTabs } from 'src/entities/profile/tabs';
import TabsPageWrapper from 'src/shared/ui/TabsPageWrapper/TabsPageWrapper.vue';
import { computed, onMounted, watch } from 'vue';

const authStore = useAuthStore();
const auctionsStore = useAuctionsStore();

const tabs = computed(() => {
    const user = authStore.state.user;

    if (!user) {
        return [];
    }

    return selectAvailableTabs(user.accessLevel);
});

const activeTabName = myParticipationAuctionsTab.name;

const loadMyAuctions = () => {
    const userId = authStore.state.user?.id;

    if (!userId) {
        return userId;
    }

    auctionsStore.loadUserAuctions(userId);
};

watch(() => authStore.state.user, loadMyAuctions);

onMounted(loadMyAuctions);
</script>

<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.not-found-my-auctions-text {
    @include font-text-large();
}
</style>
