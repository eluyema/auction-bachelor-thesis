<template>
    <TabsPageWrapper :tabs="tabs" :activeTabName="activeTabName">
        <div class="buttons-block">
            <RouterLink to="/profile/auctions/create">
                <CustomButton>Створити новий аукціон</CustomButton>
            </RouterLink>
        </div>
        <AuctionsList :auctions="auctions" linkBase="/profile/auctions/" />
    </TabsPageWrapper>
</template>
<script setup lang="ts">
import { useManagerAuctionStore } from 'src/auction/store/managerAuctionStore';
import AuctionsList from 'src/auction/ui/AuctionsList/AuctionsList.vue';
import { useAuthStore } from 'src/auth/store';
import { myAuctionsTab, selectAvailableTabs } from 'src/entities/profile/tabs';
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import TabsPageWrapper from 'src/shared/ui/TabsPageWrapper/TabsPageWrapper.vue';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore();
const auctionStore = useManagerAuctionStore();

const tabs = computed(() => {
    const user = authStore.state.user;

    if (!user) {
        return [];
    }

    return selectAvailableTabs(user.accessLevel);
});

const activeTabName = myAuctionsTab.name;

onMounted(() => {
    auctionStore.loadMyAuctions();
});

const auctions = computed(() => {
    return auctionStore.state.myAuctions;
});
</script>
<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.buttons-block {
    display: flex;
    justify-content: flex-end;
    margin-bottom: var(--spacing-16);
}
</style>
