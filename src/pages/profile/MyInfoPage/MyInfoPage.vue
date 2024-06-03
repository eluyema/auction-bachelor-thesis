<template>
    <TabsPageWrapper :tabs="tabs" :activeTabName="activeTabName">
        <UserInfo v-if="authStore.state.user" :user="authStore.state.user" />
        <CustomButton
            @click="authStore.logout()"
            class="logout-button"
            colorVariant="error"
            textShape="text"
            >Вийти з облікового запису</CustomButton
        >
    </TabsPageWrapper>
</template>
<script setup lang="ts">
import { useAuthStore } from 'src/auth/store/useAuthStore';
import { myDataTab, selectAvailableTabs } from 'src/entities/profile/tabs';
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import TabsPageWrapper from 'src/shared/ui/TabsPageWrapper/TabsPageWrapper.vue';
import UserInfo from 'src/users/ui/UserInfo/UserInfo.vue';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const tabs = computed(() => {
    const user = authStore.state.user;

    if (!user) {
        return [];
    }

    return selectAvailableTabs(user.accessLevel);
});

const activeTabName = myDataTab.name;

const router = useRouter();

watch(
    () => authStore.isAuthorized,
    () => {
        if (!authStore.isAuthorized) {
            router.push('/');
        }
    },
);
</script>
<style lang="scss" scoped>
// @import 'src/app/assets/styles/theme/index.scss';
</style>
