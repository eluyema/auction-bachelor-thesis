<template>
    <div class="container">
        <AppHeader />
        <main class="content">
            <h1
                v-if="autionsStore.state.userAuctionsStatus === LoadingStatuses.FULFILLED"
                class="auctions-list-title"
            >
                Список аукціонів користувача - {{ autionsStore.state.userNameOfAuctions }}
            </h1>
            <AuctionsList
                class="auctions-list"
                :auctions="autionsStore.state.userAuctions"
                linkBase="/auctions/"
            />
        </main>
    </div>
</template>
<script setup lang="ts">
import { useAuctionsStore } from 'src/auction/store/auctionsStore';
import AuctionsList from 'src/auction/ui/AuctionsList/AuctionsList.vue';
import { LoadingStatuses } from 'src/entities/application';
import AppHeader from 'src/shared/ui/AppHeader/AppHeader.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const autionsStore = useAuctionsStore();
const route = useRoute();

onMounted(() => {
    const userIdParam = route.params.userId;
    const userId = Array.isArray(userIdParam) ? userIdParam[0] : userIdParam;

    autionsStore.loadUserAuctions(userId);
});
</script>

<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.container {
    background-color: var(--background-color-grey);
    flex: 1;
}

.auctions-list-title {
    @include font-h1();
}

.auctions-list {
    margin-top: var(--spacing-16);
}

.content {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 1200px;
    margin-top: var(--spacing-24);
    padding: var(--spacing-16);
}
</style>
